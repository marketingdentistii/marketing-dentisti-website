import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Nome ed email sono obbligatori' },
        { status: 400 }
      );
    }

    // Cerca il coupon LANCIO37 esistente
    let couponId: string | null = null;
    const coupons = await stripe.coupons.list({ limit: 100 });
    const lancioCoupon = coupons.data.find(c => c.name === 'LANCIO37');
    if (lancioCoupon) {
      couponId = lancioCoupon.id;
    } else {
      // Crea il coupon se non esiste: 60% di sconto per €37 (su €97)
      const created = await stripe.coupons.create({
        name: 'LANCIO37',
        percent_off: 60,
        duration: 'once',
      });
      couponId = created.id;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      metadata: {
        customer_name: name,
        customer_email: email,
        customer_phone: phone || '',
      },
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Kit Base — Template e Automazioni per studi odontoiatrici',
              description: '7 template operativi + sequenze WhatsApp, email e reminder',
            },
            unit_amount: 9700, // €97
          },
          quantity: 1,
        },
      ],
      discounts: [{ coupon: couponId }],
      success_url: `${request.headers.get('origin')}/grazie`,
      cancel_url: `${request.headers.get('origin')}/kit-base`,
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
