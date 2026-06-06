import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: '타로봄 릴스 자동화',
  description: '타로봄 마케팅 팀 전용 릴스 콘텐츠 제작 자동화 도구',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-white text-black">
        <Header />
        <main className="pt-12 min-h-screen">{children}</main>
      </body>
    </html>
  )
}
