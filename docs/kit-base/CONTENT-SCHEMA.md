# CONTENT-SCHEMA — moduli contenuto Kit Base

Ogni elemento è un modulo ES in `docs/kit-base/content/KBxx.mjs` con `export default { ... }`.
Il build legge questi moduli e produce HTML → PDF. Non scrivere HTML a mano: usa i blocchi.

## Intestazione del modulo
```js
export default {
  id: 'KB06',                 // codice
  area: 'A',                  // A..H
  areaName: 'Segreteria',
  title: 'Paziente difficile: cinque scenari',
  format: 'text',             // text | print | gdocs | gslides | gsheets
  size: 'A4',                 // A4 | A5 | A6 | square | story  (per print e gslides)
  pages: null,                // numero pagine attese per print (vincolante)
  words: 2000,                // target parole per text
  printable: false,           // true → badge STAMPABILE
  noteBox: null,              // null | { kind:'avvio'|'gestione', minutes: 20 }
  footerLine: null,           // null | 'setup' | 'contenuti'   (solo file Google)
  blocks: [ ... ],            // per text | print | gdocs
  slides: [ ... ],            // per gslides
  tabs: [ ... ],              // per gsheets
};
```

## Blocchi (`blocks`)
```js
{ t:'h2', x:'Titolo sezione' }
{ t:'h3', x:'Sotto-titolo' }
{ t:'p',  x:'Paragrafo.' }
{ t:'ul', items:['…','…'] }
{ t:'ol', items:['…','…'] }
{ t:'check', items:['…','…'] }                 // checklist con casella
{ t:'script', label:'Segreteria', lines:['…','…'] }   // box script, una riga = una battuta
{ t:'dialog', lines:[{who:'Paziente', x:'…'},{who:'Segreteria', x:'…'}] }
{ t:'table', head:['…'], rows:[['…']] }
{ t:'kv', items:[['Etichetta','Valore']] }
{ t:'note', kind:'info'|'warn', title:'…', x:'…' }
{ t:'disclaimer', x:'…' }
{ t:'tokens', items:[['[NOME STUDIO]','Il nome dello studio come appare…']] }
{ t:'steps', items:[{n:1,title:'…',x:'…'}] }   // step numerati con titolo
{ t:'pagebreak' }
{ t:'spacer' }

// Diagrammi originali (il build disegna l'SVG, niente immagini esterne)
{ t:'diagram', kind:'steps', title:'…', items:[{label:'1', x:'…'}] }
{ t:'diagram', kind:'timeline', title:'…', items:[{when:'48h', label:'…', x:'…'}] }
{ t:'diagram', kind:'flow', title:'…',
  nodes:[{id:'a', label:'…', kind:'start'|'decision'|'action'|'end'}],
  edges:[{from:'a', to:'b', label:'sì'}] }
```

Regole:
- Il testo è **plain text** con placeholder `[TRA PARENTESI]`. Niente markdown, niente HTML.
- Enfasi: usa `**testo**` solo se indispensabile; il renderer lo converte in `<strong>`.
- Le righe di script sono frasi che si possono dire a voce.
- `pagebreak` forza una nuova pagina (usa con parsimonia, solo nei print).

## Slides (`slides`, per gslides)
```js
{ kind:'cover'|'content'|'card'|'highlight'|'story'|'coloring'|'certificate',
  title:'…', subtitle:'…', body:['…'], badge:'…', footer:'…' }
```
- `square` = 1080×1080, `story` = 1080×1920, `A5`/`A6` = formati carta.
- `highlight`: il testo deve stare nel cerchio centrale (max 2 parole).
- `coloring`: line-art originale descritta in `art` (il build disegna l'SVG).
- Il footer-line upsell è aggiunto dal build in base a `footerLine`, non scriverlo a mano.

## Sheets (`tabs`, per gsheets)
```js
{ name:'Calendario 30 giorni',
  columns:[{key:'data', label:'Data', width:110}, …],
  rows:[[…]],                       // dati di esempio con placeholder
  formulas:[{col:'giorni_attesa', formula:'=IF(F2="","",TODAY()-F2)', from:2, to:200}],
  conditional:[{col:'urgenza', rules:[{value:'alta', bg:'#fee2e2', fg:'#991b1b'}]}],
  instructions:['…'] }
```

## Note-box upsell
`noteBox: { kind:'avvio', minutes:20 }` produce automaticamente:
> Questo modulo richiede ~20 min di configurazione. Preferisce averlo già pronto sul suo studio? È incluso in Avvio Studio.

Non scrivere la note-box a mano nei blocchi. Il build la inserisce in coda al modulo.
Il conteggio finale delle note-box deve essere **esattamente 4**.

## Footer-line
`footerLine:'setup'` → `Versione già configurata sul suo studio: Avvio Studio`
`footerLine:'contenuti'` → `Gestione continuativa: Gestione Totale`
Solo sui file Google. Il build lo aggiunge in fondo al documento/slide deck/foglio.
