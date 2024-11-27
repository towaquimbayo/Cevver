import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getUserById } from "@/lib/actions/user.actions"
import EventForm from "@/components/shared/EventForm"

export default async function CreateEvent() {
  const { userId  } = auth()

  if (!userId) redirect("/sign-in")

  const user = await getUserById(userId)

  return (
    <div className="mt-36">
      <section className="">
        <h3 className="wrapper font-petrona text-4xl text-center sm:text-left">Create Event</h3>
      </section>

      <div className="wrapper mb-8">
        <EventForm userId={user._id} type="Create" />
      </div>
    </div>
  )
}