"use client";

import { Button } from "@/components/ui/button";
import { Heart, HeartOff, Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

const CreationSubmit = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <>
          <Button disabled size="lg">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait...
          </Button>
        </>
      ) : (
        <>
          <Button type="submit" size="lg">
            Next
          </Button>
        </>
      )}
    </>
  );
};

export default CreationSubmit;

export function AddToFavourite() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          type="submit"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" type="submit">
          <Heart className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}

export function RemoveFromFavourite() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          type="submit"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary border-none hover:bg-primary"
          type="submit"
        >
          <HeartOff className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}

export function ReservationButton({disabled}) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <>
          <Button disabled className="w-full">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Please Wait...
          </Button>
        </>
      ) : (
        <>
          <Button disabled={disabled} className="w-full">Make Reservation</Button>
        </>
      )}
    </>
  );
}
