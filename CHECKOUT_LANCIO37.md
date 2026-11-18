# Configurazione Coupon LANCIO37 su Stripe

## Problema
Al checkout Stripe, il codice "LANCIO37" non si applica (appare "codice non valido").

## Soluzione

### Opzione A — Applicare automaticamente il coupon (consigliata)
Quando un utente clicca "Acquista", la sessione di checkout apre già con il descuento applicato (visualizza "-€60" nel riepilogo).

**Passaggi:**
1. Su Stripe Dashboard → **Discounts → Coupons**
   - Cerca o crea LANCIO37
   - Registra lo `coupon ID` che ti dà Stripe (es: `cpo_abc123...`)
2. Aggiungi questa variabile d'ambiente su Netlify:
   ```
   STRIPE_COUPON_ID = cpo_abc123...
   ```
3. Modifica il file `/api/create-checkout/route.ts`:
   - Sostituisci `allow_promotion_codes: true` con:
     ```typescript
     discounts: [{ coupon: process.env.STRIPE_COUPON_ID }],
     ```

**Risultato:** il prezzo appare subito scontato a €37 nella pagina di pagamento Stripe. Niente bisogno di inserire codici.

---

### Opzione B — Creare coupon manualmente su Stripe
Se preferisci l'utente inserisca il codice, verifica questi parametri sulla Dashboard:

1. Vai su **Discounts → Coupons**
2. Se LANCIO37 non esiste → cliccare **+ Create coupon**:
   - **Code**: `LANCIO37`
   - **Type**: `Fixed amount`
   - **Amount**: `6000` (€60 in centesimi)
   - **Currency**: `EUR`
   - **Max redemptions**: `10`
   - **Duration**: `once`
   - Salvare e controllare che lo stato sia **Active**
   
3. Verificare che la Price ID `price_1Ucuk61cfqUaCrbBkWsXmIx5` sia in **EUR**

### Debug rapido
Se dopo aver verificato continua a non funzionare, prova ad applicare il coupon via Stripe CLI:
```bash
stripe coupons create --name "LANCIO37 Test" --amount-off 6000 --currency EUR --max-redemptions 10
```

Verifica poi sul sito se il nuovo codice funziona.
