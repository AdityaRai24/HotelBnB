"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "@/lib/categoryItems";
import Image from "next/image";
import { useState } from "react";

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState();

  return (
    <div className="grid grid-cols-4 mt-10 gap-8 w-3/5 mx-auto mb-36">
        <input type="hidden" name="categoryName"  value={selectedCategory}/>
      {categoryItems.map((item) => {
        return (
          <div key={item.id} className="cursor-pointer">
            <Card
              onClick={() => setSelectedCategory(item.name)}
              className={selectedCategory === item.name ? "border-primary border-2" : ""}
            >
              <CardHeader>
                <Image
                  src={item.imageUrl}
                  width={32}
                  height={32}
                  alt={item.name}
                  className="w-8 h-8"
                />
                <h1 className="font-medium">{item.title}</h1>
              </CardHeader>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default SelectCategory;
