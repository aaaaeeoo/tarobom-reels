'use client'

import Link from 'next/link'
import { Paragraph } from '@toss/tds-mobile'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-6 h-12 flex items-center justify-between">
        <Link href="/">
          <Paragraph.Text typography="st11" fontWeight="bold" color="var(--adaptiveGrey900)" className="tracking-tight">
            타로봄 릴스 자동화
          </Paragraph.Text>
        </Link>
        <Paragraph.Text typography="st12" color="var(--adaptiveGrey400)" className="font-mono tracking-wider">
          TAROBOM
        </Paragraph.Text>
      </div>
    </header>
  )
}
