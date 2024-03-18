import Reservation from "@/modals/Reservation"
import { Connection } from "@/lib/Connection";
import { NextResponse } from "next/server"

export async function GET(req,{params}){
    await Connection();

    try {
        const userId = params.userId
        const response = await Reservation.find({userId: userId}).populate("homeId")
        return NextResponse.json(response)
    } catch (error) {
        throw new Error(error)
    }
}