import { NextResponse } from 'next/server'
import { Topic } from '@/lib/types'

const mockTopics: Topic[] = [
  {
    id: '1',
    title: '곧 나에게 연락해올 그 사람 🌙',
    description:
      '"혹시 연락 오는 거 아닐까?" 하는 기대감을 정확히 건드리는 포맷. 특정 인물을 향한 감정이 있는 시청자의 저장·댓글 참여를 강하게 자극하며 DM 상담 전환율이 높습니다.',
    sourceAccount: '@tarot_daily_kr',
    views: 521000,
    engagementRate: 15.3,
    hashtags: ['연락올까', '타로', '연애타로', '그사람연락'],
  },
  {
    id: '2',
    title: '지금 내 주변에서 나를 몰래 좋아하는 사람 👀',
    description:
      '숨겨진 호감을 타로로 밝히는 호기심 유발형 포맷. "혹시 나야?" 반응을 유도하는 댓글·공유 구조로 알고리즘 노출에 유리하며 저장률이 매우 높습니다.',
    sourceAccount: '@mystic_tarot_studio',
    views: 478000,
    engagementRate: 16.8,
    hashtags: ['짝사랑', '나를좋아하는사람', '타로리딩', '숨겨진감정'],
  },
  {
    id: '3',
    title: '내 삶이 통째로 뒤집어질 그 순간이 온다 ⚡',
    description:
      '인생 전환점에 대한 불안과 기대를 동시에 자극하는 포맷. 연애·직업·이사 등 큰 변화를 앞둔 시청자의 저장·공유를 유도하며 시즌 무관하게 꾸준한 조회수를 유지합니다.',
    sourceAccount: '@star_fortune_official',
    views: 403000,
    engagementRate: 12.1,
    hashtags: ['인생전환점', '타로운세', '변화의시기', '2026운세'],
  },
]

export async function GET() {
  await new Promise((r) => setTimeout(r, 900))
  return NextResponse.json(mockTopics)
}
