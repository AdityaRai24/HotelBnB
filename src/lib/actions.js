"use server";

import Home from "@/modals/Home";
import Reservation from "@/modals/Reservation";
import User from "@/modals/User";
import Favourite from "@/modals/Favourites";
import { Connection } from "./Connection";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createBnBHome({ userId }) {
  await Connection();
  const response = await Home.findOne({ postedBy: userId });
  if (response === null) {
    const create = await Home.create({ postedBy: userId });
    const userUpdate = await User.findByIdAndUpdate(userId, {
      $push: { Homes: create._id },
    });
    return redirect(`/create/${create._id}/structure`);
  } else {
    const findStep1 = await Home.findOne({
      postedBy: userId,
      addedCategory: false,
      addedDescription: false,
      addedLocation: false,
    });
    const findStep2 = await Home.findOne({
      postedBy: userId,
      addedCategory: true,
      addedDescription: false,
      addedLocation: false,
    });

    const findStep3 = await Home.findOne({
      postedBy: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: false,
    });
    console.log(findStep1, findStep2, findStep3);

    if (findStep1) {
      return redirect(`/create/${findStep1._id}/structure`);
    } else if (findStep2) {
      return redirect(`/create/${findStep2._id}/description`);
    } else if (findStep3) {
      return redirect(`/create/${findStep3._id}/location`);
    } else {
      const create = await Home.create({ postedBy: userId });
      const userUpdate = await User.findByIdAndUpdate(userId, {
        $push: { Homes: create._id },
      });
      return redirect(`/create/${create._id}/structure`);
    }
  }
}

export async function createCategory(formData) {
  await Connection();

  const categoryName = formData.get("categoryName");
  const homeId = formData.get("homeId");

  const data = await Home.findByIdAndUpdate(
    homeId,
    { categoryName: categoryName, addedCategory: true },
    { new: true }
  );
  return redirect(`/create/${homeId}/description`);
}

export async function createDescription(formData) {
  await Connection();

  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const image = formData.get("image");
  const guestsCount = parseInt(formData.get("guestsCount"));
  const bedroomCount = parseInt(formData.get("bedroomCount"));
  const bathroomCount = parseInt(formData.get("bathroomCount"));
  const homeId = formData.get("homeId");

  const response = await Home.findByIdAndUpdate(
    homeId,
    {
      title: title,
      description: description,
      price: price,
      photo: image,
      guestsCount,
      bedroomCount,
      bathroomCount,
      addedDescription: true,
    },
    { new: true }
  );
  return redirect(`/create/${homeId}/location`);
}

export async function createLocation(formData) {
  await Connection();

  try {
    const country = formData.get("country");
    const city = formData.get("city");
    const state = formData.get("state");
    const cityLong = formData.get("cityLong");
    const cityLat = formData.get("cityLat");
    const homeId = formData.get("homeId");

    const response = await Home.findByIdAndUpdate(
      homeId,
      { country, city, state, cityLong, cityLat, addedLocation: true },
      { new: true }
    );
  } catch (error) {
    return { error: "Something went wrong here" };
  }
  return redirect(`/`);
}

export async function addToFavourites(formData) {
  await Connection();

  try {
    const homeId = formData.get("homeId");
    const userId = formData.get("userId");
    const pathname = formData.get("pathname");

    const response = await Favourite.find({ userId });
    if (response.length > 0) {
      const update = await Favourite.findOneAndUpdate(
        { userId },
        { $addToSet: { homeId } }
      );
      const userFav = await User.findByIdAndUpdate(userId, {
        $addToSet: { Favourites: homeId },
      });
    } else {
      const create = await Favourite.create({ userId, homeId });
      const userFav = await User.findByIdAndUpdate(userId, {
        $addToSet: { Favourites: homeId },
      });
    }
    revalidatePath(pathname);
  } catch (error) {
    return {
      error: "Something went wrong.",
    };
  }
}

export async function removeFromFavourites(formData) {
  await Connection();

  try {
    const homeId = formData.get("homeId");
    const userId = formData.get("userId");
    const pathname = formData.get("pathname");

    const update = await Favourite.findOneAndUpdate(
      { userId },
      { $pull: { homeId } }
    );
    const userFav = await User.findByIdAndUpdate(userId, {
      $pull: { Favourites: homeId },
    });

    revalidatePath(pathname);
  } catch (error) {
    return {
      error: "Home Removed From Favourites",
    };
  }
}

export async function makeReservation(formData) {
  await Connection();

  const homeId = formData.get("homeId");
  const userId = formData.get("userId");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const response = await Reservation.create({
    userId,
    homeId,
    startDate,
    endDate,
  });

  const userRes = await User.findByIdAndUpdate(userId, {
    $push: { Reservations: response._id },
  });
  revalidatePath("/myreservations");

  return redirect("/");
}

export async function searchAction(formData) {
  const country = formData.get("country");
  const state = formData.get("state");
  const city = formData.get("city");
  const cityLong = formData.get("cityLong");
  const cityLat = formData.get("cityLat");


  return redirect(`/search?city=${city}&state=${state}&country=${country}`);
}
