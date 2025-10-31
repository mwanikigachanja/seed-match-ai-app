"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Volume2,
  Copy,
  Check,
  Sparkles,
  Loader2,
  Droplets,
  Calendar,
  TrendingUp,
  Leaf,
} from "lucide-react"
import { useChromeAi, useTextToSpeech } from "@/lib/chrome-ai"
import AgronomicAdvice from "./agronomic-advice"
import type { Language } from "@/lib/language-utils"

interface Recommendation {
  id: string
  name: string
  variety: string
  altitude_range: string
  description: string
  planting_season: string
  yield_potential: string
  maturity: string
  rate: string
}

interface SeedRecommendationsProps {
  recommendations: Recommendation[]
  language: Language
}

export default function SeedRecommendations({
  recommendations,
  language,
}: SeedRecommendationsProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [enhancedDescriptions, setEnhancedDescriptions] = useState<
    Record<string, string>
  >({})
  const [expandedAdvice, setExpandedAdvice] = useState<string | null>(null)

  const { speak, speaking } = useTextToSpeech()
  const {
    generateContent: enhanceDescription,
    loading: enhancing,
    error: enhancementError,
  } = useChromeAi(
    "You are an agricultural expert. Provide a concise, practical farming tip. Keep it to 1-2 sentences."
  )
  const {
    generateContent: translate,
    loading: translating,
    error: translationError,
  } = useChromeAi("You are a translator. Translate the following text to Swahili.")

  useEffect(() => {
    async function enhanceDescriptions() {
      const enhanced: Record<string, string> = {}
      for (const seed of recommendations) {
        const prompt = `Based on this description: \"${seed.description}\", what is a good farming tip for ${seed.name}?`
        const newDescription = await enhanceDescription(prompt)
        enhanced[seed.id] = newDescription || seed.description
      }
      setEnhancedDescriptions(enhanced)
    }

    if (recommendations.length > 0) {
      enhanceDescriptions()
    }
  }, [recommendations, enhanceDescription])

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleTranslate = async (id: string, text: string) => {
    const translated = await translate(text)
    if (translated) {
      setEnhancedDescriptions((prev) => ({
        ...prev,
        [id]: translated,
      }))
    }
  }

  return (
    <div className="space-y-4">
      {recommendations.map((seed) => (
        <Card
          key={seed.id}
          className="p-5 border-2 border-primary/20 hover:border-primary/40 transition-colors overflow-hidden"
        >
          <div className="space-y-4">
            {/* Header with Crop Name and Icon */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="text-lg font-bold text-primary">{seed.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  {seed.variety}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-foreground leading-relaxed">
              {enhancedDescriptions[seed.id] || seed.description}
            </p>

            {/* Key Information Grid - Visual Icons */}
            <div className="grid grid-cols-2 gap-3">
              {/* Maturity */}
              <div className="bg-secondary/30 p-3 rounded-lg flex items-start gap-2">
                <Calendar className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">
                    Days to Harvest
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {seed.maturity}
                  </p>
                </div>
              </div>

              {/* Yield */}
              <div className="bg-secondary/30 p-3 rounded-lg flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">
                    Yield
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {seed.yield_potential}
                  </p>
                </div>
              </div>

              {/* Planting Season */}
              <div className="bg-accent/20 p-3 rounded-lg flex items-start gap-2 col-span-2">
                <Calendar className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">
                    When to Plant
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {seed.planting_season}
                  </p>
                </div>
              </div>

              {/* Planting Rate */}
              <div className="bg-accent/20 p-3 rounded-lg flex items-start gap-2">
                <Droplets className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">
                    Seed Rate
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {seed.rate}
                  </p>
                </div>
              </div>

              {/* Altitude Range */}
              <div className="bg-accent/20 p-3 rounded-lg flex items-start gap-2">
                <Leaf className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">
                    Altitude Range
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {seed.altitude_range}
                  </p>
                </div>
              </div>
            </div>

            {/* Agronomic Advice */}
            {expandedAdvice === seed.id && (
              <AgronomicAdvice
                cropName={seed.name}
                altitude={1500} // Replace with actual altitude
                language={language}
              />
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={() => speak(seed.name, language === "sw" ? "sw-TZ" : "en-US")}
                className="flex-1 bg-transparent"
              >
                <Volume2 className="w-4 h-4 mr-1" />
                {speaking ? "Stop" : "Speak"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(seed.name, seed.id)}
                className="flex-1 bg-transparent"
              >
                {copied === seed.id ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setExpandedAdvice(expandedAdvice === seed.id ? null : seed.id)
                }
                className="flex-1 bg-transparent"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Tips
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleTranslate(seed.id, seed.name)}
                disabled={translating || enhancing}
                className="flex-1 bg-transparent"
              >
                {translating || enhancing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    AI
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-1" />
                    AI
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
