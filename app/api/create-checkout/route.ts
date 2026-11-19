import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Legge il coupon LANCIO37 esistente su Stripe e verifica che sia ancora applicabile.
 * Restituisce { id } se il coupon esiste, è valido e ha ancora redemption disponibili,
 * altrimenti null (il checkout esce a prezzo pieno, senza errori).
 *
 * Campi Stripe attuali: `valid` (sostituisce `active`, deprecato e non più restituito)
 * e `times_redeemed` (il vecchio `times_used` non esiste). `max_redemptions` è null
 * quando il coupon non ha un tetto di utilizzi.
 */
async function findLancio37Coupon(): Promise<{ id: string } | null> {
  const coupons = await stripe.coupons.list({ limit: 100 });

  for (const coupon of coupons.data) {
    // Il coupon si chiama LANCIO37 ma il suo id è generato da Stripe: va cercato per nome.
    if (coupon.name !== 'LANCIO37') continue;

    // valid === false quando il coupon è scaduto, cancellato o disattivato a mano
    if (coupon.valid === false) continue;

    // Con tetto di utilizzi raggiunto il coupon è esaurito
    const maxRedemptions = coupon.max_redemptions;
    if (maxRedemptions !== null && coupon.times_redeemed >= maxRedemptions) continue;

    return { id: coupon.id };
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin') || 'https://marketing-dentisti.it';

    // Legge il coupon esistente — se esaurito o inesistente, discounts=[] → prezzo pieno
    const coupon = await findLancio37Coupon();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: undefined,          // nessuna email qui: Stripe la chiede al checkout
      metadata: { product_type: 'kit_base' },
      line_items: [
        { price: 'price_1Ucuk61cfqUaCrbBkWsXmIx5', quantity: 1 },
      ],
      // Lo sconto è applicato quando il coupon esiste, è valido e ha redemption disponibili.
      // Se esaurito (10 usi), scaduto o cancellato, discounts=[] → checkout €97 senza errori.
      discounts: coupon ? [{ coupon: coupon.id }] : [],
      billing_address_collection: 'auto',
      success_url: `${origin}/grazie-kit-base?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/kit-base`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore durante la creazione del checkout';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export const runtime = 'edge';
