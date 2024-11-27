import { getEventById } from "@/lib/actions/event.actions"
import { currentUser } from "@clerk/nextjs/server"
import { MapPin } from "lucide-react"

const EventDetails = async ({ params: { id }, searchParams }: SearchParams) => {
  const user = await currentUser()

  try {
    const event = await getEventById(id)

    return (
      <div className='mt-20'>
        <section className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
            <div className="flex w-full flex-col gap-8 p-5 md:p-10">
              <div className="flex flex-col gap-6">
                <h2 className='text-3xl font-bold'>{event.title}</h2>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex gap-3">
                    <p className="rounded-full bg-green-500/10 px-4 py-2.5 text-green-700">
                      ${event.budget}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="p-regular-20 flex items-center gap-3">
                  <MapPin size={24} color='#777777' />
                  <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    return (
      <div className='h-full flex items-center justify-center'>
        <p className='text-center text-xl'>This event does not exist.</p>
      </div>
    )
  }
}

export default EventDetails
    