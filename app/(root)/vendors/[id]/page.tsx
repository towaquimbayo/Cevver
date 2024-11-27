import Image from 'next/image';
import { currentUser } from '@clerk/nextjs/server'
import { MapPin } from 'lucide-react';

import BookingForm from '@/components/shared/BookingForm';
import { getVendorById } from '@/lib/actions/vendor.actions';
import Reviews from '@/components/shared/Reviews';

const VendorDetails = async ({ params: { id }, searchParams }: SearchParams) => {
  const user = await currentUser()

  try {
    const vendor = await getVendorById(id)

    if (!vendor.images[0]) {
      vendor.images = ['https://via.placeholder.com/1000'];
    }

    return (
      <div className='max-w-[1600px] mx-auto mt-36 mb-20 px-8 lg:px-16'>
        <section className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
            <Image 
              src={vendor.images[0]}
              alt="hero image"
              width={1000}
              height={1000}
              className="h-full min-h-[300px] object-cover object-center"
            />

            <div className="flex w-full flex-col gap-8 p-5 md:p-10">
              <div className="flex flex-col gap-6">
                <h2 className='text-3xl font-bold'>{vendor.title}</h2>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex gap-3">
                    <p className="rounded-full bg-green-500/10 px-4 py-2.5 text-green-700">
                      ${vendor.price}
                    </p>
                    <p className="rounded-full bg-gray-500/10 px-4 py-2.5 text-gray-500">
                      {vendor.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="p-regular-20 flex items-center gap-3">
                  <MapPin size={24} color='#777777' />
                  <p className="p-medium-16 lg:p-regular-20">{vendor.location}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="p-medium-16 lg:p-regular-18">{vendor.description}</p>
              </div>

              <Reviews vendorId={id} />

              {user && (
                <BookingForm vendor={vendor} />
              )}
            </div>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    return (
      <div className='h-full flex items-center justify-center'>
        <p className='text-center text-xl'>This vendor does not exist.</p>
      </div>
    )
  }
}

export default VendorDetails