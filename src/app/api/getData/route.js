import Home from "@/modals/Home";
import { Connection } from "@/lib/Connection";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await Connection();
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const filter = searchParams.get("filter");

    const query = {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    };

    if (filter != "undefined") {
      query.categoryName = filter;
    }

    const response = await Home.find(query);
    return NextResponse.json({ data: response });
  } catch (error) {
    return NextResponse.json({ msg: "Error from route" });
  }
}
