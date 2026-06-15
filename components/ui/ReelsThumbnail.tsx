'use client'

import Image from 'next/image'
import { keywordImageMap } from '@/lib/keywordImages'

const placeholderColors = [
  'bg-[#FF0000]', // Red
  'bg-[#00FF00]', // Green
  'bg-[#0000FF]', // Blue
]

interface ReelsThumbnailProps {
  keywords?: string[]
  showPlaceholder?: boolean
  className?: string
}

export function ReelsThumbnail({
  keywords = [],
  showPlaceholder = false,
  className = '',
}: ReelsThumbnailProps) {
  // If showing placeholder or keywords length is not 3, render standard colors
  const usePlaceholder = showPlaceholder || keywords.length !== 3

  return (
    <div className={`relative w-full h-full bg-black flex items-center justify-center p-6 sm:p-8 ${className}`}>
      <div className="w-full flex justify-between gap-3 aspect-[4/3] sm:gap-4 max-w-sm">
        {[0, 1, 2].map((index) => {
          const keyword = keywords[index]
          const imageUrl = keyword ? keywordImageMap[keyword] : null

          return (
            <div
              key={index}
              className="flex-1 aspect-[9/20] relative rounded-[14px] border-[3px] border-[#E8E8E8] overflow-hidden shadow-xl"
            >
              {usePlaceholder || !imageUrl ? (
                <div className={`w-full h-full ${placeholderColors[index]}`} />
              ) : (
                <Image
                  src={imageUrl}
                  alt={keyword}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
