import { File } from "lucide-react";
import React from "react";

const NoItems = ({heading,text}) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md  p-8 text-center animate-in fade-in-50">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <File className="h-10 w-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">
      {heading}
      </h2>
      <p className="mt-2 text-center text-sm text-muted-foreground leading-6">
       {text}
      </p>
    </div>
  );
};

export default NoItems;
