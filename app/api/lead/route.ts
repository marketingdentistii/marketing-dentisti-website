import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const { email, nome, nomeStudio, privacy } = body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== "string" || !emailRegex.test(email)) {
    return NextResponse.json({ error: "Email mancante o non valida" }, { status: 400 });
  }

  if (typeof nome !== "string") {
    return NextResponse.json({ error: "Nome obbligatorio" }, { status: 400 });
  }
  const trimmedNome = nome.trim();
  if (trimmedNome === "" || trimmedNome.length > 100) {
    return NextResponse.json({ error: "Nome obbligatorio" }, { status: 400 });
  }

  if (nomeStudio !== undefined && (typeof nomeStudio !== "string" || nomeStudio.length > 100)) {
    return NextResponse.json({ error: "Nome studio non valido" }, { status: 400 });
  }

  if (privacy !== true) {
    return NextResponse.json({ error: "Devi accettare la Privacy Policy" }, { status: 400 });
  }

  // Forward lead data to n8n webhook
  const n8nUrl = process.env.N8N_WEBHOOK_URL;
  if (!n8nUrl) {
    return NextResponse.json({ error: "Servizio temporaneamente non disponibile" }, { status: 503 });
  }

  const payload = JSON.stringify({
    email,
    nome: trimmedNome,
    nomeStudio: nomeStudio || null,
    source: "marketing-dentisti.it",
    timestamp: new Date().toISOString()
  });

  // Inoltro al webhook n8n. Se fallisce, un solo retry e poi 502:
  // un lead perso non deve sembrare acquisito.
  const forward = async (): Promise<boolean> => {
    try {
      const res = await fetch(n8nUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  let delivered = await forward();
  if (!delivered) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    delivered = await forward();
  }

  if (!delivered) {
    return NextResponse.json(
      { error: "Non siamo riusciti a registrare la richiesta. Riprovi tra poco." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
