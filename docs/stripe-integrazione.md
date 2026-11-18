# Integrazione Stripe — Kit Segreteria Completo

Piano validato con `stripe tools plan` (guide `iguide_61Vm6t2c6aZNXpdwn411Bk4HPX7QS`, stato: accepted) il 17/11/2026.
Scope confermato: **solo Payments** (Payment Links + webhook). NO Billing, NO Tax, NO Invoicing per ora — saranno rivalutati alla fase pacchetti alti (Setup €497 / Retainer) con P.IVA attiva. Scelta consapevole: NON usare Managed Payments (modello reseller, respinto con Gumroad/Lemon Squeezy → vedi `prodotto-lowcost.md` §5-septies).

## Risorse create (modalità TEST)

| Risorsa | ID | Note |
|---|---|---|
| Prodotto "Kit Segreteria Completo" | `prod_Ve0ymtY0bbZjAe` | type service, EUR |
| Prezzo lancio €37 | `price_1Uciwv1Bk4HPX7QSY9mzx1I0` | 3700 cent |
| Prezzo standard €97 | `price_1Uciwa1Bk4HPX7QSUKAUrRWE` | 9700 cent |
| Payment Link (€37) | `plink_1Ucixc1Bk4HPX7QSJ8gySJRB` | https://buy.stripe.com/test_fZu28j8t79Zdg4wbTCf3a00 |

- Payment Link €37 con `after_completion: hosted_confirmation` + messaggio "arriva via email" ( dominio non ancora attivo; quando il sito sarà online, valutare redirect a `/kit-completo/ordine-confermato`).
- Payment method: dinamici (default, nessun `payment_method_types` forzato) → include Link/Apple Pay/Google Pay dove disponibili.
- Promotion code: disattivate (default).
- Il passaggio €37 → €97 a fine lancio = creare una nuova Payment Link sul prezzo €97 e sostituirla nel sito/emails.

## Test pagamento

- Pagina link: aprire l'URL, carta `4242 4242 4242 4242`, qualsiasi CVV/futuro, qualsiasi CAP.
- Webhook di prova locale: `stripe listen --forward-to localhost:3000/api/stripe/webhook` (richiede sito in dev).
- La consegna vera avviene via workflow n8n 1J (`checkout.session.completed` → sheet `Acquisti` → email con link riservato `/kit-completo/stampa?t=<TOKEN>`).

## Credenziali

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` e `STRIPE_SECRET_KEY` (test) in `.env.local` — mai committare.
- CLI installata globalmente: `@stripe/cli@1.55.11` (bin in `%LOCALAPPDATA%\npm`, PATH utente sistemato). Skill Stripe installate in `.agents/skills` (11, fra cui `stripe-best-practices`, `stripe-docs`).

## Switch a LIVE (quando l'account sarà verificato)

1. Dashboard → abilitare ricezione pagamenti (identità, IBAN, descrizione attività) — persona fisica con solo CF, come da decisioni §5-septies.
2. Rigenerare: prodotto + 2 prezzi + Payment Link con le chiavi `sk_live`/`pk_live` (stessi comandi CLI con `--live`), aggiungere il suffisso `test_` non comparirà più nell'URL.
3. Creare webhook endpoint su n8n 1J (vedi §Architettura in `prodotto-lowcost.md` §7) e salvare `whsec_...` in `.env.local` come `STRIPE_WEBHOOK_SIGNING_SECRET`.
4. Aggiornamento periodico: ogni vendita va registrata nel foglio `Acquisti` (è il libro paghe proprio) e accantonata la riserva ~1/3 del lordo. Trigger P.IVA: 2-3 mesi consecutivi di vendite o cumulato >~1.500€ (vedi §5-septies).

## Da fare (build funnel)

- [ ] Workflow n8n 1J: trigger webhook Stripe (nodo "Stripe Trigger" con credenziale API key, che registra il webhook in autonomia) → sheet `Acquisti` → invio email con link riservato.
- [ ] Pagina `/kit-completo` + `/kit-completo/stampa?t=` (token da `KIT_STAMP_TOKEN`) e `/kit-completo/ordine-confermato`.
- [ ] Contenuti moduli: `docs/kit-completo-content.md` (build #1, in attesa di conferma scope 7 moduli).
- [ ] Inserire la Payment Link nella landing page di vendita (solo dopo deploy).
