import type { Stripe } from "stripe";
import { formatAmountForStripe } from "@/utils/stripe-helpers";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
// import { headers } from "next/headers";

// export async function createCheckoutSession(
//   data: FormData
// ): Promise<{ clientSecret: string | null; url: string | null }> {
//   const origin: string = headers().get("origin") as string;
//   const vendor = data.get("vendor") as VendorParams | null;
//   if (!vendor || !origin) return { clientSecret: null, url: null };

//   const checkoutSession: Stripe.Checkout.Session =
//     await stripe.checkout.sessions.create({
//       mode: "payment",
//       submit_type: "pay",
//       line_items: [
//         {
//           quantity: 1,
//           price_data: {
//             currency: "cad",
//             product_data: {
//               name: vendor.title,
//               description: vendor.description,
//             },
//             unit_amount: formatAmountForStripe(Number(vendor.price), "cad"),
//           },
//         },
//       ],
//       success_url: `${origin}/vendor-payment/result?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${origin}/vendor-payment`,
//     });

//   return {
//     clientSecret: checkoutSession.client_secret,
//     url: checkoutSession.url,
//   };
// }

export async function createPaymentIntent(
  data: FormData
): Promise<{ clientSecret: string }> {
  try {
    const amount = (data.get("amount") as string) || null;
    if (!amount) {
      console.error("Amount is required:", amount);
      throw new Error("Please provide an amount.");
    }

    if (Number(amount) <= 0) {
      console.error("Amount must be greater than 0:", amount);
      throw new Error("Amount must be greater than 0.");
    }

    console.log("Creating PaymentIntent with amount:", amount);

    const paymentIntent: Stripe.PaymentIntent =
      await stripe.paymentIntents.create({
        amount: formatAmountForStripe(Number(amount), "cad"),
        automatic_payment_methods: { enabled: true },
        currency: "cad",
      });

    console.log("PaymentIntent created:", paymentIntent);

    return { clientSecret: paymentIntent.client_secret as string };
  } catch (err: any) {
    console.error("Error creating PaymentIntent", err);
    return { clientSecret: "" };
  }
}

// Stripe webhook handler for POST /api/webhooks/stripe
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const endpointSecret = (process.env.STRIPE_WEBHOOK_SECRET as string) || "";
  let event: Stripe.Event;
  let result: string;

  if (!sig || !rawBody || !endpointSecret) {
    console.error(
      "Stripe Webhook Error: Missing stripe-signature, rawBody, or endpointSecret",
      { sig, rawBody, endpointSecret }
    );
    return NextResponse.json(
      {
        error: `Stripe Webhook Error: Missing stripe-signature, rawBody, or endpointSecret`,
      },
      { status: 400 }
    );
  }

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

    if (!event) {
      console.error("Stripe Webhook Error: Event not constructed", { event });
      return NextResponse.json(
        { error: "Stripe Webhook Error: Event not constructed" },
        { status: 400 }
      );
    }
  } catch (err: any) {
    const error = typeof err === "object" ? JSON.stringify(err) : err;
    console.error(`Stripe Webhook Error: ${error}`);
    return NextResponse.json(
      { error: `Stripe Webhook Error: ${error}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(
        "Stripe Webhook: PaymentIntent was successful!",
        paymentIntent
      );
      result = "success";

      // @TODO: Handle the successful payment
      // @TODO: Register the vendor for this user
      break;
    case "payment_intent.payment_failed":
      const paymentFailed = event.data.object as Stripe.PaymentIntent;
      console.error("PaymentIntent failed!", paymentFailed);
      result = "failed";
      break;
    default:
      console.error(`Unhandled event type: ${event.type}`);
      result = `Unhandled event type: ${event.type}`;
  }

  return NextResponse.json({ received: true, status: result });
}
