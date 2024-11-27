"use client";
import { Key, useEffect, useMemo, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import SidebarMenu from "@/components/shared/SidebarMenu";

export default function Bookings() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  const [selectedTab, setSelectedTab] = useState("Upcoming");
  const tabLabels = ["All", "Upcoming", "Past"];
  const filteredVendors = useMemo(() => {
    const vendors = [
      {
        id: 1,
        title: "Wedding Photography",
        description:
          "Professional wedding photography services capturing every special moment.",
        price: 1500.0,
        category: "Photography",
        dateTime: "2024-06-15T14:00:00Z",
        hoursBooked: 6,
        status: "Upcoming",
      },
      {
        id: 2,
        title: "DJ Services",
        description:
          "Experienced DJ with a wide range of music genres to make your event unforgettable.",
        price: 800.0,
        category: "Entertainment",
        dateTime: "2024-06-20T18:00:00Z",
        hoursBooked: 4,
        status: "Upcoming",
      },
      {
        id: 3,
        title: "Catering Service",
        description:
          "Full-service catering with a variety of menu options to suit all tastes and dietary needs.",
        price: 2500.0,
        category: "Catering",
        dateTime: "2024-07-10T12:00:00Z",
        hoursBooked: 8,
        status: "Past",
      },
      {
        id: 4,
        title: "Event Planning",
        description:
          "Comprehensive event planning services to ensure your event runs smoothly and successfully.",
        price: 1200.0,
        category: "Event Planning",
        dateTime: "2024-08-01T09:00:00Z",
        hoursBooked: 10,
        status: "Past",
      },
      {
        id: 5,
        title: "Live Band Performance",
        description:
          "Energetic live band performance covering popular hits and classics.",
        price: 1800.0,
        category: "Entertainment",
        dateTime: "2024-06-30T19:00:00Z",
        hoursBooked: 5,
        status: "Upcoming",
      },
    ] as any[];

    if (!vendors || vendors.length === 0) return [];

    return vendors.filter((vendor) => {
      if (selectedTab === "All") return true;
      if (selectedTab === "Past") {
        return vendor.status === "Past";
      }
      if (selectedTab === "Upcoming") {
        return vendor.status === "Upcoming";
      }
      return false;
    });
  }, [selectedTab]);

  useEffect(() => {
    if (!isSignedIn && isLoaded) router.push("/signin");
  }, [isSignedIn, isLoaded, router]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "short",
    });
  }

  function formatTime(date: string) {
    return new Date(date).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour: "numeric",
      minute: "numeric",
    });
  }

  function getDateTime(date: string) {
    return `${formatDate(date)} at ${formatTime(date)}`;
  }

  function BookingTable() {
    return (
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left px-2 pb-2 text-sm lg:text-lg sm:text-base">
              Title
            </th>
            <th className="text-left px-2 pb-2 text-sm lg:text-lg sm:text-base">
              Category
            </th>
            <th className="text-left px-2 pb-2 text-sm hidden lg:text-lg sm:table-cell">
              Date & Time
            </th>
            <th className="text-left px-2 pb-2 text-sm lg:text-lg sm:text-base">
              Hours
            </th>
            <th className="text-right px-2 pb-2 text-sm lg:text-lg sm:text-base">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.map((vendor) => (
            <tr key={vendor.id} className="border-b border-[#f1f1f1]">
              <td className="text-left py-4 px-1 text-xs lg:text-base sm:text-sm sm:px-2">
                {vendor.title}
              </td>
              <td className="text-left py-4 px-1 text-xs lg:text-base sm:text-sm sm:px-2">
                {vendor.category}
              </td>
              <td className="text-left py-4 px-1 text-xs hidden lg:text-base sm:table-cell">
                {getDateTime(vendor.dateTime)}
              </td>
              <td className="text-left py-4 px-1 text-xs lg:text-base sm:text-sm sm:px-2">
                {vendor.hoursBooked}
              </td>
              <td className="text-right py-4 px-1 text-xs lg:text-base sm:text-sm sm:px-2">
                ${vendor.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto mt-36 mb-20 px-8 lg:px-16">
      <div className="flex justify-between mb-8">
        <SidebarMenu activePage="bookings" />
        <div className="w-full ml-12 py-5">
          <h1 className="font-petrona font-bold text-3xl mb-4 sm:text-5xl">
            Manage Bookings
          </h1>
          <p className="text-base mb-8 sm:text-lg">
            View and manage your vendor bookings here.
          </p>

          <Tabs
            color="primary"
            aria-label="Tab labels"
            radius="lg"
            size="lg"
            className="mb-8"
            selectedKey={selectedTab}
            onSelectionChange={(key: Key) => setSelectedTab(key as string)}
          >
            {tabLabels.map((label) => (
              <Tab key={label} title={<div className="px-4">{label}</div>}>
                {filteredVendors && filteredVendors.length > 0 ? (
                  BookingTable()
                ) : (
                  <Card shadow="none" className="w-full">
                    <CardBody className="p-0">
                      <p className="text-lg">
                        No bookings found for this category. To get started,
                        browse our vendors and book your favorite services.
                      </p>
                    </CardBody>
                  </Card>
                )}
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
