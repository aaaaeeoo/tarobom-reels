import { NextResponse } from 'next/server'
import { Topic } from '@/lib/types'

const mockTopics: Topic[] = [
  {
    id: '1',
    title: '오늘의 타로 : 사랑 운세',
    description:
      '연애 운세를 타로 카드로 알아보는 숏폼 콘텐츠. 고백·고민·이별 등 공감대 높은 스토리라인으로 저장률이 높습니다.',
    sourceAccount: '@tarot_daily_kr',
    views: 284000,
    engagementRate: 8.4,
    hashtags: ['타로', '연애운세', '사랑타로', '오늘의운세'],
  },
  {
    id: '2',
    title: '이번 달 별자리 운세 TOP 3',
    description:
      '12개 별자리 중 이번 달 운이 좋은 3위를 공개하는 포맷. 댓글 참여를 유도하는 구조로 참여율이 특히 높습니다.',
    sourceAccount: '@star_fortune_official',
    views: 197000,
    engagementRate: 11.2,
    hashtags: ['별자리운세', '이달의운세', '양자리', '물고기자리'],
  },
  {
    id: '3',
    title: '2025 하반기 재물운 타로 리딩',
    description:
      '재물·사업 관련 타로 리딩 콘텐츠. 시즌성이 높아 저장률과 공유율이 특히 높고 DM 유입이 많습니다.',
    sourceAccount: '@mystic_tarot_studio',
    views: 312000,
    engagementRate: 9.7,
    hashtags: ['재물운', '타로리딩', '2025운세', '하반기운세'],
  },
]

export async function GET() {
  await new Promise((r) => setTimeout(r, 900))
  return NextResponse.json(mockTopics)
}
