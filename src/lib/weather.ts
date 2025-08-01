import { API_CONFIG } from "./config";
import type {
  Coordinates,
  ForecastData,
  GeoCodingResponse,
  WeatherData,
} from "./types";

class WeatherAPI {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const newParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });

    return `${endpoint}?${newParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (response.ok) return response.json();
    throw new Error(`API Error: ${response.statusText}`);
  }

  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    const url = this.createUrl(`${API_CONFIG.WEATHER_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });

    return this.fetchData<WeatherData>(url);
  }

  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createUrl(`${API_CONFIG.WEATHER_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });

    return this.fetchData<ForecastData>(url);
  }

  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<GeoCodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO_URL}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    });

    return this.fetchData<GeoCodingResponse[]>(url);
  }

  async searchLocations(query: string): Promise<GeoCodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO_URL}/direct`, {
      q: query,
      limit: 5,
    });
    return this.fetchData<GeoCodingResponse[]>(url);
  }
}

export const weatherAPI = new WeatherAPI();
