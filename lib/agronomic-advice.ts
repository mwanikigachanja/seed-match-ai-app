import { checkAiAvailability } from "./chrome-ai"

export async function generateAgronomicAdvice(
  cropName: string,
  altitude: number
): Promise<string> {
  const availability = await checkAiAvailability()
  if (availability === "no") {
    return getDefaultAdvice(cropName, altitude)
  }

  try {
    const session = await window.ai!.createTextSession({
      temperature: 0.7,
      topK: 40,
    })

    const prompt = `You are an expert agricultural advisor for East African farmers at ${altitude}m altitude.
    Provide 3-4 practical, actionable farming tips for growing ${cropName}.
    Focus on: planting time, soil preparation, watering, pest management, harvesting, and storage.
    Keep advice simple and practical for farmers with limited literacy.
    Format as a numbered list.`

    const result = await session.prompt(prompt)
    return result || getDefaultAdvice(cropName, altitude)
  } catch (error) {
    console.error("AI advice generation error:", error)
    return getDefaultAdvice(cropName, altitude)
  }
}

function getDefaultAdvice(cropName: string, altitude: number): string {
  const adviceMap: Record<string, string> = {
    Maize:
      "1. Plant during rainy season (March-May or October-November)\n2. Prepare soil with manure before planting\n3. Water regularly, especially during flowering\n4. Watch for pests like fall armyworm and stem borers\n5. Harvest when kernels are dry and hard",
    Wheat:
      "1. Plant in cool season (May-July)\n2. Needs well-drained soil with good fertility\n3. Fertilize at planting time\n4. Water moderately throughout season\n5. Harvest when grain turns golden",
    Potato:
      "1. Plant seed potatoes in March-May or August-September\n2. Hill soil around plants as they grow\n3. Water consistently throughout growing season\n4. Watch for late blight disease\n5. Harvest after 90-120 days when leaves turn yellow",
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
    Spinach:
      "1. Plant in cool season\n2. Needs rich soil with organic matter\n3. Water regularly\n4. Harvest leaves continuously\n5. Can be planted year-round",
    Pepper:
      "1. Plant seedlings in warm season\n2. Needs full sun\n3. Water regularly\n4. Stake plants for support\n5. Harvest when peppers are firm",
    Broccoli:
      "1. Plant seedlings in cool season\n2. Needs rich soil\n3. Water regularly\n4. Harvest main head when tight\n5. Side shoots will develop after main harvest",
    Cauliflower:
      "1. Plant seedlings in cool season\n2. Needs rich soil with good drainage\n3. Water consistently\n4. Blanch heads by covering with leaves\n5. Harvest when heads are firm and white",
    Avocado:
      "1. Plant in well-drained soil\n2. Needs full sun\n3. Water regularly but avoid waterlogging\n4. Prune for shape and productivity\n5. First harvest after 3-4 years",
    Apple:
      "1. Plant in cool highland areas\n2. Needs well-drained soil\n3. Prune annually for shape\n4. Thin fruits for larger size\n5. Harvest when fully colored",
  }

  return (
    adviceMap[cropName] ||
    `1. Plant during appropriate season for your altitude (${altitude}m)\n2. Prepare soil with organic matter\n3. Water regularly\n4. Watch for pests and diseases\n5. Harvest at proper maturity`
  )
}
