'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Paragraph, Button } from '@toss/tds-mobile'
import { StepProgress } from '@/components/layout/StepProgress'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { useReelsStore } from '@/lib/store'
import { GeneratedMusic } from '@/lib/types'
import { track as trackEvent } from '@/lib/mixpanel'

function formatDuration(sec: number) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
}

export default function Step4Page() {
  const router = useRouter()
  const { topics, selectedTopicId, music, setMusic, selectMusic, selectedMusicId } = useReelsStore()
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(music.length > 0)

  const selectedTopic = topics.find((t) => t.id === selectedTopicId)

  const generate = async (isRegenerate = false) => {
    trackEvent(isRegenerate ? 'Music Regenerated' : 'Music Generated', { topic_id: selectedTopicId })
    setLoading(true)
    try {
      const res = await fetch('/api/music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId: selectedTopicId }),
      })
      const data = await res.json()
      if (Array.isArray(data)) {
        setMusic(data)
      } else {
        console.error('Invalid music response format:', data)
        setMusic([
          {
            id: `m-local-fallback-${Date.now()}`,
            title: '신비로운 운명의 밤 (Mystical Destiny)',
            mood: '신비',
            duration: 30,
            bpm: 80,
          }
        ])
      }
      setGenerated(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!selectedTopicId) {
      router.replace('/step/1')
    }
  }, [selectedTopicId, router])

  if (!selectedTopicId) {
    return null
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <StepProgress currentStep={4} />
      </div>

      <div className="mb-8">
        <Paragraph as="h2" typography="t4" fontWeight="bold" color="var(--adaptiveGrey900)" className="tracking-tight mb-1.5">
          배경음악 생성
        </Paragraph>
        <Paragraph typography="st11" color="var(--adaptiveGrey500)">
          주제 분위기에 맞는 배경음악을 생성하고 하나를 선택하세요.
        </Paragraph>
      </div>

      <div className="mb-6 px-4 py-3 border border-gray-100 bg-gray-50 flex items-center gap-3">
        <Paragraph.Text typography="st12" color="var(--adaptiveGrey400)" className="font-mono">
          선택 주제
        </Paragraph.Text>
        <Paragraph.Text typography="st11" fontWeight="medium" color="var(--adaptiveGrey900)">
          {selectedTopic?.title}
        </Paragraph.Text>
      </div>

      {!generated && !loading && (
        <div className="flex flex-col items-center gap-4 py-24 border border-dashed border-gray-200 mb-6">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-gray-300">
            <path d="M12 6L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 10L20 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 10L12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <Paragraph typography="st11" color="var(--adaptiveGrey400)">
            아래 버튼을 눌러 배경음악을 생성하세요
          </Paragraph>
          <Button onClick={() => generate()}>음악 생성</Button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center gap-3 py-24 border border-dashed border-gray-200 mb-6">
          <Spinner size="lg" />
          <Paragraph.Text typography="st12" color="var(--adaptiveGrey400)" className="font-mono tracking-wider">
            음악 생성 중...
          </Paragraph.Text>
        </div>
      )}

      {generated && !loading && (
        <div className="flex flex-col gap-2 mb-6 animate-fade-in">
          {Array.isArray(music) && music.map((track) => {
            const isSelected = selectedMusicId === track.id
            return (
              <button
                key={track.id}
                onClick={() => {
                  trackEvent('Music Selected', { track_id: track.id, track_title: track.title, mood: track.mood })
                  selectMusic(track.id)
                }}
                className={[
                  'w-full text-left p-5 border transition-colors flex items-center gap-5',
                  isSelected
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-400 bg-white',
                ].join(' ')}
              >
                <div
                  className={[
                    'w-9 h-9 flex items-center justify-center flex-shrink-0 border transition-colors',
                    isSelected ? 'bg-black border-black' : 'border-gray-200',
                  ].join(' ')}
                >
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                    <path
                      d="M2 2L10 7L2 12V2Z"
                      fill={isSelected ? 'white' : '#d1d5db'}
                      stroke={isSelected ? 'white' : '#d1d5db'}
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <Paragraph typography="st11" fontWeight="medium" color="var(--adaptiveGrey900)" className="mb-1.5">
                    {track.title}
                  </Paragraph>
                  <div className="flex items-center gap-2">
                    <Badge variant={isSelected ? 'default' : 'muted'}>{track.mood}</Badge>
                    <Paragraph.Text typography="st12" color="var(--adaptiveGrey400)" className="font-mono">
                      {track.bpm} BPM
                    </Paragraph.Text>
                    <Paragraph.Text typography="st12" color="var(--adaptiveGrey400)" className="font-mono">
                      {formatDuration(track.duration)}
                    </Paragraph.Text>
                  </div>
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

          <button
            onClick={() => generate(true)}
            className="pt-2 text-left transition-colors"
          >
            <Paragraph.Text typography="st12" color="var(--adaptiveGrey400)" className="font-mono hover:text-black">
              재생성 →
            </Paragraph.Text>
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Button variant="weak" onClick={() => router.push('/step/3')}>
          이전
        </Button>
        <Button
          onClick={() => {
            trackEvent('Reels Completed', { topic_id: selectedTopicId, music_id: selectedMusicId })
            router.push('/step/complete')
          }}
          disabled={!selectedMusicId}
          size="large"
        >
          완성하기
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
    </div>
  )
}
