'use client'

import { create } from 'zustand'
import { Topic, DMKeyword, GeneratedImage, GeneratedMusic } from './types'

interface ReelsStore {
  topics: Topic[]
  selectedTopicId: string | null
  keywords: DMKeyword[]
  selectedKeywordIds: string[]
  images: GeneratedImage[]
  selectedImageId: string | null
  music: GeneratedMusic[]
  selectedMusicId: string | null

  setTopics: (topics: Topic[]) => void
  selectTopic: (id: string) => void
  setKeywords: (keywords: DMKeyword[]) => void
  toggleKeyword: (id: string) => void
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
  selectedKeywordIds: [],
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
  toggleKeyword: (id) =>
    set((state) => ({
      selectedKeywordIds: state.selectedKeywordIds.includes(id)
        ? state.selectedKeywordIds.filter((k) => k !== id)
        : [...state.selectedKeywordIds, id],
    })),
  setImages: (images) => set({ images }),
  selectImage: (id) => set({ selectedImageId: id }),
  setMusic: (music) => set({ music }),
  selectMusic: (id) => set({ selectedMusicId: id }),
  reset: () => set(initialState),
}))
