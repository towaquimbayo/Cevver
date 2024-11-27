import { Suspense } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/system";
import { Public_Sans, Petrona } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

const petrona = Petrona({
  subsets: ["latin"],
  variable: "--font-petrona",
});

export const metadata: Metadata = {
  title: "Cevver",
  description: "Connecting You with Trusted Vendors for Every Occasion.",
  metadataBase: new URL("https://cevver.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#c82689" },
      }}
    >
      <html lang="en" className="light">
        <body className={`${publicSans.variable} ${petrona.variable}`}>
          <Suspense>
            <NextUIProvider>{children}</NextUIProvider>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
