"use client";
import { useEffect, useMemo, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getEventsByUser, deleteEvent } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";

export default function Events() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser()
  const userId = user?.publicMetadata.userId as string

  const [selectedTab, setSelectedTab] = useState("All");
  const tabLabels = ["All", "Upcoming", "Past"];
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    if (!isSignedIn && isLoaded) router.push("/sign-in");
    if (userId) {
      getEventsByUser(userId).then(setEvents);
    }
  }, [isSignedIn, isLoaded, router, userId]);

  const filteredEvents = useMemo(() => {
    if (!events || events.length === 0) return [];

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      const now = new Date();
      if (selectedTab === "All") return true;
      if (selectedTab === "Past") return eventDate < now;
      if (selectedTab === "Upcoming") return eventDate >= now;
      return false;
    });
  }, [selectedTab, events]);

  function EventTable() {
    const handleDeleteEvent = async (eventId: string) => {
      if (window.confirm("Are you sure you want to delete this event?")) {
        await deleteEvent(eventId);
        
        if (userId) {
          getEventsByUser(userId).then(setEvents);
        }
      }
    };

    return (
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left px-2 pb-2 text-sm lg:text-lg sm:text-base">Title</th>
            <th className="text-left px-2 pb-2 text-sm lg:text-lg sm:text-base">Budget</th>
            <th className="text-left px-2 pb-2 text-sm lg:text-lg sm:text-base">Location</th>
            <th className="text-left px-2 pb-2 text-sm hidden lg:text-lg sm:table-cell">Date</th>
            <th className="text-right px-2 pb-2 text-sm lg:text-lg sm:text-base">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event._id as string} className="border-b border-[#f1f1f1]">
              <td className="text-left py-4 px-1 text-xs lg:text-base sm:text-sm sm:px-2">{event.title}</td>
              <td className="text-left py-4 px-1 text-xs lg:text-base sm:text-sm sm:px-2">${event.budget}</td>
              <td className="text-left py-4 px-1 text-xs lg:text-base sm:text-sm sm:px-2">{event.location}</td>
              <td className="text-left py-4 px-1 text-xs hidden lg:text-base sm:table-cell">{new Date(event.date).toLocaleDateString()}</td>
              <td className="text-right py-4 px-1 text-xs lg:text-base sm:text-sm sm:px-2">
                <Button 
                  variant="secondary"
                  onClick={() => handleDeleteEvent(event._id as string)}
                >
                  Delete Event
                </Button>
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
        <div className="w-full ml-12 py-5">
          <h1 className="font-petrona font-bold text-3xl mb-4 sm:text-5xl">My Events</h1>
          <p className="text-base mb-8 sm:text-lg">View and manage your events here.</p>

          <Tabs
            color="primary"
            aria-label="Tab labels"
            radius="lg"
            size="lg"
            className="mb-8"
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
          >
            {tabLabels.map((label) => (
              <Tab key={label} title={<div className="px-4">{label}</div>}>
                {filteredEvents && filteredEvents.length > 0 ? (
                  EventTable()
                ) : (
                  <Card shadow="none" className="w-full">
                    <CardBody className="p-0">
                      <p className="text-lg">No events found for this category. Create a new event to get started.</p>
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