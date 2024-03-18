import User from "@/modals/User";
import { NextResponse } from "next/server";
import { Connection } from "@/lib/Connection";
import { unstable_noStore } from "next/cache";
export const dynamic = 'auto'

unstable_noStore()
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
