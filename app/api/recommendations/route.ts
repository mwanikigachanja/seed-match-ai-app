import { type NextRequest, NextResponse } from "next/server"
import { getRecommendedSeeds } from "@/lib/seed-data"

export async function POST(request: NextRequest) {
  try {
    const { altitude, location } = await request.json()

    if (typeof altitude !== "number" || altitude < 0) {
      return NextResponse.json({ error: "Invalid altitude" }, { status: 400 })
    }

    const recommendedSeeds = getRecommendedSeeds(altitude)

    if (recommendedSeeds.length === 0) {
      return NextResponse.json({ error: "No seeds found for this altitude" }, { status: 404 })
    }

    const recommendations = recommendedSeeds.map((seed) => ({
      id: seed.id,
      name: seed.name,
      variety: seed.variety,
      kiswahili_name: seed.kiswahili_name,
      altitude_zone: seed.altitude_zone,
      altitude_range: `${seed.min_altitude}-${seed.max_altitude}m`,
      description: seed.description,
      planting_season: seed.planting_season,
      yield_potential: seed.yield_potential,
      maturity: seed.maturity,
      rate: seed.rate,
      attributes: seed.attributes,
    }))

    return NextResponse.json({
      location,
      altitude,
      recommendations,
      count: recommendations.length,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
