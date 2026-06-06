interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'muted'
}

const variantClass = {
  default: 'bg-black text-white',
  outline: 'border border-black text-black',
  muted: 'bg-gray-100 text-gray-600',
}

export function Badge({ children, variant = 'muted' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium tracking-wide ${variantClass[variant]}`}>
      {children}
    </span>
  )
}
