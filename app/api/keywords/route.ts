import { NextRequest, NextResponse } from 'next/server'
import { DMKeywordSet } from '@/lib/types'

const keywordSetsByTopic: Record<string, DMKeywordSet[]> = {
  '1': [
    { id: 'ks1-1', topicId: '1', keywords: ['분홍', '보라', '흰색'] },
    { id: 'ks1-2', topicId: '1', keywords: ['달', '별', '안개'] },
    { id: 'ks1-3', topicId: '1', keywords: ['꽃', '나비', '바람'] },
    { id: 'ks1-4', topicId: '1', keywords: ['파랑', '구름', '빛'] },
    { id: 'ks1-5', topicId: '1', keywords: ['빨강', '금색', '검정'] },
  ],
  '2': [
    { id: 'ks2-1', topicId: '2', keywords: ['초록', '파랑', '흰색'] },
    { id: 'ks2-2', topicId: '2', keywords: ['눈', '비', '구름'] },
    { id: 'ks2-3', topicId: '2', keywords: ['커피', '녹차', '홍차'] },
    { id: 'ks2-4', topicId: '2', keywords: ['주황', '분홍', '연두'] },
    { id: 'ks2-5', topicId: '2', keywords: ['산', '바다', '숲'] },
  ],
  '3': [
    { id: 'ks3-1', topicId: '3', keywords: ['검정', '회색', '흰색'] },
    { id: 'ks3-2', topicId: '3', keywords: ['불꽃', '물결', '바람'] },
    { id: 'ks3-3', topicId: '3', keywords: ['달빛', '별빛', '어둠'] },
    { id: 'ks3-4', topicId: '3', keywords: ['노랑', '주황', '빨강'] },
    { id: 'ks3-5', topicId: '3', keywords: ['오전', '오후', '밤'] },
  ],
}

export async function GET(request: NextRequest) {
  const topicId = request.nextUrl.searchParams.get('topicId') ?? ''
  await new Promise((r) => setTimeout(r, 600))
  return NextResponse.json(keywordSetsByTopic[topicId] ?? [])
}
