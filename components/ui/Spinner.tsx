'use client'

import { Loader } from '@toss/tds-mobile'

const sizeMap = { sm: 'small', md: 'medium', lg: 'large' } as const

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return <Loader size={sizeMap[size]} />
}
