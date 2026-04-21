import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper:  '#F4F1EA',
        hi:     '#EBE5D8',
        ink:    '#1A1814',
        muted:  '#6B6660',
        faint:  '#9A948B',
        rule:   '#D4CEC1',
        accent: '#8B6F47',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)',  'system-ui', 'sans-serif'],
        mono:  ['var(--font-mono)',  'ui-monospace', 'monospace'],
      },
      fontSize: {
        'micro': ['11px',  { lineHeight: '1.4', letterSpacing: '0.08em' }],
        'meta':  ['12px',  { lineHeight: '1.5', letterSpacing: '0.04em' }],
        'body':  ['16px',  { lineHeight: '1.65' }],
        'lead':  ['19px',  { lineHeight: '1.55' }],
        'h3':    ['22px',  { lineHeight: '1.35' }],
        'h2':    ['32px',  { lineHeight: '1.2'  }],
        'h1':    ['56px',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'hero':  ['84px',  { lineHeight: '1.0',  letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        widest2: '0.12em',
      },
    },
  },
  plugins: [],
}

export default config
