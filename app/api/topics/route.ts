import { NextResponse } from 'next/server'
import { Topic } from '@/lib/types'

const mockTopics: Topic[] = [
  {
    id: '1',
    title: '지금 그 사람의 진짜 속마음 💬',
    description:
      '상대방의 감정을 타로로 읽어주는 포맷. "혹시 나를 좋아하는 건 아닐까?" 하는 궁금증을 자극해 저장·DM 유입이 매우 높습니다.',
    sourceAccount: '@tarot_daily_kr',
    views: 412000,
    engagementRate: 13.2,
    hashtags: ['그사람속마음', '타로', '연애타로', '짝사랑'],
  },
  {
    id: '2',
    title: '그 사람과 정말 완전히 끝난 걸까? 💧',
    description:
      '이별 후 재회 가능성을 묻는 타로 리딩. 감정적 공감대가 높아 저장률·공유율이 특히 높고 DM 상담으로 이어지는 전환율이 탁월합니다.',
    sourceAccount: '@mystic_tarot_studio',
    views: 389000,
    engagementRate: 14.7,
    hashtags: ['이별타로', '재회운', '그사람', '연애운세'],
  },
  {
    id: '3',
    title: '26년 하반기 나에게 다가올 큰 변화 🚀',
    description:
      '시즌성이 강한 반기별 운세 콘텐츠. 변화·기회 키워드로 저장 욕구를 자극하며 연말·반기 시즌에 조회수가 급증합니다.',
    sourceAccount: '@star_fortune_official',
    views: 356000,
    engagementRate: 10.9,
    hashtags: ['2026운세', '하반기운세', '타로리딩', '인생변화'],
  },
]

export async function GET() {
  await new Promise((r) => setTimeout(r, 900))
  return NextResponse.json(mockTopics)
}
