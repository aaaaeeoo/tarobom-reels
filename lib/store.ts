'use client'

import { create } from 'zustand'
import { Topic, DMKeywordSet, GeneratedImage, GeneratedMusic } from './types'

interface ReelsStore {
  topics: Topic[]
  selectedTopicId: string | null
  keywords: DMKeywordSet[]
  selectedKeywordSetId: string | null
  images: GeneratedImage[]
  selectedImageId: string | null
  music: GeneratedMusic[]
  selectedMusicId: string | null

  setTopics: (topics: Topic[]) => void
  selectTopic: (id: string) => void
  setKeywords: (keywords: DMKeywordSet[]) => void
  selectKeywordSet: (id: string) => void
  setImages: (images: GeneratedImage[]) => void
  selectImage: (id: string) => void
  setMusic: (music: GeneratedMusic[]) => void
  selectMusic: (id: string) => void
  reset: () => void
}

const initialState = {
  topics: [],
  selectedTopicId: null,
  keywords: [],
  selectedKeywordSetId: null,
  images: [],
  selectedImageId: null,
  music: [],
  selectedMusicId: null,
}

export const useReelsStore = create<ReelsStore>((set) => ({
  ...initialState,

  setTopics: (topics) => set({ topics }),
  selectTopic: (id) => set({ selectedTopicId: id }),
  setKeywords: (keywords) => set({ keywords }),
  selectKeywordSet: (id) => set({ selectedKeywordSetId: id }),
  setImages: (images) => set({ images }),
  selectImage: (id) => set({ selectedImageId: id }),
  setMusic: (music) => set({ music }),
  selectMusic: (id) => set({ selectedMusicId: id }),
  reset: () => set(initialState),
}))
