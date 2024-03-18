import { Separator } from "@/components/ui/separator";
import { categoryItems } from "@/lib/categoryItems";
import Image from "next/image";
import React from "react";

const CategoryShowcase = ({ categoryName }) => {
  const data = categoryItems.find((item) => item.name === categoryName);

  return (
    <>
      <Separator className="mt-6 mb-4" />
      <div className="flex items-center ">
        <Image
          src={data?.imageUrl}
          className="rounded-full"
          alt="user profile"
          width={40}
          height={40}
        />

        <div className="flex flex-col ml-4">
          <h3 className="font-medium capitalize">{data.name}</h3>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </div>
      </div>
      <Separator className="mt-4" />
      
    </>
  );
};

export default CategoryShowcase;
