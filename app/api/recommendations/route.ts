import { type NextRequest, NextResponse } from "next/server"
import { getRecommendedSeeds } from "@/lib/seed-data"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { altitude, location, cropName } = body

    if (typeof altitude !== "number" || altitude < 0 || !location) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: "Altitude must be a non-negative number and location is required.",
        },
        { status: 400 }
      )
    }

    const recommendedSeeds = getRecommendedSeeds(altitude, cropName)

    if (recommendedSeeds.length === 0) {
      console.warn(`No seeds found for altitude: ${altitude} and crop: ${cropName}`)
      return NextResponse.json(
        { error: `No seeds found for altitude: ${altitude}m and crop: ${cropName}` },
        { status: 404 }
      )
    }

    const recommendations = recommendedSeeds.map((seed) => ({
      id: seed.id,
      name: seed.common_name,
      variety: seed.variety_name,
      kiswahili_name: "", // This information is not in the new model
      altitude_zone: "", // This information is not in the new model
      altitude_range: `${seed.min_altitude}-${seed.max_altitude}m`,
      description: seed.agronomic_traits?.key_qualities || "",
      planting_season: "", // This information is not in the new model
      yield_potential: seed.agronomic_traits?.yield_description || "",
      maturity: seed.agronomic_traits?.maturity_days_range || "",
      rate: seed.planting_guide?.seed_rate_per_acre || "",
      attributes: [], // This information is not in the new model
    }))

    return NextResponse.json({
      location,
      altitude,
      recommendations,
      count: recommendations.length,
    })
  } catch (error: any) {
    console.error("API Error in /api/recommendations:", {
      message: error.message,
      stack: error.stack,
      request: {
        headers: Object.fromEntries(request.headers),
        method: request.method,
        url: request.url,
      },
    })
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    )
  }
}
