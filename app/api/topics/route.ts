import { NextResponse } from 'next/server'
import { Topic } from '@/lib/types'

const TOPIC_POOL: Omit<Topic, 'id'>[] = [
  {
    title: '곧 나에게 연락해올 그 사람 🌙',
    description: '"혹시 연락 오는 거 아닐까?" 하는 기대감을 정확히 건드리는 포맷. 특정 인물을 향한 감정이 있는 시청자의 저장·댓글 참여를 강하게 자극하며 DM 상담 전환율이 높습니다.',
    sourceAccount: '@tarot_daily_kr',
    views: 521000,
    engagementRate: 15.3,
    hashtags: ['연락올까', '타로', '연애타로', '그사람연락'],
  },
  {
    title: '지금 내 주변에서 나를 몰래 좋아하는 사람 👀',
    description: '숨겨진 호감을 타로로 밝히는 호기심 유발형 포맷. "혹시 나야?" 반응을 유도하는 댓글·공유 구조로 알고리즘 노출에 유리하며 저장률이 매우 높습니다.',
    sourceAccount: '@mystic_tarot_studio',
    views: 478000,
    engagementRate: 16.8,
    hashtags: ['짝사랑', '나를좋아하는사람', '타로리딩', '숨겨진감정'],
  },
  {
    title: '내 삶이 통째로 뒤집어질 그 순간이 온다 ⚡',
    description: '인생 전환점에 대한 불안과 기대를 동시에 자극하는 포맷. 연애·직업·이사 등 큰 변화를 앞둔 시청자의 저장·공유를 유도하며 시즌 무관하게 꾸준한 조회수를 유지합니다.',
    sourceAccount: '@star_fortune_official',
    views: 403000,
    engagementRate: 12.1,
    hashtags: ['인생전환점', '타로운세', '변화의시기', '2026운세'],
  },
  {
    title: '이번 주 안에 생길 깜짝 소식 ✨',
    description: '단기 예측 포맷은 결과 확인 욕구를 자극해 재방문율이 높습니다. "진짜 맞았어!" 댓글이 자연스럽게 쌓여 신뢰도와 팔로우 전환율을 동시에 끌어올립니다.',
    sourceAccount: '@tarot_daily_kr',
    views: 367000,
    engagementRate: 13.5,
    hashtags: ['이번주운세', '깜짝소식', '타로예언', '주간운세'],
  },
  {
    title: '나를 떠난 그 사람, 지금 무슨 생각 하고 있을까 🌊',
    description: '이별 후 상대의 감정을 궁금해하는 심리를 직격으로 자극합니다. 감정 이입이 강해 영상을 끝까지 보게 만드는 완주율이 높고 DM 유입으로 직결됩니다.',
    sourceAccount: '@mystic_tarot_studio',
    views: 445000,
    engagementRate: 14.2,
    hashtags: ['이별후', '그사람생각', '타로', '짝사랑타로'],
  },
  {
    title: '결국 나와 이어질 운명의 사람은 따로 있다 💫',
    description: '운명적 인연이라는 판타지를 자극하는 로맨틱 포맷. 저장 후 반복 시청률이 높고, "나도 봐줘요" DM 요청이 폭발적으로 들어오는 콘텐츠 유형입니다.',
    sourceAccount: '@star_fortune_official',
    views: 389000,
    engagementRate: 11.9,
    hashtags: ['운명의인연', '소울메이트', '타로운세', '연애운'],
  },
  {
    title: '지금 당장 손절해야 할 사람이 내 곁에 있다 🚨',
    description: '경고성 포맷은 불안 심리를 건드려 끝까지 보게 만드는 완주율이 최상위권입니다. 저장 후 지인 공유로 이어지는 바이럴 구조를 자연스럽게 만듭니다.',
    sourceAccount: '@tarot_daily_kr',
    views: 512000,
    engagementRate: 17.4,
    hashtags: ['손절타로', '인간관계운세', '타로경고', '주변사람'],
  },
  {
    title: '올해 안에 내 통장에 큰돈이 들어온다 💰',
    description: '재물운 포맷은 연령·성별 무관하게 광범위한 타깃에게 통합니다. "나도 해당되나요?" 댓글 참여가 활발하고 저장률·공유율 모두 상위권을 유지합니다.',
    sourceAccount: '@mystic_tarot_studio',
    views: 498000,
    engagementRate: 13.8,
    hashtags: ['재물운', '금전운타로', '돈들어오는날', '2026재물운'],
  },
  {
    title: '내가 포기하려던 그 꿈, 아직 늦지 않았다 🔥',
    description: '자기계발·도전 감성의 동기부여 포맷. 20~30대 여성에게 특히 저장률이 높고, "용기 받았어요" 댓글로 자연스러운 팔로우 전환이 일어나는 콘텐츠 유형입니다.',
    sourceAccount: '@star_fortune_official',
    views: 334000,
    engagementRate: 10.6,
    hashtags: ['꿈타로', '도전운세', '자기계발', '타로동기부여'],
  },
  {
    title: '그 사람이 나한테 숨기고 있는 진짜 비밀 🔒',
    description: '비밀·숨겨진 감정 포맷은 긴장감을 유지해 완주율이 매우 높습니다. 연인·전 연인 모두 타깃이 되어 넓은 도달 범위를 확보할 수 있습니다.',
    sourceAccount: '@tarot_daily_kr',
    views: 461000,
    engagementRate: 15.9,
    hashtags: ['숨겨진비밀', '타로리딩', '그사람진심', '연애타로'],
  },
  {
    title: '이번 달 나에게 찾아올 새로운 인연 🌸',
    description: '월간 인연 예측 포맷은 매달 반복 시청 수요를 만들어냅니다. 솔로 타깃의 저장률이 높고, DM으로 "언제 만나요?" 같은 구체적 상담 문의가 집중됩니다.',
    sourceAccount: '@mystic_tarot_studio',
    views: 378000,
    engagementRate: 12.7,
    hashtags: ['새로운인연', '이달의운세', '인연타로', '솔로운세'],
  },
  {
    title: '지금 내 선택이 맞는 건지 타로에게 물어봤다 🎴',
    description: '결정 장애·갈등 상황에 처한 시청자의 공감을 끌어내는 포맷. "나도 똑같은 상황인데" 댓글이 활발하게 쌓이며 저장 후 지인 태그 공유로 이어집니다.',
    sourceAccount: '@star_fortune_official',
    views: 342000,
    engagementRate: 11.3,
    hashtags: ['선택의기로', '결정타로', '타로상담', '고민운세'],
  },
]

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

function pickTopicsForToday(): Topic[] {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  const rand = seededRandom(seed)

  const indices = Array.from({ length: TOPIC_POOL.length }, (_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]]
  }

  return indices.slice(0, 3).map((idx, i) => ({ id: String(i + 1), ...TOPIC_POOL[idx] }))
}

export async function GET() {
  await new Promise((r) => setTimeout(r, 900))
  return NextResponse.json(pickTopicsForToday())
}
