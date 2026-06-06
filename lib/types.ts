export interface Topic {
  id: string
  title: string
  description: string
  sourceAccount: string
  views: number
  engagementRate: number
  hashtags: string[]
}

export interface DMKeyword {
  id: string
  topicId: string
  keyword: string
  category: 'trigger' | 'interest' | 'engagement'
}

export interface GeneratedImage {
  id: string
  url: string
  prompt: string
}

export interface GeneratedMusic {
  id: string
  title: string
  mood: string
  duration: number
  bpm: number
}
