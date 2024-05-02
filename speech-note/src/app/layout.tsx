import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Speech Note',
  description:
    'Crie notas usando o microfone com a API de reconhecimento de voz',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-slate-50`}>
        {children}
      </body>
    </html>
  )
}
