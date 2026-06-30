'use client'

import { Badge as TDSBadge } from '@toss/tds-mobile'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'muted'
}

const variantMap = {
  default: { variant: 'fill', color: 'blue' },
  outline: { variant: 'weak', color: 'blue' },
  muted:   { variant: 'weak', color: 'elephant' },
} as const

export function Badge({ children, variant = 'muted' }: BadgeProps) {
  const { variant: tdsVariant, color } = variantMap[variant]
  return (
    <TDSBadge variant={tdsVariant} color={color} size="xsmall">
      {children}
    </TDSBadge>
  )
}
