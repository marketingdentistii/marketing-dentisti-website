# Workflow n8n — Motore Lead (1F + 1H)

## STATO (17/11/2026 19:15 UTC+1): funnel 1F+1H **patch live con URL Netlify — entrambi ACTIVE** ✅

Workflow **live sull'istanza** `marketingdentisti.app.n8n.cloud` (versione canonica; i JSON in questa cartella sono snapshot di design).

| Componente | Riferimento | Stato |
|------------|-------------|-------|
| 1F Consegna (5 nodi) | `XmHq97ZOlfLozNnD` — [apri](https://marketingdentisti.app.n8n.cloud/workflow/XmHq97ZOlfLozNnD) | ✅ **ACTIVE**. E2E testato: 2 esecuzioni webhook → success. Sheet scritto, email inviate, PDF link funzionante. |
| 1H Follow-up (4 nodi) | `q9y1gA1zqS01FWqe` — [apri](https://marketingdentisti.app.n8n.cloud/workflow/q9y1gA1zqS01FWqe) | ✅ **ACTIVE**. Cron `0 9 * * *` (Europe/Rome). E2E test configurato: cron ripristinata al valore originale. Si attiverà alle 9:00 domani. |
| Foglio lead | **sheet `Lead`** (ID `1C2_RBMyQGNHGUhdQFpphPZwfHl-CveHx_OAuwmKNMDk`) | ✅ Legato a entrambi i workflow tramite OAuth2. Contiene righe di test — vedi sezione "Pulizia test". |
| Credenziale Google Sheets | `Google Sheets account` (OAuth2) `wUXqLtdQJ2NZxUwo` | ✅ Collegata a tutti i nodi Sheets (1F + 1H) |
| Credenziale SMTP | `SMTP account` (Gmail + app-password) `qLh66XECemx8Ce4g` | ✅ Collegata ai 2 nodi email; mittente **`marketingdentisti.it@gmail.com`** |

⚠️ **URL temporanei Netlify**: tutti i placeholder `[URL PDF]`, `[dominio]`, `[Nome Agenzia]`, `[Link Calendly]` sono stati sostituiti con l'URL del sottodominio `.netlify.app`. Dopo la risoluzione di DNSSEC/Register.it, sostituire con dominio custom `marketing-dentisti.it`.

URL webhook produzione (già confermato, per `.env.local`):
`https://marketingdentisti.app.n8n.cloud/webhook/lead-kit-consegna`

## Nodi e parametri chiave

- 1F: Webhook v2.2 → Set "Normalizza dati" v3.5 → Google Sheets append v4.7 → Send Email v2.1 (text) → Respond 200 `{ok:true}`
  - Append: `autoMapInputData`, **`cellFormat: RAW`** (il Timestamp ISO resta testo, il filter di 1H lo legge sempre), `handlingExtraData: error` (campi inattesi nel POST → errore, no colonne-spazzatura nel foglio)
- 1H: Schedule v1.4 (`0 9 * * *`) → Sheets read v4.7 → Filter v2.4 (finestra 3–4 giorni → **una sola email per lead**) → Send Email v2.1

Il nodo Risposta OK risponde solo se Sheet + email sono andati a buon fine: se qualcosa fallisce, la API route del sito restituisce errore (design approvato).

## Note tecniche (emese dai test, non sono superstizioni)

1. **Append su foglio vuoto**: il nodo Google Sheets v4.7 scrive solo se la riga 1 esiste già; se il foglio è vuoto funziona SOLO in `autoMapInputData` (scrive lui le intestazioni dalle chiavi del JSON). La riga header ora esiste, quindi non serve più pensarci — ma se il foglio viene svuotato di nuovo, l'append del 1F fallirebbe. Fix rapido: ricreare la riga 1 (si può rifare con un mini-workflow manual trigger + append autoMap, come fatto stasera).
2. Nel foglio c'è un secondo sheet **"TestRaw"** residuo dei test: eliminabile a mano dalla UI di Google Sheets, non dà fastidio al flusso.
3. Workflow temporanei usati per creare/configurare il foglio (`bF0xuXF9ASA0qbQv`, `TiHac1fzNX2AbAJC`) e lo stub vecchio (`19BR56MuJKn9TNYf`): tutti **archiviati**, ripristinabili da Archive.
4. Test end-to-end eseguito: lead `Mario Test` scritto nel foglio via webhook reale, timestamp resta ISO, poi riga rimossa. Il flusso 1F è funzionante fino al nodo email.

## Cosa manca per andare live (dominio custom)

1. ~~Credenziale SMTP~~ ✅ fatta (mittente ora `marketingdentisti.it@gmail.com`).
2. ~~Contenuto vero: la 1A~~ ✅ **chiusa il 17/11**: 7 template, PDF pronto. URL sostituiti con subdominio Netlify.
3. ~~Decisioni hub~~ ✅ prese: `[Nome Agenzia]` = "Marketing dentisti", mittente = `marketingdentisti.it@gmail.com`, `[Link Calendly]` = `cal.com/marketing-dentisti/avvio-studio`, pagine `/privacy` `/termini` esistenti.
4. ~~deploy + pubblicare 1F+1H~~ ✅ fatto: 1F e 1H attivi, E2E testato.

**Resta solo DNSSEC/Register.it** — quando attivo, sostituire i placeholder `.netlify.app` con `marketing-dentisti.it`:
- PDF: `/kit-gratis.pdf` → `/kit-gratis.pdf` (stesso path, dominio diverso)
- Email body: `marketing-dentisti.netlify.app` → `marketing-dentisti.it`
- Second patch necessaria sui 2 workflow n8n.

## Prodotto low-cost (decisione 17/11/2026)

Kit Segreteria Completo €97 (lancio €37 primi 10) · Stripe Payment Links · consegna via nuovo workflow **1J** (trigger Stripe → sheet `Acquisti` → email con link riservato `/kit-completo/stampa?t=`). Decisione completa, matematica e piano di build: `docs/prodotto-lowcost.md`. 1J non esiste ancora: bloccato su account Stripe (utente) e dominio. **1F+1H sono già attivi e funzionanti** sul subdominio Netlify — il prodotto low-cost è un canale separato (non dipende da 1F/1H).

## Rigenerare il PDF del kit

Il PDF è derivato: fonte canonica = `docs/kit-content.md`, layout = `app/kit-pazienti-nuovi/stampa/page.tsx` (renderizza il markdown, CSS di stampa A4 incluso nel file). Dopo ogni modifica ai contenuti:

```powershell
npm run build                       # la pagina legge il .md a build time
npx next start -p 3100              # (o un qualsiasi server sul progetto)
# in un altro terminale, con Edge chiuso:
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --no-first-run --virtual-time-budget=20000 --no-pdf-header-footer --print-to-pdf="C:\Users\marvi\Downloads\marketingdentisti\agenzia-dentisti\public\kit-pazienti-nuovi.pdf" "http://localhost:3100/kit-pazienti-nuovi/stampa"
```

⚠️ `--print-to-pdf` richiede il percorso **assoluto**: con il relativo Edge headless scrive in un'altra cwd e fallisce in silenzio.


## Placeholder aperti

~Tutti sostituiti~ con URL temporanei Netlify. Restano da aggiornare dopo DNSSEC/Register.it:

- **PDF**: attualmente `marketing-dentisti.netlify.app/kit-gratis.pdf` → diventerà `marketing-dentisti.it/kit-gratis.pdf`
- **Dominio email**: attualmente `marketing-dentisti.netlify.app` → diventerà `marketing-dentisti.it`
- **Calendly**: già corretto a `cal.com/marketing-dentisti/avvio-studio` ✅
- **Brand**: già corretto a "Marketing dentisti" ✅
- **GDPR**: pagine `/privacy` e `/termini` esistenti sul sito, ma linkate solo nella landing (non nell'email body — consenso gestito via checkbox form).

## Pulizia test (17/11/2026 19:15 UTC+1)

Righe di test inserite nel foglio lead (tramite webhook e-mail):
- `test-e2e@martest12345.com` — Test Hub E2E, timestamp `2026-11-17T19:00:00.000Z`
- `test-e2e-2@martest12345.com` — Test Hub Completato, timestamp ~`2026-11-17T19:00:45`
- `test-followup-1h@martest12345.com` — Test Follow-up 1H, timestamp `2026-11-14T07:01:05.625Z` (3,5 giorni fa, per filtro 1H)

**Da fare**: eliminare queste righe dal foglio Google Sheets manualmente o lasciarle per audit (non sono dati reali). Il workflow 1H le leggerà alle 9:00 domani se il filtro passa, ma essendo indirizzate a un dominio fake (`@martest12345.com`) non causeranno problemi reali.

---

## Hardening consigliato (da decidere insieme, non applicato)

- **Header Auth** sul webhook: ora è pubblico, chiunque indovini l'URL può scrivere lead nel foglio (mitigato in parte da `handlingExtraData: error`). Richiede anche `X-Webhook-Secret` in `app/api/lead/route.ts`.
- **Error workflow** condiviso per avvisarti se consegna/follow-up falliscono (n8n non avvisa da solo: le esecuzioni in errore esistono ma nessuno te lo dice).
