# DESIGN-SYSTEM — Kit Base

## Palette (unica, su tutti gli elementi)
| Ruolo | Hex | Uso |
|---|---|---|
| slate-900 | `#0f172a` | titoli, testo forte, copertina |
| slate-600 | `#475569` | testo corrente, didascalie |
| slate-300 | `#cbd5e1` | bordi, regole, separatori |
| slate-100 | `#f1f5f9` | fondi di tabella, box neutri |
| sky-600 | `#0284c7` | accento, link, numeri di step, badge |
| sky-50 | `#f0f9ff` | fondi box informativi, note |
| bianco | `#ffffff` | fondo pagina |

Nessun altro colore. Niente gradienti. Niente ombre pesanti. Verde/rosso/ambra ammessi **solo** come semantica di stato nelle tabelle (urgenza, esito), in versione tenue.

## Tipografia
- Font: **Inter** per titoli e interfaccia, **Source Sans 3** per il testo corrente. Entrambi SIL Open Font License. Fallback di sistema: `-apple-system, "Segoe UI", Roboto, sans-serif`.
- I font sono scaricati localmente (OFL) e embeddati nel PDF: nessuna chiamata a CDN in stampa.
- Scala (pt, stampa): H1 26 · H2 17 · H3 13 · corpo 10.5 · didascalia 8.5 · footer 7.5.
- Interlinea corpo 1.55. Paragrafi spaziati 8pt. Nessun rientro.
- Titoli sempre in slate-900, mai in sky. Sky solo per accenti piccoli.

## Spaziatura e gabbia
- Margini A4: 20mm sopra/sotto, 18mm lati. A5: 14mm. A6: 10mm.
- Spazio tra sezioni: 18pt. Tra blocchi: 10pt.
- Larghezza massima del testo: 165mm su A4 (leggibilità).
- Nessun elemento decorativo che non porti informazione.

## Layout ricorrenti
- **Copertina**: fondo slate-900, titolo bianco, sottotitolo sky-50, badge "29 elementi · 8 aree", piè di pagina con `[NOME STUDIO]` e anno. Nessun logo inventato: `[LOGO]` come riquadro segnaposto.
- **Indice**: due colonne, numero elemento + titolo + pagina. Voci cliccabili (link interni). Sezione finale "File Google" con link esterni.
- **Apertura modulo**: codice elemento (KBxx) in sky-600, titolo H1, riga "Cos'è" in slate-600, poi "Come si usa".
- **Box script**: fondo sky-50, bordo sinistro 3pt sky-600, etichetta del parlante in maiuscolo 8pt.
- **Tabella**: intestazione slate-100, righe alternate bianco/slate-100, bordo slate-300 0.5pt.
- **Nota**: fondo sky-50, titolo 9pt sky-600, corpo 9.5pt.
- **Disclaimer**: fondo slate-100, bordo slate-300, testo 8.5pt slate-600, corsivo.

## Marker STAMPABILE
Ogni sezione pensata per la stampa riporta in testa un badge `STAMPABILE` (bordo sky-600, testo sky-600, 8pt) e il formato reale della pagina (A4/A5/A6). Le pagine stampabili sono generate al loro formato e mergeate nel master senza ridimensionamento.

## Formati social
- Post e copertine highlights: **1080×1080**.
- Storie: **1080×1920**.
- Highlights: area sicura circolare centrale (diametro 720px), nessun testo fuori dal cerchio.
- Griglia: margine interno 96px. Titolo 72–96px, corpo 40–48px, footer 28px.
- Placeholder brand: `[LOGO]` in alto a sinistra (riquadro 120×120), `[NOME STUDIO]` nel footer.
- Palette identica su KB37, KB38, KB46, KB61: slate-900 fondo o bianco fondo, sky-600 accento. Mai variare tra i quattro.

## Icone e illustrazioni
- Icone: **Lucide** (licenza ISC), tratteggio 2px, colore slate-600 o sky-600.
- Illustrazioni: vettoriali originali disegnate per il kit (diagrammi di flusso, schemi agenda, line-art per bambini) oppure open-license con attribuzione.
- **Vietato**: asset copiati da template a pagamento, screenshot di prodotti proprietari, foto stock con watermark.
- I diagrammi (KB11, KB25, KB27, KB49) sono SVG originali generati dal build, non immagini raster.

## PDF
- Pipeline HTML → PDF con print CSS (`@page`, `page-break-*`), poi merge con pdf-lib.
- Ogni sezione stampabile mantiene il proprio MediaBox.
- Indice con link interni (`/Dest`) e link esterni (`/URI`) ai file Google.
- Nessun orfano/widow: `orphans: 3; widows: 3`.
