import { Connection } from "@/lib/Connection";
import Home from "@/modals/Home";
import { unstable_noStore } from "next/cache";
import { NextResponse } from "next/server";


unstable_noStore()
export async function GET(req) {
  try {
    await Connection();
    const url = new URL(req.url) || "";
    const searchParams = new URLSearchParams(url.searchParams) || "";

    let queries = {};

    if (searchParams.get("city")) {
      queries.city = searchParams.get("city");
    }
    if (searchParams.get("state")) {
      queries.state = searchParams.get("state");
    }
    if (searchParams.get("country")) {
      queries.country = searchParams.get("country");
    }
    if (searchParams.get("guests")) {
      queries.guestsCount = searchParams.get("guests"); 
    }
    if (searchParams.get("bedrooms")) {
      queries.bedroomCount = searchParams.get("bedrooms"); 
    }
    if (searchParams.get("bathrooms")) {
      queries.bathroomCount = searchParams.get("bathrooms"); 
    }
    if (searchParams.get("filter")) {
      queries.categoryName = searchParams.get("filter"); 
    }
    console.log(queries,"tjese are quried")
    const response = await Home.find(queries).populate("postedBy");

    return NextResponse.json(response);
  } catch (error) {
    throw new Error(error);
  }
}
