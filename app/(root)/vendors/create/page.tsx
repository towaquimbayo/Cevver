import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getUserById } from "@/lib/actions/user.actions"
import VendorForm from "@/components/shared/VendorForm"

export default async function CreateVendor() {
  const { userId  } = auth()

  if (!userId) redirect("/sign-in")

  const user = await getUserById(userId)

  return (
    <div className="mt-36">
      <section className="">
        <h3 className="wrapper font-petrona text-4xl text-center sm:text-left">Create Vendor</h3>
      </section>

      <div className="wrapper mb-8">
        <VendorForm userId={user._id} type="Create" />
      </div>
    </div>
  )
}
