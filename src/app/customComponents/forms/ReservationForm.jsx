"use client";

import { makeReservation } from "@/lib/actions";
import SelectCalendar from "../SelectCalendar";
import { ReservationButton } from "../submitButtons";
import toast from "react-hot-toast";

const ReservationForm = ({ reservations, userId, homeId,disabled}) => {
  return (
    <form className="w-full lg:w-1/3" action={async(formData)=>{
        const result = await makeReservation(formData)
        if(result?.error){
            toast.error(result?.error)
        }else{
            toast.success("Reservation Successfull")
        }
    }}>
      <input type="hidden" name="homeId" value={homeId} />
      <input type="hidden" name="userId" value={userId} />
      <SelectCalendar reservations={reservations} />
      <ReservationButton disabled={disabled}/>
    </form>
  );
};

export default ReservationForm;
