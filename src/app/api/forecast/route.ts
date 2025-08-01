import { weatherAPI } from "@/lib/weather";
import { NextRequest, NextResponse } from "next/server";

// `/api/forecast?lat=value1&lon=value2`
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  try {
    const data = await weatherAPI.getForecast({
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    });
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error
        ? `Forecast Weather Data Fetch Error: ${error.message}`
        : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
