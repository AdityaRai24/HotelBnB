import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import axios from 'axios'
import ListingCard from "../customComponents/ListingCard";
import NoItems from "../customComponents/categories/NoItems";

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

export default async function page() {
  const session = await getServerSession();
  if (!session) {
    return redirect("/");
  }
  const userId = await getUserId(session?.user?.email);
  const allUserData = await getAllUserData(userId);
  return (
    <>
      <h1 className="font-medium text-3xl mt-8 container px-5 lg:px-10">
        My Hotels
      </h1>
      {allUserData?.Homes?.length === 0 || allUserData===null ? (
        <NoItems
          heading="Sorry you have not created any Hotels currently..."
          text="ECreate more hotels to see them here..."
        />
      ) : (
        <div className="container mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {allUserData?.Homes?.map((item) => {
              return (
                <ListingCard
                  pathname={"/"}
                  favs={allUserData?.Favourites}
                  item={item}
                  key={item._id}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
