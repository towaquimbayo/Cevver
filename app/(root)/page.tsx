"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MinusCircle, PlusCircle } from "lucide-react";
import Button from "@/components/button";
import Footer from "@/components/footer";

export default function Home() {
  const router = useRouter();
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const faq = [
    {
      question: "How do I sign up for a Cevver account?",
      answer:
        "Locate the sign-up button, enter your information, agree to Terms and Conditions, verify your email, complete your profile, start using Cevver.",
    },
    {
      question: "Can I search for vendors based on my budget?",
      answer:
        "Yes, you can filter vendors by price range to find services that fit within your budget. Our AI-driven budget tracker also provides recommendations to help you stay on track.",
    },
    {
      question: "Is my personal and payment information secure on Cevver?",
      answer:
        "Yes, your personal and payment information is secure on Cevver. Cevver takes extensive steps to ensure the security and privacy of your data including: Data Encryption, Secure Payment Processing, Data Privacy, Account Protection, and User Awareness.",
    },
    {
      question: "How do I communicate with vendors once I've found a match?",
      answer:
        "You can use our secure in-app messaging system to communicate directly with vendors. This ensures all your planning details are kept in one convenient place.",
    },
    {
      question: "Can I leave reviews for the vendors I hire?",
      answer:
        "Yes, after your event, you can rate and review the vendors you've worked with. Your feedback helps other users make informed decisions and helps vendors improve their services.",
    },
    {
      question: "How can I view my booked events?",
      answer:
        'Viewing your booked events on Cevver is simple and can be done in a few easy steps: Login to your Cevver dashboard, Navigate to your dashboard, Go to "Manage Bookings".',
    },
    {
      question: "What happens if an event is canceled or postponed?",
      answer:
        "Review the Terms and Conditions provided by the event organizer and vendors, as these will contain specific details about their cancellation and refund policies. Understanding these terms can help you know what to expect and your rights in the event of a cancellation or postponement.",
    },
  ];

  function VendorCards({ name, image }: { name: string; image: string }) {
    return (
      <div
        title="View Vendors"
        className="flex flex-col items-center w-full bg-white border border-[#CDCBCB] rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={() => router.push("/vendors")}
      >
        <Image
          src={image}
          alt={name + " Vendor"}
          width={250}
          height={200}
          className="rounded-t-lg w-full"
        />
        <div className="min-h-8 w-full py-4 px-2 m-auto flex flex-col items-center justify-center sm:min-h-20">
          <h3 className="font-semibold text-base lg:text-xl sm:text-lg">
            {name}
          </h3>
        </div>
      </div>
    );
  }

  function AboutCard({
    number,
    title,
    description,
  }: {
    number: number;
    title: string;
    description: string;
  }) {
    return (
      <div className="w-full bg-[#F8F8F8] p-12 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <h3 className="font-petrona font-semibold text-6xl mb-4">{number}</h3>
        <h4 className="font-semibold text-xl mb-4">{title}</h4>
        <p className="font-extralight leading-relaxed">{description}</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[url('/home-hero.svg')] bg-cover bg-no-repeat bg-left-bottom">
        <div className="max-w-[1600px] m-auto">
          <div className="flex flex-col justify-center min-h-screen px-8 pb-4 pt-20 max-w-5xl md:px-16">
            <h1 className="font-petrona font-semibold text-4xl leading-snug mb-2 lg:text-6xl lg:leading-snug sm:text-5xl sm:leading-snug">
              Discover and Book Event Vendors in One Place.
            </h1>
            <p className="text-lg mb-4">
              Connecting You with Trusted Vendors for Every Occasion.
            </p>
            <Button
              title="Find Vendors"
              text="Find Vendors"
              classNames="px-6 py-3 text-lg"
              onClick={() => router.push("/vendors")}
            />
            <p className="text-lg mt-8 mb-2">
              Find the right vendors for your next event
            </p>
            <Image
              title="Find the right vendors for your next event"
              src="/home-vendors.svg"
              alt="Vendors"
              width={250}
              height={200}
              className="cursor-pointer transition-opacity duration-300 hover:opacity-80"
              onClick={() => router.push("/vendors")}
            />
            <Link
              href="https://forms.office.com/r/DxaH58tCQp"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-8 mt-12 transition-all duration-300 hover:underline-offset-4"
            >
              Are you a business or vendor? Click here
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mt-0 mx-auto text-center px-8 md:mt-12 md:px-16">
        <h2 className="font-petrona font-semibold text-4xl mb-12 md:text-5xl">
          Discover Our Vendors
        </h2>
        <div className="flex justify-center flex-wrap gap-4 mb-4 md:mb-8 md:flex-nowrap">
          <div className="flex gap-4">
            <VendorCards name="Catering" image="/home-catering.png" />
            <VendorCards name="Decorations" image="/home-decorations.png" />
          </div>
          <div className="flex gap-4">
            <VendorCards name="Venues" image="/home-venues.png" />
            <VendorCards
              name="Audio and Visual"
              image="/home-audiovisual.png"
            />
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-4 mb-4 md:mb-8 md:flex-nowrap">
          <div className="flex gap-4">
            <VendorCards name="Entertainment" image="/home-entertainment.png" />
            <VendorCards
              name="Transportation"
              image="/home-transportation.png"
            />
          </div>
          <div className="flex gap-4">
            <VendorCards name="Photo and Video" image="/home-photovideo.png" />
            <VendorCards name="And More" image="/home-other.png" />
          </div>
        </div>
      </div>

      <div
        id="why-cevver"
        className="max-w-[1200px] mx-auto pt-28 px-8 md:px-16"
      >
        <h2 className="font-petrona font-semibold text-4xl mb-12 text-center md:text-5xl">
          Why Cevver?
        </h2>
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <AboutCard
            number={1}
            title="Search for any vendors, for any event."
            description="Quickly find vendors by category, location, price, and rating. Our comprehensive search makes it easy to discover the best vendors for any event."
          />
          <AboutCard
            number={2}
            title="Create a profile tailored specifically for your event."
            description="Easily create a profile tailored to your event needs. Get personalized matches that fit your event perfectly."
          />
        </div>
        <div className="flex flex-col justify-center gap-4 mt-8 md:flex-row">
          <AboutCard
            number={3}
            title="Connect with vendors and book them seamlessly."
            description="Chat with vendors and finalize bookings directly through our platform. Keep your planning organized and efficient."
          />
          <AboutCard
            number={4}
            title="Secure and manage payments easily."
            description="Track and manage all transactions effortlessly, keeping records clear for both vendors and celebrants."
          />
        </div>
      </div>

      <div id="faq" className="max-w-[1200px] mx-auto pt-28 px-8 md:px-16">
        <h2 className="font-petrona font-semibold text-4xl mb-12 text-center md:text-5xl">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              onClick={() => {
                setFaqOpenIndex(index === faqOpenIndex ? null : index);
              }}
            >
              <AccordionTrigger className="text-lg text-left [&[data-state=open]]:text-primary hover:no-underline hover:opacity-60">
                {item.question}
                {faqOpenIndex === index ? (
                  <MinusCircle className="ml-4 h-6 w-6 shrink-0 transition-transform duration-200" />
                ) : (
                  <PlusCircle className="ml-4 h-6 w-6 shrink-0 transition-transform duration-200" />
                )}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="bg-[url('/home-joinus-bg.svg')] bg-cover bg-no-repeat bg-left-center mt-28">
        <div className="max-w-[1000px] min-h-[500px] m-auto flex flex-col items-center justify-center px-8 py-12 md:px-16">
          <h2 className="font-petrona font-semibold text-4xl mb-12 text-center md:text-5xl">
            Join Cevver and Plan with Confidence
          </h2>
          <p className="text-center text-lg mb-12">
            Gain access to top-rated vendors, seamless booking, and AI-driven
            budget tracking. Create your free account and start planning your
            unforgettable event with ease and confidence.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://forms.gle/Yn29uGh8J8si6awdA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                title="Join Our Waitlist"
                text="Join Our Waitlist"
                classNames="px-4 py-2 text-base md:text-lg md:px-6 md:py-3"
              />
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
