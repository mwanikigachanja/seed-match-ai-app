"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Loader2, Leaf, MapPin, AlertCircle } from "lucide-react"
import LocationDetector from "@/components/location-detector"
import SeedRecommendations from "@/components/seed-recommendations"
import SearchHistory from "@/components/search-history"
import AiFeaturesBadge from "@/components/ai-features-badge"
import LanguageSelector from "@/components/language-selector"
import type { Language } from "@/lib/language-utils"

interface LocationData {
  latitude: number
  longitude: number
  altitude: number
  location: string
}

interface Recommendation {
  id: string
  name: string
  variety: string
  altitude_zone: string
  altitude_range: string
  description: string
  planting_season: string
  yield_potential: string
  kiswahili_name: string
  maturity: string
  rate: string
  attributes: string[]
}

export default function Home() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<LocationData[]>([])
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("seedmatch_history")
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load history:", e)
      }
    }
  }, [])

  const handleLocationDetected = async (locationData: LocationData) => {
    setLocation(locationData)
    setError(null)
    setLoading(true)

    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          altitude: locationData.altitude,
          location: locationData.location,
        }),
      })

      if (!response.ok) throw new Error("Failed to get recommendations")

      const data = await response.json()
      setRecommendations(data.recommendations)

      const newHistory = [locationData, ...history.slice(0, 9)]
      setHistory(newHistory)
      localStorage.setItem("seedmatch_history", JSON.stringify(newHistory))
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setRecommendations([])
    } finally {
      setLoading(false)
    }
  }

  const handleHistoryClick = (item: LocationData) => {
    setLocation(item)
    handleLocationDetected(item)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with Language Selector */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-primary">SeedMatch</h1>
            </div>
            <p className="text-lg text-muted-foreground mb-2">Find the best seeds for your farm</p>
            <p className="text-sm text-muted-foreground mb-4">
              Tell us where you are, and we'll recommend seeds that grow well there
            </p>
            <div className="flex justify-center mt-3">
              <AiFeaturesBadge />
            </div>
          </div>
          <div className="ml-4">
            <LanguageSelector onLanguageChange={setLanguage} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location Detector */}
            <Card className="p-6 border-2 border-primary/20">
              <LocationDetector onLocationDetected={handleLocationDetected} />
            </Card>

            {/* Location Info Display */}
            {location && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Location</p>
                    <p className="font-semibold text-foreground">{location.location}</p>
                    <p className="text-xs text-muted-foreground">Altitude: {location.altitude}m</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Loading State */}
            {loading && (
              <Card className="p-8 flex items-center justify-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-muted-foreground">Finding seeds for your area...</span>
              </Card>
            )}

            {/* Error State */}
            {error && (
              <Card className="p-4 bg-destructive/10 border-destructive/20 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-destructive text-sm">{error}</p>
              </Card>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && !loading && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-primary" />
                  Seeds for {location?.location}
                </h2>
                <SeedRecommendations recommendations={recommendations} />
              </div>
            )}

            {/* Empty State */}
            {!loading && recommendations.length === 0 && location && !error && (
              <Card className="p-8 text-center">
                <Leaf className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No seeds found for this location. Try a different area.</p>
              </Card>
            )}
          </div>

          {/* Sidebar - History */}
          {history.length > 0 && (
            <div className="lg:col-span-1">
              <SearchHistory history={history} onHistoryClick={handleHistoryClick} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
