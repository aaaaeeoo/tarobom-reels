'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { StepProgress } from '@/components/layout/StepProgress'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { useReelsStore } from '@/lib/store'
import { GeneratedImage } from '@/lib/types'

export default function Step3Page() {
  const router = useRouter()
  const { topics, selectedTopicId, keywords, selectedKeywordIds, images, setImages, selectImage, selectedImageId } =
    useReelsStore()
  const [loading, setLoading] = useState(false)

  const selectedTopic = topics.find((t) => t.id === selectedTopicId)
  const selectedKeywordTexts = keywords
    .filter((k) => selectedKeywordIds.includes(k.id))
    .map((k) => k.keyword)

  const currentImage = images[0] ?? null

  const generate = async () => {
    if (!selectedTopic) return
    setLoading(true)
    try {
      const res = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: selectedTopicId,
          topicTitle: selectedTopic.title,
          keywords: selectedKeywordTexts,
        }),
      })
      const data: GeneratedImage = await res.json()
      setImages([data])
      selectImage(data.id)
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
        <StepProgress currentStep={3} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight mb-1.5">이미지 생성</h2>
        <p className="text-sm text-gray-500">
          선택한 주제와 키워드를 바탕으로 릴스 썸네일 이미지를 생성합니다.
        </p>
      </div>

      <div className="mb-6 p-4 border border-gray-100 bg-gray-50">
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-3 text-xs">
            <span className="text-gray-400 font-mono w-12 flex-shrink-0">주제</span>
            <span className="text-black">{selectedTopic?.title}</span>
          </div>
          <div className="flex gap-3 text-xs">
            <span className="text-gray-400 font-mono w-12 flex-shrink-0">키워드</span>
            <span className="text-black font-mono">{selectedKeywordTexts.join(' · ')}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-32 border border-dashed border-gray-200">
            <Spinner size="lg" />
            <span className="text-xs font-mono text-gray-400 tracking-wider">이미지 생성 중...</span>
          </div>
        ) : currentImage ? (
          <div className="animate-fade-in">
            <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden">
              <Image
                src={currentImage.url}
                alt="생성된 이미지"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="mt-3 p-3 bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-400 font-mono leading-relaxed">
                프롬프트: {currentImage.prompt}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-24 border border-dashed border-gray-200">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-gray-300">
              <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 22L10 16L14 20L20 14L28 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm text-gray-400">아래 버튼을 눌러 이미지를 생성하세요</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.push('/step/2')}>
            이전
          </Button>
          {currentImage && (
            <Button variant="secondary" onClick={generate} disabled={loading}>
              재생성
            </Button>
          )}
          {!currentImage && (
            <Button onClick={generate} disabled={loading}>
              {loading ? '생성 중...' : '이미지 생성'}
            </Button>
          )}
        </div>
        <Button
          onClick={() => router.push('/step/4')}
          disabled={!selectedImageId}
          size="lg"
        >
          다음 단계
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
    </div>
  )
}
