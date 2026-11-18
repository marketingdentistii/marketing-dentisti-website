# Report Finale — Funnel Kit Base: Allineato a Hub "Sconto Auto-Applicato"

**Data:** 18 novembre 2026  
**Commit finale:** `6b78f62`  
**Sito live:** https://marketing-dentisti.it  
**Branch di build Netlify:** `feature/stripe-checkout` (con `main` come alternativa)

---

## 1️⃣ Decisione Hub Implementata

Lo sconto **LANCIO37 è applicato AUTOMATICAMENTE** alla sessione Stripe Checkout al momento della creazione. Il cliente:
- **Non inserisce alcun codice**
- **Vede €37 direttamente** nel riepilogo pagamento Stripe
- **Non viene interrotto** da popup o campi obbligatori prima del redirect
- L'email viene raccolta da Stripe durante il checkout (pagamento), non dal sito

---

## 2️⃣ Modifiche al Codice

### `app/api/create-checkout/route.ts` — API Stripe Checkout

**Comportamento:**
```
POST /api/create-checkout → {}
→ La funzione findLancio37Coupon() cerca su Stripe il coupon con name='LANCIO37'
→ Se trovato: session.create con discounts: [{ coupon: found.id }] → prezzo €37
→ Se NON trovato (esaurito/cancellato): session.create con discounts: [] → prezzo pieno €97
→ Nessun errore mai — il sistema si adatta automaticamente
```

**Cosa è stato rimosso:**
- ✅ Nessuna logica di creazione coupon (no `stripe.coupons.create()`)
- ✅ Nessun controllo di email richiesto (`customer_email: undefined`)
- ✅ Nessun campo nome obbligatorio
- ✅ No `allow_promotion_codes` (incompatibile con `discounts`)
- ✅ No `prompt()` del browser

### `components/StripeCheckoutButton.tsx` — Pulsante CTA

**Testo pulsante:** `"Acquista ora con Sconto Lancio — €37"`  
**Sottotesto:** `"Pagamento sicuro · Sconto automatico al checkout"`  
**Comportamento:** click → fetch POST `/api/create-checkout` con body vuoto → redirect immediato a Stripe

### `app/kit-base/page.tsx` — Sales Page (copy completo)

Modifiche specifiche richieste:

| Richiesta | Stato | Dettaglio |
|-----------|-------|-----------|
| FAQ "Come applico lo sconto?" | ✅ | "Non devi fare nulla: lo sconto lancio è già applicato al checkout. Vedrai €37 invece di €97 nel riepilogo di pagamento." |
| Step 1 "Come funziona" | ✅ | "Paghi con carta — lo sconto è già applicato" (era "Paghi con carta e codice LANCIO37") |
| Banner codice LANCIO37 | ✅ | "Sconto lancio: LANCIO37 — già attivo per i primi 10 studi" |
| Micro-trust sotto CTA | ✅ | "Pagamento sicuro · Sconto lancio già applicato · Consegna immediata via email" |
| Typo "dentaista" | ✅ | Corretto in "dentista" nella FAQ più sedi |
| "entro 24 ore lavorative" | ✅ | Rimosso, ora "ti rispondiamo al più presto" |
| Critério "in attività da almeno 6 mesi" | ✅ | Rimosso, sezione allineata a /kit-gratis |
| Footer CTA | ✅ | Testo "€37 invece di €97" + sottotesto "Pagamento sicuro · Sconto lancio già applicato" |

**Sezione "Per chi è / Non è per" riallineata a `/kit-gratis`:**

Formato: card bianca con border-l-4 (emerald/slate), lista puntata minimal:
- PER: studi odontoiatrici italiani, studi con segreteria/front-office, chi vuole sistematizzare il primo contatto
- NON PER: chi cerca risultati pronti senza applicare i template, chi non ha un punto di contatto con i pazienti

### Altri file (intoccati per vincolo)
- ✅ Funnel gratuito `/kit-gratis` — intatto
- ✅ PDF placeholder `/api/pdf/kit-base` — intatto
- ✅ n8n resta DRAFT

---

## 3️⃣ Gestione Esaurimento Coupon (10 vendite)

**Flusso a coupon esaurito:**

```
1. Cliente clicca "Acquista"
2. API cerca coupon LANCIO37 su Stripe (stripe.coupons.list)
3. Se max_redemptions >= times_used → coupon esiste → discounts applicato → €37
4. Se max_redemptions < times_used → coupon non trovato → discounts: [] → €97
5. Cliente vede €97 (prezzo pieno), nessuna interruzione, nessun errore
6. Pagina mostra ancora badge "PRIMI 10 STUDI" (senza kill-switch, come richiesto)
```

**Comportamento pagina web:** la sales page rimane invariata — il badge e il prezzo strikethrough restano visibili. Lo sconto è nascosto nell'API e il comportamento cambia solo a livello di sessione Stripe.

**Monitoraggio:** l'amministratore può controllare i redemptions su Stripe Dashboard → Discounts → Coupons → LANCIO37 → field "Times used". Quando raggiunge 10, la transizione è automatica e silente.

---

## 4️⃣ Verifiche Reali Eseguite

### HTTP Live (tutti 200 ✅)

| Endpoint | Status | Content-Type | Nota |
|----------|--------|--------------|------|
| `/kit-base` | 200 | text/html; charset=utf-8 | Sales page renderizzata |
| `/grazie-kit-base` | 200 | text/html; charset=utf-8 | Pagina ringraziamento |
| `/api/pdf/kit-base` | 200 | application/pdf | `%PDF-1.4` valido |
| `/grazie` | 200 | text/html; charset=utf-8 | Card Kit Base presente |
| `/kit-gratis` | 200 | text/html; charset=utf-8 | Landing gratuita intatta |

### Checkout Live (POST /api/create-checkout)

```json
{
  "ok": true,
  "status": 200,
  "url": "https://checkout.stripe.com/g/pay/cs_live_ag..."
}
```

✅ Sessione Stripe creata correttamente con redirect funzionante  
✅ Nome aziendale visibile su Stripe: **"MARKETING DENTISTI"**  
✅ Email richiesta SOLO su Stripe (nessun prompt sul sito)

### Anti-Copy Grep su Remote Repo (zero violazioni ✅)

Frasi controllate: `"inserisci il codice"`, `"campo coupon"`, `"dentaista"`, `"24 ore lavorative"`, `"6 mesi"`, `"allow_promotion_codes"`

Risultato: **0 occorrenze su tutti i file `.tsx/.ts` del repo.**

### Build TypeScript

```
npm run build → zero errori, zero warning
Route /api/create-checkout ✅ compilato
Route /grazie-kit-base ✅ compilato
```

---

## 5️⃣ Deploy Netlify

| Parametro | Valore |
|-----------|--------|
| Site ID | `544c960e-7d75-4976-852e-d7404e249175` |
| Build command | `cd website && npm ci && npm run build` |
| Publish dir | `.next` |
| Plugin | `@netlify/plugin-nextjs` |
| Production branch | ⚠️ Da aggiornare manualmente su dashboard Netlify (vedi §6) |
| Commit deployato | `6b78f62` |
| Stato build | Ready |

---

## 6️⃣ Branch Status & Azioni Manuali

### Situazione corrente

| Branch | Commit | Contenuto |
|--------|--------|-----------|
| `main` (remote) | `6b78f62` | **Tutte le modifiche finali** |
| `feature/stripe-checkout` | `6b78f62` | Clone di main (Netlify usa questo per le build) |
| `feature/stripe-integration` | `6b78f62` | Merge completato, lavoro consolidato |

### Azione manuale richiesta su GitHub

Consolidare su `main` (deve essere il default):

1. Vai su: https://github.com/marketingdentistii/marketing-dentisti-website/pull/new/main
2. Crea PR da `feature/stripe-checkout` → `main` se necessario (in realtà il merge è già fatto tramite `git checkout -b main`)
3. Imposta `main` come branch default su: Settings → Branches → Default branch = `main`

### Azione manuale richiesta su Netlify

Impostare `main` come production branch:

1. Vai su: https://app.netlify.com/sites/marketing-dentisti/settings/general
2. Sezione **Build & Deploy → Deploy Targets → Production branch**
3. Cambia da `feature/stripe-checkout` a `main`
4. Salva

Questo fa sì che ogni push su `main` triggeri un rebuild automatico.

---

## 7️⃣ File Modificati / Creati

| File | Azione | Note |
|------|--------|------|
| `app/api/create-checkout/route.ts` | **Riscritto** | Coupon auto-applicato, gestione esaurimento, zero prompt email |
| `app/kit-base/page.tsx` | **Riscritto** | Copy allineato a Hub, Per chi è riallineato a /kit-gratis |
| `components/StripeCheckoutButton.tsx` | **Modificato** | Testo CTA aggiornato, nessuno prompt email |
| `CHECKOUT_LANCIO37.md` | Creato | Istruzioni configurazione coupon su Stripe (internal reference) |
| Tutti gli altri file | **Intoccati** | Vincoli rispettati |

---

## 📊 Sommario Finale

Il funnel Kit Base è **completamente allineato alla decisione Hub**:

- ✅ **Checkout auto-applicato**: €37 visualizzato su Stripe senza干预 del cliente
- ✅ **Zero interruzioni**: nessun prompt email, nessun campo coupon da inserire
- ✅ **Esaurimento gestito**: passaggio silente a €97 quando i 10 utilizzi finiscono
- ✅ **Copy allineato**: FAQ, step, banner, micro-trust coerenti con sconto auto-applicato
- ✅ **Anti-copy verified**: zero violazioni grep sui repertori vietati
- ✅ **Tutti endpoint live 200**: kit-base, grazie, grazie-kit-base, kit-gratis, pdf
- ✅ **Nome aziendale Stripe**: "MARKETING DENTISTI" (non più codice fiscale)
- ✅ **Funnel gratuito intatto**
- ✅ **Build TypeScript zero errori**

### Blocco restante
Una sola azione manuale: configurare `main` come production branch su Netlify Dashboard (Settings → Build & Deploy → Production branch = `main`). Tutto il resto è operativo e deployato.
