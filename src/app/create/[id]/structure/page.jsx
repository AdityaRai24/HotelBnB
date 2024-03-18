import CreationBottomBar from "@/app/customComponents/create/CreationBottomBar";
import SelectCategory from "@/app/customComponents/categories/SelectCategory";
import { createCategory } from "@/lib/actions";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home ?
        </h2>
      </div>

      <form action={createCategory}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectCategory />

        <CreationBottomBar />
      </form>
    </>
  );
};

export default page;
