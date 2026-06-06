'use client'

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const variantClass = {
  primary: 'bg-black text-white hover:bg-gray-800 active:bg-gray-900',
  secondary: 'border border-black text-black hover:bg-gray-50 active:bg-gray-100',
  ghost: 'text-gray-500 hover:text-black',
}

const sizeClass = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-colors',
        variantClass[variant],
        sizeClass[size],
        disabled ? 'opacity-30 cursor-not-allowed pointer-events-none' : '',
        className,
      ].join(' ')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
