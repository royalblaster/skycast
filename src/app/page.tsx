"use client";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import {
  useCurrentWeatherQuery,
  useForecastQuery,
  useReverseGeocodeQuery,
} from "@/hooks/useWeather";
import { AlertTriangleIcon, MapPin, RefreshCcw } from "lucide-react";
import Lottie from "lottie-react";
import LottieWeatherDashboard from "@/assets/LottieWeatherDashboard.json";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { FavoriteCities } from "@/components/FavoriteCities";

export default function Home() {
  const { coord, isLoading, error, getLocation } = useGeoLocation();

  // Perform queries
  const weatherQuery = useCurrentWeatherQuery(coord);
  const forecastQuery = useForecastQuery(coord);
  const locationQuery = useReverseGeocodeQuery(coord);

  // Refresh data function
  const handleRefresh = () => {
    getLocation();
    weatherQuery.refetch();
    forecastQuery.refetch();
    locationQuery.refetch();
  };

  // When Location Data Loading
  if (isLoading) return <LoadingSkeleton />;

  // When location not enabled
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangleIcon className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error}</p>
          <ul className="list-inside list-disc text-sm"></ul>
          <Button variant={"outline"} onClick={getLocation} className="w-fit">
            <MapPin className="h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // When location is blocked
  if (!coord) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather.</p>
          <ul className="list-inside list-disc text-sm"></ul>
          <Button variant={"outline"} onClick={getLocation} className="w-fit">
            <MapPin className="h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Weather or Forecast Error occurred
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{weatherQuery.error?.message}</p>
          <ul className="list-inside list-disc text-sm"></ul>
          <Button variant={"outline"} onClick={handleRefresh} className="w-fit">
            <RefreshCcw className="h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />;
  }

  const location = locationQuery.data?.[0];

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}
      <FavoriteCities />
      {/* Header  */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw
            className={`h-4 w-4 ${
              weatherQuery.isFetching || forecastQuery.isFetching
                ? "animate-spin"
                : ""
            }`}
          />
        </Button>
      </div>

      {/* Current Weather Display */}
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} location={location} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 lg:grid-cols-2 items-start">
          <div className="flex flex-col">
            <div className="flex w-full items-center justify-center">
              <div className="w-[60%] h-auto">
                <Lottie animationData={LottieWeatherDashboard} />
              </div>
            </div>

            <WeatherDetails data={weatherQuery.data} />
          </div>

          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}
