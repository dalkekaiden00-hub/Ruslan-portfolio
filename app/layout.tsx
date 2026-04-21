import type { Metadata } from 'next'
import { Newsreader, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display:  'swap',
  weight:   ['300', '400', '500', '600'],
  style:    ['normal', 'italic'],
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display:  'swap',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display:  'swap',
  weight:   ['400', '500'],
})

export const metadata: Metadata = {
  title:       'Ruslan Somin — Senior AI Engineer',
  description: 'Lab notebook and case studies from a senior AI engineer working on LLM systems, retrieval, and production ML.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
