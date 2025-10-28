export type Language = "en" | "sw" | "fr"

export const languages = {
  en: { name: "English", flag: "🇬🇧" },
  sw: { name: "Kiswahili", flag: "🇹🇿" },
  fr: { name: "Français", flag: "🇫🇷" },
}

export async function translateText(text: string, targetLanguage: Language): Promise<string> {
  if (targetLanguage === "en") return text

  // Check if Chrome Translation API is available
  if (!window.ai?.translator) {
    return getDefaultTranslation(text, targetLanguage)
  }

  try {
    const translator = await window.ai.translator.create({
      sourceLanguage: "en",
      targetLanguage: targetLanguage === "sw" ? "sw" : "fr",
    })

    const result = await translator.translate(text)
    return result
  } catch (error) {
    console.error("Translation failed:", error)
    return getDefaultTranslation(text, targetLanguage)
  }
}

function getDefaultTranslation(text: string, language: Language): string {
  // Basic translations for common terms
  const translations: Record<Language, Record<string, string>> = {
    en: {},
    sw: {
      "Find the best seeds for your farm": "Tafuta mbegu bora kwa shambani lako",
      "Tell us where you are": "Tuambie mahali ulipo",
      "Seeds for": "Mbegu za",
      "Days to Harvest": "Siku za Kupikia",
      "When to Plant": "Wakati wa Kupanda",
      "Seed Rate": "Kiwango cha Mbegu",
      "Best For": "Bora kwa",
      "Farming Tips": "Vidokezo vya Kilimo",
      "Get Farming Tips": "Pata Vidokezo vya Kilimo",
    },
    fr: {
      "Find the best seeds for your farm": "Trouvez les meilleures graines pour votre ferme",
      "Tell us where you are": "Dites-nous où vous êtes",
      "Seeds for": "Graines pour",
      "Days to Harvest": "Jours jusqu'à la récolte",
      "When to Plant": "Quand planter",
      "Seed Rate": "Taux de semis",
      "Best For": "Meilleur pour",
      "Farming Tips": "Conseils agricoles",
      "Get Farming Tips": "Obtenir des conseils agricoles",
    },
  }

  return translations[language][text] || text
}

declare global {
  interface Window {
    ai?: {
      translator?: {
        create: (options: {
          sourceLanguage: string
          targetLanguage: string
        }) => Promise<{
          translate: (text: string) => Promise<string>
        }>
      }
    }
  }
}
