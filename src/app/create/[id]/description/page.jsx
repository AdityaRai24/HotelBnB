import Counter from "@/app/customComponents/create/Counter";
import CreationBottomBar from "@/app/customComponents/create/CreationBottomBar";
import UploadWidget from "@/app/customComponents/create/UploadWidget";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createDescription } from "@/lib/actions";
import React from "react";

const page = ({params}) => {
  return (
    <>
      <div className="w-3/5 mx-auto ">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home as good as you can!
        </h2>
      </div>

      <form action={createDescription}>
        <input type="hidden" value={params.id} name="homeId"/>
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input type="text" name="title" placeholder="Enter title for your Home." />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea name="description" placeholder="Describe your home in detail." />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input name="price" type="number" placeholder="Price per night in INR." />
          </div>
          <div className="flex flex-col gap-y-2">
            <UploadWidget />
          </div>
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h1 className="font-semibold underline">Guests</h1>
                    <p className="text-muted-foreground text-sm">How many guests do you want.</p>
                  </div>
                    <Counter name={"guestsCount"}/>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h1 className="font-semibold underline">Bedrooms</h1>
                    <p className="text-muted-foreground text-sm">How many bedrooms do you have ?</p>
                  </div>
                  <Counter name={"bedroomCount"}/>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h1 className="font-semibold underline">Bathrooms</h1>
                    <p className="text-muted-foreground text-sm">How many bathrooms do you have ?</p>
                  </div>
                  <Counter name={"bathroomCount"}/>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
};

export default page;
