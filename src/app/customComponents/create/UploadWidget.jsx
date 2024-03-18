"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const UploadWidget = () => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <CldUploadWidget
      uploadPreset="hotelbnb"
      onSuccess={(result, { widget }) => {
        setImageUrl(result?.info?.url);
        toast.success("Image uploaded successfully");
        widget.close();
      }}
    >
      {({ open }) => {
        return (
          <>
            <input type="hidden" name="image" value={imageUrl} />
            <Label>Image</Label>
            <div className="flex items-center justify-start">
              {imageUrl ? (
                <>
                  <Image src={imageUrl} width={300} height={300} />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => open()}
                    className="cursor-pointer"
                  >
                    Change Image
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => open()}
                  className="cursor-pointer"
                >
                  Upload an image of your room
                </Button>
              )}
            </div>
          </>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadWidget;
