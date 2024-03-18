"use client";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, DateRangePicker } from "react-date-range";
import { useState } from "react";
import {eachDayOfInterval} from "date-fns"

const SelectCalendar = ({reservations}) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  let disabledDates= []
  reservations?.forEach((reservationItem)=>{
    const dateRange = eachDayOfInterval({
      start:new Date(reservationItem.startDate),
      end: new Date(reservationItem.endDate)
    })
    disabledDates = [...disabledDates,...dateRange]
  })

  return (
    <div className="min-w-full">
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />

      <DateRange
        showDateDisplay={false}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        direction="vertical"
        rangeColors={["#FF5A5F"]}
        minDate={new Date()}
        disabledDates={disabledDates}
      />
    </div>
  );
};

export default SelectCalendar;
