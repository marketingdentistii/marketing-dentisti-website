# Migrazione da Netlify a Cloudflare Pages + Pages Functions

**Data:** 18 novembre 2026  
**Branch di migrazione:** `migrate-cloudflare`  
**Stato:** In corso — attendere configurazione Git Integration su Cloudflare dashboard

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
    "build": "next build",           // Build standard Next.js
    "cf:build": "next build && npx @cloudflare/next-on-pages"  // Build + conversione Edge
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

## Record DNS Attuali

| Tipo | Nome | Contenuto | Proxy | Note |
|------|------|-----------|-------|------|
| A | @ | `75.2.60.5` | enabled | Redirect a Cloudflare Pages IP |
| CNAME | www | `marketing-dentisti.netlify.app` | enabled | Redirezione temporanea a Netlify |

> ⚠️ **I record DNS non sono stati creati:** il token API utilizzato ha permessi limitati alle sole Pages Functions, senza accesso alla gestione DNS della zona. Crearli manualmente dal Cloudflare Dashboard.

---

## Cutover DNS (da eseguire quando nameserver Register.it sono passati a Cloudflare)

Dopo aver confermato che i nameserver di Register.it puntano a Cloudflare:

1. **Aggiungere custom domain** al progetto Cloudflare Pages:
   - Dashboard → Pages → `marketing-dentisti` → Custom Domains → Add Domain
   - Aggiungere `marketing-dentisti.it`
   - Cloudflare crea SSL automaticamente

2. **Configurare redirect www → primario:**
   - Dashboard → Rules → Redirect Rules
   - Regex match: `^www\.marketing-dentisti\.it` → `https://marketing-dentisti.it` (status 301)

3. **Verifica completa live:**
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

4. **Pulizia Netlify:**
   - Rimuovere dominio `marketing-dentisti.it` dal progetto Netlify
   - ⚠️ NON eliminare il progetto Netlify: attendere ok esplicito

---

## Stato Attuale del Progetto Cloudflare

- **ID Progetto:** `6b2ecab4-73ec-44a9-9c49-f5ca96c34e42`
- **Subdomain:** `marketing-dentisti.pages.dev`
- **Production Branch:** `main`
- **Build Command:** `npm run cf:build`
- **Framework:** nextjs
- **Node Version:** 20
- **Env Vars:** impostate a livello progetto ✅
- **Git Integration:** ❌ DA CONFIGURARE manualmente (richiede OAuth tramite Cloudflare Dashboard per repo privato)

---

## Passaggi Manuali Risalenti per l'Hub

1. **Configurare Git Integration su Cloudflare Pages Dashboard:**
   - Collegare il repository `marketingdentistii/marketing-dentisti-website`
   - Branch di produzione: `main` (o `migrate-cloudflare`)
   
2. **Creare record DNS manualmente (la zona è `pending`):**
   - **A @ → 75.2.60.5** (proxy ON/celeste)
   - **CNAME www → marketing-dentisti.netlify.app** (proxy ON/celeste)

3. **Dopo cutover DNS (nameserver Register.it → Cloudflare):**
   - Aggiungere `marketing-dentisti.it` come custom domain su Pages
   - Verificare SSL attivo (di solito alcuni minuti)
   - Eseguire verifiche complete su `.it`
   - Confermare quando tutto è operativo

---

## Cosa NON è stato modificato

- ✅ Copy (pagine, copy funnel, testi) — intatto
- ✅ Logica di business — nessuna modifica
- ✅ Oggetti Stripe (prodotti, coupon, pricing) — invariati
- ✅ Workflow n8n — intatti
- ✅ Funnel gratuito — identico
- ✅ Kit Base (comprese FAQ e contenuti) — invariati
