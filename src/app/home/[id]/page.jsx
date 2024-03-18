import CategoryShowcase from "@/app/customComponents/categories/CategoryShowcase";
import ReservationForm from "@/app/customComponents/forms/ReservationForm";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

async function getHomeWithId(homeId) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/getHomeWithId/${homeId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getReservations(homeId){
    try {
        const response = await axios.get(
          `http://localhost:3000/api/getReservations/${homeId}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
}

async function getUserId(email) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/getUserData/${email}`
    );
    return response.data;
  } catch (error) {
    console.log("something went wrong");
  }
}

const page = async ({ params }) => {
  const data = await getHomeWithId(params.id);
  const reservations = await getReservations(params.id);
  const LazyMap = dynamic(() => import("@/app/customComponents/create/Map"), {
    ssr: false,
    loading: ()=><Skeleton className="h-[50vh] w-full"/>
  });
  const session = await getServerSession();
  const userId =  await getUserId(session?.user?.email) 
  return (
    <div className="w-[85%] md:w-[80%] lg:w-[75%] mx-auto my-10">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[300px] lg:h-[450px]">
        <Image
          alt={data?.title}
          src={data?.photo}
          className="rounded-lg h-full object-cover w-full"
          fill
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-x-24 mt-8">
        <div className="w-full lg:w-2/3">
          <h3 className="text-xl font-medium">
            {data?.city} / {data?.state} / {data?.country}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guestsCount} Guests</p> *{" "}
            <p>{data?.bedroomCount} Bedrooms</p> *{" "}
            <p>{data?.bathroomCount} Bathrooms</p>
          </div>
          <Separator className="mt-6 mb-4" />
          <div className="flex items-center ">
            <Image
              src={data?.postedBy?.profilePic ?? "/defaultAvatar.jpg"}
              className="rounded-full"
              alt="user profile"
              width={40}
              height={40}
            />

            <div className="flex flex-col ml-4">
              <h3 className="font-medium">
                Hosted By : {data?.postedBy?.name}
              </h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>
          <Separator className="mt-4" />
          <div className="mt-6">
            <p>{data?.description}</p>
          </div>
          <CategoryShowcase categoryName={data?.categoryName} />
          <div className="my-6">
            <LazyMap cityLat={data?.cityLat} cityLong={data?.cityLong}/>
          </div>
        </div>
        <ReservationForm userId={userId} disabled={userId ? false : true} homeId={data?._id} reservations={reservations}/>
      </div>
    </div>
  );
};

export default page;
