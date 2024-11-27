import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getUserById } from "@/lib/actions/user.actions"
import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions"

export default async function UpdateEvent({ params: { id } }: {
  params: {
    id: string
  }
}) {
  const { userId  } = auth()

  if (!userId) redirect("/sign-in")

  const user = await getUserById(userId)
  const event = await getEventById(id)

  return (
    <div className="mt-36">
      <section className="">
        <h3 className="wrapper font-petrona text-4xl text-center sm:text-left">Update Event</h3>
      </section>

      <div className="wrapper mb-8">
        <EventForm userId={user._id} type="Update" event={event} eventId={event._id} />
      </div>
    </div>
  )
}