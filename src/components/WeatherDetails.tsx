import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sunrise, Sunset, Compass, Gauge } from "lucide-react";
import { format } from "date-fns";
import type { WeatherData } from "@/lib/types";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { main, wind, sys } = data;

  const formatTime = (time: number) => format(new Date(time * 1000), "h:mm a");
  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const adjusted_deg = (deg %= 360 < 0 ? deg + 360 : deg);
    return directions[Math.round(adjusted_deg / 45) % 8];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Sunrise */}
          <div className="flex items-center gap-2 rounded-lg border p-4">
            <Sunrise className="h-4 w-4 text-yellow-400" />
            <div className="text-sm">
              <p className="font-medium leading-none">Sunrise</p>
              <p className="text-muted-foreground">{formatTime(sys.sunrise)}</p>
            </div>
          </div>

          {/* Sunset */}
          <div className="flex items-center gap-2 rounded-lg border p-4">
            <Sunset className="h-4 w-4 text-blue-400" />
            <div className="text-sm">
              <p className="font-medium leading-none">Sunset</p>
              <p className="text-muted-foreground">{formatTime(sys.sunset)}</p>
            </div>
          </div>

          {/* Wind direction */}
          <div className="flex items-center gap-2 rounded-lg border p-4">
            <Compass className="h-4 w-4 text-green-400" />
            <div className="text-sm">
              <p className="font-medium leading-none">Wind direction</p>
              <p className="text-muted-foreground">
                {getWindDirection(wind.deg)} {wind.deg}°
              </p>
            </div>
          </div>

          {/* Pressure */}
          <div className="flex items-center gap-2 rounded-lg border p-4">
            <Gauge className="h-4 w-4 text-purple-400" />
            <div className="text-sm">
              <p className="font-medium leading-none">Pressure</p>
              <p className="text-muted-foreground">{main.pressure} hPa</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
