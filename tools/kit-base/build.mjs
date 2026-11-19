// Build del PDF master Kit Base.
// Uso: node tools/kit-base/build.mjs [--include-google]
// Legge docs/kit-base/content/*.mjs, renderizza HTML con print CSS,
// stampa con Chrome locale (puppeteer-core) e mergea con pdf-lib.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';
import { PDFDocument, PDFName, PDFString, PDFArray, PDFDict, PDFNumber, rgb, StandardFonts } from 'pdf-lib';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..', '..');
const CONTENT = path.join(REPO, 'docs', 'kit-base', 'content');
const OUT = path.join(REPO, 'public', 'kit-base-master.pdf');
const FONTS = path.join(HERE, 'fonts');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const INCLUDE_GOOGLE = process.argv.includes('--include-google');

const C = {
  slate900: '#0f172a', slate600: '#475569', slate300: '#cbd5e1', slate100: '#f1f5f9',
  sky600: '#0284c7', sky50: '#f0f9ff', white: '#ffffff',
};

const AREA_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const AREA_NAMES = { A: 'Segreteria', B: 'WhatsApp', C: 'Email', D: 'Agenda', E: 'Recensioni', F: 'Social', G: 'Percorso', H: 'Bonus' };
const SIZES = {
  A4: { width: '210mm', height: '297mm', margin: '20mm 18mm' },
  A5: { width: '148mm', height: '210mm', margin: '14mm 14mm' },
  A6: { width: '105mm', height: '148mm', margin: '10mm 10mm' },
  square: { width: '1080px', height: '1080px', margin: '0' },
  story: { width: '1080px', height: '1920px', margin: '0' },
};

// ---------- utility ----------
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
const wordCount = (s) => String(s ?? '').trim().split(/\s+/).filter(Boolean).length;

function blocksWords(blocks = []) {
  let n = 0;
  const sum = (arr, f) => (arr || []).reduce((a, x) => a + f(x), 0);
  for (const b of blocks) {
    if (b.x) n += wordCount(b.x);
    if (b.title) n += wordCount(b.title);
    switch (b.t) {
      case 'ul': case 'ol': case 'check':
        n += sum(b.items, x => wordCount(x)); break;
      case 'script':
        n += wordCount(b.label) + sum(b.lines, x => wordCount(x)); break;
      case 'dialog':
        n += sum(b.lines, x => wordCount(x.who) + wordCount(x.x)); break;
      case 'table':
        n += sum(b.head, x => wordCount(x)) + sum((b.rows || []).flat(), x => wordCount(x)); break;
      case 'kv': case 'tokens':
        n += sum((b.items || []).flat(), x => wordCount(x)); break;
      case 'steps':
        n += sum(b.items, x => wordCount(x.title) + wordCount(x.x)); break;
      case 'diagram':
        n += sum(b.items, x => wordCount(x.label) + wordCount(x.x) + wordCount(x.when) + wordCount(x.title));
        n += sum(b.nodes, x => wordCount(x.label));
        n += sum(b.edges, x => wordCount(x.label));
        break;
      default: break;
    }
  }
  return n;
}

function elementWords(mod) {
  let n = blocksWords(mod.blocks || []);
  for (const s of mod.slides || []) n += wordCount(s.title) + wordCount(s.subtitle) + (s.body || []).reduce((a, x) => a + wordCount(x), 0);
  for (const c of mod.captions || []) n += wordCount(c.text) + wordCount(c.hashtags);
  for (const t of mod.tabs || []) {
    n += (t.instructions || []).reduce((a, x) => a + wordCount(x), 0);
    n += (t.rows || []).flat().reduce((a, x) => a + wordCount(x), 0);
    n += (t.columns || []).reduce((a, x) => a + wordCount(x.label), 0);
  }
  return n;
}

// ---------- font ----------
async function ensureFonts() {
  fs.mkdirSync(FONTS, { recursive: true });
  const want = [
    ['inter-400.woff2', 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff2'],
    ['inter-600.woff2', 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.woff2'],
    ['inter-700.woff2', 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff2'],
    ['sourcesans3-400.woff2', 'https://cdn.jsdelivr.net/fontsource/fonts/source-sans-3@latest/latin-400-normal.woff2'],
    ['sourcesans3-600.woff2', 'https://cdn.jsdelivr.net/fontsource/fonts/source-sans-3@latest/latin-600-normal.woff2'],
  ];
  const ok = {};
  for (const [name, url] of want) {
    const p = path.join(FONTS, name);
    if (!fs.existsSync(p)) {
      try {
        const r = await fetch(url);
        if (!r.ok) throw new Error(String(r.status));
        fs.writeFileSync(p, Buffer.from(await r.arrayBuffer()));
      } catch { continue; }
    }
    ok[name] = true;
  }
  return ok;
}

function fontCss(have) {
  const face = (fam, weight, file) => have[file]
    ? `@font-face{font-family:'${fam}';font-style:normal;font-weight:${weight};src:url('${pathToFileURL(path.join(FONTS, file)).href}') format('woff2');}`
    : '';
  return [
    face('Inter', 400, 'inter-400.woff2'), face('Inter', 600, 'inter-600.woff2'), face('Inter', 700, 'inter-700.woff2'),
    face('Source Sans 3', 400, 'sourcesans3-400.woff2'), face('Source Sans 3', 600, 'sourcesans3-600.woff2'),
  ].join('\n');
}

// ---------- diagrammi SVG originali ----------
function svgSteps(d) {
  const items = d.items || [];
  const w = 640, rowH = 62, h = items.length * rowH + 20;
  let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="diagram">`;
  items.forEach((it, i) => {
    const y = 10 + i * rowH;
    if (i < items.length - 1) s += `<line x1="34" y1="${y + 44}" x2="34" y2="${y + rowH}" stroke="${C.slate300}" stroke-width="2"/>`;
    s += `<circle cx="34" cy="${y + 22}" r="18" fill="${C.sky600}"/>`;
    s += `<text x="34" y="${y + 27}" text-anchor="middle" font-family="Inter,sans-serif" font-size="15" font-weight="700" fill="#fff">${esc(it.label ?? i + 1)}</text>`;
    s += `<text x="66" y="${y + 18}" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="${C.slate900}">${esc(it.title || it.label || '')}</text>`;
    if (it.x) s += `<text x="66" y="${y + 38}" font-family="'Source Sans 3',sans-serif" font-size="12.5" fill="${C.slate600}">${esc(it.x).substring(0, 95)}</text>`;
  });
  return s + '</svg>';
}

function svgTimeline(d) {
  const items = d.items || [];
  const w = 640, h = 150;
  const step = w / Math.max(items.length, 1);
  let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="diagram">`;
  s += `<line x1="20" y1="60" x2="${w - 20}" y2="60" stroke="${C.slate300}" stroke-width="3"/>`;
  items.forEach((it, i) => {
    const x = 20 + step * i + step / 2;
    s += `<circle cx="${x}" cy="60" r="9" fill="${C.sky600}"/>`;
    s += `<text x="${x}" y="34" text-anchor="middle" font-family="Inter,sans-serif" font-size="16" font-weight="700" fill="${C.sky600}">${esc(it.when || '')}</text>`;
    s += `<text x="${x}" y="90" text-anchor="middle" font-family="Inter,sans-serif" font-size="12.5" font-weight="600" fill="${C.slate900}">${esc(it.label || '')}</text>`;
    if (it.x) s += `<text x="${x}" y="110" text-anchor="middle" font-family="'Source Sans 3',sans-serif" font-size="11" fill="${C.slate600}">${esc(it.x).substring(0, 40)}</text>`;
  });
  return s + '</svg>';
}

function svgFlow(d) {
  const nodes = d.nodes || [], edges = d.edges || [];
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  const depth = {};
  const incoming = {};
  nodes.forEach(n => { incoming[n.id] = 0; });
  edges.forEach(e => { if (incoming[e.to] !== undefined) incoming[e.to]++; });
  const roots = nodes.filter(n => incoming[n.id] === 0).map(n => n.id);
  (roots.length ? roots : [nodes[0]?.id]).forEach(id => { if (id) depth[id] = 0; });
  let changed = true, guard = 0;
  while (changed && guard++ < 50) {
    changed = false;
    for (const e of edges) {
      if (depth[e.from] !== undefined) {
        const nd = depth[e.from] + 1;
        if (depth[e.to] === undefined || depth[e.to] < nd) { depth[e.to] = nd; changed = true; }
      }
    }
  }
  nodes.forEach(n => { if (depth[n.id] === undefined) depth[n.id] = 0; });
  const layers = {};
  nodes.forEach(n => { (layers[depth[n.id]] ||= []).push(n); });
  const maxLayer = Math.max(...Object.keys(layers).map(Number));
  const w = 640, rowH = 76, h = (maxLayer + 1) * rowH + 24;
  const pos = {};
  for (const [lv, list] of Object.entries(layers)) {
    const step = w / (list.length + 1);
    list.forEach((n, i) => { pos[n.id] = { x: step * (i + 1), y: 24 + Number(lv) * rowH }; });
  }
  let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="diagram">`;
  s += `<defs><marker id="ar" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="${C.slate600}"/></marker></defs>`;
  for (const e of edges) {
    const a = pos[e.from], b = pos[e.to];
    if (!a || !b) continue;
    const y1 = a.y + 20, y2 = b.y - 20;
    const mx = (a.x + b.x) / 2;
    s += `<path d="M${a.x},${y1} C${a.x},${(y1 + y2) / 2} ${b.x},${(y1 + y2) / 2} ${b.x},${y2}" fill="none" stroke="${C.slate600}" stroke-width="1.6" marker-end="url(#ar)"/>`;
    if (e.label) s += `<text x="${mx + 6}" y="${(y1 + y2) / 2}" font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="${C.sky600}">${esc(e.label)}</text>`;
  }
  for (const n of nodes) {
    const p = pos[n.id];
    const bw = 168, bh = 40;
    const fill = n.kind === 'start' ? C.sky600 : n.kind === 'end' ? C.slate900 : n.kind === 'decision' ? C.sky50 : C.white;
    const stroke = n.kind === 'decision' ? C.sky600 : C.slate300;
    const fg = (n.kind === 'start' || n.kind === 'end') ? '#fff' : C.slate900;
    if (n.kind === 'decision') {
      s += `<path d="M${p.x},${p.y - bh / 2 - 6} L${p.x + bw / 2},${p.y} L${p.x},${p.y + bh / 2 + 6} L${p.x - bw / 2},${p.y} Z" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>`;
    } else {
      s += `<rect x="${p.x - bw / 2}" y="${p.y - bh / 2}" width="${bw}" height="${bh}" rx="${n.kind === 'start' || n.kind === 'end' ? 20 : 6}" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>`;
    }
    const label = String(n.label || '');
    const lines = label.length > 26 ? [label.slice(0, 26), label.slice(26, 52)] : [label];
    lines.forEach((ln, i) => {
      s += `<text x="${p.x}" y="${p.y + (lines.length > 1 ? -3 + i * 14 : 4)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="11.5" font-weight="600" fill="${fg}">${esc(ln)}</text>`;
    });
  }
  return s + '</svg>';
}

function renderDiagram(b) {
  const t = b.title ? `<div class="dg-title">${esc(b.title)}</div>` : '';
  const svg = b.kind === 'timeline' ? svgTimeline(b) : b.kind === 'flow' ? svgFlow(b) : svgSteps(b);
  return `<figure class="dg">${t}${svg}</figure>`;
}

// ---------- blocchi ----------
function renderBlocks(blocks = []) {
  const out = [];
  for (const b of blocks) {
    switch (b.t) {
      case 'h2': out.push(`<h2>${esc(b.x)}</h2>`); break;
      case 'h3': out.push(`<h3>${esc(b.x)}</h3>`); break;
      case 'p': out.push(`<p>${inline(b.x)}</p>`); break;
      case 'ul': out.push(`<ul>${(b.items || []).map(i => `<li>${inline(i)}</li>`).join('')}</ul>`); break;
      case 'ol': out.push(`<ol>${(b.items || []).map(i => `<li>${inline(i)}</li>`).join('')}</ol>`); break;
      case 'check': out.push(`<ul class="check">${(b.items || []).map(i => `<li><span class="box"></span><span>${inline(i)}</span></li>`).join('')}</ul>`); break;
      case 'script': out.push(`<div class="script"><div class="who">${esc(b.label || 'Testo')}</div>${(b.lines || []).map(l => `<p>${inline(l)}</p>`).join('')}</div>`); break;
      case 'dialog': out.push(`<div class="dialog">${(b.lines || []).map(l => `<div class="turn"><span class="who">${esc(l.who)}</span><span class="say">${inline(l.x)}</span></div>`).join('')}</div>`); break;
      case 'table': out.push(`<table><thead><tr>${(b.head || []).map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${(b.rows || []).map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`); break;
      case 'kv': out.push(`<table class="kv"><tbody>${(b.items || []).map(([k, v]) => `<tr><th>${esc(k)}</th><td>${inline(v)}</td></tr>`).join('')}</tbody></table>`); break;
      case 'note': out.push(`<div class="note ${b.kind === 'warn' ? 'warn' : ''}"><div class="nt">${esc(b.title || 'Nota')}</div><p>${inline(b.x)}</p></div>`); break;
      case 'disclaimer': out.push(`<div class="disclaimer">${inline(b.x)}</div>`); break;
      case 'tokens': out.push(`<table class="tokens"><thead><tr><th>Token</th><th>Cosa inserire</th></tr></thead><tbody>${(b.items || []).map(([k, v]) => `<tr><td><code>${esc(k)}</code></td><td>${inline(v)}</td></tr>`).join('')}</tbody></table>`); break;
      case 'steps': out.push(renderDiagram({ kind: 'steps', items: (b.items || []).map(s => ({ label: String(s.n), title: s.title, x: s.x })) })); break;
      case 'diagram': out.push(renderDiagram(b)); break;
      case 'pagebreak': out.push(`<div class="pb"></div>`); break;
      case 'spacer': out.push(`<div class="sp"></div>`); break;
      default: out.push(`<p>${inline(b.x || '')}</p>`);
    }
  }
  return out.join('\n');
}

const NOTEBOX = {
  avvio: (m) => `Questo modulo richiede ~${m} min di configurazione. Preferisce averlo già pronto sul suo studio? È incluso in Avvio Studio.`,
  gestione: (m) => `Questo modulo richiede ~${m} min di configurazione. Preferisce averlo già pronto sul suo studio? È incluso in Gestione Totale.`,
};
const FOOTERLINE = {
  setup: 'Versione già configurata sul suo studio: Avvio Studio',
  contenuti: 'Gestione continuativa: Gestione Totale',
};

function upsellHtml(mod) {
  let h = '';
  if (mod.noteBox) h += `<div class="notebox">${esc(NOTEBOX[mod.noteBox.kind](mod.noteBox.minutes))}</div>`;
  if (mod.footerLine) h += `<div class="footerline">${esc(FOOTERLINE[mod.footerLine])}</div>`;
  return h;
}

// ---------- CSS ----------
function baseCss(have, size) {
  const social = size === 'square' || size === 'story';
  return `
${fontCss(have)}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:'Source Sans 3','Segoe UI',Roboto,sans-serif;font-size:${social ? '40px' : '10pt'};line-height:${social ? 1.35 : 1.45};color:${C.slate600};orphans:3;widows:3}
h1,h2,h3,h4,.who,.nt,.badge{font-family:'Inter','Segoe UI',Roboto,sans-serif;color:${C.slate900}}
h1{font-size:${social ? '76px' : '24pt'};line-height:1.15;font-weight:700;letter-spacing:-.01em}
h2{font-size:${social ? '48px' : '15.5pt'};font-weight:600;margin:14pt 0 7pt;line-height:1.25}
h3{font-size:${social ? '40px' : '12pt'};font-weight:600;margin:11pt 0 5pt}
p{margin:0 0 7pt}
ul,ol{margin:0 0 8pt 15pt}
li{margin-bottom:3pt}
strong{color:${C.slate900};font-weight:600}
code{font-family:'Inter',monospace;font-size:.92em;color:${C.sky600};background:${C.sky50};padding:1px 4px;border-radius:3px}
table{width:100%;border-collapse:collapse;margin:7pt 0 10pt;font-size:${social ? '30px' : '9pt'}}
th{background:${C.slate100};color:${C.slate900};font-family:'Inter',sans-serif;font-weight:600;text-align:left;padding:5pt 6pt;border:.5pt solid ${C.slate300}}
td{padding:5pt 6pt;border:.5pt solid ${C.slate300};vertical-align:top}
tbody tr:nth-child(even) td{background:#fafcfe}
table.kv th{width:34%}
table.tokens td:first-child{width:30%;white-space:nowrap}
.script{background:${C.sky50};border-left:3pt solid ${C.sky600};padding:9pt 12pt;margin:9pt 0 12pt;border-radius:0 4pt 4pt 0}
.script .who{font-size:8pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${C.sky600};margin-bottom:5pt}
.script p{margin-bottom:6pt;color:${C.slate900}}
.script p:last-child{margin-bottom:0}
.dialog{margin:9pt 0 12pt;border:.5pt solid ${C.slate300};border-radius:4pt;overflow:hidden}
.turn{display:flex;gap:8pt;padding:6pt 9pt;border-bottom:.5pt solid ${C.slate100}}
.turn:last-child{border-bottom:none}
.turn .who{flex:0 0 88pt;font-size:8pt;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${C.sky600};padding-top:2pt}
.turn .say{flex:1;color:${C.slate900}}
.note{background:${C.sky50};border:.5pt solid #cfe9f8;border-radius:4pt;padding:9pt 12pt;margin:10pt 0}
.note .nt{font-size:9pt;font-weight:700;color:${C.sky600};margin-bottom:4pt;text-transform:uppercase;letter-spacing:.06em}
.note p{margin:0;font-size:9.5pt}
.note.warn{background:#fffbeb;border-color:#fde68a}
.note.warn .nt{color:#b45309}
.disclaimer{background:${C.slate100};border:.5pt solid ${C.slate300};border-radius:4pt;padding:8pt 11pt;margin:10pt 0;font-size:8.5pt;font-style:italic;color:${C.slate600}}
.notebox{background:${C.sky50};border:.5pt solid ${C.sky600};border-radius:4pt;padding:10pt 13pt;margin:16pt 0 8pt;font-size:9.5pt;color:${C.slate900}}
.footerline{margin-top:14pt;padding-top:7pt;border-top:.5pt solid ${C.slate300};font-size:8pt;color:${C.slate600};font-family:'Inter',sans-serif}
ul.check{list-style:none;margin-left:0}
ul.check li{display:flex;gap:7pt;align-items:flex-start;margin-bottom:5pt}
ul.check .box{flex:0 0 auto;width:9pt;height:9pt;border:1pt solid ${C.slate600};border-radius:2pt;margin-top:3pt}
.pb{page-break-after:always;break-after:page;height:0}
.sp{height:12pt}
figure.dg{margin:12pt 0 14pt;page-break-inside:avoid}
.dg-title{font-family:'Inter',sans-serif;font-size:10pt;font-weight:600;color:${C.slate900};margin-bottom:6pt}
svg.diagram{width:100%;height:auto;max-height:116mm;display:block}
.modhead{border-bottom:2pt solid ${C.slate900};padding-bottom:8pt;margin-bottom:13pt}
.modcode{font-family:'Inter',sans-serif;font-size:9pt;font-weight:700;letter-spacing:.14em;color:${C.sky600};text-transform:uppercase}
.modhead h1{margin-top:4pt}
.badge{display:inline-block;border:1pt solid ${C.sky600};color:${C.sky600};font-size:7.5pt;font-weight:700;letter-spacing:.1em;padding:2pt 7pt;border-radius:3pt;text-transform:uppercase;margin-left:8pt;vertical-align:middle}
.arealine{font-size:8.5pt;color:${C.slate600};margin-top:6pt;font-family:'Inter',sans-serif}
`;
}

function docHtml(title, css, body) {
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${css}</style></head><body>${body}</body></html>`;
}

// ---------- render elementi ----------
function elementHtml(mod, have, zoom = 1) {
  const size = mod.size || 'A4';
  const css = baseCss(have, size) + (SIZES[size] ? `@page{size:${SIZES[size].width} ${SIZES[size].height};margin:${SIZES[size].margin}}` : '') + (zoom !== 1 ? `body{zoom:${zoom}}` : '');
  let body = '';
  if (mod.format === 'gslides') {
    body = (mod.slides || []).map((s, i) => slideHtml(s, mod, i)).join('');
    if (mod.captions?.length) {
      body += `<div class="pb"></div><h2>Caption pronte</h2>` + mod.captions.map(c => `<div class="script"><div class="who">Post ${c.n}</div><p>${inline(c.text)}</p><p style="color:${C.sky600};font-size:.9em">${esc(c.hashtags || '')}</p></div>`).join('');
    }
  } else if (mod.format === 'gsheets') {
    body = (mod.tabs || []).map(t => tabHtml(t)).join('<div class="pb"></div>');
  } else {
    body = `<div class="modhead"><span class="modcode">${esc(mod.id)}</span>${mod.printable ? '<span class="badge">Stampabile</span>' : ''}<h1>${esc(mod.title)}</h1><div class="arealine">Area ${esc(mod.area)} · ${esc(mod.areaName || AREA_NAMES[mod.area] || '')}</div></div>` + renderBlocks(mod.blocks);
  }
  body += upsellHtml(mod);
  return docHtml(mod.title, css, body);
}

function slideHtml(s, mod, i) {
  const size = s.size || mod.size || 'square';
  const isStory = size === 'story';
  const isHl = s.kind === 'highlight';
  const pad = size === 'A5' || size === 'A6' ? '0' : '96px';
  const wrap = `page-break-after:always;break-after:page;min-height:${size === 'A5' ? '190mm' : size === 'A6' ? '128mm' : isStory ? '1920px' : '1080px'};display:flex;flex-direction:column;justify-content:center;padding:${pad};position:relative;background:${s.kind === 'cover' ? C.slate900 : C.white};color:${s.kind === 'cover' ? '#fff' : C.slate900}`;
  let inner = '';
  if (isHl) {
    inner = `<div style="width:720px;height:720px;border-radius:50%;background:${C.sky50};border:6px solid ${C.sky600};display:flex;align-items:center;justify-content:center;margin:0 auto"><div style="font-family:Inter,sans-serif;font-size:84px;font-weight:700;color:${C.slate900};text-align:center">${esc(s.title)}</div></div>`;
  } else if (s.kind === 'coloring') {
    inner = `<h1 style="text-align:center;margin-bottom:24px">${esc(s.title)}</h1>${toothArt()}<div style="margin-top:28px;font-size:34px;text-align:center">${(s.body || []).map(esc).join('<br>')}</div>`;
  } else if (s.kind === 'certificate') {
    inner = `<div style="border:8px double ${C.sky600};padding:56px;text-align:center"><div style="font-family:Inter,sans-serif;font-size:30px;letter-spacing:.2em;color:${C.sky600};text-transform:uppercase">Attestato</div><h1 style="margin:22px 0">${esc(s.title)}</h1><div style="font-size:38px;margin:26px 0">${(s.body || []).map(inline).join('<br>')}</div><div style="margin-top:48px;font-size:30px;color:${C.slate600}">[NOME MEDICO] · [NOME STUDIO] · [DATA]</div></div>`;
  } else if (s.art === 'qr-frame') {
    inner = `<h1 style="margin-bottom:20px">${esc(s.title)}</h1><div style="font-size:36px;margin-bottom:28px">${(s.body || []).map(inline).join('<br>')}</div><div style="width:340px;height:340px;border:4px dashed ${C.slate300};display:flex;align-items:center;justify-content:center;color:${C.slate600};font-size:28px;margin:0 auto">QR<br>[LINK RECENSIONI]</div>`;
  } else {
    inner = `${s.badge ? `<div style="font-family:Inter,sans-serif;font-size:${isStory ? 34 : 28}px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${s.kind === 'cover' ? '#7dd3fc' : C.sky600};margin-bottom:18px">${esc(s.badge)}</div>` : ''}
      <h1 style="color:${s.kind === 'cover' ? '#fff' : C.slate900};margin-bottom:18px">${esc(s.title || '')}</h1>
      ${s.subtitle ? `<div style="font-size:${isStory ? 44 : 38}px;color:${s.kind === 'cover' ? '#e0f2fe' : C.slate600};margin-bottom:22px">${inline(s.subtitle)}</div>` : ''}
      ${(s.body || []).length ? `<div style="font-size:${isStory ? 40 : 36}px;line-height:1.4">${s.body.map(inline).join('<br>')}</div>` : ''}
      ${(s.options || []).length ? `<div style="margin-top:28px">${s.options.map(o => `<div style="border:3px solid ${C.sky600};border-radius:14px;padding:18px 24px;margin-bottom:14px;font-size:36px;color:${C.slate900}">${esc(o)}</div>`).join('')}</div>` : ''}
      ${s.answer ? `<div style="margin-top:22px;font-size:32px;color:${C.sky600}">Risposta: ${inline(s.answer)}</div>` : ''}`;
  }
  const foot = mod.footerLine ? `<div style="position:absolute;bottom:${size === 'A5' || size === 'A6' ? '10mm' : '48px'};left:${pad};right:${pad};font-family:Inter,sans-serif;font-size:${size === 'A5' || size === 'A6' ? '16px' : '26px'};color:${s.kind === 'cover' ? '#94a3b8' : C.slate600};border-top:1px solid ${C.slate300};padding-top:12px">${esc(FOOTERLINE[mod.footerLine])}</div>` : '';
  const brand = `<div style="position:absolute;top:${size === 'A5' || size === 'A6' ? '10mm' : '48px'};left:${pad};font-family:Inter,sans-serif;font-size:${size === 'A5' || size === 'A6' ? '16px' : '26px'};color:${s.kind === 'cover' ? '#94a3b8' : C.slate600}">[LOGO] · [NOME STUDIO]</div>`;
  return `<section style="${wrap}">${brand}${inner}${foot}</section>`;
}

function toothArt() {
  return `<svg viewBox="0 0 400 340" style="width:70%;margin:0 auto;display:block" xmlns="http://www.w3.org/2000/svg">
  <path d="M200 40 C150 20 90 40 80 100 C70 160 95 200 105 250 C112 285 130 300 145 285 C160 270 160 230 175 215 C188 202 212 202 225 215 C240 230 240 270 255 285 C270 300 288 285 295 250 C305 200 330 160 320 100 C310 40 250 20 200 40 Z" fill="none" stroke="#0f172a" stroke-width="4"/>
  <circle cx="165" cy="115" r="9" fill="none" stroke="#0f172a" stroke-width="4"/>
  <circle cx="235" cy="115" r="9" fill="none" stroke="#0f172a" stroke-width="4"/>
  <path d="M165 155 Q200 185 235 155" fill="none" stroke="#0f172a" stroke-width="4"/>
  <rect x="300" y="150" width="18" height="110" rx="9" fill="none" stroke="#0f172a" stroke-width="4" transform="rotate(20 309 205)"/>
  <path d="M316 148 l26 -12 M320 158 l26 -12 M324 168 l26 -12" stroke="#0f172a" stroke-width="4" fill="none"/>
  </svg>`;
}

function tabHtml(t) {
  const cols = t.columns || [];
  let h = `<h2>${esc(t.name)}</h2>`;
  if (t.instructions?.length) h += `<ul>${t.instructions.map(i => `<li>${inline(i)}</li>`).join('')}</ul>`;
  h += `<table><thead><tr>${cols.map(c => `<th>${esc(c.label)}</th>`).join('')}</tr></thead><tbody>${(t.rows || []).slice(0, 40).map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  if ((t.rows || []).length > 40) h += `<p class="arealine">Il file Google contiene tutte le ${(t.rows || []).length} righe.</p>`;
  if (t.formulas?.length) h += `<h3>Formule</h3><ul>${t.formulas.map(f => `<li><code>${esc(f.col)}</code>: <code>${esc(f.formula)}</code></li>`).join('')}</ul>`;
  if (t.conditional?.length) h += `<h3>Formattazione condizionale</h3><ul>${t.conditional.map(c => `<li><strong>${esc(c.col)}</strong>: ${(c.rules || []).map(r => `${esc(r.value)} → sfondo ${esc(r.bg)}`).join('; ')}</li>`).join('')}</ul>`;
  return h;
}

// ---------- copertina e indice ----------
function coverHtml(have) {
  const css = baseCss(have, 'A4') + `@page{size:210mm 297mm;margin:0}
  body{background:${C.slate900};color:#fff}
  .cv{height:297mm;padding:26mm 20mm;display:flex;flex-direction:column;justify-content:space-between}
  .cv h1{color:#fff;font-size:40pt;line-height:1.08}
  .cv .sub{color:#bae6fd;font-size:14pt;margin-top:14pt;max-width:150mm}
  .cv .kicker{font-family:Inter,sans-serif;font-size:10pt;letter-spacing:.22em;text-transform:uppercase;color:#7dd3fc}
  .cv .meta{border-top:1pt solid #334155;padding-top:12pt;color:#94a3b8;font-size:9.5pt;font-family:Inter,sans-serif}
  .cv .pill{display:inline-block;border:1pt solid #0284c7;color:#7dd3fc;border-radius:20pt;padding:5pt 14pt;font-size:10pt;font-family:Inter,sans-serif;margin-top:20pt}
  .logo{width:34mm;height:16mm;border:1pt dashed #475569;display:flex;align-items:center;justify-content:center;color:#64748b;font-size:8pt;font-family:Inter,sans-serif}`;
  const body = `<div class="cv">
    <div><div class="logo">[LOGO]</div></div>
    <div>
      <div class="kicker">Marketing dentisti</div>
      <h1>Kit Base</h1>
      <div class="sub">Il sistema operativo del primo contatto, della segreteria e della relazione con il paziente. Testi, protocolli e file pronti da adattare al suo studio.</div>
      <div class="pill">29 elementi · 8 aree operative</div>
    </div>
    <div class="meta">[NOME STUDIO] · [TELEFONO] · [INDIRIZZO]<br>Edizione 2026 · Uso interno dello studio</div>
  </div>`;
  return docHtml('Kit Base', css, body);
}

function indexHtml(have, entries, googleLinks, pageOf) {
  const css = baseCss(have, 'A4') + `@page{size:210mm 297mm;margin:18mm 16mm}
  .ix h1{font-size:22pt;margin-bottom:4pt}
  .ix .lead{font-size:9.5pt;margin-bottom:14pt}
  .ix table{font-size:9pt}
  .ix td{padding:4pt 6pt}
  .ix .area{background:${C.slate900};color:#fff;font-family:Inter,sans-serif;font-weight:600;font-size:9pt;letter-spacing:.06em}
  .ix .area td{border-color:${C.slate900};padding:5pt 6pt}
  .ix .pg{text-align:right;width:44pt;color:${C.sky600};font-family:Inter,sans-serif;font-weight:600}
  .ix .code{width:46pt;font-family:Inter,sans-serif;font-weight:600;color:${C.slate900}}
  .ix .fmt{width:74pt;font-size:8pt;color:${C.slate600}}
  .gx{margin-top:14pt}
  .gx a{color:${C.sky600};text-decoration:none}
  .gx td{font-size:8.5pt}`;
  let rows = '';
  for (const a of AREA_ORDER) {
    const list = entries.filter(e => e.area === a);
    if (!list.length) continue;
    rows += `<tr class="area"><td colspan="4">AREA ${a} · ${esc(AREA_NAMES[a]).toUpperCase()}</td></tr>`;
    for (const e of list) {
      const pg = pageOf[e.id] ? String(pageOf[e.id]) : '—';
      rows += `<tr><td class="code">${esc(e.id)}</td><td>${esc(e.title)}</td><td class="fmt">${esc(e.fmtLabel)}</td><td class="pg">${pg}</td></tr>`;
    }
  }
  let gx = '';
  if (googleLinks.length) {
    gx = `<div class="gx"><h2>File Google (aprire e duplicare)</h2><table class="gx"><thead><tr><th>Elemento</th><th>File</th><th>Copia</th></tr></thead><tbody>` +
      googleLinks.map(g => `<tr><td class="code">${esc(g.id)}</td><td><a href="${esc(g.url)}">${esc(g.name)}</a></td><td><a href="${esc(g.copy)}">/copy</a></td></tr>`).join('') +
      `</tbody></table></div>`;
  }
  const body = `<div class="ix"><h1>Indice</h1><p class="lead">I numeri di pagina rimandano alle sezioni di questo documento. I file Google si aprono dal link e si duplicano nel proprio Drive con il link /copy.</p>
  <table><tbody>${rows}</tbody></table>${gx}</div>`;
  return docHtml('Indice — Kit Base', css, body);
}

// ---------- stampa ----------
async function printPdf(browser, html, size) {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');
  const s = SIZES[size] || SIZES.A4;
  const opts = { printBackground: true, preferCSSPageSize: true };
  if (size === 'square' || size === 'story') { opts.width = s.width; opts.height = s.height; opts.margin = { top: 0, bottom: 0, left: 0, right: 0 }; opts.preferCSSPageSize = false; }
  const buf = await page.pdf(opts);
  await page.close();
  return buf;
}

// ---------- main ----------
async function main() {
  const have = await ensureFonts();
  console.log('font disponibili: ' + Object.keys(have).length + '/5');

  const files = fs.readdirSync(CONTENT).filter(f => /^KB\d+\.mjs$/.test(f)).sort();
  const mods = [];
  for (const f of files) {
    const m = (await import(pathToFileURL(path.join(CONTENT, f)).href)).default;
    mods.push(m);
  }
  mods.sort((a, b) => (AREA_ORDER.indexOf(a.area) - AREA_ORDER.indexOf(b.area)) || (parseInt(a.id.slice(2)) - parseInt(b.id.slice(2))));
  console.log(`moduli caricati: ${mods.length}`);

  const isGoogle = (m) => ['gdocs', 'gslides', 'gsheets'].includes(m.format);
  const sections = mods.filter(m => INCLUDE_GOOGLE || !isGoogle(m));
  const googleMods = mods.filter(isGoogle);

  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--font-render-hinting=none'] });

  // pass 1: sezioni
  const printed = [];
  for (const m of sections) {
    let buf = await printPdf(browser, elementHtml(m, have), m.size || 'A4');
    let doc = await PDFDocument.load(buf);
    let usedZoom = 1;
    // le sezioni stampabili hanno un numero di pagine vincolante: auto-fit
    if (m.format === 'print' && m.pages) {
      for (const z of [0.96, 0.92, 0.88, 0.84, 0.8]) {
        if (doc.getPageCount() <= m.pages) break;
        buf = await printPdf(browser, elementHtml(m, have, z), m.size || 'A4');
        doc = await PDFDocument.load(buf);
        usedZoom = z;
      }
    }
    printed.push({ mod: m, bytes: buf, pages: doc.getPageCount(), zoom: usedZoom });
    console.log(`  ${m.id} (${m.format}, ${m.size || 'A4'}): ${doc.getPageCount()} pg${m.pages ? ' / target ' + m.pages : ''}${usedZoom !== 1 ? ' · fit ' + usedZoom : ''}, ${elementWords(m)} parole`);
  }

  // indice: prima passata per contarne le pagine
  const linksPath = path.join(REPO, 'docs', 'kit-base', 'google-links.json');
  const googleLinks = fs.existsSync(linksPath) ? JSON.parse(fs.readFileSync(linksPath, 'utf8')) : [];
  const entries = mods.map(m => ({ id: m.id, area: m.area, title: m.title, fmtLabel: isGoogle(m) ? 'File Google' : (m.printable ? `PDF ${m.size}` : 'Testo') }));
  const idxProbe = await printPdf(browser, indexHtml(have, entries, googleLinks, {}), 'A4');
  const idxPages = (await PDFDocument.load(idxProbe)).getPageCount();

  // offset reali (copertina=1, indice=idxPages)
  const pageOf = {};
  let cursor = 1 + idxPages;
  for (const p of printed) { pageOf[p.mod.id] = cursor + 1; cursor += p.pages; }

  const idxFinal = await printPdf(browser, indexHtml(have, entries, googleLinks, pageOf), 'A4');
  const cover = await printPdf(browser, coverHtml(have), 'A4');
  await browser.close();

  // merge
  const master = await PDFDocument.create();
  const addBytes = async (bytes) => {
    const d = await PDFDocument.load(bytes);
    const pages = await master.copyPages(d, d.getPageIndices());
    pages.forEach(p => master.addPage(p));
    return pages.length;
  };
  await addBytes(cover);
  const idxStart = master.getPageCount();
  await addBytes(idxFinal);
  const sectionStart = {};
  for (const p of printed) { sectionStart[p.mod.id] = master.getPageCount(); await addBytes(p.bytes); }

  // piè di pagina globale
  const font = await master.embedFont(StandardFonts.Helvetica);
  const total = master.getPageCount();
  master.getPages().forEach((pg, i) => {
    if (i === 0) return;
    const { width, height } = pg.getSize();
    const small = width < 400;
    pg.drawText('Kit Base · [NOME STUDIO]', { x: small ? 10 : 40, y: small ? 8 : 20, size: small ? 5.5 : 7, font, color: rgb(0.28, 0.33, 0.41) });
    pg.drawText(`${i + 1} / ${total}`, { x: width - (small ? 30 : 62), y: small ? 8 : 20, size: small ? 5.5 : 7, font, color: rgb(0.28, 0.33, 0.41) });
  });

  // link interni dall'indice + link esterni ai file Google
  const ctx = master.context;
  const addLink = (pageIdx, rect, target) => {
    const pg = master.getPage(pageIdx);
    const annot = ctx.obj({
      Type: 'Annot', Subtype: 'Link', Rect: rect, Border: [0, 0, 0],
      A: target,
    });
    const ref = ctx.register(annot);
    let annots = pg.node.lookup(PDFName.of('Annots'));
    if (!(annots instanceof PDFArray)) { annots = ctx.obj([]); pg.node.set(PDFName.of('Annots'), annots); }
    annots.push(ref);
  };
  // link interni dall'indice: posizioni misurate sul PDF reale con pdfjs
  const preBytes = await master.save();
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const parsed = await pdfjs.getDocument({ data: new Uint8Array(preBytes), useSystemFonts: true }).promise;
  const rowPos = {};
  for (let p = idxStart; p < idxStart + idxPages; p++) {
    const pg = await parsed.getPage(p + 1);
    const tc = await pg.getTextContent();
    for (const it of tc.items) {
      const s = String(it.str || '').trim();
      if (/^KB\d{2}$/.test(s) && !rowPos[s]) rowPos[s] = { page: p, x: it.transform[4], y: it.transform[5], w: it.width || 30 };
    }
  }
  let linked = 0;
  for (const e of entries) {
    const pos = rowPos[e.id];
    const target = sectionStart[e.id] !== undefined ? master.getPage(sectionStart[e.id]).ref : null;
    if (!pos || !target) continue;
    addLink(pos.page, [36, pos.y - 3, 559, pos.y + 10], ctx.obj({ Type: 'Action', S: 'GoTo', D: [target, 'XYZ', null, null, null] }));
    linked++;
  }
  // I link esterni ai file Google sono già generati da Chrome dagli <a href> dell'indice:
  // non si duplicano con annotazioni manuali.
  console.log(`link interni: ${linked} · link esterni: ${googleLinks.length * 2} (anchor HTML)`);

  master.setTitle('Kit Base — Marketing dentisti');
  master.setAuthor('Marketing dentisti');
  master.setSubject('29 elementi in 8 aree operative per studi odontoiatrici');
  const bytes = await master.save();
  fs.writeFileSync(OUT, bytes);

  const report = {
    generatedAt: new Date().toISOString(),
    totalPages: total,
    includeGoogle: INCLUDE_GOOGLE,
    indexPages: idxPages,
    sections: printed.map(p => ({ id: p.mod.id, title: p.mod.title, format: p.mod.format, size: p.mod.size || 'A4', pages: p.pages, startPage: sectionStart[p.mod.id] + 1, endPage: sectionStart[p.mod.id] + p.pages, words: elementWords(p.mod), noteBox: p.mod.noteBox?.kind || null, footerLine: p.mod.footerLine || null })),
    googleElements: googleMods.map(m => ({ id: m.id, title: m.title, format: m.format, words: elementWords(m), noteBox: m.noteBox?.kind || null, footerLine: m.footerLine || null })),
    noteBoxCount: mods.filter(m => m.noteBox).length,
    footerLineCount: mods.filter(m => m.footerLine).length,
  };
  fs.writeFileSync(path.join(HERE, 'build-report.json'), JSON.stringify(report, null, 2));
  console.log(`\nMASTER: ${OUT} — ${total} pagine, ${(bytes.length / 1024).toFixed(0)} KB`);
  console.log(`note-box: ${report.noteBoxCount} · footer-line: ${report.footerLineCount}`);
}

export { elementHtml, coverHtml, indexHtml, ensureFonts, elementWords, SIZES, C, FOOTERLINE, NOTEBOX, esc, inline, AREA_ORDER, AREA_NAMES };

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(e => { console.error('BUILD FALLITO:', e); process.exit(1); });
}
