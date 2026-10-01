export interface AIGenerateCaptionInput {
  topic: string
  platform: 'INSTAGRAM' | 'TIKTOK' | 'LINKEDIN' | 'FACEBOOK' | 'X'
  tone?: 'professional' | 'energetic' | 'persuasive' | 'witty'
  targetAudience?: string
}

export interface AIGenerateCaptionOutput {
  caption: string
  hashtags: string[]
  suggestedCTA: string
  creativeIdea: string
  isMock: boolean
}

export async function generateAICaption(input: AIGenerateCaptionInput): Promise<AIGenerateCaptionOutput> {
  const provider = process.env.AI_PROVIDER || 'mock'

  console.log(`[AI ASSISTANT ABSTRACTION - Mode: ${provider}] Generating content for topic: "${input.topic}" on ${input.platform}`)

  if (provider === 'openai' && process.env.OPENAI_API_KEY) {
    // OpenAI completion implementation spot
  }

  // Smart Mock Generator for East African business context
  const mockHashtags = [
    `#${input.topic.replace(/\s+/g, '')}`,
    '#363Creators',
    '#NairobiBusiness',
    '#MagicalKenya',
    '#DigitalGrowth',
    `#${input.platform}Marketing`
  ]

  return {
    caption: `🔥 Ready to elevate your business? ${input.topic} is key to staying ahead in today’s digital market. Tap the link in bio or message us on WhatsApp to get started with 363 Creators!`,
    hashtags: mockHashtags,
    suggestedCTA: 'Tap link in bio to book your consultation today!',
    creativeIdea: `Create a fast-paced 15-second vertical video showing a quick before/after transformation related to ${input.topic}.`,
    isMock: true,
  }
}
