import { NextResponse } from 'next/server';

// Serve il PDF master del Kit Base committato in public/kit-base-master.pdf.
// Il file è un asset statico: su Cloudflare Pages lo si recupera con una
// sotto-richiesta alla stessa origine (nessun filesystem a runtime nell'edge).
export const runtime = 'edge';

const MASTER_PATH = '/kit-base-master.pdf';

export async function GET(req: Request) {
  const assetUrl = new URL(MASTER_PATH, req.url);

  let asset: Response | null = null;
  try {
    asset = await fetch(assetUrl, { cf: { cacheTtl: 3600 } } as RequestInit);
  } catch {
    asset = null;
  }

  if (!asset || !asset.ok) {
    return NextResponse.json(
      { error: 'Il file del Kit Base non è al momento disponibile. Riprovi tra poco.' },
      { status: 502 }
    );
  }

  const bytes = await asset.arrayBuffer();

  return new NextResponse(bytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="kit-base.pdf"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
