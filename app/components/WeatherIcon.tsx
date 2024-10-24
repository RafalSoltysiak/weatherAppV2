import Image from "next/image";
import { cn } from "../utils/cn";

type WeatherIconProps = {
  iconName: string;
};

export default function WeatherIcon({ iconName }: WeatherIconProps) {
  return (
    <div className={cn("relative h-20 w-20")}>
      <Image
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
        alt="icon"
        width={100}
        height={100}
        className="absolute h-full w-full"
        priority
      />
    </div>
  );
}
