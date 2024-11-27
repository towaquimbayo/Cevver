"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function VendorPaymentResult({
  searchParams,
}: {
  searchParams: {
    payment_intent: string;
    payment_intent_client_secret: string;
    redirect_status: string;
  };
}): JSX.Element {
  const router = useRouter();
  const { payment_intent, payment_intent_client_secret, redirect_status } =
    searchParams;
  if (!payment_intent || !payment_intent_client_secret || !redirect_status) {
    return (
      <>
        <h2>Hmm... something went wrong.</h2>
        <Button onClick={() => router.push("/vendor-payment")}>
          Return to Vendor Payment
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="pb-8">
        <p>Payment Intent ID: {payment_intent}</p>
        <p>Payment Intent Client Secret: {payment_intent_client_secret}</p>
        <p>Redirect Status: {redirect_status}</p>
      </div>
      <Button onClick={() => router.push("/vendor-payment")}>
        Return to Vendor Payment
      </Button>
    </>
  );
}
