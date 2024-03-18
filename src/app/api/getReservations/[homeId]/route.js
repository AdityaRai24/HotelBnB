import Reservation from "@/modals/Reservation";
import { NextResponse } from "next/server"
import { Connection } from "@/lib/Connection";

export async function GET(req,{params}){
    await Connection();

    try {
        const homeId = params.homeId
        const response = await Reservation.find({homeId})
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(error,{status: 500})        
    }
}