'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepProgress } from '@/components/layout/StepProgress'
import { Button } from '@toss/tds-mobile'
import { Spinner } from '@/components/ui/Spinner'
import { useReelsStore } from '@/lib/store'
import { DMKeywordSet } from '@/lib/types'
import { track } from '@/lib/mixpanel'

export default function Step2Page() {
  const router = useRouter()
  const {
    topics,
    selectedTopicId,
    keywords,
    selectedKeywordSetId,
    setKeywords,
    selectKeywordSet,
  } = useReelsStore()
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
      .then((data: DMKeywordSet[]) => {
        setKeywords(data)
        setLoading(false)
      })
  }, [selectedTopicId, keywords.length, setKeywords, router])

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <StepProgress currentStep={2} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight mb-1.5">DM 키워드 세트 선택</h2>
        <p className="text-sm text-gray-500">
          이미지 생성에 사용할 키워드 세트를 하나 선택하세요. 세트의 3개 키워드로 이미지가 만들어집니다.
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
          <span className="text-xs font-mono tracking-wider">키워드 세트 불러오는 중...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-3 animate-fade-in">
          {keywords.map((set) => {
            const isSelected = selectedKeywordSetId === set.id
            return (
              <button
                key={set.id}
                onClick={() => {
                  track('Keyword Set Selected', { set_id: set.id, keywords: set.keywords })
                  selectKeywordSet(set.id)
                }}
                className={[
                  'w-full text-left p-5 border transition-colors flex items-center justify-between gap-4',
                  isSelected
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-400 bg-white',
                ].join(' ')}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  {set.keywords.map((kw, i) => (
                    <span key={kw} className="flex items-center gap-2">
                      <span
                        className={[
                          'px-3 py-1 text-sm font-mono border',
                          isSelected
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-gray-200',
                        ].join(' ')}
                      >
                        {kw}
                      </span>
                      {i < 2 && (
                        <span className="text-gray-300 text-xs">·</span>
                      )}
                    </span>
                  ))}
                </div>

                <div
                  className={[
                    'w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors',
                    isSelected ? 'bg-black border-black' : 'border-gray-300',
                  ].join(' ')}
                >
                  {isSelected && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <span className="text-xs text-gray-400 font-mono">
          {selectedKeywordSetId ? '세트 선택 완료' : '키워드 세트를 선택하세요'}
        </span>
        <div className="flex gap-3">
          <Button variant="weak" onClick={() => router.push('/step/1')}>
            이전
          </Button>
          <Button
            onClick={() => {
              track('Step 2 Next Clicked', { keyword_set_id: selectedKeywordSetId })
              router.push('/step/3')
            }}
            disabled={!selectedKeywordSetId}
            size="large"
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
