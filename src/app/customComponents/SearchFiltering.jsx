"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchFiltering = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const guestsCount = parseInt(searchParams.get("guests"));
  const bedroomCount = parseInt(searchParams.get("bedrooms"));
  const bathroomCount = parseInt(searchParams.get("bathrooms"));

  const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="my-5 flex items-center justify-start gap-10 mx-auto">
      <div>
        <Select
          onValueChange={(e) => {
            router.push(pathname + "?" + createQueryString("guests", e));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Guests Count" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {guestOptions.map((item) => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select
          onValueChange={(e) => {
            router.push(pathname + "?" + createQueryString("bedrooms", e));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Bedroom Count" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {guestOptions.map((item) => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>  

      <div>
        <Select
          onValueChange={(e) => {
            router.push(pathname + "?" + createQueryString("bathrooms", e));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Bathroom Count" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {guestOptions.map((item) => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFiltering;
