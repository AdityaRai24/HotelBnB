import axios from "axios";
import { getServerSession } from "next-auth";
import NoItems from "../customComponents/categories/NoItems";
import ListingCard from "../customComponents/ListingCard";
import { redirect } from "next/navigation";



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
  const userId = await getUserId(session?.user?.email);
  const allUserData = await getAllUserData(userId);
  
  if(!session){
    return redirect("/")
  }
  return (
    <>
      <h1 className="font-medium text-3xl mt-8 container px-5 lg:px-10">
        Your Favourites
      </h1>
      {allUserData?.Favourites?.length === 0 || allUserData===null ? (
        <NoItems
          heading="Sorry you do not have any Favourite Homes currently..."
          text="Explore more homes and mark Favourite to see them here..."
        />
      ) : (
        <div className="container mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {allUserData?.Favourites?.map((item) => {
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
