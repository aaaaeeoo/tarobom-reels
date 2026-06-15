import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { GeneratedMusic } from '@/lib/types'

const MOOD_MAP: Record<string, { mood: string; bpm: number; prompt: string }> = {
  default: { mood: '신비', bpm: 80, prompt: 'mysterious ethereal ambient background music for a tarot fortune reading, soft piano and strings, no lyrics, calm and mystical' },
}

function buildPrompt(topicTitle: string): string {
  const base = `Create a 30-second background music track for a Korean tarot fortune-telling short-form video titled "${topicTitle}". The music should be atmospheric, mystical, and emotional — suitable for a mobile reel. No vocals, instrumental only. Use soft synths, gentle piano, or ambient textures.`
  return base
}

function parseMusicMeta(text: string): { title: string; mood: string; bpm: number } {
  const moodKeywords: Record<string, string> = {
    mysterious: '신비', mystical: '신비', ethereal: '신비',
    calm: '잔잔', peaceful: '잔잔', gentle: '잔잔',
    dreamy: '몽환', ambient: '몽환', atmospheric: '몽환',
    emotional: '감성', romantic: '감성', tender: '감성',
    uplifting: '희망', hopeful: '희망', bright: '희망',
  }

  let mood = '신비'
  for (const [keyword, label] of Object.entries(moodKeywords)) {
    if (text.toLowerCase().includes(keyword)) { mood = label; break }
  }

  const bpmMatch = text.match(/(\d{2,3})\s*bpm/i)
  const bpm = bpmMatch ? parseInt(bpmMatch[1]) : 80

  return { title: '타로 배경음악', mood, bpm }
}

export async function POST(request: NextRequest) {
  const { topicTitle } = await request.json().catch(() => ({}))

  const apiKey = process.env.GEMINI_API_KEY
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey })
      const prompt = buildPrompt(topicTitle ?? '타로 운세')

      const response = await ai.models.generateContent({
        model: 'lyria-3-clip-preview',
        contents: prompt,
      })

      let audioBase64: string | undefined
      let descriptionText = ''

      for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.text) descriptionText += part.text
        if (part.inlineData?.data) audioBase64 = part.inlineData.data
      }

      const meta = parseMusicMeta(descriptionText)

      const result: GeneratedMusic = {
        id: `m-${Date.now()}`,
        title: meta.title,
        mood: meta.mood,
        duration: 30,
        bpm: meta.bpm,
        audioBase64,
      }

      return NextResponse.json([result])
    } catch (err) {
      console.warn('Gemini music generation error, falling back to mock tracks:', err)
    }
  }

  // Fallback to high-quality mock tracks (used when API key is missing or model call fails)
  const fallbackTracks: GeneratedMusic[] = [
    {
      id: `m-mock-1-${Date.now()}`,
      title: '신비로운 운명의 밤 (Mystical Destiny)',
      mood: '신비',
      duration: 30,
      bpm: 80,
    },
    {
      id: `m-mock-2-${Date.now()}`,
      title: '평온한 달빛 리딩 (Serene Moonlight)',
      mood: '잔잔',
      duration: 30,
      bpm: 72,
    },
    {
      id: `m-mock-3-${Date.now()}`,
      title: '희망찬 내일의 예언 (Hopeful Oracle)',
      mood: '희망',
      duration: 30,
      bpm: 96,
    },
  ]

  return NextResponse.json(fallbackTracks)
}
