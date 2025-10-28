"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2, Copy, Check, Sparkles, Loader2, Droplets, Calendar, TrendingUp, Leaf } from "lucide-react"
import { generateEnhancedDescription, translateToKiswahili } from "@/lib/chrome-ai"
import AgronomicAdvice from "./agronomic-advice"

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

interface SeedRecommendationsProps {
  recommendations: Recommendation[]
}

export default function SeedRecommendations({ recommendations }: SeedRecommendationsProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [speaking, setSpeaking] = useState<string | null>(null)
  const [enhancedDescriptions, setEnhancedDescriptions] = useState<Record<string, string>>({})
  const [loadingAi, setLoadingAi] = useState<Record<string, boolean>>({})
  const [expandedAdvice, setExpandedAdvice] = useState<string | null>(null)

  useEffect(() => {
    const enhanceDescriptions = async () => {
      const enhanced: Record<string, string> = {}
      for (const seed of recommendations) {
        try {
          const description = await generateEnhancedDescription(seed.name, seed.description)
          enhanced[seed.id] = description
        } catch (error) {
          enhanced[seed.id] = seed.description
        }
      }
      setEnhancedDescriptions(enhanced)
    }

    enhanceDescriptions()
  }, [recommendations])

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSpeak = async (text: string, id: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech not supported in your browser")
      return
    }

    if (speaking === id) {
      window.speechSynthesis.cancel()
      setSpeaking(null)
      return
    }

    setSpeaking(id)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => setSpeaking(null)
    window.speechSynthesis.speak(utterance)
  }

  const handleTranslate = async (id: string, kiswahiliName: string) => {
    setLoadingAi((prev) => ({ ...prev, [id]: true }))
    try {
      const translated = await translateToKiswahili(kiswahiliName)
      setEnhancedDescriptions((prev) => ({
        ...prev,
        [id]: translated,
      }))
    } catch (error) {
      console.error("Translation failed:", error)
    } finally {
      setLoadingAi((prev) => ({ ...prev, [id]: false }))
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
                <p className="text-sm text-muted-foreground italic">{seed.variety}</p>
                <p className="text-xs text-muted-foreground mt-1">Kiswahili: {seed.kiswahili_name}</p>
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
                  <p className="text-xs text-muted-foreground font-semibold">Days to Harvest</p>
                  <p className="text-sm font-medium text-foreground">{seed.maturity}</p>
                </div>
              </div>

              {/* Yield */}
              <div className="bg-secondary/30 p-3 rounded-lg flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">Yield</p>
                  <p className="text-sm font-medium text-foreground">{seed.yield_potential}</p>
                </div>
              </div>

              {/* Planting Season */}
              <div className="bg-accent/20 p-3 rounded-lg flex items-start gap-2 col-span-2">
                <Calendar className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">When to Plant</p>
                  <p className="text-sm font-medium text-foreground">{seed.planting_season}</p>
                </div>
              </div>

              {/* Planting Rate */}
              <div className="bg-accent/20 p-3 rounded-lg flex items-start gap-2">
                <Droplets className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">Seed Rate</p>
                  <p className="text-sm font-medium text-foreground">{seed.rate}</p>
                </div>
              </div>

              {/* Altitude Zone */}
              <div className="bg-accent/20 p-3 rounded-lg flex items-start gap-2">
                <Leaf className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">Best For</p>
                  <p className="text-sm font-medium text-foreground">{seed.altitude_zone}</p>
                </div>
              </div>
            </div>

            {/* Attributes Tags */}
            {seed.attributes && seed.attributes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {seed.attributes.map((attr, idx) => (
                  <span key={idx} className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {attr}
                  </span>
                ))}
              </div>
            )}

            {/* Agronomic Advice */}
            {expandedAdvice === seed.id && <AgronomicAdvice cropName={seed.name} altitude={1500} />}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSpeak(seed.name, seed.id)}
                className="flex-1 bg-transparent"
              >
                <Volume2 className="w-4 h-4 mr-1" />
                {speaking === seed.id ? "Stop" : "Speak"}
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
                onClick={() => setExpandedAdvice(expandedAdvice === seed.id ? null : seed.id)}
                className="flex-1 bg-transparent"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Tips
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleTranslate(seed.id, seed.kiswahili_name)}
                disabled={loadingAi[seed.id]}
                className="flex-1 bg-transparent"
              >
                {loadingAi[seed.id] ? (
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
