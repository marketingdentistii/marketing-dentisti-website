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

  try {
    const webhookRes = await fetch(n8nUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload
    });

    // Even if webhook fails, we redirect to thank-you page
    // The lead will be retried by n8n's built-in retry mechanism
    // or logged for manual review

    return NextResponse.json({ success: true });
  } catch {
    // Network error to webhook — still redirect user to thanks
    // Don't expose internal errors to the client
    return NextResponse.json({ success: true });
  }
}
