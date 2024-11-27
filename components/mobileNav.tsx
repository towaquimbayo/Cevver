import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  LogIn,
  UserPlus,
  X as CloseIcon,
  Store,
  CalendarCheck,
  HelpCircle,
  PackagePlus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MobileNav({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  function NavLink({
    href = "",
    name = "",
    children,
  }: {
    href: string;
    name: string;
    children: React.ReactNode;
  }) {
    const path = usePathname();
    const active = path === href;

    useEffect(() => {
      if (active) document.title = `Cevver | ${name}`;
    }, [active, name]);

    return (
      <Link
        href={href}
        className={`flex items-center gap-3 text-lg transition-all duration-300 ease-in-out hover:opacity-50 ${
          active ? "font-semibold text-primary" : "text-altBlack"
        }`}
        onClick={() => setOpen(false)}
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      className={`md:hidden fixed top-0 start-0 w-[90%] h-full bg-white shadow-xl z-50 transition-transform duration-1000 ease-in-out ${
        open ? "-translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col px-6 py-8">
        <div className="flex items-center justify-between w-full">
          <Image
            src="/logo.svg"
            alt="Cevver logo"
            width="120"
            height="100"
            style={{ objectFit: "contain" }}
            onClick={() => {
              setOpen(false);
              router.push("/");
            }}
          />
          <CloseIcon
            size={32}
            className="text-black hover:text-primary"
            onClick={() => setOpen(false)}
          />
        </div>
        <ul className="flex flex-col gap-2 pt-8">
          <li className="rounded-lg py-2 px-2">
            <NavLink href="/vendors/" name="Vendors">
              <Store size={24} /> Vendors
            </NavLink>
          </li>
          {isSignedIn && (
            <>
              <li className="rounded-lg py-2 px-2">
                <NavLink href="/bookings/" name="Bookings">
                  <CalendarCheck size={24} /> Bookings
                </NavLink>
              </li>
              <li className="rounded-lg py-2 px-2">
                <NavLink href="/vendors/create/" name="Create Vendor">
                  <PackagePlus size={24} /> Create Vendor
                </NavLink>
              </li>
              <li className="rounded-lg py-2 px-2">
                <NavLink href="/event/create/" name="Create Event">
                  <CalendarCheck size={24} /> Create Event
                </NavLink>
              </li>
            </>
          )}
          <li className="rounded-lg py-2 px-2">
            <NavLink href="/#faq" name="FAQ">
              <HelpCircle size={24} /> FAQ
            </NavLink>
          </li>
          {!isSignedIn && (
            <>
              <li className="rounded-lg py-2 px-2">
                <NavLink href="/sign-in" name="Login">
                  <LogIn size={24} /> Login
                </NavLink>
              </li>
              <li className="rounded-lg py-2 px-2">
                <NavLink href="/sign-up" name="Sign Up">
                  <UserPlus size={24} /> Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
