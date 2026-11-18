import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Nome ed email sono obbligatori' },
        { status: 400 }
      );
    }

    // Cerca il coupon LANCIO37 esistente o crealo
    let couponId: string | null = null;
    const coupons = await stripe.coupons.list({ limit: 100 });
    const lancioCoupon = coupons.data.find(c => c.name === 'LANCIO37');
    if (lancioCoupon) {
      couponId = lancioCoupon.id;
    } else {
      const created = await stripe.coupons.create({
        name: 'LANCIO37',
        percent_off: 60,
        duration: 'once',
      });
      couponId = created.id;
    }

    const origin = request.headers.get('origin') || 'https://marketing-dentisti.it';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      metadata: {
        customer_name: name,
        customer_email: email,
        product_type: 'kit_base',
      },
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Kit Base',
              description: '7 template operativi + sequenze WhatsApp, email e reminder',
            },
            unit_amount: 9700,
          },
          quantity: 1,
        },
      ],
      discounts: couponId ? [{ coupon: couponId }] : [],
      allow_promotion_codes: true,
      success_url: `${origin}/grazie-kit-base?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/kit-gratis`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Errore creazione checkout:', error?.message);
    return NextResponse.json(
      { error: 'Errore durante la creazione del checkout' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
