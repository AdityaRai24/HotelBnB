import User from "@/modals/User";
import { NextResponse } from "next/server";
import { Connection } from "@/lib/Connection";
import { unstable_noStore } from "next/cache";
export const dynamic = 'auto'


unstable_noStore()
export async function GET(req, { params }) {
  await Connection();

  try {
    const email = params.email;
    const response = await User.findOne({ email: email });
    return NextResponse.json(response._id);
  } catch (error) {
    return NextResponse.json({msg:"Something went wrong"},{status:500});
  }
}
