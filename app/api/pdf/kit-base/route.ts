import { NextResponse } from 'next/server';

// Generates a minimal but valid A4 PDF placeholder on the fly.
// This is a technical placeholder for testing — NOT for real customer delivery.
export async function GET() {
  const lines = [
    'Kit Base',
    'Marketing dentisti',
    'Copertina provvisoria \u2014 non consegnare a clienti reali',
    '',
    'Aree operative incluse:',
    '1. Prima chiamata e segreteria',
    '2. Messaggi WhatsApp',
    '3. Email al paziente',
    '4. Reminder e agenda',
    '5. Richiesta recensioni',
    '6. Percorso del paziente',
  ].join('\n');

  const encoder = new TextEncoder();

  // Pre-calculate exact lengths of each object
  function objHeader(offset: number): string {
    return `${String(offset).padStart(10, '0')} 0 obj\n`;
  }

  // Object 1: Catalog
  const h1 = objHeader(9); // starts at byte 9 (after '%PDF-1.4\n')
  const c1 = '<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  const off1 = 9;

  // Object 2: Pages tree
  let pos = 9 + h1.length + c1.length;
  const h2 = objHeader(pos);
  const c2 = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';

  // Object 3: Page
  pos += h2.length + c2.length;
  const h3 = objHeader(pos);
  const c3 = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n';

  // Object 4: Content stream
  pos += h3.length + c3.length;
  const bodyBytes = encoder.encode(lines);
  const o4 = `${objHeader(pos)}<< /Length ${bodyBytes.length}>>\nstream\n${lines}\nendstream\nendobj\n`;

  // Object 5: Font
  pos += o4.length;
  const h5 = objHeader(pos);
  const c5 = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n';

  // Now compute all actual offsets
  const finalOffs = [
    parseInt(h1.trim().split(' ')[0]),
    parseInt(h2.trim().split(' ')[0]),
    parseInt(h3.trim().split(' ')[0]),
    parseInt(o4.trim().split(' ')[0]),
    parseInt(h5.trim().split(' ')[0]),
  ];

  const xrefBody = [
    '0000000000 65535 f ',
    ...finalOffs.map(o => String(o).padStart(10, '0') + ' 65535 f '),
  ].join('\n') + '\n';

  const pdfEndPos = 9 + h1.length + c1.length + h2.length + c2.length + h3.length + c3.length + o4.length + h5.length + c5.length;
  const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${pdfEndPos}\n%%EOF\n`;

  const pdf = '%PDF-1.4\n' + h1 + c1 + h2 + c2 + h3 + c3 + o4 + h5 + c5 + 'xref\n0 6\n' + xrefBody + trailer;

  return new NextResponse(new Uint8Array(encoder.encode(pdf)), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="kit-base.pdf"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export const runtime = 'nodejs';
