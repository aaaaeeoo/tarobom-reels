import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: 'var(--adaptiveGrey900)',
        white: 'var(--adaptiveBackground)',
        gray: {
          50:  'var(--adaptiveGrey50)',
          100: 'var(--adaptiveGrey100)',
          200: 'var(--adaptiveGrey200)',
          300: 'var(--adaptiveGrey300)',
          400: 'var(--adaptiveGrey400)',
          500: 'var(--adaptiveGrey500)',
          600: 'var(--adaptiveGrey600)',
          700: 'var(--adaptiveGrey700)',
          800: 'var(--adaptiveGrey800)',
          900: 'var(--adaptiveGrey900)',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
