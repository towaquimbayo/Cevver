import { CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout Session Result",
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="max-w-[1600px] mx-auto mt-36 mb-20 px-8 lg:px-16">
      <div className="flex gap-2">
        <h1 className="font-petrona font-bold text-3xl mb-4 sm:text-5xl">
          Payment Successful
        </h1>
        <CircleCheck size={48} color="#22c408" />
      </div>
      <p className="text-base mb-8 sm:text-lg">
        Thank you for your payment. Your transaction is now complete. If you
        have any questions, please contact us at{" "}
        <Link
          className="text-primary font-bold"
          href="mailto:support@cevver.com"
        >
          support@cevver.com.
        </Link>
      </p>

      <h2 className="font-petrona font-bold text-2xl mb-4 sm:text-3xl">
        Payment Details:
      </h2>
      {children}
    </div>
  );
}
