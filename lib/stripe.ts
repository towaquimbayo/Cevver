import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
  {
    apiVersion: "2024-06-20",
    appInfo: {
      name: "Cevver",
      version: "0.1.0",
      url: "https://cevver.com",
    },
    maxNetworkRetries: 2,
  }
);
