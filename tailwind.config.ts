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
        background: '#0a0a0a',
        surface: '#141414',
        border: '#262626',
        primary: {
          DEFAULT: '#1ed760',
          dark: '#19b550',
          light: '#4ade80',
        },
        secondary: {
          DEFAULT: '#17a34a',
          dark: '#158f42',
          light: '#22c55e',
        },
        muted: '#a1a1aa',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(30, 215, 96, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(23, 163, 74, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
