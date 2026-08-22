import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Space_Grotesk } from 'next/font/google'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'CarterPCs — Making Tech Less Boring',
  description:
    'CarterPCs (Carter Ryan Smith) — tech creator based in LA. PCs, phones, EVs, AI and everything worth talking about. 6.9M on TikTok, 3.2M on YouTube, 4x a day.',
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-background ${bricolage.variable} ${spaceGrotesk.variable}`}>
      <body className="grain">{children}</body>
    </html>
  )
}
