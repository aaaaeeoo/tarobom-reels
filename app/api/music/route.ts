import { NextResponse } from 'next/server'
import { GeneratedMusic } from '@/lib/types'

const musicPool: GeneratedMusic[] = [
  { id: 'm1', title: '신비로운 첫 번째 선율', mood: '신비', duration: 30, bpm: 85 },
  { id: 'm2', title: '잔잔한 감성 배경음', mood: '잔잔', duration: 30, bpm: 72 },
  { id: 'm3', title: '몽환적 루프 트랙', mood: '몽환', duration: 30, bpm: 90 },
]

export async function POST() {
  await new Promise((r) => setTimeout(r, 1400))
  return NextResponse.json(musicPool)
}
