export async function generateAgronomicAdvice(cropName: string, altitude: number): Promise<string> {
  // Check if Chrome AI Prompt API is available
  if (!window.ai?.languageModel) {
    return getDefaultAdvice(cropName, altitude)
  }

  try {
    const session = await window.ai.languageModel.create({
      systemPrompt: `You are an expert agricultural advisor for East African farmers. 
      Provide practical, actionable farming advice in simple language suitable for farmers with limited literacy.
      Focus on: planting time, soil preparation, watering, pest management, harvesting, and storage.
      Keep advice concise and practical.`,
    })

    const prompt = `Give me 3-4 key farming tips for growing ${cropName} at ${altitude}m altitude. 
    Make it simple and practical for a farmer to understand.`

    const response = await session.prompt(prompt)
    session.destroy()
    return response
  } catch (error) {
    console.error("Failed to generate advice:", error)
    return getDefaultAdvice(cropName, altitude)
  }
}

export async function summarizeAdvice(advice: string): Promise<string> {
  if (!window.ai?.languageModel) {
    return advice.substring(0, 150) + "..."
  }

  try {
    const session = await window.ai.languageModel.create({
      systemPrompt: "You are a concise summarizer. Summarize the following advice in 1-2 sentences.",
    })

    const response = await session.prompt(`Summarize this farming advice in 1-2 sentences: ${advice}`)
    session.destroy()
    return response
  } catch (error) {
    console.error("Failed to summarize:", error)
    return advice.substring(0, 150) + "..."
  }
}

function getDefaultAdvice(cropName: string, altitude: number): string {
  const adviceMap: Record<string, string> = {
    Maize: "Plant during rainy season. Prepare soil with manure. Water regularly. Watch for pests. Harvest when dry.",
    Wheat: "Plant in cool season. Needs well-drained soil. Fertilize at planting. Harvest when golden.",
    Potato: "Plant seed potatoes. Hill soil around plants. Water consistently. Harvest after 90-120 days.",
    Beans: "Plant in rainy season. Needs good drainage. Support climbing varieties. Harvest when pods are dry.",
    Tomato: "Plant seedlings. Stake plants. Water at base. Prune suckers. Harvest when red.",
    Cabbage: "Plant seedlings. Space well. Water regularly. Watch for pests. Harvest when firm.",
    Carrot: "Sow seeds directly. Thin seedlings. Keep soil moist. Harvest after 70-90 days.",
    Onion: "Plant sets or seeds. Needs full sun. Water regularly. Harvest when tops fall over.",
    Sorghum: "Drought tolerant. Plant in dry season. Minimal water needed. Harvest when grain is hard.",
    Millet: "Very drought tolerant. Plant in poor soils. Minimal inputs needed. Harvest when dry.",
  }

  return (
    adviceMap[cropName] ||
    `Grow ${cropName} at ${altitude}m altitude. Follow local farming practices. Consult extension officers for specific guidance.`
  )
}

declare global {
  interface Window {
    ai?: {
      languageModel?: {
        create: (options: { systemPrompt: string }) => Promise<{
          prompt: (text: string) => Promise<string>
          destroy: () => void
        }>
      }
    }
  }
}
