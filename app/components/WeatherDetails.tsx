import React from "react";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";

interface SingleWeatherDetailsProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetails({
  information,
  icon,
  value,
}: SingleWeatherDetailsProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap">{information}</p>
      <div className="text-3xl">{icon}</div>
      <p>{value}</p>
    </div>
  );
}

export interface WeatherDetailsProps {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails({
  visability = "25km",
  humidity = "61%",
  windSpeed = "7 km/h",
  airPressure = "1012 hPa",
  sunrise = "6.20",
  sunset = "18:48",
}: WeatherDetailsProps) {
  return (
    <>
      <SingleWeatherDetails
        icon={<LuEye />}
        value={visability}
        information="Visability"
      />
      <SingleWeatherDetails
        icon={<FiDroplet />}
        value={humidity}
        information="Humidity"
      />
      <SingleWeatherDetails
        icon={<MdAir />}
        value={windSpeed}
        information="Wind speed"
      />
      <SingleWeatherDetails
        icon={<ImMeter />}
        value={airPressure}
        information="Air pressure"
      />
      <SingleWeatherDetails
        icon={<LuSunrise />}
        value={sunrise}
        information="Sunrise"
      />
      <SingleWeatherDetails
        icon={<LuSunset />}
        value={sunset}
        information="Sunset"
      />
    </>
  );
}
