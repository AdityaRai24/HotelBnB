"use client";
import React, {  useState } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const SelectCountries = ({ params }) => {
  // ALL VALUES
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryFull, setCountryFull] = useState("");
  const [stateFull, setStateFull] = useState("");

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cityLong, setCityLong] = useState(51);
  const [cityLat, setCityLat] = useState(-0.09);

  //   GET DATA FOR COUNTRY, STATE, CITY
  const countryArray = Country.getAllCountries();
  const stateArray = State.getAllStates();
  const cityArray = City.getAllCities();
  // FILTER AND FORMAT COUNTRY DATA
  function filterCountries(countryArray) {
    return countryArray.map(({ name: label, isoCode }) => ({ label, isoCode }));
  }
  const changeCountry = (e) => {
    setSelectedCountry(e.isoCode);
    setCountryFull(e.label);
  };

  //FILER AND FORMAT STATES ACCORDING TO COUNTRY
  function filterStates(stateArray) {
    return stateArray
      .filter((item) => item.countryCode === selectedCountry)
      .map((filteredItem) => ({
        label: filteredItem.name,
        countryCode: filteredItem.countryCode,
        isoCode: filteredItem.isoCode,
      }));
  }
  const changeState = (e) => {
    setSelectedState(e.isoCode);
    setStateFull(e.label);
  };

  // FILTER AND FORMAT CITIES ACCORDING TO STATE AND COUNTRY
  function filterCities(cityArray) {
    return cityArray
      .filter(
        (item) =>
          item.countryCode === selectedCountry &&
          item.stateCode === selectedState
      )
      .map((filteredItem) => ({
        label: filteredItem.name,
        cityLong: filteredItem.longitude,
        cityLat: filteredItem.latitude,
      }));
  }
  const changeCity = (e) => {
    setSelectedCity(e.label);
    setCityLong(e.cityLong);
    setCityLat(e.cityLat);
  };

  //   FILTER COUNTRY, CITY AND STATE
  const filteredCountries = filterCountries(countryArray);
  const filteredStates = filterStates(stateArray);
  const filteredCities = filterCities(cityArray);

  const LazyMap = dynamic(() => import("@/app/customComponents/create/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[25vh] lg:h-[50vh] w-full" />,
  });

  return (

      <div className={`${params ? "w-2/5" : "w-[90%]"} mx-auto`}>
        <input type="hidden" value={countryFull} name="country" />
        <input type="hidden" value={stateFull} name="state" />
        <input type="hidden" value={selectedCity} name="city" />
        <input type="hidden" value={cityLong} name="cityLong" />
        <input type="hidden" value={cityLat} name="cityLat" />
        <input type="hidden" value={params?.id ? params?.id : ""} name="homeId" />

        <div className="flex items-center justify-center flex-col gap-5 mb-5">
          <Select
            options={filteredCountries}
            onChange={(e) => changeCountry(e)}
            className="text-black  w-full"
            placeholder="Select country"
          />

          <Select
            options={filteredStates}
            onChange={(e) => changeState(e)}
            className="text-black  w-full"
            placeholder="Select state"
          />

          <Select
            options={filteredCities}
            onChange={(e) => changeCity(e)}
            className="text-black  w-full"
            placeholder="Select city"
          />
        </div>
        <LazyMap cityLat={cityLat} cityLong={cityLong} />
      </div>
  );
};

export default SelectCountries;
