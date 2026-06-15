'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ReelsThumbnail } from '@/components/ui/ReelsThumbnail'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useReelsStore } from '@/lib/store'
import { track as trackEvent } from '@/lib/mixpanel'
import { keywordImageMap } from '@/lib/keywordImages'

async function triggerDownload(href: string, filename: string) {
  const a = document.createElement('a')
  a.href = href
  a.download = filename
  a.click()
}

export default function CompletePage() {
  const router = useRouter()
  const [downloading, setDownloading] = useState(false)
  const {
    topics,
    selectedTopicId,
    keywords,
    selectedKeywordSetId,
    images,
    selectedImageId,
    music,
    selectedMusicId,
    reset,
  } = useReelsStore()

  const topic = topics.find((t) => t.id === selectedTopicId)
  const selectedKeywordSet = keywords.find((s) => s.id === selectedKeywordSetId)
  const image = images.find((i) => i.id === selectedImageId)
  const track = music.find((m) => m.id === selectedMusicId)

  const handleDownload = async () => {
    trackEvent('Download Clicked', { topic_id: selectedTopicId })
    setDownloading(true)
    try {
      const dateStr = new Date().toLocaleDateString('ko-KR').replace(/\. /g, '-').replace('.', '')

      // 텍스트 요약 다운로드
      const summary = [
        '타로봄 릴스 소재 요약',
        `생성일: ${new Date().toLocaleDateString('ko-KR')}`,
        '',
        '[선택 주제]',
        topic?.title ?? '—',
        '',
        '[DM 키워드]',
        selectedKeywordSet?.keywords.join(' / ') ?? '—',
        '',
        '[배경음악]',
        track ? `${track.title} (${track.mood} · ${track.bpm} BPM)` : '—',
      ].join('\n')

      const textBlob = new Blob([summary], { type: 'text/plain;charset=utf-8' })
      const textUrl = URL.createObjectURL(textBlob)
      await triggerDownload(textUrl, `타로봄_릴스_요약_${dateStr}.txt`)
      URL.revokeObjectURL(textUrl)

      // 이미지 3장 다운로드
      const kwds = selectedKeywordSet?.keywords ?? []
      for (let i = 0; i < kwds.length; i++) {
        const kw = kwds[i]
        const imageUrl = keywordImageMap[kw]
        if (!imageUrl) continue
        await new Promise((r) => setTimeout(r, 300))
        const proxyUrl = `/api/download-image?url=${encodeURIComponent(imageUrl)}&filename=${encodeURIComponent(`릴스_이미지_${i + 1}_${kw}.jpg`)}`
        await triggerDownload(proxyUrl, `릴스_이미지_${i + 1}_${kw}.jpg`)
      }
    } finally {
      setDownloading(false)
    }
  }

  const handleNewSession = () => {
    trackEvent('New Session Started', { from: 'complete' })
    reset()
    router.push('/')
  }

  useEffect(() => {
    if (!topic) {
      router.replace('/')
    }
  }, [topic, router])

  if (!topic) {
    return null
  }

  const summaryItems = [
    {
      label: '선택 주제',
      content: topic.title,
    },
    {
      label: 'DM 키워드',
      content: selectedKeywordSet?.keywords.join(', ') ?? '—',
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
            {(selectedKeywordSet?.keywords ?? []).map((kw) => (
              <Badge key={kw} variant="outline">
                {kw}
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
            <div className="relative w-48 aspect-[4/5] overflow-hidden bg-black rounded-lg">
              <ReelsThumbnail
                keywords={selectedKeywordSet?.keywords ?? []}
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button size="lg" onClick={handleDownload} disabled={downloading}>
          {downloading ? (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-spin">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" />
              </svg>
              다운로드 중...
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2V9M7 9L4 6M7 9L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 11H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              전체 소재 다운로드
            </>
          )}
        </Button>
        <Button variant="secondary" size="lg" onClick={handleNewSession}>
          새 세션 시작
        </Button>
      </div>
    </div>
  )
}
