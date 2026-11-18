import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body?.email;

    if (!email) {
      return NextResponse.json(
        { error: 'Inserisci la tua email per procedere.' },
        { status: 400 }
      );
    }

    const origin = request.headers.get('origin') || 'https://marketing-dentisti.it';

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
      allow_promotion_codes: true,
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
