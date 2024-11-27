"use client";

import { getVendors } from "@/lib/actions/vendor.actions";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";
import SidebarMenu from "@/components/shared/SidebarMenu";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function Vendors({ searchParams }: SearchParams) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const [vendors, setVendors] = useState<{
    data: any;
    totalPages: number;
  } | null>(null);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    async function fetchVendors() {
      const fetchedVendors = await getVendors({
        query: searchText,
        limit: 6,
        page,
        category,
      });

      if (!fetchedVendors) return;
      setVendors(fetchedVendors);
    }

    fetchVendors();
  }, [searchText, page, category]);

  return (
    <div className="max-w-[1600px] mx-auto mt-36 mb-20 px-8 lg:px-16">
      <div className="flex justify-between mb-8">
        {isSignedIn && <SidebarMenu activePage="vendors" />}
        <div className="w-full ml-12">
          <div id="vendors" className="wrapper flex flex-col">
            <h1 className="font-petrona font-bold text-3xl mb-4 sm:text-5xl">
              Vendors
            </h1>
            <p className="text-base mb-8 sm:text-lg">
              Find the perfect vendor for your event or special occasion.
            </p>

            <div className="flex flex-col w-full gap-5 mb-8 md:flex-row">
              <Search />
              <CategoryFilter />
            </div>

            {vendors && (
              <Collection
                data={vendors?.data}
                emptyTitle="No vendors found"
                emptyStateSubtext="Come back later"
                collectionType="all_vendors"
                limit={6}
                page={page}
                totalPages={vendors?.totalPages}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
