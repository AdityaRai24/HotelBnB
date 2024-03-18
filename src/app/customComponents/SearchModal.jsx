"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectCountries from "./SelectCountries";
import { searchAction } from "@/lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchComponent = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Search</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[40vw]">
        <form
          action={async (formData) => {
            const result = await searchAction(formData)
           setOpen(false)
          }}
        >
          <SelectCountries />
          <Button type="submit" className="mx-auto block w-[90%] my-4">
            Search
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchComponent;
