import type { Metadata } from "next";
import ElementsForm from "@/components/ElementsForm";

export const metadata: Metadata = {
  title: "Cevver | Stripe Checkout",
};

export default function VendorPayment(): JSX.Element {
  // @TODO: Replace this with actual vendor data
  const vendor = {
    id: "6669d49002b8dc215030d4d2",
    title: "Food Catering",
    description:
      "Elevate your event with stress-free catering - delicious food, stunning presentations, and hassle-free service.",
    price: 250,
  };

  return (
    <div className="max-w-[1600px] mx-auto mt-36 mb-20 px-8 lg:px-16">
      <h1 className="font-petrona font-bold text-3xl mb-4 sm:text-5xl">
        Make a Payment
      </h1>
      <p className="text-base mb-8 sm:text-lg">
        Please enter your payment details below to complete your transaction
        with your vendor.
      </p>

      <div className="flex flex-col justify-between gap-4 mb-8 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <h2 className="font-petrona font-bold text-2xl mb-4 sm:text-3xl">
            Vendor Details
          </h2>
          <p className="text-base mb-8 sm:text-lg">
            <strong>{vendor.title}</strong>
            <br />
            {vendor.description}
          </p>
        </div>

        <div className="w-full lg:w-1/2">
          <ElementsForm amount={vendor.price} />
        </div>
      </div>
    </div>
  );
}
