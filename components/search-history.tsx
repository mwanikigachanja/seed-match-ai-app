"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Mountain, Trash2 } from "lucide-react"

interface LocationData {
  latitude: number
  longitude: number
  altitude: number
  location: string
}

interface SearchHistoryProps {
  history: LocationData[]
  onHistoryClick: (item: LocationData) => void
}

export default function SearchHistory({ history, onHistoryClick }: SearchHistoryProps) {
  const handleClearHistory = () => {
    localStorage.removeItem("seedmatch_history")
    window.location.reload()
  }

  return (
    <Card className="p-5 border-2 border-secondary/30 sticky top-8">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-secondary" />
          <h3 className="font-semibold text-foreground">Recent Searches</h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleClearHistory}
          className="h-6 w-6 p-0 hover:bg-destructive/10"
          title="Clear history"
        >
          <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" />
        </Button>
      </div>

      <div className="space-y-2">
        {history.map((item, index) => (
          <Button
            key={index}
            onClick={() => onHistoryClick(item)}
            variant="ghost"
            className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-secondary/20"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground truncate">{item.location}</p>
              <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Mountain className="w-3 h-3" />
                  {item.altitude}m
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.latitude.toFixed(2)}, {item.longitude.toFixed(2)}
                </span>
              </div>
            </div>
          </Button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">Last 10 searches saved</p>
    </Card>
  )
}
