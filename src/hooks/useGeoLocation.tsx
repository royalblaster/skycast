"use client";

import { useEffect, useState } from "react";
import type { Coordinates } from "@/lib/types";

interface GeoLocationState {
  coord: Coordinates | null;
  isLoading: boolean;
  error: string | null;
}

export function useGeoLocation() {
  const [geoLocationData, setGeoLocationData] = useState<GeoLocationState>({
    coord: null,
    isLoading: true,
    error: null,
  });

  const getLocation = () => {
    setGeoLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocationData({
            coord: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
            isLoading: false,
            error: null,
          });
        },
        (error) => {
          let errorMsg: string;

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMsg =
                "Location permission denied. Please enable location access.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMsg = "Location is unavailable.";
              break;
            case error.TIMEOUT:
              errorMsg = "Location request timeout!";
              break;
            default:
              errorMsg = "Unknown error occurred";
          }

          setGeoLocationData({
            coord: null,
            isLoading: false,
            error: errorMsg,
          });
        },
        { maximumAge: 0, timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      setGeoLocationData({
        coord: null,
        isLoading: false,
        error: "Geolocation is not supported by your browser",
      });
      return;
    }
  };

  useEffect(() => getLocation(), []);

  return { ...geoLocationData, getLocation };
}
