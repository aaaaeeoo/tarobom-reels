'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepProgress } from '@/components/layout/StepProgress'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Spinner } from '@/components/ui/Spinner'
import { useReelsStore } from '@/lib/store'
import { GeneratedMusic } from '@/lib/types'

function formatDuration(sec: number) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
}

export default function Step4Page() {
  const router = useRouter()
  const { topics, selectedTopicId, music, setMusic, selectMusic, selectedMusicId } = useReelsStore()
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(music.length > 0)

  const selectedTopic = topics.find((t) => t.id === selectedTopicId)

  const generate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId: selectedTopicId }),
      })
      const data: GeneratedMusic[] = await res.json()
      setMusic(data)
      setGenerated(true)
    } finally {
      setLoading(false)
    }
  }

  if (!selectedTopicId) {
    router.replace('/step/1')
    return null
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <StepProgress currentStep={4} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight mb-1.5">배경음악 생성</h2>
        <p className="text-sm text-gray-500">
          주제 분위기에 맞는 배경음악을 생성하고 하나를 선택하세요.
        </p>
      </div>

      <div className="mb-6 px-4 py-3 border border-gray-100 bg-gray-50 flex items-center gap-3">
        <span className="text-xs text-gray-400 font-mono">선택 주제</span>
        <span className="text-sm font-medium">{selectedTopic?.title}</span>
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
          <p className="text-sm text-gray-400">아래 버튼을 눌러 배경음악을 생성하세요</p>
          <Button onClick={generate}>음악 생성</Button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center gap-3 py-24 border border-dashed border-gray-200 mb-6">
          <Spinner size="lg" />
          <span className="text-xs font-mono text-gray-400 tracking-wider">음악 생성 중...</span>
        </div>
      )}

      {generated && !loading && (
        <div className="flex flex-col gap-2 mb-6 animate-fade-in">
          {music.map((track) => {
            const isSelected = selectedMusicId === track.id
            return (
              <button
                key={track.id}
                onClick={() => selectMusic(track.id)}
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
                  <p className="text-sm font-medium mb-1.5">{track.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={isSelected ? 'default' : 'muted'}>{track.mood}</Badge>
                    <span className="text-xs font-mono text-gray-400">{track.bpm} BPM</span>
                    <span className="text-xs font-mono text-gray-400">
                      {formatDuration(track.duration)}
                    </span>
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
            onClick={generate}
            className="text-xs text-gray-400 hover:text-black font-mono pt-2 text-left transition-colors"
          >
            재생성 →
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={() => router.push('/step/3')}>
          이전
        </Button>
        <Button
          onClick={() => router.push('/step/complete')}
          disabled={!selectedMusicId}
          size="lg"
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
