import axios from "axios";
import ListingCard from "./ListingCard";
import NoItems from "./categories/NoItems";
import { Connection } from "@/lib/Connection";

const getData = async (searchParams) => {
  try {
    await Connection()
    const queryParams = new URLSearchParams();

    if (searchParams.city) queryParams.append("city", searchParams.city);
    if (searchParams.state) queryParams.append("state", searchParams.state);
    if (searchParams.country)
      queryParams.append("country", searchParams.country);
    if (searchParams.guests) queryParams.append("guests", searchParams.guests);
    if (searchParams.bedrooms)
      queryParams.append("bedrooms", searchParams.bedrooms);
    if (searchParams.bathrooms)
      queryParams.append("bathrooms", searchParams.bathrooms);
      if (searchParams.filter) queryParams.append("filter", searchParams.filter);

    const response = await axios.get(
      `http://localhost:3000/api/getSearchData?${queryParams}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const SearchComponent = async ({ searchParams }) => {
  const data = await getData(searchParams);
  return (
    <>
      {data?.length > 0 ? (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data?.map((item) => (
            <ListingCard
              pathname={"/search"}
              favs={item?.Favourites}
              item={item}
              key={item._id}
            />
          ))}
        </div>
      ) : (
        <NoItems
          heading={"No Homes found for these filters.."}
          text={"Try changing or clearing out the filters."}
        />
      )}
    </>
  );
};

export default SearchComponent;
