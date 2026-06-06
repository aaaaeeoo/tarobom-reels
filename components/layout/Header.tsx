import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-6 h-12 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight text-black">
          타로봄 릴스 자동화
        </Link>
        <span className="text-xs text-gray-400 font-mono tracking-wider">TAROBOM</span>
      </div>
    </header>
  )
}
