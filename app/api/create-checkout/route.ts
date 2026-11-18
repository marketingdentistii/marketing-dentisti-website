import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Trova o crea il coupon LANCIO37 su Stripe.
 * Viene creato con amount_off 6000 centesimi (€60), massimo 10 utilizzi.
 */
async function getOrCreateLancio37Coupon() {
  const coupons = await stripe.coupons.list({ limit: 100 });
  let coupon = coupons.data.find(
    (c) => c.name === 'LANCIO37'
  );

  if (!coupon) {
    coupon = await stripe.coupons.create({
      name: 'LANCIO37',
      amount_off: 6000, // €60 in centesimi
      currency: 'eur',
      max_redemptions: 10,
      duration: 'once',
    });
  }

  return coupon;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Email opzionale — Stripe la chiede al checkout stesso
    const email = body?.email || undefined;

    const origin = request.headers.get('origin') || 'https://marketing-dentisti.it';

    // Cerca o crea il coupon LANCIO37 e applicalo alla sessione
    const coupon = await getOrCreateLancio37Coupon();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      metadata: {
        product_type: 'kit_base',
      },
      line_items: [
        {
          price: 'price_1Ucuk61cfqUaCrbBkWsXmIx5',
          quantity: 1,
        },
      ],
      discounts: [{ coupon: coupon.id }],
      billing_address_collection: 'auto',
      success_url: `${origin}/grazie-kit-base?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/kit-base`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore durante la creazione del checkout';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
