import Link from "next/link";
import UserNav from "./UserNav";
import SearchComponent from "./SearchModal";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <h1 className="text-3xl font-bold">HotelBnB</h1>
        </Link>
        <SearchComponent />
        <UserNav />
      </div>
    </nav>
  );
}
