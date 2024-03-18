"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import dynamic from "next/dynamic";
import CreationBottomBar from "@/app/customComponents/create/CreationBottomBar";
import { createLocation } from "@/lib/actions";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import SelectCountries from "@/app/customComponents/SelectCountries";

const page = ({ params }) => {
 
  return (
    <form action={async(formData)=>{
      const result = await createLocation(formData)
      if(result?.error){
        toast.error(result?.error)
      }else{
        toast.success("Home Created Successfully")
      }
    }}>
      <SelectCountries params={params}/>
      <CreationBottomBar />
    </form>
  );
};

export default page;
