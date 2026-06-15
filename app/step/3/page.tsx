'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { StepProgress } from '@/components/layout/StepProgress'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { ReelsThumbnail } from '@/components/ui/ReelsThumbnail'
import { useReelsStore } from '@/lib/store'
import { GeneratedImage } from '@/lib/types'
import { track } from '@/lib/mixpanel'

export default function Step3Page() {
  const router = useRouter()
  const { topics, selectedTopicId, keywords, selectedKeywordSetId, images, setImages, selectImage, selectedImageId } =
    useReelsStore()
  const [loading, setLoading] = useState(false)

  const selectedTopic = topics.find((t) => t.id === selectedTopicId)
  const selectedSet = keywords.find((s) => s.id === selectedKeywordSetId)
  const selectedKeywordTexts = selectedSet?.keywords ?? []

  const currentImage = images[0] ?? null

  const generate = async (isRegenerate = false) => {
    if (!selectedTopic) return
    track(isRegenerate ? 'Image Regenerated' : 'Image Generated', { topic_id: selectedTopicId })
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
            <div className="relative w-full aspect-[4/5] bg-black overflow-hidden rounded-lg">
              <ReelsThumbnail keywords={selectedKeywordTexts} className="w-full h-full" />
            </div>
            <div className="mt-3 p-3 bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-400 font-mono leading-relaxed">
                프롬프트: {currentImage.prompt}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-[4/5] bg-black overflow-hidden rounded-lg">
              <ReelsThumbnail showPlaceholder={true} className="w-full h-full" />
            </div>
            <p className="text-xs text-gray-400 text-center">아래 버튼을 눌러 이미지를 생성하세요</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.push('/step/2')}>
            이전
          </Button>
          {currentImage && (
            <Button variant="secondary" onClick={() => generate(true)} disabled={loading}>
              재생성
            </Button>
          )}
          {!currentImage && (
            <Button onClick={() => generate()} disabled={loading}>
              {loading ? '생성 중...' : '이미지 생성'}
            </Button>
          )}
        </div>
        <Button
          onClick={() => {
            track('Step 3 Next Clicked', { image_id: selectedImageId })
            router.push('/step/4')
          }}
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
