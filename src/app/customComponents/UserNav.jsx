"use client";

import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { createBnBHome } from "@/lib/actions";
import { LoginTrigger } from "./modal/LoginTrigger";
import { RegisterTrigger } from "./modal/RegisterTrigger";
import Link from "next/link";

const UserNav = () => {
  const { data: session } = useSession();
  const createHomeWithId = createBnBHome.bind(null, {
    userId: session?.user.id,
  });
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center gap-3">
          <h1 className="hidden md:block">{session?.user?.name}</h1>
          <Image
            src={
              session?.user?.image ? session?.user?.image : "/defaultAvatar.jpg"
            }
            alt="profile pic"
            className="rounded-full w-[40px] h-[40px]"
            width={40}
            height={40}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {session?.user?.id && (
            <>
              <form action={createHomeWithId}>
                <DropdownMenuItem className="cursor-pointer">
                  <button type="submit">Create Hotel</button>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href={"/myhotels"}> My Hotels</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href={"/myreservations"}> My Reservations</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href={"/favourites"}> Favourites</Link>
                </DropdownMenuItem>
              </form>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => signOut()}
              >
                Logout
              </DropdownMenuItem>
            </>
          )}
          {!session?.user?.id ? (
            <>
              {" "}
              <div className="cursor-pointer border-x-0 border-t-0 border-b border-muted p-2">
                <div>
                  <LoginTrigger />
                </div>
              </div>
              <div className="cursor-pointer  p-2">
                <div>
                  <RegisterTrigger />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserNav;
