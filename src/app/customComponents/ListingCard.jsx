"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AddToFavouriteForm from "./forms/AddToFavouriteForm";
import RemoveFromFavouriteForm from "./forms/RemoveFromFavouriteForm";
import { Button } from "@/components/ui/button";

const ListingCard = ({ item, favs, pathname }) => {
  const { data: session } = useSession();

  const favList = favs?.map((fav) => fav._id);

  let favourite = "false";
  if (favList?.includes(item._id)) {
    favourite = "true";
  } else {
    favourite = "false";
  }

  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden rounded-lg h-72">
        <Image
          src={item.photo}
          alt="image of a house"
          className="rounded-lg h-full object-cover hover:scale-[1.05] cursor-pointer transition duration-300 ease"
          fill
        />
        {session?.user?.id ? (
          favList?.includes(item._id) ? (
            <RemoveFromFavouriteForm
              userId={session?.user?.id}
              homeId={item._id}
              pathname={pathname}
            />
          ) : (
            <AddToFavouriteForm
              homeId={item._id}
              userId={session?.user?.id}
              pathname={pathname}
            />
          )
        ) : (
          ""
        )}
      </div>
      <Link href={`/home/${item._id}`} className="mt-2">
        <h3 className="font-medium text-base">
          {item.city} / {item.country}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {item.description}
        </p>
        <p className="mt-2 text-black font-light ">
          <span className="font-bold text-black"> ₹{item.price}</span> / Night
        </p>
        <Button className="my-2 w-full">View Details</Button>
      </Link>
    </div>
  );
};

export default ListingCard;
