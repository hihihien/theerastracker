import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Eras Tracker',
  description: 'By @hihihien',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="wireframe">
      <body className={inter.className}>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
