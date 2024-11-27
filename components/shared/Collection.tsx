import { IVendor } from "@/lib/database/models/vendor.model";
import Pagination from "@/components/shared/Pagination";
import VendorCard from "@/components/shared/VendorCard";

const Collection = ({ data, emptyTitle, emptyStateSubtext, page, totalPages = 0, collectionType, urlParamName }: {
  data: IVendor[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  collectionType?: 'all_vendors' | 'all_bookings';
  urlParamName?: string;
}) => {
  return (
    <div className="">
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((vendor) => (
              <li key={vendor._id as string} className="flex justify-center">
                <VendorCard vendor={vendor} />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <Pagination urlParamName={urlParamName} totalPages={totalPages} page={page} />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-lg bg-gray-50 py-28 text-center">
          <h3 className="text-2xl font-bold">{emptyTitle}</h3>
          <p className="text-lg">{emptyStateSubtext}</p>
        </div>
      )}
    </div>
  )
}

export default Collection