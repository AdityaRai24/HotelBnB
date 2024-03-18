
"use client"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

const Counter = ({name}) => {

    const [count, setCount] = useState(0)

    const increaseCount = ()=>{
        setCount(count+1)
    }
    const decreaseCount = ()=>{
        if(count > 0){
            setCount(count-1)
        }
    }

  return (
    <div className="flex items-center justify-center gap-2">
      <input type="hidden" name={name} value={count} />
      <Button onClick={()=>decreaseCount()} variant="outline" type="button" size="icon">
        <Minus className="h-4 w-4" />
      </Button>
      <Label>{count}</Label>
      <Button onClick={()=>increaseCount()} variant="outline" type="button" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Counter;
