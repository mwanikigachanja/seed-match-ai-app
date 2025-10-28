export async function translateToKiswahili(text: string): Promise<string> {
  try {
    if (!("translation" in window.ai)) {
      console.warn("Chrome Translation API not available")
      return text
    }

    const translator = await (window.ai.translation as any).create({
      sourceLanguage: "en",
      targetLanguage: "sw",
    })

    const result = await translator.translate(text)
    return result
  } catch (error) {
    console.error("Translation error:", error)
    return text
  }
}

export async function generateEnhancedDescription(seedName: string, baseDescription: string): Promise<string> {
  try {
    if (!("languageModel" in window.ai)) {
      console.warn("Chrome Prompt API not available")
      return baseDescription
    }

    const session = await (window.ai.languageModel as any).create({
      temperature: 0.7,
      topK: 40,
    })

    const prompt = `You are an agricultural expert. Provide a concise, practical farming tip for growing ${seedName}. Keep it to 1-2 sentences. Base it on: ${baseDescription}`

    const result = await session.prompt(prompt)
    return result || baseDescription
  } catch (error) {
    console.error("AI generation error:", error)
    return baseDescription
  }
}

export async function generateAgronomicAdviceAI(cropName: string, altitude: number): Promise<string> {
  try {
    if (!("languageModel" in window.ai)) {
      console.warn("Chrome Prompt API not available")
      return ""
    }

    const session = await (window.ai.languageModel as any).create({
      temperature: 0.7,
      topK: 40,
    })

    const prompt = `You are an expert agricultural advisor for East African farmers at ${altitude}m altitude.
    Provide 3-4 practical, actionable farming tips for growing ${cropName}.
    Focus on: planting time, soil preparation, watering, pest management, harvesting, and storage.
    Keep advice simple and practical for farmers with limited literacy.
    Format as a numbered list.`

    const result = await session.prompt(prompt)
    return result || ""
  } catch (error) {
    console.error("AI advice generation error:", error)
    return ""
  }
}

export function checkChromeAiAvailability() {
  if (typeof window === "undefined") return { prompt: false, translation: false }

  return {
    prompt: "languageModel" in (window.ai || {}),
    translation: "translation" in (window.ai || {}),
  }
}
