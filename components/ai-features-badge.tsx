"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"
import { checkChromeAiAvailability } from "@/lib/chrome-ai"

export default function AiFeaturesBadge() {
  const [aiFeatures, setAiFeatures] = useState({ prompt: false, translation: false })

  useEffect(() => {
    const features = checkChromeAiAvailability()
    setAiFeatures(features)
  }, [])

  if (!aiFeatures.prompt && !aiFeatures.translation) {
    return null
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-xs font-medium text-accent">
      <Sparkles className="w-3 h-3" />
      <span>Chrome AI Enabled</span>
    </div>
  )
}
