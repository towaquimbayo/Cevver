"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Button from "./button";
import MobileNav from "./mobileNav";

export default function Navbar() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  function NavLink({ href = "", name = "" }) {
    const path = usePathname();
    const active = path === href;

    useEffect(() => {
      if (active) document.title = `Cevver | ${name}`;
    }, [active, name]);

    return (
      <Link
        href={href}
        className={`hidden items-center md:block transition-all duration-300 ease-in-out hover:opacity-50 ${
          active ? "font-semibold text-primary" : "text-altBlack"
        }`}
      >
        {name}
      </Link>
    );
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md">
        <div className="max-w-[1600px] flex items-center justify-between gap-4 py-1 px-8 m-auto lg:px-16">
          <Menu
            size={32}
            className="md:hidden block"
            onClick={() => setHamburgerMenuOpen(true)}
          />

          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Cevver logo"
              width="120"
              height="100"
              style={{ objectFit: "contain" }}
              className="mr-2"
            />
          </Link>

          <div className="flex items-center space-x-8 min-w-8">
            <NavLink href="/vendors/" name="Vendors" />
            {isSignedIn && (
              <>
                <NavLink href="/vendors/create/" name="Create Vendor" />
                <NavLink href="/events/create/" name="Create Event" />
              </>
            )}
            <NavLink href="/#faq" name="FAQ" />
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <Button
                  title="Login"
                  onClick={() => router.push("/sign-in")}
                  text="Login"
                  outline
                  classNames="hidden md:block"
                />
                <Button
                  title="Sign up"
                  onClick={() => router.push("/sign-up")}
                  text="Sign up"
                  classNames="hidden md:block"
                />
              </>
            )}
          </div>
        </div>
      </nav>
      <MobileNav open={hamburgerMenuOpen} setOpen={setHamburgerMenuOpen} />
    </>
  );
}
