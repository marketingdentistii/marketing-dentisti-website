import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Legge il coupon LANCIO37 esistente su Stripe.
 * Se non viene trovato (esaurito o cancellato), restituisce null.
 */
async function findLancio37Coupon(): Promise<{ id: string; maxRedemptions: number | null } | null> {
  const coupons = await stripe.coupons.list({ limit: 100 });
  const found = coupons.data.find(c => c.name === 'LANCIO37');

  if (!found) return null;

  return {
    id: found.id,
    maxRedemptions: found.max_redemptions ?? null,
  };
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin') || 'https://marketing-dentisti.it';

    // Legge il coupon esistente — se non esiste (esaurito) continua a prezzo pieno
    const coupon = await findLancio37Coupon();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: undefined,          // nessuna email qui: Stripe la chiede al checkout
      metadata: { product_type: 'kit_base' },
      line_items: [
        { price: 'price_1Ucuk61cfqUaCrbBkWsXmIx5', quantity: 1 },
      ],
      // Lo sconto è già applicato automaticamente quando il coupon esiste.
      // Se non esiste più (10 vendite finite), lo skippiamo e il checkout va a prezzo pieno.
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

export const runtime = 'nodejs';
