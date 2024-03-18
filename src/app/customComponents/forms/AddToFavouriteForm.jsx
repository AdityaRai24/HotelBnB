"use client";

import { addToFavourites } from "@/lib/actions";
import { AddToFavourite } from "../submitButtons";
import toast from "react-hot-toast";

const AddToFavouriteForm = ({ homeId, userId, pathname }) => {
  return (
    <form action={async(formData)=>{
      const result = await addToFavourites(formData)
      if(result?.error){
        toast.error(result?.error)
      }else{
        toast.success("Home Added To Favourites")
      }
    }}>
      <input type="hidden" name="homeId" value={homeId} />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="pathname" value={pathname} />

      <div className="z-10 absolute top-2 right-2">
        <AddToFavourite />
      </div>
    </form>
  );
};

export default AddToFavouriteForm;
