import type { Metadata } from 'next'import type { Metadata } from 'next'

import { Inter } from 'next/font/google'import { Inter } from 'next/font/google'

import './globals.css'import { Providers } from './providers'

import { Providers } from './providers'import '@radix-ui/themes/styles.css'

import '@mantine/core/styles.css'

const inter = Inter({ subsets: ['latin'] })import './globals.css'



export const metadata: Metadata = {const inter = Inter({ 

  title: 'KK Exchange - Tüm Piyasalar Tek Platformda',  subsets: ['latin'],

  description: 'Kripto, forex, hisse senetleri ve daha fazlası. KK99 token ile düşük komisyonlardan faydalanın.',  variable: '--font-inter',

}})



export default function RootLayout({export const metadata: Metadata = {

  children,  title: 'Trading Platform',

}: {  description: 'Advanced Trading Platform with Real-time Market Data',

  children: React.ReactNode  keywords: ['trading', 'crypto', 'forex', 'stocks', 'market data', 'real-time'],

}) {  authors: [{ name: 'Your Name' }],

  return (  viewport: 'width=device-width, initial-scale=1',

    <html lang="tr" suppressHydrationWarning>  themeColor: [

      <body className={inter.className}>    { media: '(prefers-color-scheme: light)', color: 'white' },

        <Providers>{children}</Providers>    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }

      </body>  ]

    </html>}

  )

}export default function RootLayout({
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