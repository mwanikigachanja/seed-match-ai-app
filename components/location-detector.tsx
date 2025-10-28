"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Loader2, Search } from "lucide-react"

interface LocationData {
  latitude: number
  longitude: number
  altitude: number
  location: string
}

interface LocationDetectorProps {
  onLocationDetected: (location: LocationData) => void
}

export default function LocationDetector({ onLocationDetected }: LocationDetectorProps) {
  const [loading, setLoading] = useState(false)
  const [manualLocation, setManualLocation] = useState("")
  const [error, setError] = useState<string | null>(null)

  const getAltitude = async (latitude: number, longitude: number): Promise<number> => {
    try {
      const response = await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${latitude},${longitude}`)
      const data = await response.json()
      return data.results?.[0]?.elevation || 0
    } catch (error) {
      console.error("Failed to get altitude:", error)
      return 0
    }
  }

  const getLocationName = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      )
      const data = await response.json()
      return data.address?.county || data.address?.city || "Unknown Location"
    } catch (error) {
      console.error("Failed to get location name:", error)
      return "Unknown Location"
    }
  }

  const geocodeLocationName = async (locationName: string): Promise<{ lat: number; lon: number } | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`,
      )
      const data = await response.json()
      if (data.length > 0) {
        return {
          lat: Number.parseFloat(data[0].lat),
          lon: Number.parseFloat(data[0].lon),
        }
      }
      return null
    } catch (error) {
      console.error("Failed to geocode location:", error)
      return null
    }
  }

  const handleGetLocation = async () => {
    setLoading(true)
    setError(null)
    try {
      const position = await new Promise<GeolocationCoordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => resolve(pos.coords), reject)
      })

      const altitude = await getAltitude(position.latitude, position.longitude)
      const location = await getLocationName(position.latitude, position.longitude)

      onLocationDetected({
        latitude: position.latitude,
        longitude: position.longitude,
        altitude: Math.round(altitude),
        location,
      })
    } catch (error) {
      setError("Unable to get your location. Please enable location services or try manual entry.")
      console.error("Geolocation error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleManualSearch = async () => {
    if (!manualLocation.trim()) return

    setLoading(true)
    setError(null)

    try {
      let lat: number, lon: number

      // Check if input is coordinates (contains comma and numbers)
      const parts = manualLocation.split(",").map((p) => p.trim())
      if (parts.length === 2 && !isNaN(Number.parseFloat(parts[0])) && !isNaN(Number.parseFloat(parts[1]))) {
        // Input is coordinates
        lat = Number.parseFloat(parts[0])
        lon = Number.parseFloat(parts[1])
      } else {
        // Input is location name - geocode it
        const coords = await geocodeLocationName(manualLocation)
        if (!coords) {
          setError("Location not found. Please try a different name or use coordinates (latitude, longitude).")
          setLoading(false)
          return
        }
        lat = coords.lat
        lon = coords.lon
      }

      const [altitude, location] = await Promise.all([getAltitude(lat, lon), getLocationName(lat, lon)])

      onLocationDetected({
        latitude: lat,
        longitude: lon,
        altitude: Math.round(altitude),
        location,
      })
      setManualLocation("")
    } catch (err) {
      setError("Failed to fetch location data. Please try again.")
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Find Your Location
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your location name or coordinates to get seed recommendations for your area.
        </p>
      </div>

      {error && <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

      <Button
        onClick={handleGetLocation}
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Getting Location...
          </>
        ) : (
          <>
            <MapPin className="w-4 h-4 mr-2" />
            Use My Current Location
          </>
        )}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Enter location name or coordinates (e.g., Nairobi or -1.2921, 36.8219)"
          value={manualLocation}
          onChange={(e) => setManualLocation(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleManualSearch()}
          disabled={loading}
        />
        <Button onClick={handleManualSearch} disabled={loading || !manualLocation.trim()} variant="outline">
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
