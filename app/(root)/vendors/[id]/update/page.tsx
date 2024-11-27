import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getUserById } from "@/lib/actions/user.actions"
import { getVendorById } from "@/lib/actions/vendor.actions"
import VendorForm from "@/components/shared/VendorForm"

export default async function UpdateVendor({ params: { id } }: {
  params: {
    id: string
  }
}) {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const user = await getUserById(userId)
  const vendor = await getVendorById(id)

  return (
    <div className="mt-20">
      <section className="bg-gray-50 bg-waves-pattern bg-cover py-5 md:py-10">
        <h3 className="wrapper font-petrona text-4xl text-center sm:text-left">Update Vendor</h3>
      </section>

      <div className="wrapper my-8">
        <VendorForm userId={user._id} type="Update" vendor={vendor} vendorId={vendor._id} />
      </div>
    </div>
  )
}
