"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Loader2, Copy, Check, Volume2, Globe } from "lucide-react"
import { useChromeAi, useTextToSpeech } from "@/lib/chrome-ai"
import type { Language } from "@/lib/language-utils"
import { generateAgronomicAdvice } from "@/lib/agronomic-advice"

interface AgronomicAdviceProps {
  cropName: string
  altitude: number
  language: Language
}

export default function AgronomicAdvice({
  cropName,
  altitude,
  language,
}: AgronomicAdviceProps) {
  const [advice, setAdvice] = useState<string | null>(null)
  const [translatedAdvice, setTranslatedAdvice] = useState<string | null>(null)
  const [showTranslated, setShowTranslated] = useState(false)
  const [copied, setCopied] = useState(false)

  const systemPrompt = `You are an expert agricultural advisor for East African farmers. 
    Provide practical, actionable farming advice in simple language suitable for farmers with limited literacy.
    Focus on: planting time, soil preparation, watering, pest management, harvesting, and storage.
    Keep advice concise and practical. Format as a numbered list.`

  const {
    generateContent: generateAdvice,
    loading: loadingAdvice,
    error: adviceError,
  } = useChromeAi(systemPrompt)
  const {
    generateContent: translate,
    loading: translating,
    error: translationError,
  } = useChromeAi(
    `You are a translator. Translate the following text to ${
      language === "sw" ? "Swahili" : "French"
    }.`
  )
  const { speak, speaking } = useTextToSpeech()

  useEffect(() => {
    if (adviceError) {
      setAdvice(getDefaultAdvice(cropName))
    }
  }, [adviceError, cropName])

  const handleGetAdvice = async () => {
    const prompt = `Give me 4-5 key farming tips for growing ${cropName} at ${altitude}m altitude. 
    Make it simple and practical for a farmer to understand. Format as a numbered list.`
    const generated = await generateAdvice(prompt)
    setAdvice(generated || getDefaultAdvice(cropName))
    setTranslatedAdvice(null)
    setShowTranslated(false)
  }

  const handleTranslate = async () => {
    if (!advice) return
    if (showTranslated) {
      setShowTranslated(false)
      return
    }
    if (translatedAdvice) {
      setShowTranslated(true)
      return
    }
    const translated = await translate(advice)
    setTranslatedAdvice(translated)
    setShowTranslated(true)
  }

  const handleCopy = () => {
    const textToCopy = showTranslated ? translatedAdvice : advice
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSpeak = () => {
    const textToSpeak = showTranslated ? translatedAdvice : advice
    if (!textToSpeak) return
    speak(
      textToSpeak,
      language === "sw" ? "sw-TZ" : language === "fr" ? "fr-FR" : "en-US"
    )
  }

  const displayAdvice = showTranslated ? translatedAdvice : advice

  return (
    <Card className="p-4 bg-accent/5 border-accent/20">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-foreground">
            Farming Tips for {cropName}
          </h3>
        </div>

        {!advice ? (
          <Button
            onClick={handleGetAdvice}
            disabled={loadingAdvice}
            className="w-full bg-transparent"
            variant="outline"
          >
            {loadingAdvice ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Getting Tips...
              </>
            ) : (
              <>
                <Lightbulb className="w-4 h-4 mr-2" />
                Get Farming Tips
              </>
            )}
          </Button>
        ) : (
          <>
            <div className="bg-background p-3 rounded text-sm text-foreground whitespace-pre-wrap max-h-64 overflow-y-auto">
              {displayAdvice}
            </div>

            <div className="flex gap-2 flex-wrap">
              {language !== "en" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleTranslate}
                  disabled={translating}
                  className="flex-1 bg-transparent"
                >
                  {translating ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <Globe className="w-3 h-3 mr-1" />
                      {showTranslated ? "Show English" : "Translate"}
                    </>
                  )}
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={handleSpeak}
                className="flex-1 bg-transparent"
              >
                <Volume2 className="w-3 h-3 mr-1" />
                {speaking ? "Stop" : "Speak"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="flex-1 bg-transparent"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}

function getDefaultAdvice(cropName: string): string {
  const adviceMap: Record<string, string> = {
    Maize:
      "1. Plant during rainy season (March-May or October-November)\n2. Prepare soil with manure before planting\n3. Water regularly, especially during flowering\n4. Watch for pests like fall armyworm\n5. Harvest when kernels are dry and hard",
    Wheat:
      "1. Plant in cool season (May-July)\n2. Needs well-drained soil with good fertility\n3. Fertilize at planting time\n4. Water moderately\n5. Harvest when grain turns golden",
    Potato:
      "1. Plant seed potatoes in March-May or August-September\n2. Hill soil around plants as they grow\n3. Water consistently throughout growing season\n4. Watch for late blight disease\n5. Harvest after 90-120 days",
    Beans:
      "1. Plant in rainy season (March-May or October-November)\n2. Needs good drainage\n3. Support climbing varieties with stakes\n4. Water at base of plants\n5. Harvest when pods are dry",
    Tomato:
      "1. Plant seedlings in warm season\n2. Stake plants for support\n3. Water at base, not on leaves\n4. Prune suckers for better fruit\n5. Harvest when fully red",
    Cabbage:
      "1. Plant seedlings in cool season\n2. Space plants 45cm apart\n3. Water regularly\n4. Watch for cabbage worms\n5. Harvest when heads are firm",
    Carrot:
      "1. Sow seeds directly in soil\n2. Thin seedlings to 5cm apart\n3. Keep soil moist\n4. Mulch to retain moisture\n5. Harvest after 70-90 days",
    Onion:
      "1. Plant sets or seeds in August-October\n2. Needs full sun\n3. Water regularly\n4. Fertilize monthly\n5. Harvest when tops fall over",
    Sorghum:
      "1. Very drought tolerant\n2. Plant in dry season\n3. Minimal water needed\n4. Needs good drainage\n5. Harvest when grain is hard",
    Millet:
      "1. Very drought tolerant\n2. Plant in poor soils\n3. Minimal inputs needed\n4. Water only during establishment\n5. Harvest when dry",
  }

  return (
    adviceMap[cropName] ||
    `1. Plant during appropriate season\n2. Prepare soil with organic matter\n3. Water regularly\n4. Watch for pests and diseases\n5. Harvest at proper maturity`
  )
}
