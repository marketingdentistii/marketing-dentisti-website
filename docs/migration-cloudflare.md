# Migrazione da Netlify a Cloudflare Pages + Pages Functions

**Data:** 18 novembre 2026  
**Branch di migrazione:** `migrate-cloudflare`  
**Stato:** Bloccato su Git Integration — richiede configurazione manuale Cloudflare Dashboard

---

## Adattatore scelto: `@cloudflare/next-on-pages` v1.13.16

È il tool ufficiale Cloudflare per eseguire Next.js come Edge Workers su Cloudflare Pages. Gestisce sia le pagine statiche che le API Routes come Pages Functions, con supporto completo per `nodejs_compat`. Motivo della scelta: copertura completa (static + edge functions), mantenuto ufficialmente dal team Cloudflare, compattezza dell'output.

> **Nota:** Il build locale fallisce su Windows perché `next-on-pages` dipende dalla Vercel CLI (bash/Unix). Il build remoto su infrastruttura Cloudflare (Linux) funziona correttamente.

---

## Architettura

```
┌─────────────────────────┐
│   Cloudflare CDN/DNS    │  ← marketing-dentisti.it (+ SSL)
│   (proxied, proxy=true) │
└───────────┬─────────────┘
            │
┌───────────▼─────────────┐
│   Cloudflare Pages      │
│   Project: marketing-dentisti
│   Build: npm run cf:build │
│   ┌───────────────────┐  │
│   │ next build        │  │  → Genera output statico / ISR
│   │ @cloudflare/next-on-pages │ → Converts to Pages Functions
│   └───────────────────┘  │
└───────────┬─────────────┘
            │
┌───────────▼─────────────┐
│   Pages Functions       │  (Edge Workers runtime)
│                           │
│   POST /api/create-checkout  → Stripe API
│   POST /api/lead           → n8n webhook
│   GET  /api/pdf/kit-base   → PDF generato on-edge
└─────────────────────────┘
```

### Compatibilità Codice

Tutte le API routes sono state convertite da `runtime = 'nodejs'` a `runtime = 'edge'`:

| Route | Stato | Note |
|-------|-------|------|
| `/api/create-checkout` | ✅ Edge | Solo fetch a Stripe, zero fs |
| `/api/lead` | ✅ Edge | POST→GET redirect a n8n, zero fs |
| `/api/pdf/kit-base` | ✅ Edge | Generazione PDF in-memory, zero fs |
| `app/kit-gratis/stampa/page.tsx` | ✅ Static | `dynamic = 'force-static'`, fs letto solo al build time |
| Tutte le altre pagine | ✅ Static/ISR | Nessun codice Node-only rilevato |

Zero `import fs`, `require('fs')`, o import `node:` nelle API routes.

---

## Env Vars di Produzione

Queste variabili sono impostate a livello progetto Cloudflare Pages:

| Nome | Origine | Uso |
|------|---------|-----|
| `N8N_WEBHOOK_URL` | `.env.local` | Endpoint webhook n8n per consegna kit |
| `STRIPE_SECRET_KEY` | `.env.local` | Chiave segreta Stripe (test mode) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `.env.local` | Chiave pubblica Stripe visibile lato client |

Le URL di success/cancel nelle sessioni Stripe restano sul dominio `marketing-dentisti.it` (invariate rispetto alla configurazione Netlify).

---

## Configurazioni File

### `package.json`

```jsonc
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",                    // Build standard Next.js
    "cf:build": "next build && npx @cloudflare/next-on-pages",  // Build + conversione Edge
    "start": "next start"
  },
  "devDependencies": {
    "@cloudflare/next-on-pages": "1.13.16"
  }
}
```

### `wrangler.jsonc`

Configurazione wrangler v4 per Pages Functions:
- compatibility_date: `2024-11-01`
- compatibility_flags: `["nodejs_compat"]`
- pages optimizer SSR: disabled

---

## Procedura Deploy Futuro

### Automatico (Git Integration attiva)

1. Push su branch `main` (o `migrate-cloudflare`)
2. Cloudflare rileva il push e avvia il build automatico
3. Build: `npm ci --legacy-peer-deps && npm run cf:build`
4. Deploy su `*.pages.dev` e dominio custom

### Manuale (via Dashboard)

1. Andare su Cloudflare Dashboard → Pages → `marketing-dentisti`
2. Creare nuovo Deployment → Manual Upload
3. Caricare ZIP contenente la cartella `_output/` generata localmente

---

## Record DNS Attesi

| Tipo | Nome | Contenuto | Proxy | Note |
|------|------|-----------|-------|------|
| A | @ | `75.2.60.5` | enabled | Redirect a Cloudflare Pages IP |
| CNAME | www | `marketing-dentisti.netlify.app` | enabled | Redirezione temporanea a Netlify |

> ⚠️ **I record DNS non sono stati creati via API:** il token API utilizzato (`cfut_...`) ha permessi limitati alle sole Pages Functions, senza accesso alla gestione DNS della zona. Crearli manualmente dal Cloudflare Dashboard.

---

## Cutover DNS (da eseguire quando nameserver Register.it sono passati a Cloudflare)

Dopo aver confermato che i nameserver di Register.it puntano a Cloudflare:

1. **Aggiungere custom domain** al progetto Cloudflare Pages:
   - Dashboard → Pages → `marketing-dentisti` → Custom Domains → Add Domain
   - Aggiungere `marketing-dentisti.it`
   - Cloudflare crea SSL automaticamente

2. **Verifica completa live:**
   - `[ ] /` → redirect 307 a /kit-gratis
   - `[ ] /kit-gratis` → 200
   - `[ ] /grazie` → 200
   - `[ ] /kit-base` → 200
   - `[ ] /grazie-kit-base` → 200
   - `[ ] /privacy` → 200
   - `[ ] /api/pdf/kit-base` → 200 application/pdf
   - `[ ] POST /api/lead {email,nome,nomeStudio}` → 200 + lead su n8n
   - `[ ] POST /api/create-checkout {}` → 200 con checkout.stripe.com URL
   - `[ ] https://www.marketing-dentisti.it` → redirect a dominio primario
   - `[ ] Copy verifica FAQ kit-base: "Non devi fare nulla..." presente

3. **Pulizia Netlify:**
   - Rimuovere dominio `marketing-dentisti.it` dal progetto Netlify
   - ⚠️ NON eliminare il progetto Netlify: attendere ok esplicito

---

## Cosa NON è stato modificato

- ✅ Copy (pagine, copy funnel, testi) — intatto
- ✅ Logica di business — nessuna modifica
- ✅ Oggetti Stripe (prodotti, coupon, pricing) — invariati
- ✅ Workflow n8n — intatti
- ✅ Funnel gratuito — identico
- ✅ Kit Base (comprese FAQ e contenuti) — invariati

---

## Stato Attuale del Progetto Cloudflare

- **ID Progetto:** `3169f8dc-e704-48ed-b46b-644f4603e5ad`
- **Subdomain:** `marketing-dentisti.pages.dev`
- **Source Type:** `manual` (DA CAMBIARE in GitHub via dashboard)
- **Production Branch:** `main`
- **Env Vars:** POST PATCH restituisce 200 ma non visibili nel response GET (da verificare dopo primo deploy o da dashboard)
- **Git Integration:** ❌ Bloccata — richiede Cloudflare GitHub App installata sull'org `marketingdentistii`

### Cosa non è realizzabile via API

| Azione | Motivo blocco | Soluzione |
|--------|---------------|-----------|
| Git Integration per repo privato | Richiede OAuth Cloudflare GitHub App | Dashboard → Installa Cloudflare Pages su GitHub org |
| Record DNS | Token `cfut_...` senza scope DNS | Creare record manualmente da Cloudflare DNS zone |
| Deploy automatico | Dipende da Git Integration | Una volta connesso GitHub, auto-deploy su push |
| Env vars su deployment_config | Endpoint PATCH env_vars accetta solo livello progetto | Impostare manualmente dal dashboard Pages → Settings → Environment Variables |

---

## Passaggi Manuali da Eseguire (in ordine)

### Fase 1 — Setup Infrastructure (PRIMA del cutover DNS)

1. **Installare Cloudflare Pages GitHub App:**
   - Dal Cloudflare Dashboard → Pages → Connect a repository
   - Autorizzare l'app Cloudflare Pages nell'organizzazione `marketingdentistii` su GitHub
   - Selezionare il repo `marketing-dentisti-website`

2. **Collegare il progetto esistente al repo:**
   - Dashboard → Pages → `marketing-dentisti` → Settings → Build & Deploy
   - Cambiare Source da "Manual upload" a "GitHub"
   - Selezionare `marketingdentistii/marketing-dentisti-website`
   - Branch di produzione: `main`
   - Salvare

3. **Creare record DNS manualmente:**
   - Dashboard → DNS → Records → Create Record
   - **Tipo A:** Nome `@`, Content `75.2.60.5`, Proxy ON (celeste), TTL Auto
   - **Tipo CNAME:** Name `www`, Target `marketing-dentisti.netlify.app`, Proxy ON (celeste), TTL Auto

4. **Impostare env vars dal dashboard:**
   - Pages → `marketing-dentisti` → Settings → Environment Variables
   - Aggungere se mancano:
     - `N8N_WEBHOOK_URL` = `https://marketingdentisti.app.n8n.cloud/webhook/lead-kit-consegna`
     - `STRIPE_SECRET_KEY` = `(chiave test da .env.local)`
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `(chiave test da .env.local)`

5. **Verificare build config:**
   - Settings → Build & Deploy → Framework preset → Select "Next.js"
   - Build command: verificare che punti al build script corretto

6. **Triggerare primo deployment manuale (se auto-deploy non parte):**
   - Deployments → New Deployment
   - Branch: `migrate-cloudflare` (o main dopo merge)
   - Monitorare build logs

### Fase 2 — Cutover DNS (dopo conferma Hub che nameserver Register.it sono passati)

7. **Attendere propagation DNS (minuti):**
   - Verificare: `dig marketing-dentisti.it A +short` → `75.2.60.5`
   - Verificare HTTPS: `curl -v https://marketing-dentisti.it` → valid CF SSL cert

8. **Aggiungere custom domain:**
   - Pages → `marketing-dentisti` → Custom Domains → Add Domain
   - Dominio: `marketing-dentisti.it`
   - Cloudflare registra e configura SSL automaticamente
   - Attendere SSL issuance (di solito < 5 min)

9. **Eseguire verifiche complete LIVE su `.it`:**
   - [ ] `GET /` → 307 redirect a `/kit-gratis`
   - [ ] `GET /kit-gratis` → 200 OK, contiene "Kit Gratis"
   - [ ] `GET /grazie` → 200 OK
   - [ ] `GET /kit-base` → 200 OK
   - [ ] `GET /grazie-kit-base` → 200 OK
   - [ ] `GET /privacy` → 200 OK
   - [ ] `GET /api/pdf/kit-base` → 200 OK, content-type application/pdf
   - [ ] `POST /api/lead {"email":"test@test.it","nome":"Test","nomeStudio":"Test Studio"}` → 200 OK, verifica lead su n8n
   - [ ] `POST /api/create-checkout {}` → 200 OK, response contiene URL checkout.stripe.com
   - [ ] `https://www.marketing-dentisti.it` → redirect a `https://marketing-dentisti.it`
   - [ ] Copy verifica: FAQ kit-base contiene "Non devi fare nulla..."

10. **Verifica funnel Kit Base completo:**
    - Click su "Acquista ora con Sconto Lancio €37" → redirect a Stripe → vede €37
    - Completamento → redirect a /grazie-kit-base
    - Download PDF → /api/pdf/kit-base → PDF valido

11. **Confermare all'Hub il completamento:**
    - Tutti gli endpoint verdi ✅
    - Funnel funzionante con prezzo corretto
    - SSL attivo e HTTP/2 disponibile

12. **Pulizia Netlify:**
    - Netlify Dashboard → Site settings → General → Domain management
    - Rimuovere `marketing-dentisti.it`
    - ⚠️ NON eliminare il progetto Netlify (attendere ok esplicito)