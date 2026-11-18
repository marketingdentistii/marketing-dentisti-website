import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Legge il coupon LANCIO37 esistente su Stripe e verifica che sia ancora applicabile.
 * Restituisce null se il coupon non esiste, è esaurito o disattivato.
 */
async function findLancio37Coupon(): Promise<{ id: string } | null> {
  const coupons = await stripe.coupons.list({ limit: 100 });

  for (const c of coupons.data) {
    // Cerca il coupon per nome
    if (c.name !== 'LANCIO37') continue;

    const meta = c as unknown as Record<string, unknown>;
    // Verifica che non sia stato disattivato manualmente
    if (meta.active === false) continue;

    // Verifica che ci siano ancora redemption disponibili
    const maxRed = meta.max_redemptions;
    const timesUsed = meta.times_used;
    // Se max_redemptions è null → uso illimitato → ok
    if (maxRed == null) return { id: c.id };
    // Altrimenti, times_used deve essere strettamente inferiore al massimo
    if (typeof timesUsed === 'number' && timesUsed < (maxRed as number)) {
      return { id: c.id };
    }
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
      // Lo sconto è già applicato automaticamente quando il coupon esiste e ha redemption disponibili.
      // Se esaurito (10 vendite finite) o cancellato, discounts=[] → checkout €97 senza errori.
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
