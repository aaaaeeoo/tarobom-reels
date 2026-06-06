import { NextRequest, NextResponse } from 'next/server'
import { GeneratedImage } from '@/lib/types'

export async function POST(request: NextRequest) {
  const { topicTitle, keywords } = await request.json()
  await new Promise((r) => setTimeout(r, 1800))

  const seed = Math.floor(Math.random() * 900) + 100
  const image: GeneratedImage = {
    id: `img-${Date.now()}`,
    url: `https://picsum.photos/seed/${seed}/800/1000`,
    prompt: `${topicTitle} — 타로 카드 감성의 미니멀 릴스 썸네일, 모노톤, 신비로운 분위기. 키워드: ${keywords.join(', ')}`,
  }

  return NextResponse.json(image)
}
