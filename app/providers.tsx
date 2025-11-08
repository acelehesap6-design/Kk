'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import { Theme } from '@radix-ui/themes'
import { useState } from 'react'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
    >
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={{
          primaryColor: 'blue',
        }}>
          <Theme appearance="dark" accentColor="blue" radius="medium">
            {children}
          </Theme>
        </MantineProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}