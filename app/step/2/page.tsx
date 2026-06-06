'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepProgress } from '@/components/layout/StepProgress'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { useReelsStore } from '@/lib/store'
import { DMKeyword } from '@/lib/types'

const categoryLabel: Record<DMKeyword['category'], string> = {
  trigger: 'DM 트리거',
  interest: '관심사',
  engagement: '참여 유도',
}

export default function Step2Page() {
  const router = useRouter()
  const { topics, selectedTopicId, keywords, selectedKeywordIds, setKeywords, toggleKeyword } =
    useReelsStore()
  const [loading, setLoading] = useState(keywords.length === 0)

  const selectedTopic = topics.find((t) => t.id === selectedTopicId)

  useEffect(() => {
    if (!selectedTopicId) {
      router.replace('/step/1')
      return
    }
    if (keywords.length > 0) return
    fetch(`/api/keywords?topicId=${selectedTopicId}`)
      .then((r) => r.json())
      .then((data: DMKeyword[]) => {
        setKeywords(data)
        setLoading(false)
      })
  }, [selectedTopicId, keywords.length, setKeywords, router])

  const grouped = (Object.keys(categoryLabel) as DMKeyword['category'][]).map((cat) => ({
    category: cat,
    label: categoryLabel[cat],
    items: keywords.filter((k) => k.category === cat),
  }))

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <StepProgress currentStep={2} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight mb-1.5">DM 키워드 추천</h2>
        <p className="text-sm text-gray-500">
          자동 DM 발송 트리거에 사용할 키워드를 선택하세요.
        </p>
      </div>

      {selectedTopic && (
        <div className="mb-6 px-4 py-3 border border-gray-200 bg-gray-50 flex items-center gap-3">
          <span className="text-xs text-gray-400 font-mono">선택 주제</span>
          <span className="text-sm font-medium">{selectedTopic.title}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center gap-3 py-24 text-gray-400">
          <Spinner size="lg" />
          <span className="text-xs font-mono tracking-wider">키워드 생성 중...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-6 animate-fade-in">
          {grouped.map(({ category, label, items }) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-black">{label}</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((kw) => {
                  const isSelected = selectedKeywordIds.includes(kw.id)
                  return (
                    <button
                      key={kw.id}
                      onClick={() => toggleKeyword(kw.id)}
                      className={[
                        'px-3 py-1.5 text-sm font-mono transition-colors border',
                        isSelected
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-gray-200 hover:border-gray-400',
                      ].join(' ')}
                    >
                      {kw.keyword}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <span className="text-xs text-gray-400 font-mono">
          {selectedKeywordIds.length > 0
            ? `${selectedKeywordIds.length}개 선택됨`
            : '키워드를 선택하세요'}
        </span>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => router.push('/step/1')}>
            이전
          </Button>
          <Button
            onClick={() => router.push('/step/3')}
            disabled={selectedKeywordIds.length === 0}
            size="lg"
          >
            다음 단계
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
