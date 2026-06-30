'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Paragraph, Button } from '@toss/tds-mobile'
import { StepProgress } from '@/components/layout/StepProgress'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { useReelsStore } from '@/lib/store'
import { Topic } from '@/lib/types'
import { track } from '@/lib/mixpanel'

function formatViews(n: number) {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만`
  return n.toLocaleString()
}

export default function Step1Page() {
  const router = useRouter()
  const { topics, selectedTopicId, setTopics, selectTopic } = useReelsStore()
  const [loading, setLoading] = useState(topics.length === 0)

  useEffect(() => {
    if (topics.length > 0) return
    fetch('/api/topics')
      .then((r) => r.json())
      .then((data: Topic[]) => {
        setTopics(data)
        setLoading(false)
      })
  }, [topics.length, setTopics])

  const handleNext = () => {
    const topic = topics.find((t) => t.id === selectedTopicId)
    track('Step 1 Next Clicked', { topic_id: selectedTopicId, topic_title: topic?.title })
    router.push('/step/2')
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <StepProgress currentStep={1} />
      </div>

      <div className="mb-8">
        <Paragraph as="h2" typography="t4" fontWeight="bold" color="var(--adaptiveGrey900)" className="tracking-tight mb-1.5">
          릴스 주제 추천
        </Paragraph>
        <Paragraph typography="st11" color="var(--adaptiveGrey500)">
          경쟁사 릴스 분석 데이터 기반으로 추천합니다. 주제 하나를 선택하세요.
        </Paragraph>
      </div>

      {loading ? (
        <div className="flex flex-col items-center gap-3 py-24 text-gray-400">
          <Spinner size="lg" />
          <Paragraph.Text typography="st12" color="var(--adaptiveGrey400)" className="font-mono tracking-wider">
            경쟁사 데이터 분석 중...
          </Paragraph.Text>
        </div>
      ) : (
        <div className="flex flex-col gap-3 animate-fade-in">
          {topics.map((topic) => {
            const isSelected = selectedTopicId === topic.id
            return (
              <button
                key={topic.id}
                onClick={() => {
                  track('Topic Selected', { topic_id: topic.id, topic_title: topic.title })
                  selectTopic(topic.id)
                }}
                className={[
                  'text-left w-full p-6 border transition-colors',
                  isSelected
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-400 bg-white',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <Paragraph.Text typography="st11" fontWeight="medium" color="var(--adaptiveGrey900)" className="leading-snug">
                    {topic.title}
                  </Paragraph.Text>
                  <div
                    className={[
                      'w-4 h-4 border mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors',
                      isSelected ? 'bg-black border-black' : 'border-gray-300',
                    ].join(' ')}
                  >
                    {isSelected && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>

                <Paragraph typography="st12" color="var(--adaptiveGrey500)" className="leading-relaxed mb-4">
                  {topic.description}
                </Paragraph>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Paragraph.Text typography="st12" color="var(--adaptiveGrey400)" className="font-mono">
                    {topic.sourceAccount}
                  </Paragraph.Text>
                  <span className="text-gray-200">|</span>
                  <Badge variant="default">조회 {formatViews(topic.views)}</Badge>
                  <Badge variant="outline">참여율 {topic.engagementRate}%</Badge>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {topic.hashtags.map((tag) => (
                    <Paragraph.Text key={tag} typography="st12" color="var(--adaptiveGrey400)" className="font-mono">
                      #{tag}
                    </Paragraph.Text>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <Button onClick={handleNext} disabled={!selectedTopicId} size="large">
          다음 단계
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
    </div>
  )
}
