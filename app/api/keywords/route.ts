import { NextRequest, NextResponse } from 'next/server'
import { DMKeyword } from '@/lib/types'

const keywordsByTopic: Record<string, DMKeyword[]> = {
  '1': [
    { id: 'k1-1', topicId: '1', keyword: '타로', category: 'trigger' },
    { id: 'k1-2', topicId: '1', keyword: '연애운', category: 'trigger' },
    { id: 'k1-3', topicId: '1', keyword: '운세봐줘', category: 'trigger' },
    { id: 'k1-4', topicId: '1', keyword: '사랑타로', category: 'interest' },
    { id: 'k1-5', topicId: '1', keyword: '고백', category: 'interest' },
    { id: 'k1-6', topicId: '1', keyword: '이별', category: 'engagement' },
    { id: 'k1-7', topicId: '1', keyword: '궁합', category: 'engagement' },
  ],
  '2': [
    { id: 'k2-1', topicId: '2', keyword: '별자리', category: 'trigger' },
    { id: 'k2-2', topicId: '2', keyword: '운세', category: 'trigger' },
    { id: 'k2-3', topicId: '2', keyword: '이달운세', category: 'trigger' },
    { id: 'k2-4', topicId: '2', keyword: '양자리', category: 'interest' },
    { id: 'k2-5', topicId: '2', keyword: '물고기자리', category: 'interest' },
    { id: 'k2-6', topicId: '2', keyword: '천칭자리', category: 'engagement' },
    { id: 'k2-7', topicId: '2', keyword: 'TOP3', category: 'engagement' },
  ],
  '3': [
    { id: 'k3-1', topicId: '3', keyword: '재물운', category: 'trigger' },
    { id: 'k3-2', topicId: '3', keyword: '타로리딩', category: 'trigger' },
    { id: 'k3-3', topicId: '3', keyword: '2025운세', category: 'trigger' },
    { id: 'k3-4', topicId: '3', keyword: '돈들어오는법', category: 'interest' },
    { id: 'k3-5', topicId: '3', keyword: '사업운', category: 'interest' },
    { id: 'k3-6', topicId: '3', keyword: '하반기', category: 'engagement' },
    { id: 'k3-7', topicId: '3', keyword: '직장운', category: 'engagement' },
  ],
}

export async function GET(request: NextRequest) {
  const topicId = request.nextUrl.searchParams.get('topicId') ?? ''
  await new Promise((r) => setTimeout(r, 600))
  return NextResponse.json(keywordsByTopic[topicId] ?? [])
}
