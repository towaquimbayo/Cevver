"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  ArrowRightLeft,
  CalendarCheck,
  CreditCard,
  LifeBuoy,
  Maximize2,
  MessagesSquare,
  Minimize2,
  Settings,
  Store,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SidebarMenu({ activePage }: { activePage: string }) {
  const router = useRouter();

  const { isLoaded, userId, isSignedIn } = useAuth();
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId) router.push("/sign-in");
  }, [router, isLoaded, isSignedIn, userId]);

  function SidenavLink({
    link,
    text,
    icon,
    active,
  }: {
    link: string;
    text: string;
    icon: JSX.Element;
    active: boolean;
  }) {
    return (
      <div
        className={`flex items-center justify-start w-full py-3.5 px-4 cursor-pointer transition-all duration-300 ease-in-out rounded-lg ${
          active
            ? "bg-primary hover:bg-opacity-70"
            : "bg-white hover:bg-gray-100"
        }`}
        onClick={() => router.push(link)}
      >
        <div className={`${active ? "text-white" : "text-gray-600"}`}>
          {icon}
        </div>
        {menuOpen && (
          <p
            className={`ml-4 ${
              active ? "text-white font-medium" : "text-gray-600"
            }`}
          >
            {text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center bg-white border border-l-gray-300 px-2 py-4 gap-2 rounded-lg  h-fit transition-all duration-1000 ease-in-out ${
        menuOpen ? "w-80" : "w-[4.5rem]"
      }`}
    >
      {user && user?.imageUrl && user?.firstName && user?.lastName && (
        <div
          className={`flex items-center gap-4 w-full cursor-pointer ${
            menuOpen ? "justify-between mb-2 px-2" : "justify-center"
          }`}
        >
          {menuOpen ? (
            <>
              <div className="flex items-center gap-2.5">
                <Image
                  src={user?.imageUrl}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <p className="font-medium">
                  {user?.firstName} {user?.lastName?.charAt(0)}
                </p>
              </div>
              <div
                className="px-4 py-3.5"
                title="Minimize Sidebar"
                onClick={() => setMenuOpen(false)}
              >
                <Minimize2 size={20} className="text-gray-600" />
              </div>
            </>
          ) : (
            <div
              className="px-4 py-3.5"
              title="Expand Sidebar"
              onClick={() => setMenuOpen(true)}
            >
              <Maximize2 size={20} className="text-gray-600" />
            </div>
          )}
        </div>
      )}
      <SidenavLink
        link="/vendors"
        text="Vendors"
        icon={<Store size={20} />}
        active={activePage === "vendors"}
      />
      <SidenavLink
        link="/messages"
        text="Messages"
        icon={<MessagesSquare size={20} />}
        active={activePage === "messages"}
      />
      <SidenavLink
        link="/vendor-payment" // @TODO: Change this to /payments
        text="Payments"
        icon={<CreditCard size={20} />}
        active={activePage === "payments"}
      />
      <SidenavLink
        link="/transactions"
        text="Transactions"
        icon={<ArrowRightLeft size={20} />}
        active={activePage === "transactions"}
      />
      <SidenavLink
        link="/bookings"
        text="Manage Bookings"
        icon={<CalendarCheck size={20} />}
        active={activePage === "bookings"}
      />
      <SidenavLink
        link="/settings"
        text="Settings"
        icon={<Settings size={20} />}
        active={activePage === "settings"}
      />
      <SidenavLink
        link="/support"
        text="Support"
        icon={<LifeBuoy size={20} />}
        active={activePage === "support"}
      />
    </div>
  );
}
