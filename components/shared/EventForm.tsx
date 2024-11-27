'use client'

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPin, DollarSign, Calendar } from "lucide-react"

import { IEvent } from "@/lib/database/models/event.model"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"

const eventFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string(),
  location: z.string().min(1),
  budget: z.coerce.number().min(0.00).multipleOf(0.01)
})

export default function EventForm({ userId, type, event, eventId }: {
  userId: string,
  type: "Create" | "Update",
  event?: IEvent,
  eventId?: string
}) {
  const router = useRouter()

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event && type === 'Update' 
      ? {
        ...event,
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
      } : {
        title: event?.title || "",
        description: event?.description || "",
        date: event?.date ? new Date(event.date).toISOString().split('T')[0] : '',
        location: event?.location || "",
        budget: event?.budget || 0.00,
      }
  })

  const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    if (type === 'Create') {
      try {
        const newEvent = await createEvent({
          ...values, 
          date: new Date(values.date),
          organizerId: userId
        })

        if (newEvent) {
          form.reset()
          router.push(`/events`)
          // router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        console.error(error)
      }
    } else if (type === 'Update') {
      if (!eventId) {
        router.back()
        return
      }

      try {
        const updatedEvent = await updateEvent(eventId, {
          ...values, 
          date: new Date(values.date),
        })

        if (updatedEvent) {
          form.reset()
          router.push(`/events`)
          // router.push(`/events/${updatedEvent._id}`)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Title" className="input-field" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex justify-center items-center h-[54px] w-full overflow-hidden rounded-lg bg-gray-50 px-4 py-2">
                      <Calendar size={24} color="#777777" />
                      <Input type="date" className="input-field" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-64">
                    <Textarea placeholder="Description" className="textarea rounded-lg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex justify-center items-center h-[54px] w-full overflow-hidden rounded-lg bg-gray-50 px-4 py-2">
                      <MapPin size={24} color="#777777" />
                      <Input placeholder="Location" className="input-field" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex justify-center items-center h-[54px] w-full overflow-hidden rounded-lg bg-gray-50 px-4 py-2">
                      <DollarSign size={24} color="#777777" />
                      
                      <Input 
                        type="number" 
                        placeholder="Budget" 
                        className="input-field" 
                        {...field} 
                        min={0.00}
                        step="0.01"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}