import {
  Coordinates,
  WeatherData,
  ForecastData,
  GeoCodingResponse,
} from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const KEYS = {
  weather: (coordinates: Coordinates) => ["weather", coordinates] as const,
  forecast: (coordinates: Coordinates) => ["forecast", coordinates] as const,
  location: (coordinates: Coordinates) => ["location", coordinates] as const,
  search: (query: string) => ["search", query] as const,
} as const;

export function useCurrentWeatherQuery(coordinates: Coordinates | null) {
  return useQuery<WeatherData | null>({
    queryKey: KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: async () => {
      if (!coordinates) return null;
      const res = await fetch(
        `/api/weather?lat=${coordinates.lat}&lon=${coordinates.lon}`
      );
      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.error || "Failed to fetch weather data");
      }
      return res.json();
    },
    enabled: !!coordinates,
  });
}

export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery<ForecastData | null>({
    queryKey: KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: async () => {
      if (!coordinates) return null;
      const res = await fetch(
        `/api/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}`
      );
      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.error || "Failed to fetch forecast data");
      }
      return res.json();
    },
    enabled: !!coordinates,
  });
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery<GeoCodingResponse[] | null>({
    queryKey: KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: async () => {
      if (!coordinates) return null;
      const res = await fetch(
        `/api/geocode?lat=${coordinates.lat}&lon=${coordinates.lon}`
      );

      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.error || "Failed to fetch geocode data");
      }
      return res.json();
    },
    enabled: !!coordinates,
  });
}

export function useLocationSearch(query: string) {
  return useQuery<GeoCodingResponse[] | null>({
    queryKey: KEYS.search(query),
    queryFn: async () => {
      const res = await fetch(`/api/search?q=${query}`);

      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(
          errorBody.error || "Failed to fetch search location data"
        );
      }
      return res.json();
    },
    enabled: query.length >= 3,
  });
}
