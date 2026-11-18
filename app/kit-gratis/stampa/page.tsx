import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PrintButton from '@/components/PrintButton';

export const metadata = {
  title: 'Kit Gratis — versione stampabile',
  robots: 'noindex,nofollow',
};

// Forza generazione statica: il build di Next.js legge il file una sola volta,
// il risultato viene incluso nell'HTML statico — zero dipendenze runtime da FS.
export const dynamic = 'force-static';

// La fonte canonica dei contenuti e' docs/kit-content.md: niente copia-incolla qui.
const SOURCE = path.join(process.cwd(), 'docs', 'kit-content.md');
const RAW = fs.readFileSync(SOURCE, 'utf8');

function prepareKit(markdown: string) {
  const body = markdown.slice(markdown.indexOf('## Template 1'));
  return body.replace(/^\*\(Fine dei 7 template.*\)\*$/m, '').trim();
}

export default function KitStampaPage() {
  const content = prepareKit(RAW);
  const sections = [...content.matchAll(/^## (.+)$/gm)].map((m) => m[1]);

  return (
    <main className="min-h-screen bg-slate-200 text-slate-900 print:bg-white">
      <div className="kit-toolbar sticky top-0 z-10 border-b border-slate-300 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-[794px] items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Impaginato pronto per A4: stampa dal pulsante (o Ctrl+P) e salva come PDF.
          </p>
          <PrintButton />
        </div>
      </div>

      <article className="kit-doc">
        <section className="kit-cover">
          <p className="kit-cover-eyebrow">[NOME AGENZIA] · [CONTATTO AGENZIA]</p>
          <h1>Kit Gratis</h1>
          <p className="kit-cover-sub">
            7 template per il percorso del nuovo paziente: checklist, script, WhatsApp,
            email, recensione, SMS, mini-guida.
          </p>
          <h2 className="kit-cover-toc-title">Contenuti</h2>
          <ol className="kit-cover-toc">
            {sections.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p className="kit-cover-note">
            Le parti tra parentesi quadre sono i dati del tuo studio: si compilano una
            volta sola. Qui dentro non c'è una statistica da credere sulla parola: ogni
            voce è una cosa che lo studio o la fa, o non la fa.
          </p>
        </section>

        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>

      <style>{`
        .kit-doc {
          max-width: 794px;
          margin: 2rem auto 4rem;
          background: #fff;
          padding: 48px 56px;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.15);
          font-size: 15px;
          line-height: 1.55;
          color: #1e293b;
        }
        @media screen and (max-width: 850px) {
          .kit-doc { margin: 0; padding: 32px 20px; box-shadow: none; }
        }
        .kit-cover { break-after: page; page-break-after: always; }
        .kit-cover-eyebrow { color: #0369a1; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 8px; }
        .kit-cover h1 { font-size: 34px; font-weight: 700; margin: 0 0 12px; color: #0f172a; }
        .kit-cover-sub { font-size: 17px; color: #475569; margin: 0 0 40px; }
        .kit-doc .kit-cover-toc-title { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #334155; border: 0; padding: 0; margin: 0 0 10px; break-before: auto; page-break-before: auto; }
        .kit-cover-toc { margin: 0 0 40px; padding-left: 20px; }
        .kit-cover-toc li { margin: 6px 0; }
        .kit-cover-note { border-top: 1px solid #e2e8f0; padding-top: 16px; color: #475569; font-size: 14px; }

        .kit-doc h2 { font-size: 22px; font-weight: 700; color: #0f172a; border-bottom: 2px solid #0f172a; padding-bottom: 6px; margin: 0 0 16px; text-wrap: balance; break-before: page; page-break-before: always; }
        .kit-doc > h2:first-of-type { break-before: auto; page-break-before: auto; }
        .kit-doc h3 { font-size: 17px; font-weight: 600; color: #0f172a; margin: 20px 0 8px; text-wrap: balance; break-after: avoid; page-break-after: avoid; }
        .kit-doc p { margin: 8px 0; orphans: 3; widows: 3; }
        .kit-doc ul, .kit-doc ol { margin: 8px 0; padding-left: 22px; }
        .kit-doc ul { list-style: disc; }
        .kit-doc ol { list-style: decimal; }
        .kit-doc li { margin: 3px 0; break-inside: avoid; page-break-inside: avoid; }
        .kit-doc li.task-list-item { list-style: none; margin-left: 0; position: relative; padding-left: 7mm; }
        .kit-doc li.task-list-item input[type="checkbox"] {
          -webkit-appearance: none; appearance: none;
          position: absolute; left: 0; top: 0.2em;
          width: 4mm; height: 4mm;
          border: 1.2pt solid #0f172a; border-radius: 1mm; background: #fff;
          margin: 0; transform: none;
        }
        .kit-doc p:has(+ blockquote), .kit-doc p:has(+ ul), .kit-doc p:has(+ ol), .kit-doc p:has(+ pre) { break-after: avoid; page-break-after: avoid; }
        .kit-doc blockquote {
          border-left: 4px solid #0369a1; background: #eef2f7;
          margin: 10px 0; padding: 10px 14px; break-inside: avoid; page-break-inside: avoid;
        }
        .kit-doc blockquote p { margin: 4px 0; }
        .kit-doc pre {
          background: #eef2f7; border: 1px solid #cbd5e1; border-radius: 4px;
          padding: 12px 14px; font-size: 13px; white-space: pre-wrap;
          break-inside: avoid; page-break-inside: avoid; overflow-wrap: anywhere;
        }
        .kit-doc code { font-family: var(--font-geist-mono), ui-monospace, monospace; font-size: 13px; }
        .kit-doc table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 13px; }
        .kit-doc th, .kit-doc td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; vertical-align: top; }
        .kit-doc th { background: #e2e8f0; }
        .kit-doc hr { display: none; }
        .kit-doc strong { color: #0f172a; font-weight: 700; }

        @page {
          size: A4; margin: 18mm 16mm 20mm;
          @bottom-center { content: "Kit Gratis · pag. " counter(page) " / " counter(pages); font-size: 8.5pt; color: #475569; }
        }
        @page :first { @bottom-center { content: ""; } }
        @media print {
          .kit-toolbar { display: none !important; }
          html, body { background: #fff !important; }
          .kit-doc { max-width: none; margin: 0; padding: 0; box-shadow: none; font-size: 10.5pt; line-height: 1.45; }
          .kit-doc h3 { margin: 13pt 0 6pt; }
          .kit-doc blockquote { margin: 8pt 0; padding: 8pt 12pt; }
          .kit-doc li { margin: 2pt 0; }
          .kit-doc a { color: inherit; text-decoration: none; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </main>
  );
}
