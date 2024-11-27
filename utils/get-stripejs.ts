import { Stripe, loadStripe } from "@stripe/stripe-js";

/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
let stripePromise: Promise<Stripe | null>;
export default function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
    stripePromise = loadStripe(publicKey as string);
  }
  return stripePromise;
}
