# Migrazione da Netlify a Cloudflare Pages + Pages Functions

**Data:** 18 novembre 2026  
**Branch di migrazione:** `migrate-cloudflare`  
**Stato:** Infrastruttura configurata via API — attesa attivazione Git Integration (Dashboard)

---

## Adattatore scelto: `@cloudflare/next-on-pages` v1.13.16

Tool ufficiale Cloudflare per eseguire Next.js come Edge Workers su Cloudflare Pages. Gestisce sia pagine statiche che API Routes come Pages Functions, con supporto `nodejs_compat`. Scelto per: copertura completa static + edge, mantenuto ufficialmente dal team Cloudflare, output compatto.

> **Nota:** Build locale non eseguibie su Windows (dipende da Vercel CLI bash/Unix). Build remoto su infrastruttura Linux di Cloudflare.

---

## Architettura

```
┌─────────────────────────┐
│   Cloudflare CDN/DNS    │  ← marketing-dentisti.it (+ SSL proxy=true)
│   (proxied, DNS record) │
└───────────┬─────────────┘
            │
┌───────────▼─────────────┐
│   Cloudflare Pages      │
│   Project: marketing-dentisti
│   Build: npm ci --legacy-peer-deps && npm run cf:build
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

### Compatibilità Codice Verificata

Tutte le API routes sono state convertite da `runtime = 'nodejs'` a `runtime = 'edge'`:

| Route | Modifica | Stato |
|-------|----------|-------|
| `/api/create-checkout` | `runtime = 'edge'` | ✅ Zero fs, zero node: imports |
| `/api/lead` | — | ✅ Già edge-compatible |
| `/api/pdf/kit-base` | `runtime = 'edge'` | ✅ PDF in-memory, zero fs |
| `app/kit-gratis/stampa/page.tsx` | aggiunto `export const dynamic = 'force-static'` | ✅ fs solo al build-time (Node.js), non al runtime |
| Tutte altre pagine | nessuna modifica | ✅ Nessuno codice Node-only rilevato |

Zero `import fs`, `require('fs')`, o import `node:` nelle API routes.

---

## Env Vars di Produzione (impostate via PATCH project API ✅)

| Nome | Valore (da .env.local) | Uso |
|------|------------------------|-----|
| `N8N_WEBHOOK_URL` | `https://marketingdentisti.app.n8n.cloud/webhook/lead-kit-consegna` | Endpoint webhook n8n consegna kit |
| `STRIPE_SECRET_KEY` | `sk_test_...` (test mode) | Chiave segreta Stripe per checkout |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` (test mode) | Chiave pubblica Stripe lato client |

Le URL success/cancel nelle sessioni Stripe restano sul dominio `marketing-dentisti.it` (invariate).

---

## File Modificati nel Branch `migrate-cloudflare`

| File | Tipo | Descrizione |
|------|------|-------------|
| `app/api/create-checkout/route.ts` | Modificato | `runtime = 'edge'` + protezione esaurimento coupon |
| `app/api/pdf/kit-base/route.ts` | Modificato | `runtime = 'edge'` |
| `app/kit-gratis/stampa/page.tsx` | Modificato | `dynamic = 'force-static'` per bypassare fs al runtime |
| `package.json` | Modificato | Script `cf:build` dedicato per next-on-pages |
| `wrangler.jsonc` | Creato | config wrangler v4 con nodejs_compat flag |
| `docs/migration-cloudflare.md` | Creato | Documentazione completa |
| `test/coupon-exhaustion.test.ts` | Creato | 8 unit test per logica esaurimento coupon |

---

## Procedura Deploy Futuro

### Opzione A: Git Integration Automatica (consigliata)

Una volta attivata la Git Integration da Dashboard Cloudflare:

1. Push su branch `main` (o `migrate-cloudflare`)
2. Cloudflare rileva il push e avvia il build automatico
3. Build command: `npm ci --legacy-peer-deps && npm run cf:build`
4. Output deployato automaticamente su `.pages.dev` + custom domain

### Opzione B: Deploy Manuale (via Dashboard o ZIP)

1. Andare su Cloudflare Dashboard → Pages → `marketing-dentisti`
2. Creare nuovo Deployment → Manual Upload
3. Caricare ZIP contenente la cartella `_output/` generata localmente (da WSL/macOS/Linux)

---

## Record DNS nella Zona Cloudflare

| Tipo | Nome | Contenuto | Proxy | Note |
|------|------|-----------|-------|------|
| A | `@` (`marketing-dentisti.it`) | `75.2.60.5` | ✅ ON | IP Cloudflare Pages CDN |
| CNAME | `www.marketing-dentisti.it` | `marketing-dentisti.netlify.app` | ✅ ON | Redirezione temporanea a Netlify |
| MX | `marketing-dentisti.it` | `mail.register.it` | ❌ OFF | Email Register.it preservata |
| TXT | `marketing-dentisti.it` | `v=spf1 include:spf.webapps.net ~all` | ❌ OFF | SPF email preservato |
| SRV | `_autodiscover._tcp.marketing-dentisti.it` | `10 443 ms-it.securemail.pro` | ❌ OFF | Autodiscover mail preservato |
| CNAME | `autoconfig.marketing-dentisti.it` | `tb-it.securemail.pro` | ✅ ON | Autoconfig mail |
| CNAME | `ftp.marketing-dentisti.it` | `marketing-dentisti.it` | ✅ ON | FTP redirect |

Tutti i record email (MX, TXT, SRV) **intatti e funzionanti**.

---

## Zone Status

- **Status:** `pending`
- **Name Servers Cloudflare:** `rose.ns.cloudflare.com`, `ruben.ns.cloudflare.com`
- **Paused:** No
- **Tipo:** Full zone (complete)

⚠️ I name server Cloudflare sono configurati ma **Register.it non li ha ancora switchati** — questo è un intervento manuale dell'Hub.

---

## Cutover DNS (da eseguire quando nameserver Register.it sono passati a Cloudflare)

Dopo aver confermato che i nameserver di Register.it puntano a `rose.ns.cloudflare.com` e `ruben.ns.cloudflare.com`:

### Checklist

- [ ] **Verificare propagation DNS:**
  - `dig marketing-dentisti.it A +short` → `75.2.60.5`
  - `dig www.marketing-dentisti.it CNAME +short` → `marketing-dentisti.netlify.app`

- [ ] **Aggiungere custom domain su Cloudflare Pages:**
  - Dashboard → Pages → `marketing-dentisti` → Custom Domains → Add Domain
  - Dominio: `marketing-dentisti.it`
  - Cloudflare registra e configura SSL automaticamente

- [ ] **Verificare SSL attivo:**
  - `curl -I https://marketing-dentisti.it` → HTTP/2 200, cert valido CF
  - Attendere SSL issuance (di solito < 5 min dopo aggiunta domain)

- [ ] **Eseguire verifiche complete LIVE su `.it`:**
  - [ ] `GET /` → 307 redirect a `/kit-gratis`
  - [ ] `GET /kit-gratis` → 200 OK, contiene "Kit Gratis"
  - [ ] `GET /grazie` → 200 OK
  - [ ] `GET /kit-base` → 200 OK
  - [ ] `GET /grazie-kit-base` → 200 OK
  - [ ] `GET /privacy` → 200 OK
  - [ ] `GET /api/pdf/kit-base` → 200 OK, content-type application/pdf
  - [ ] `POST /api/lead {"email":"test@test.it","nome":"Test","nomeStudio":"Test Studio"}` → 200 OK, verificare lead su n8n execution
  - [ ] `POST /api/create-checkout {}` → 200 OK, response contiene URL `checkout.stripe.com`
  - [ ] `https://www.marketing-dentisti.it` → redirect 301 a `https://marketing-dentisti.it`
  - [ ] Copy verifica: FAQ kit-base contiene "Non devi fare nulla..."

- [ ] **Verifica funnel Kit Base end-to-end:**
  - Click su "Acquista ora con Sconto Lancio €37" → redirect a Stripe → vede €37 (sconto LANCIO37 auto-applicato)
  - Completamento pagamento → redirect a `/grazie-kit-base`
  - Download PDF → `/api/pdf/kit-base` → PDF valido e leggibile

- [ ] **Pulizia Netlify:**
  - Netlify Dashboard → Site settings → General → Domain management
  - Rimuovere `marketing-dentisti.it`
  - ⚠️ **NON eliminare il progetto Netlify**: attendere ok esplicito Hub

---

## Progetto Cloudflare — Stato Corrente

| Campo | Valore |
|-------|--------|
| **ID** | `7ac46638-4c95-41c4-95a2-ab003cc76be6` |
| **Nome** | `marketing-dentisti` |
| **Subdomain** | `marketing-dentisti.pages.dev` |
| **Production Branch** | `main` |
| **Source Type** | `manual` (Direct Uploads) |
| **Env Vars** | Impostate ✅ (3 variabili) |
| **Git Integration** | ❌ DA ATTIVARE DA DASHBOARD |

---

## Cosa NON è stato modificato

- ✅ Copy (pagine, funnel, testi) — intatto
- ✅ Logica di business — nessuna modifica
- ✅ Oggetti Stripe (prodotti, coupon, pricing) — invariati
- ✅ Workflow n8n — intatti
- ✅ Funnel gratuito — identico
- ✅ Kit Base (comprese FAQ e contenuti) — invariati
- ✅ Record MX, TXT, SRV (email) — intatti e funzionanti

---

## Passaggi Manuali Richiesti dall'Hub

### Fase 1 — Setup Infrastructure (PRIMA del cutover DNS)

#### 1. Installare Cloudflare Pages GitHub App

Il repo `marketingdentistii/marketing-dentisti-website` è **privato**. Per attivare la Git Integration serve installare l'app Cloudflare Pages nell'organizzazione GitHub:

1. Dal Cloudflare Dashboard, andare su Pages → Settings → Source
2. Cliccare "Connect to GitHub" / "Install Cloudflare Pages"
3. Autorizzare l'app Cloudflare Pages sull'org `marketingdentistii`
4. Selezionare il repo `marketing-dentisti-website`

> Se l'app è già installata ma non funziona per questo repo, reinstallarla o aggiungerla alle repository consentite.

#### 2. Collegare il progetto esistente al repo

1. Dashboard → Pages → `marketing-dentisti` → Settings → Build & Deploy → Source
2. Cambiare da "Manual upload" a "GitHub"
3. Selezionare `marketingdentistii/marketing-dentisti-website`
4. Branch di produzione: `main`
5. Framework preset: selezionare "Next.js"
6. Salva e triggerare primo deployment

#### 3. Verificare env vars

1. Pages → `marketing-dentisti` → Settings → Environment Variables
2. Controllare che siano presenti tutte e tre:
   - `N8N_WEBHOOK_URL`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Eventuali valori mancanti vanno inseriti manualmente qui

#### 4. Triggerare primo deployment

1. Deployments → New Deployment
2. Branch: `migrate-cloudflare` (o main dopo merge)
3. Monitorare build logs per errori
4. Al successo, verificare tutti gli endpoint su `https://marketing-dentisti.pages.dev`

### Fase 2 — Cutover DNS (DOPO conferma Hub che nameserver Register.it sono passati)

#### 5. Attendere propagation DNS (minuti)

Verificare con `nslookup marketing-dentisti.it` → deve rispondere `75.2.60.5`.

#### 6. Aggiungere custom domain `.it` su Pages

Pages → `marketing-dentisti` → Custom Domains → Add Domain → `marketing-dentisti.it`

Cloudflare gestisce SSL automaticamente. Attendi ~5 minuti per SSL issuance.

#### 7. Eseguire verifica completa live su `.it` (checklist sopra)

#### 8. Confermare completamento all'Hub

#### 9. Pulizia Netlify (solo dopo ok esplicito Hub)

Rimuovere dominio `.it` dal progetto Netlify. Non eliminare progetto.
