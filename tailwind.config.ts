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
          DEFAULT: '#00D67F',
          dark: '#00B368',
          light: '#33E09A',
        },
        secondary: {
          DEFAULT: '#00A86B',
          dark: '#008F5B',
          light: '#00C77B',
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
          '0%': { boxShadow: '0 0 20px rgba(0, 214, 127, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 168, 107, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
