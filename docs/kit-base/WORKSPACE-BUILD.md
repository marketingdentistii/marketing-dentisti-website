# WORKSPACE-BUILD — Kit Base

## Destinazione Google
- Account: `marketingdentisti.it@gmail.com`
- Cartella Drive: **`Kit Base — Marketing dentisti`** (creata se assente, nella root del Drive dell'account).
- Naming file: `KB-xx Titolo` (es. `KB-04 Anagrafica paziente e consensi`). Il codice a due cifre con zero iniziale.
- Condivisione: **chiunque abbia il link = viewer** (`type: anyone`, `role: reader`, `allowFileDiscovery: false`).
- Per ogni file generare il link `/copy` (sostituzione di `/edit` o `/view` finale) così il cliente duplica nel proprio Drive senza toccare l'originale.
- Ogni link (originale + `/copy`) va registrato in `docs/kit-base/LINKS.md`.

## API
- Drive v3: `files.create` (con `parents`), `permissions.create`, `files.get`.
- Docs v1: `documents.create` + `documents.batchUpdate` (insertText, insertTable, richieste di stile).
- Slides v1: `presentations.create` + `presentations.batchUpdate` (createSlide, insertText, createShape, updatePageProperties per i formati 1080×1080 / 1080×1920 / A5 / A6).
- Sheets v4: `spreadsheets.create` + `spreadsheets.batchUpdate` (addSheet, updateCells, addConditionalFormatRule, setDataValidation).
- OAuth: client installato, scope `drive`, `documents`, `presentations`, `spreadsheets`, `access_type=offline`. Il refresh token è usato una-tantum per il batch e non viene scritto nel repo.

## Verifica per ogni file (Fase 4)
1. `files.get` → 200, `mimeType` corretto, `parents` contiene la cartella brand.
2. `permissions.list` → presente `anyone/reader`.
3. Link `/copy` registrato in LINKS.md.
4. Contenuto: nessun `{{`, nessun lorem/TODO, placeholder `[NOME STUDIO]` coerenti.

## Pipeline PDF master
1. I contenuti vivono in `docs/kit-base/content/KBxx.mjs` (schema in CONTENT-SCHEMA.md).
2. `tools/kit-base/build.mjs` renderizza ogni elemento in HTML con print CSS.
3. Chrome headless (puppeteer-core, eseguibile locale) stampa ogni sezione al proprio formato.
4. `pdf-lib` mergea nell'ordine: copertina → indice → sezioni nell'ordine delle aree A→H.
5. L'indice riceve i numeri di pagina reali dopo il merge e i link interni/esterni.
6. Output: `public/kit-base-master.pdf`, servito da `/api/pdf/kit-base`.

## Toolchain
- `tools/kit-base/` ha un proprio `package.json` (puppeteer-core, pdf-lib). Non entra nel build di Next.js né di Cloudflare Pages.
- Chrome locale: `C:\Program Files\Google\Chrome\Application\chrome.exe`.
- Font Inter e Source Sans 3 (OFL) scaricati in `tools/kit-base/fonts/` e embeddati.

## Repo e deploy
- Branch di lavoro: `kit-base-master`, base `origin/main`.
- Il master PDF è committato in `public/kit-base-master.pdf`.
- `/api/pdf/kit-base` legge il file dal filesystem a build time e lo serve (runtime edge, niente fetch esterno).
- Deploy: push su `main` → Cloudflare Pages build automatico.
