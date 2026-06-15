'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useReelsStore } from '@/lib/store'
import { track as trackEvent } from '@/lib/mixpanel'

export default function CompletePage() {
  const router = useRouter()
  const {
    topics,
    selectedTopicId,
    keywords,
    selectedKeywordIds,
    images,
    selectedImageId,
    music,
    selectedMusicId,
    reset,
  } = useReelsStore()

  const topic = topics.find((t) => t.id === selectedTopicId)
  const selectedKeywords = keywords.filter((k) => selectedKeywordIds.includes(k.id))
  const image = images.find((i) => i.id === selectedImageId)
  const track = music.find((m) => m.id === selectedMusicId)

  const handleNewSession = () => {
    trackEvent('New Session Started', { from: 'complete' })
    reset()
    router.push('/')
  }

  if (!topic) {
    router.replace('/')
    return null
  }

  const summaryItems = [
    {
      label: '선택 주제',
      content: topic.title,
    },
    {
      label: 'DM 키워드',
      content: selectedKeywords.map((k) => k.keyword).join(', '),
    },
    {
      label: '이미지',
      content: image ? '생성 완료' : '—',
      hasImage: true,
    },
    {
      label: '배경음악',
      content: track ? `${track.title} (${track.mood} · ${track.bpm} BPM)` : '—',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-12 flex items-center gap-4">
        <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9L7 13L15 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">제작이 완료되었습니다</h2>
          <p className="text-sm text-gray-500 mt-0.5">릴스 소재가 준비되었습니다. 아래에서 확인하고 다운로드하세요.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 mb-8">
        <div className="bg-white p-6 col-span-2">
          <span className="text-xs text-gray-400 font-mono block mb-2">선택 주제</span>
          <p className="text-sm font-medium">{topic.title}</p>
        </div>

        <div className="bg-white p-6">
          <span className="text-xs text-gray-400 font-mono block mb-3">DM 키워드</span>
          <div className="flex flex-wrap gap-1.5">
            {selectedKeywords.map((k) => (
              <Badge key={k.id} variant="outline">
                {k.keyword}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-white p-6">
          <span className="text-xs text-gray-400 font-mono block mb-3">배경음악</span>
          {track ? (
            <div>
              <p className="text-sm font-medium mb-1">{track.title}</p>
              <div className="flex items-center gap-2">
                <Badge variant="muted">{track.mood}</Badge>
                <span className="text-xs font-mono text-gray-400">{track.bpm} BPM</span>
              </div>
            </div>
          ) : (
            <span className="text-sm text-gray-400">—</span>
          )}
        </div>

        {image && (
          <div className="bg-white p-6 col-span-2">
            <span className="text-xs text-gray-400 font-mono block mb-3">생성 이미지</span>
            <div className="relative w-48 aspect-[4/5] overflow-hidden bg-gray-100">
              <Image
                src={image.url}
                alt="생성된 이미지"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          onClick={() => {
            trackEvent('Download Clicked', { topic_id: selectedTopicId })
            alert('실제 서비스 연동 시 파일 다운로드가 실행됩니다.')
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V9M7 9L4 6M7 9L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 11H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          전체 소재 다운로드
        </Button>
        <Button variant="secondary" size="lg" onClick={handleNewSession}>
          새 세션 시작
        </Button>
      </div>
    </div>
  )
}
