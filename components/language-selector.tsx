"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { type Language, languages } from "@/lib/language-utils"

interface LanguageSelectorProps {
  onLanguageChange: (language: Language) => void
}

export default function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("seedmatch_language")
    if (saved && (saved === "en" || saved === "sw" || saved === "fr")) {
      setCurrentLanguage(saved as Language)
      onLanguageChange(saved as Language)
    }
  }, [onLanguageChange])

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang)
    localStorage.setItem("seedmatch_language", lang)
    onLanguageChange(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-transparent"
      >
        <Globe className="w-4 h-4" />
        <span>{languages[currentLanguage].flag}</span>
        <span className="hidden sm:inline">{languages[currentLanguage].name}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg z-50">
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as Language)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                currentLanguage === code ? "bg-primary/10 text-primary font-semibold" : ""
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
