import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Autonomous Study Copilot',
  description: 'A calm workspace for turning curiosity into understanding.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f7f2' },
    { media: '(prefers-color-scheme: dark)', color: '#151b19' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className="antialiased"><ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>{children}</ThemeProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
