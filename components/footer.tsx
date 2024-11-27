"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-[#F8F8F8] py-16 px-8 md:p-16">
      <div className="max-w-[1600px] m-auto flex justify-between flex-wrap gap-4 w-full md:flex-nowrap">
        <div className="flex flex-col gap-4 max-w-full w-full lg:max-w-[300px] md:max-w-[200px]">
          <Image
            src="/logo.svg"
            alt="Cevver logo"
            width={150}
            height={100}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
          <p>Connecting You with Trusted Vendors for Every Occasion.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-petrona font-semibold text-xl sm:text-2xl">
            General
          </h3>
          <Link
            className="text-sm font-light transition-all duration-300 hover:opacity-80 sm:text-base"
            href="/#why-cevver"
          >
            Why Cevver
          </Link>
          <Link
            className="text-sm font-light transition-all duration-300 hover:opacity-80 sm:text-base"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-light transition-all duration-300 hover:opacity-80 sm:text-base"
            href="#"
          >
            Organizations
          </Link>
          <Link
            className="text-sm font-light transition-all duration-300 hover:opacity-80 sm:text-base"
            href="#"
          >
            Customers
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-petrona font-semibold text-xl sm:text-2xl">
            Company
          </h3>
          <Link
            className="text-sm font-light transition-all duration-300 hover:opacity-80 sm:text-base"
            href="/#faq"
          >
            FAQ
          </Link>
          <Link
            className="text-sm font-light transition-all duration-300 hover:opacity-80 sm:text-base"
            href="#"
          >
            Contact Us
          </Link>
          <Link
            className="text-sm font-light transition-all duration-300 hover:opacity-80 sm:text-base"
            href="#"
          >
            Terms of Use
          </Link>
          <Link
            className="text-sm font-light transition-all duration-300 hover:opacity-80 sm:text-base"
            href="#"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-petrona font-semibold text-xl sm:text-2xl">
            Socials
          </h3>
          <Link
            className="text-sm font-light transition-all duration-300 hover:opacity-80 sm:text-base"
            href="#"
          >
            Instagram
          </Link>
          <Link
            className="text-sm font-light transition-all duration-300 hover:opacity-80 sm:text-base"
            href="#"
          >
            LinkedIn
          </Link>
          <Link
            className="text-sm font-light transition-all duration-300 hover:opacity-80 sm:text-base"
            href="#"
          >
            X/Twitter
          </Link>
          <Link
            className="text-sm font-light transition-all duration-300 hover:opacity-80 sm:text-base"
            href="#"
          >
            Facebook
          </Link>
        </div>
      </div>
    </footer>
  );
}
