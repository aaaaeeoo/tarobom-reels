export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-7 h-7' }
  return (
    <span
      className={`${sizeClass[size]} border-2 border-gray-200 border-t-black rounded-full animate-spin-slow inline-block`}
      aria-label="로딩 중"
    />
  )
}
