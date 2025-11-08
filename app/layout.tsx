import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import '@radix-ui/themes/styles.css'
import '@mantine/core/styles.css'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Trading Platform',
  description: 'Advanced Trading Platform with Real-time Market Data',
  keywords: ['trading', 'crypto', 'forex', 'stocks', 'market data', 'real-time'],
  authors: [{ name: 'Your Name' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} font-sans h-full antialiased`} suppressHydrationWarning>
      <head />
      <body className="h-full bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}