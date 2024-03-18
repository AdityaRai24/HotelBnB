import User from "@/modals/User";
import { NextResponse } from "next/server";
import { Connection } from "@/lib/Connection";

export async function GET(req, { params }) {

  const userId = params?.userId;
  try {
    const response = await User.findById(userId)
      .populate("Favourites")
      .populate("Homes")
      .populate({
        path: 'Reservations',
        populate: { path: 'homeId' } 
      });
    return NextResponse.json(response);
  } catch (error) {
    throw new Error(error);
  }
}
