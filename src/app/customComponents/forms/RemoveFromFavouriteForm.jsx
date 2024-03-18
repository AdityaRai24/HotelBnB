"use client";

import { removeFromFavourites } from "@/lib/actions";
import { RemoveFromFavourite } from "../submitButtons";
import toast from "react-hot-toast";

const RemoveFromFavouriteForm = ({ userId, homeId, pathname }) => {
  return (
    <form
      action={async (formData) => {
        const result = await removeFromFavourites(formData);
        if (result?.error) {
          toast.error(result?.error);
        } else {
          toast.success("Home Removed From Favourites..");
        }
      }}
    >
      <input type="hidden" name="homeId" value={homeId} />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="pathname" value={pathname} />

      <div className="z-10 absolute top-2 right-2">
        <RemoveFromFavourite />
      </div>
    </form>
  );
};

export default RemoveFromFavouriteForm;
