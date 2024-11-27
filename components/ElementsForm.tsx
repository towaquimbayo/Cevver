"use client";

import type { StripeError } from "@stripe/stripe-js";
import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import getStripe from "@/utils/get-stripejs";
import { createPaymentIntent } from "@/app/api/webhooks/stripe";
import Button from "./button";

function CheckoutForm({ vendorPrice }: { vendorPrice: number }): JSX.Element {
  const stripe = useStripe();
  const elements = useElements();

  const [input, setInput] = useState<{
    amount: number;
    cardholderName: string;
  }>({
    amount: Math.round(vendorPrice),
    cardholderName: "",
  });
  const [paymentType, setPaymentType] = useState<string>("");
  const [payment, setPayment] = useState<{
    status: "initial" | "processing" | "error";
  }>({ status: "initial" });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case "processing":
      case "requires_payment_method":
      case "requires_confirmation":
        return <p className="pt-4">Processing...</p>;
      case "requires_action":
        return <p className="pt-4">Authenticating...</p>;
      case "succeeded":
        return <p className="pt-4 text-success">Payment Succeeded.</p>;
      case "error":
        return <p className="pt-4 text-error">{errorMessage}</p>;
      default:
        return null;
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

    elements?.update({ amount: input.amount * 100 });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      // Abort if form isn't valid
      if (!e.currentTarget.reportValidity()) return;
      if (!elements || !stripe) return;

      setPayment({ status: "processing" });

      const { error: submitError } = await elements.submit();

      if (submitError) {
        setPayment({ status: "error" });
        setErrorMessage(submitError.message ?? "An unknown error occurred");
        return;
      }

      // Create a PaymentIntent with the specified amount.
      const { clientSecret } = await createPaymentIntent(
        new FormData(e.target as HTMLFormElement)
      );

      // Use your card Element with other Stripe.js APIs
      const { error: confirmError } = await stripe!.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/vendor-payment/result`,
          payment_method_data: {
            billing_details: { name: input.cardholderName },
          },
        },
      });
      console.log("Stripe confirmPayment error:", confirmError);

      if (confirmError) {
        setPayment({ status: "error" });
        setErrorMessage(confirmError.message ?? "An unknown error occurred");
      }
    } catch (err) {
      const { message } = err as StripeError;
      console.error("Stripe checkout error:", err);

      setPayment({ status: "error" });
      setErrorMessage(message ?? "An unknown error occurred");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="border border-[#6772e5] p-4 mb-4 rounded-lg">
          <legend className="text-[#6772e5] px-2">Your payment details:</legend>
          {paymentType === "card" ? (
            <input
              placeholder="Cardholder name"
              className="w-full border px-2.5 py-1.5 mb-4 rounded-lg outline-none focus:border-[#6772e5] focus:ring-2 focus:ring-[#6772e5] "
              type="Text"
              name="cardholderName"
              onChange={handleInputChange}
              required
            />
          ) : null}
          <div className="FormRow elements-style">
            <PaymentElement onChange={(e) => setPaymentType(e.value.type)} />
          </div>
        </fieldset>
        <input type="hidden" name="amount" value={input.amount} />
        <Button
          type="submit"
          disabled={
            !["initial", "succeeded", "error"].includes(payment.status) ||
            !stripe
          }
        >
          Pay {formatAmountForDisplay(input.amount, "cad")}
        </Button>
      </form>
      <PaymentStatus status={payment.status} />
    </>
  );
}

export default function ElementsForm({
  amount,
}: {
  amount: number;
}): JSX.Element {
  return (
    <Elements
      stripe={getStripe()}
      options={{
        appearance: {
          variables: {
            colorIcon: "#6772e5",
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          },
        },
        currency: "cad",
        mode: "payment",
        amount: Math.round(amount * 100), // The amount is in cents
      }}
    >
      <CheckoutForm vendorPrice={amount} />
    </Elements>
  );
}
