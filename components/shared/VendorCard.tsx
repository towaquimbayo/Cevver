import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Pencil } from "lucide-react";

import { IVendor } from "@/lib/database/models/vendor.model";

export default function VendorCard({ vendor }: { vendor: IVendor }) {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string
  const isVendorCreator = user ? userId === vendor.vendorId._id : false;

  if (!vendor.images[0]) {
    vendor.images = ["https://via.placeholder.com/1000"];
  }

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/vendors/${vendor._id}`}
        style={{ backgroundImage: `url(${vendor.images[0]})` }}
        className="flex justify-center items-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
      />

      {isVendorCreator && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-lg bg-white p-3 shadow-sm transition-all">
          <Link href={`/vendors/${vendor._id}/update`}>
            <Pencil size={18} color="#777777" />
          </Link>
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-2">
          <span className="text-sm w-min rounded-full bg-green-100 px-4 py-1 text-green-600">
            ${vendor.price}
          </span>
          <p className="text-sm w-min rounded-full bg-gray-100 px-4 py-1 text-gray-600">
            {vendor.category}
          </p>
        </div>

        <p className="text-md text-gray-500">{vendor.location}</p>

        <Link href={`/vendors/${vendor._id}`}>
          <p className="text-lg font-bold line-clamp-2 flex-1 text-black">
            {vendor.title}
          </p>
        </Link>

        <p className="text-sm text-gray-500 line-clamp-3">
          {vendor.description}
        </p>

        <div className="flex items-center justify-between">
          <Link href={`/vendors/${vendor._id}`}>
            <button className="text-sm text-white bg-primary rounded-lg px-6 py-2">
              View Vendor
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
