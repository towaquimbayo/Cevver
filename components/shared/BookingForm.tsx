'use client'

import { useUser } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { IVendor } from '@/lib/database/models/vendor.model'
import { createBooking } from '@/lib/actions/booking.actions'

const BookingForm = ({ vendor }: { vendor: IVendor }) => {
  const { user } = useUser()
  const userId = user?.publicMetadata.userId as string

  const onSubmit = async () => {
    const booking = {
      organizerId: userId,
      vendorId: vendor._id as string,
    }

    await createBooking(booking)
  }

  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <form action={onSubmit} method='post'>
        <Button 
          type="submit"
          size="lg"
          className="w-full">
            Book Now
        </Button>
      </form>
    </div>
  )
}

export default BookingForm