import { MapFilterItems } from "./customComponents/create/MapFilterItems";
import axios from "axios";
import ListingCard from "./customComponents/ListingCard";
import { Suspense } from "react";
import SkeletonCard from "./customComponents/SkeletonCard";
import NoItems from "./customComponents/categories/NoItems";
import { getServerSession } from "next-auth";

async function getData({ searchParams }) {
  try {
    const data = await axios.get(
      `http://localhost:3000/api/getData?filter=${searchParams.filter}`
    );
    return data.data.data;
  } catch (error) {
    console.log(error.response.data.msg);
  }
}

async function getUserData(email) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/getUserData/${email}`
    );
    return response.data;
  } catch (error) {
    console.log("something went wrong");
  }
}

async function getAllUserData(userId) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/getAllUserData/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default function Home({ searchParams }) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <Suspense key={searchParams?.filter} fallback={<SkeletionLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

const ItemsList = ({ data, favs, pathname }) => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      {data?.map((item) => (
        <ListingCard
          pathname={pathname}
          favs={favs}
          item={item}
          key={item._id}
        />
      ))}
    </div>
  );
};

async function ShowItems({ searchParams }) {
  const data = await getData({ searchParams });
  const session = await getServerSession();
  const userId =  session?.user ? await getUserData(session?.user.email) : null;
  const allUserData = userId ? await getAllUserData(userId) : null;
  return (
    <>

      {data?.length === 0 ? (
        <NoItems
          heading="No Items Found"
          text="No items here currently...Please come back later..."
        />
      ) : (
        <ItemsList data={data} favs={allUserData?.Favourites} pathname={"/"} />
      )}
    </>
  );
}

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
