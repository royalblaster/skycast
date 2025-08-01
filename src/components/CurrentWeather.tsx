import { Card, CardContent } from "@/components/ui/card";
import type { GeoCodingResponse, WeatherData } from "@/lib/types";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  location?: GeoCodingResponse;
}

const CurrentWeather = ({ data, location }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const formatTemperature = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Weather details */}
          <div className="space-y-4">
            {/* Location Details */}
            <div className="space-y-1">
              <div className="flex items-baseline">
                <h2 className="text-2xl font-bold tracking-tight">
                  {location?.name}
                </h2>
                {location?.state && (
                  <span className="text-muted-foreground">
                    , {location.state}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {location?.country}
              </p>
            </div>

            {/* Temperature details */}

            <div className="flex items-center gap-2">
              <p className="text-7xl font-bold tracking-tighter">
                {formatTemperature(temp)}
              </p>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground ml-2">
                  Feels like {formatTemperature(feels_like)}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <ArrowDown className="w-3 h-3" />
                    {formatTemperature(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp className="w-3 h-3" />
                    {formatTemperature(temp_max)}
                  </span>
                </div>
              </div>
            </div>

            {/* Humidity and Wind Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div className="text-sm">
                  <p className="font-medium">Humidity</p>
                  <p className="text-muted-foreground">{humidity}%</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                <div className="text-sm">
                  <p className="font-medium">Wind Speed</p>
                  <p className="text-muted-foreground">{speed} m/s</p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Icon*/}
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium capitalize">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
