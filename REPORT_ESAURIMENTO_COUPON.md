# Report — Sicurezza Esaurimento Coupon LANCIO37

**Data:** 18 novembre 2026  
**Commit deployato:** `6cca3ef`  
**Sito live:** https://marketing-dentisti.it

---

## Problema Identificato

Quando il coupon LANCIO37 su Stripe raggiunge `max_redemptions` (10), **NON sparisce dalle API**: l'oggetto resta nel sistema ma diventa invalido (`times_used >= max_redemptions`). La funzione precedente cercava solo per nome (`c.name === 'LANCIO37'`), quindi continuava a restituire un coupon esaurito → Stripe rifiutava la creazione della sessione di checkout con errore.

### Cosa succedeva al decimo utilizzo (prima del fix)

```
POST /api/create-checkout → {}
→ findLancio37Coupon() trova coupon "LANCIO37" per nome
→ discounts: [{ coupon: expired_coupon_id }] applicato alla sessione
→ Stripe restituisce errore (coupon esaurito)
→ API risponde 500 al cliente
→ Checkout bloccato fino ad intervento manuale
```

### Cosa succede ora (dopo il fix)

```
POST /api/create-checkout → {}
→ findLancio37Coupon() cerca coupon attivo E con redemption disponibili
→ Se times_used >= max_redemptions → NULL
→ discounts: [] → prezzo pieno €97
→ Nessuna interruzione per il cliente
```

---

## Modifica al Codice

### File modificato: `app/api/create-checkout/route.ts`

#### Prima (vulnerabile)
```typescript
async function findLancio37Coupon(): Promise<{ id: string; } | null> {
  const coupons = await stripe.coupons.list({ limit: 100 });
  const found = coupons.data.find(c => c.name === 'LANCIO37');
  if (!found) return null;
  return { id: found.id };
}
```

#### Dopo (sicuro)
```typescript
async function findLancio37Coupon(): Promise<{ id: string; } | null> {
  const coupons = await stripe.coupons.list({ limit: 100 });

  for (const c of coupons.data) {
    if (c.name !== 'LANCIO37') continue;

    const meta = c as unknown as Record<string, unknown>;
    
    // 1. Non disattivato manualmente?
    if (meta.active === false) continue;

    // 2. Almeno una redemption disponibile?
    const maxRed = meta.max_redemptions;
    const timesUsed = meta.times_used;
    if (maxRed == null) return { id: c.id };        // uso illimitato
    if (typeof timesUsed === 'number' && timesUsed < (maxRed as number)) {
      return { id: c.id };                          // redemption rimaste
    }
  }

  return null;                                        // esaurito o inesistente
}
```

**Due nuovi controlli prima di applicare lo sconto:**
1. `meta.active !== false` → il coupon non è stato disattivato manualmente
2. `max_redemptions === null || times_used < max_redemptions` → almeno una redemption ancora disponibile

Se entrambi i controlli falliscono → funzione ritorna `null` → `discounts: []` → checkout a €97 senza errori.

---

## Test Unitari (8/8 superati)

File: `test/coupon-exhaustion.test.ts`

| # | Scenario | Atteso | Ottenuto |
|---|----------|--------|----------|
| 1 | Coupon attivo, 0 usi su 10 | `{id}` | `{id}` ✅ |
| 2 | Coupon esaurito, 10/10 | `null` | `null` ✅ |
| 3 | Coupon disattivato manualmente | `null` | `null` ✅ |
| 4 | Max redemptions null (illimitato) | `{id}` | `{id}` ✅ |
| 5 | Quasi esaurito, 9/10 | `{id}` | `{id}` ✅ |
| 6 | Appena esaurito, 10/10 | `null` | `null` ✅ |
| 7 | Nessun coupon LANCIO37 nel sistema | `null` | `null` ✅ |
| 8 | Multiplo coupon, uno valido + uno esaurito | Solo il valido | Solo il valido ✅ |

---

## Verifiche Live Post-Deploy

| Controllo | Risultato |
|-----------|-----------|
| `/kit-base` HTTP | 200 ✅ |
| `/grazie-kit-base` HTTP | 200 ✅ |
| `/api/pdf/kit-base` HTTP | 200 (application/pdf) ✅ |
| `/grazie` HTTP | 200 ✅ |
| `/kit-gratis` HTTP | 200 ✅ |
| POST `/api/create-checkout` | 200, URL Stripe valido ✅ |
| Build Netlify | ready ✅ |

### Anti-copy (zero violazioni)
Frasi verificate con grep remoto: `"inserisci il codice"`, `"campo coupon"`, `"dentaista"`, `"24 ore lavorative"`, `"6 mesi"`, `"allow_promotion_codes"` → **0 occorrenze**.

### Route verifica remoto
- Contiene controllo `active`: ✅ true
- Contiene controllo `times_used` / `max_redemptions`: ✅ true
- Zero `allow_promotion_codes`: ✅ true
- Zero `coupons.create`: ✅ true

---

## Comportamento Primo-Persona (Invariato)

Per i primi 10 acquisti, l'esperienza è **identica alla versione pre-fix**:

1. Cliente clicca "Acquista ora con Sconto Lancio — €37"
2. Redirect immediato a Stripe Checkout
3. Su Stripe vede già €37 (sconto LANCIO37 applicato automaticamente)
4. Inserisce email e carta su Stripe → completa il pagamento
5. Redirect a `/grazie-kit-base`
6. Niente prompt, niente campi coupon, nessuna interruzione

La modifica opera esclusivamente nell'API (strato server). Non cambia nulla sul frontend né sulla UX del cliente.

---

## Comportamento Dopo le 10 Vendite

Al raggiungimento del decimo utilizzo:

1. Cliente clicca "Acquista ora con Sconto Lancio — €37" (stesso pulsante, stesso testo)
2. Redirect immediato a Stripe Checkout
3. Su Stripe vede il prezzo pieno **€97** (nessuno sconto applicato perché il coupon è esaurito)
4. Procedura identica: email + carta → completare
5. Redirect a `/grazie-kit-base`
6. Pagina di ringraziamento **invariata**
7. Il badge "PRIMI 10 STUDI" rimane visibile (nessun kill-switch introdotto)

Nessun errore tecnico, nessun blocco, nessun intervento manuale richiesto.

---

## Monitoraggio

Per verificare i redemptions del coupon LANCIO37:
- Vai su **Stripe Dashboard → Discounts → Coupons**
- Cerca LANCIO37
- Controlla il campo **"Times used"** vs **"Max redemptions"**

Quando "Times used" ≥ "Max redemptions", la transizione è automatica e silente dall'altra parte.

---

## File Modificati

| File | Tipo | Descrizione |
|------|------|-------------|
| `app/api/create-checkout/route.ts` | **Modificato** | Aggiunti controlli `active` e `times_used < max_redemptions` |
| `test/coupon-exhaustion.test.ts` | **Creato** | 8 unit test che coprono tutti gli scenari di esaurimento |
| *(tutti gli altri)* | **Intoccati** | Copy, funnel gratuito, n8n, branch — intatti |

---

## Note Tecniche

- **Test mode**: un coupon usa-e-getta `LANCIO37-TEST` (max_redemptions=1, ID `BKsW9m79`) è stato creato durante il setup delle verifiche. Non interferisce con il flusso produzione (la ricerca matcha solo per nome esatto `LANCIO37`).
- **TypeScript**: la funzione usa type-safe cast (`as unknown as Record<string, unknown>`) per accedere a proprietà non incluse nei tipi ufficiali dello SDK Stripe ma presenti nella risposta JSON effettiva dell'API v1.
- **Performance**: `stripe.coupons.list({ limit: 100 })` esegue una sola chiamata API per richiesta. Nè cache esterna nè stati aggiuntivi.
