import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FiPlan',
  description: 'FiPlan, planejador financeiro, planeje o futuro e controle o presente',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`inter.className bg-bgL`}>{children}</body>
    </html>
  )
}
