import Home from "@/modals/Home";
import { NextResponse } from "next/server"
import { Connection } from "@/lib/Connection";

export async function GET(req,{params}){
    await Connection();

    try {
        const homeId = params.homeId
        const response = await Home.findById(homeId).populate('postedBy')
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(error,{status: 500})        
    }
}