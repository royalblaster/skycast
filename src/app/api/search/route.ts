import { weatherAPI } from "@/lib/weather";
import { NextRequest, NextResponse } from "next/server";

// `/api/search?query=val`
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  try {
    const data = await weatherAPI.searchLocations(query);
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error
        ? `City Data Fetch Error: ${error.message}`
        : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
