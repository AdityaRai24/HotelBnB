import { Suspense } from "react";
import SearchComponent from "../customComponents/SearchComponent";
import SearchFiltering from "../customComponents/SearchFiltering";
import { MapFilterItems } from "../customComponents/create/MapFilterItems";
import SkeletonCard from "../customComponents/SkeletonCard";

unstable_noStore()
const page = async ({ searchParams }) => {
  return (
    <>
      <div className="container mx-auto px-5 lg:px-10">
        <MapFilterItems />
        <SearchFiltering />
        <Suspense key={searchParams?.city} fallback={<SkeletionLoading />}>
          <SearchComponent searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
};

function SkeletionLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}


export default page;
