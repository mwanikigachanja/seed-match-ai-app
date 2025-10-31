"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"

// Define comprehensive types for the Chrome AI API
declare global {
  interface Window {
    ai?: {
      canCreateGenericSession(): Promise<"readily" | "after-download" | "no">
      createGenericSession(options?: {
        temperature?: number
        topK?: number
      }): Promise<AiTextSession>
      canCreateTextSession(): Promise<"readily" | "after-download" | "no">
      createTextSession(options?: {
        temperature?: number
        topK?: number
      }): Promise<AiTextSession>
      defaultTextSessionOptions(): Promise<AiTextSessionOptions>
    }
  }

  interface AiTextSession {
    prompt(input: string): Promise<string>
    promptStreaming(input: string): ReadableStream<string>
    destroy(): void
    clone(): Promise<AiTextSession>
  }

  interface AiTextSessionOptions {
    temperature?: number
    topK?: number
  }
}

/**
 * Checks the availability of the Chrome AI model.
 * @returns A promise that resolves to "readily", "after-download", or "no".
 */
export async function checkAiAvailability(): Promise<"readily" | "after-download" | "no"> {
  if (typeof window === "undefined" || !window.ai) {
    return "no"
  }
  try {
    return await window.ai.canCreateTextSession()
  } catch (error) {
    console.error("Error checking AI availability:", error)
    return "no"
  }
}

/**
 * A reusable hook for interacting with the Chrome AI text session.
 * @param systemPrompt - The system prompt to use for the AI session.
 * @returns An object with the `generateContent` function and loading/error states.
 */
export function useChromeAi(systemPrompt: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [session, setSession] = useState<AiTextSession | null>(null)

  useEffect(() => {
    async function initializeSession() {
      setLoading(true)
      setError(null)
      try {
        const availability = await checkAiAvailability()
        if (availability === "no") {
          throw new Error("Chrome AI is not available.")
        }
        if (availability === "after-download") {
          toast("AI model is downloading. This may take a few minutes.", {
            action: {
              label: "Dismiss",
              onClick: () => toast.dismiss(),
            },
          })
        }
        const newSession = await window.ai!.createTextSession({
          temperature: 0.7,
          topK: 40,
        })
        setSession(newSession)
      } catch (e: any) {
        setError(e.message)
        toast.error(e.message)
      } finally {
        setLoading(false)
      }
    }
    initializeSession()

    return () => {
      session?.destroy()
    }
  }, [systemPrompt])

  async function generateContent(prompt: string): Promise<string | null> {
    if (!session) {
      setError("AI session is not initialized.")
      toast.error("AI session is not initialized.")
      return null
    }
    setLoading(true)
    setError(null)
    try {
      const result = await session.prompt(prompt)
      return result
    } catch (e: any) {
      setError(e.message)
      toast.error("Failed to generate content from AI.")
      return null
    } finally {
      setLoading(false)
    }
  }

  return { generateContent, loading, error }
}

/**
 * A reusable hook for text-to-speech functionality.
 * @returns An object with the `speak` function and the `speaking` state.
 */
export function useTextToSpeech() {
  const [speaking, setSpeaking] = useState(false)

  function speak(text: string, lang = "en-US") {
    if (!("speechSynthesis" in window)) {
      toast.error("Text-to-speech is not supported in your browser.")
      return
    }
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
    } else {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.onstart = () => setSpeaking(true)
      utterance.onend = () => setSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  return { speak, speaking }
}