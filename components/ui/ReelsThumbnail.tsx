'use client'

import Image from 'next/image'

const keywordImageMap: Record<string, string> = {
  // Topic 1
  '분홍': 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=600&auto=format&fit=crop',
  '보라': 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&auto=format&fit=crop',
  '흰색': 'https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?w=600&auto=format&fit=crop',
  '달': 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600&auto=format&fit=crop',
  '별': 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&auto=format&fit=crop',
  '안개': 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=600&auto=format&fit=crop',
  '꽃': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&auto=format&fit=crop',
  '나비': 'https://images.unsplash.com/photo-1494516192674-b82b5f1e51cc?w=600&auto=format&fit=crop',
  '바람': 'https://images.unsplash.com/photo-1508624217470-5ef0f947d8be?w=600&auto=format&fit=crop',
  '파랑': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop',
  '구름': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&auto=format&fit=crop',
  '빛': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop',
  '빨강': 'https://images.unsplash.com/photo-1529940340007-8ef30abc3641?w=600&auto=format&fit=crop',
  '금색': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop',
  '검정': 'https://images.unsplash.com/photo-1507499739999-097706ad8914?w=600&auto=format&fit=crop',

  // Topic 2
  '초록': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop',
  '눈': 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=600&auto=format&fit=crop',
  '비': 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop',
  '커피': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop',
  '녹차': 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop',
  '홍차': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop',
  '주황': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop',
  '연두': 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&auto=format&fit=crop',
  '산': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop',
  '바다': 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&auto=format&fit=crop',
  '숲': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop',
  '책': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop',
  '창문': 'https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?w=600&auto=format&fit=crop',

  // Topic 3
  '회색': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop',
  '불꽃': 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600&auto=format&fit=crop',
  '물결': 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&auto=format&fit=crop',
  '달빛': 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=600&auto=format&fit=crop',
  '별빛': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&auto=format&fit=crop',
  '어둠': 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&auto=format&fit=crop',
  '노랑': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop',
  '오전': 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&auto=format&fit=crop',
  '오후': 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=600&auto=format&fit=crop',
  '밤': 'https://images.unsplash.com/photo-1507499739999-097706ad8914?w=600&auto=format&fit=crop',
}

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
