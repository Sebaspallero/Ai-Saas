import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import ModalProvider from '@/components/ModalProvider'
import ToasterProvider from '@/components/ToasterProvider'
import CrispProvider from '@/components/CrispProvider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'retibo.ai',
  description: 'La Inteligencia Artificial optimizada para la Argentina.',
  icons:{
    icon: '/logo-retibo.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider/>
        <body className={inter.className}>
          <ModalProvider/>
          <ToasterProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
