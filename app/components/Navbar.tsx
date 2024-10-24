"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import { BsThermometerSun } from "react-icons/bs";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { useAtom } from "jotai";

import SearchBox from "./SearchBox";
import { loadingCityAtom, placeAtom } from "../atom";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

interface LocationProps {
  location?: string;
}

export default function Navbar({ location }: LocationProps) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);

  async function handleInpurChange(value: string) {
    setCity(value);

    if (value.length >= 3) {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );

        const suggestions = res.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestion(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestion(false);
        console.log(error);
      }
    } else {
      setSuggestions([]);
      setPlace(city);
      setShowSuggestion(false);
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestion(false);
  }

  function handleSubmitSearch(e: FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length === 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setCity(city);
        setShowSuggestion(false);
      }, 500);
    }
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoadingCity(true);
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(res.data.name);
          }, 500);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }

  return (
    <>
      <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex items-center justify-between max-w-7xl px-3 mx-auto">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-gray-500 text-3xl">Weather</h2>
            <BsThermometerSun className="text-3xl mt-1 text-yellow-300" />
          </div>
          <section className="flex gap-2 items-center">
            <FaLocationCrosshairs
              title="Your current location"
              onClick={handleCurrentLocation}
              className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
            />
            <IoLocationOutline className="text-3xl" />
            <p className="text-slate-900/80 text-md font-semibold">
              {location}
            </p>
            <div className="relative hidden md:flex">
              <SearchBox
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={(e) => handleInpurChange(e.target.value)}
              />
              <SuggetionBox
                {...{
                  showSuggestion,
                  suggestions,
                  error,
                  handleSuggestionClick,
                }}
              />
            </div>
          </section>
        </div>
      </nav>
      <section className="flex max-w-7xl px-3 md:hidden">
        <div className="relative">
          <SearchBox
            value={city}
            onSubmit={handleSubmitSearch}
            onChange={(e) => handleInpurChange(e.target.value)}
          />
          <SuggetionBox
            {...{
              showSuggestion,
              suggestions,
              error,
              handleSuggestionClick,
            }}
          />
        </div>
      </section>
    </>
  );
}

function SuggetionBox({
  showSuggestion,
  suggestions,
  error,
  handleSuggestionClick,
}: {
  showSuggestion: boolean;
  suggestions: string[];
  error: string;
  handleSuggestionClick: (item: string) => void;
}) {
  return (
    <>
      {((showSuggestion && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1">{error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
