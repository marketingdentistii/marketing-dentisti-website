import { NextResponse } from 'next/server';

// Generates a minimal but valid A4 PDF placeholder on the fly.
// This is a technical placeholder for testing — NOT for real customer delivery.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolved = await params;
  const slug = resolved?.slug || 'kit-base.pdf';

  // Build content text for the PDF
  const lines = [
    'Kit Base',
    'Marketing dentisti',
    'Copertina provvisoria — non consegnare a clienti reali',
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
  const bodyBytes = encoder.encode(lines);

  // Pre-build objects to compute exact offsets
  // Each object: "OFFSET 0 obj\nCONTENT\nendobj\n"
  // The OFFSET string replaces the first N characters of a placeholder

  function buildObject(num: number, offset: number, content: string): string {
    const header = `${String(offset).padStart(10, '0')} 0 obj\n`;
    return header + content + '\nendobj\n';
  }

  // We need at least 6 objects: catalog, pages, page, content stream, font, xref placeholder
  // Actually let me simplify: use a known-working minimal PDF structure

  // Object numbering:
  // 1 = Catalog
  // 2 = Pages tree
  // 3 = Page
  // 4 = Content stream
  // 5 = Font

  // Build strings with numeric placeholders we'll replace after computing positions
  const rawObjects: string[] = [];
  let pos = '%PDF-1.4\n'.length; // 9

  // Placeholder format: [OBJ_N] will be replaced with actual offset
  // Since all offsets are < 10000 (10 digits), we can pre-allocate

  // Simple approach: generate PDF by building all strings then inserting offsets
  const o1Tpl = '[OBJ_1]' + ' 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  // We know the catalog is object 1 and starts at position 9 (after header)
  const catContent = '<< /Type /Catalog /Pages 2 0 R >>';

  // After header + o1, position advances
  const headerLen = 9;
  const o1Len = String(pos).padStart(10, '0').length + ' 0 obj\n'.length + catContent.length + '\nendobj\n'.length;
  // That's: 10 + 8 + 37 + 8 = 63 bytes
  const o1Total = 10 + 8 + 37 + 1 + 7 + 1; // "NNNNNNNNNN 0 obj\n" + content + "\nendobj\n"
  // Let me just count directly:
  const h1 = `0000000009 0 obj\n`; // 14 chars
  const c1 = "<< /Type /Catalog /Pages 2 0 R >>\n"; // 38 chars  
  const f1 = "endobj\n"; // 7 chars
  const s1Total = h1.length + c1.length + f1.length; // 59
  pos = headerLen + s1Total;

  // Object 2: Pages
  const h2 = `${String(pos).padStart(10, '0')} 0 obj\n`;
  const c2 = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>\n";
  const f2 = "endobj\n";
  const s2Total = h2.length + c2.length + f2.length;
  pos += s2Total;

  // Object 3: Page
  const h3 = `${String(pos).padStart(10, '0')} 0 obj\n`;
  const c3 = "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\n";
  const f3 = "endobj\n";
  const s3Total = h3.length + c3.length + f3.length;
  pos += s3Total;

  // Object 4: Content stream
  const bodyStr = lines;
  const bodyLen = encoder.encode(bodyStr).length;
  const lenHeader = `0000000000 0 obj\n<</Length ${bodyLen}>>\nstream\n`;
  // Fix: the offset for object 4
  const fixedLenHeader = `${String(pos).padStart(10, '0')} 0 obj\n<</Length ${bodyLen}>>\nstream\n`;
  const s4FixedLen = fixedLenHeader.length;
  pos += s4FixedLen + bodyLen + '\nendstream\nendobj\n'.length;

  // Object 5: Font
  const h5 = `${String(pos).padStart(10, '0')} 0 obj\n`;
  const c5 = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\n";
  const f5 = "endobj\n";
  const s5Total = h5.length + c5.length + f5.length;
  pos += s5Total;

  // Now compute all offsets precisely
  let offset = headerLen;

  // Obj 1: Catalog
  const o1_h = `${String(offset).padStart(10,'0')} 0 obj\n`; offset += o1_h.length;
  const o1_c = "<< /Type /Catalog /Pages 2 0 R >>\n"; offset += o1_c.length;
  const o1_f = "endobj\n"; offset += o1_f.length;
  const off1 = parseInt(o1_h.trim());

  // Obj 2: Pages
  const o2_h = `${String(offset).padStart(10,'0')} 0 obj\n`; offset += o2_h.length;
  const o2_c = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>\n"; offset += o2_c.length;
  const o2_f = "endobj\n"; offset += o2_f.length;
  const off2 = parseInt(o2_h.trim());

  // Obj 3: Page
  const o3_h = `${String(offset).padStart(10,'0')} 0 obj\n`; offset += o3_h.length;
  const o3_c = "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\n"; offset += o3_c.length;
  const o3_f = "endobj\n"; offset += o3_f.length;
  const off3 = parseInt(o3_h.trim());

  // Obj 4: Content Stream
  const o4_h = `${String(offset).padStart(10,'0')} 0 obj\n<</Length ${bodyLen}>>\nstream\n`; offset += o4_h.length;
  const o4_b = bodyStr; offset += bodyLen;
  const o4_f = "\nendstream\nendobj\n"; offset += o4_f.length;
  const off4 = parseInt(o4_h.trim());

  // Obj 5: Font
  const o5_h = `${String(offset).padStart(10,'0')} 0 obj\n`; offset += o5_h.length;
  const o5_c = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\n"; offset += o5_c.length;
  const o5_f = "endobj\n"; offset += o5_f.length;
  const off5 = parseInt(o5_h.trim());

  // xref table
  const xrefEntries = [
    '0000000000 65535 f ',
    String(off1).padStart(10, '0') + ' 65535 f ',
    String(off2).padStart(10, '0') + ' 65535 f ',
    String(off3).padStart(10, '0') + ' 65535 f ',
    String(off4).padStart(10, '0') + ' 65535 f ',
    String(off5).padStart(10, '0') + ' 65535 f ',
  ];
  const xrefBody = xrefEntries.join('\n') + '\n';
  const xrefSection = 'xref\n0 6\n' + xrefBody;

  const trailerPos = offset;
  const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${trailerPos}\n%%EOF\n`;

  const pdf = 
    '%PDF-1.4\n' +
    o1_h + o1_c + o1_f +
    o2_h + o2_c + o2_f +
    o3_h + o3_c + o3_f +
    o4_h + o4_b + o4_f +
    o5_h + o5_c + o5_f +
    xrefSection +
    trailer;

  return new NextResponse(new Uint8Array(encoder.encode(pdf)), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${slug}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export const runtime = 'nodejs';
