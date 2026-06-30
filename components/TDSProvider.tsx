'use client'

import { TDSMobileAITProvider } from '@toss/tds-mobile-ait'

export function TDSProvider({ children }: { children: React.ReactNode }) {
  return <TDSMobileAITProvider>{children}</TDSMobileAITProvider>
}
