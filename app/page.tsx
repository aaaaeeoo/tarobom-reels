'use client'

import Link from 'next/link'
import { Paragraph } from '@toss/tds-mobile'
import { track } from '@/lib/mixpanel'

const workflowSteps = [
  {
    n: '01',
    title: '주제 추천',
    desc: '경쟁사 릴스 데이터 기반으로 조회수·참여율이 높은 주제 3개 자동 추천',
  },
  {
    n: '02',
    title: 'DM 키워드',
    desc: '선택한 주제에 맞는 자동 DM 트리거 키워드 추천',
  },
  {
    n: '03',
    title: '이미지 생성',
    desc: '주제와 브랜드 톤에 맞는 릴스 썸네일 이미지 자동 생성',
  },
  {
    n: '04',
    title: '배경음악',
    desc: '콘텐츠 분위기에 맞는 배경음악 자동 생성 및 선택',
  },
]

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-16">
        <Paragraph typography="st12" color="var(--adaptiveGrey400)" className="font-mono tracking-widest uppercase mb-6">
          TAROBOM INTERNAL TOOL
        </Paragraph>
        <Paragraph as="h1" typography="t1" fontWeight="bold" color="var(--adaptiveGrey900)" className="tracking-tight mb-4">
          릴스 콘텐츠,
          <br />
          4단계로 자동 완성
        </Paragraph>
        <Paragraph typography="st11" color="var(--adaptiveGrey500)" className="leading-relaxed max-w-md">
          경쟁사 데이터 분석부터 이미지·음악 생성까지.
          <br />
          마케팅 담당자의 반복 작업을 자동화합니다.
        </Paragraph>
      </div>

      <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 mb-12">
        {workflowSteps.map((step) => (
          <div key={step.n} className="bg-white p-6">
            <Paragraph typography="st12" color="var(--adaptiveGrey300)" className="font-mono mb-3">
              {step.n}
            </Paragraph>
            <Paragraph typography="st11" fontWeight="medium" color="var(--adaptiveGrey900)" className="mb-2">
              {step.title}
            </Paragraph>
            <Paragraph typography="st12" color="var(--adaptiveGrey500)" className="leading-relaxed">
              {step.desc}
            </Paragraph>
          </div>
        ))}
      </div>

      <Link
        href="/step/1"
        onClick={() => track('Session Started')}
        className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 hover:bg-gray-800 transition-colors"
      >
        <Paragraph.Text typography="st11" fontWeight="medium" color="white">
          새 세션 시작
        </Paragraph.Text>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  )
}
