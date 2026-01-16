import React from 'react'
import './styles.css'
import Link from 'next/link'
import { Spirax, Lato, Lora, Open_Sans, Nanum_Gothic, Corben } from 'next/font/google'
import { cn } from '@/lib/utils'
import { MotionProvider } from '@/components/MotionProvider'
import { Logo } from '@/components/Logo'
import { HeaderNavigation } from '@/components/HeaderNavigation'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

const spirax = Spirax({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-spirax',
  display: 'swap',
})

const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' })
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-opensans', display: 'swap' })
const nanumGothic = Nanum_Gothic({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-nanum', display: 'swap' })
const corben = Corben({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-corben', display: 'swap' })

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  description: 'Micro-ferme florale bio, locale et de saison - Au jardin de Lison',
  title: 'Au jardin de Lison',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr" className={cn(spirax.variable, lora.variable, openSans.variable, nanumGothic.variable, corben.variable, lato.variable)}>
      <body className="min-h-screen bg-background font-serif antialiased text-foreground selection:bg-primary/20">
        <MotionProvider>
          <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-24 items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-3 group">
                <Logo className="w-auto h-16 md:h-20 text-primary transition-transform duration-500 group-hover:scale-105" />
                <span className="text-2xl md:text-3xl font-spirax text-primary tracking-tight hidden sm:block">
                  Au jardin de Lison
                </span>
              </Link>
              <HeaderNavigation />
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-primary/10 bg-primary/5 mt-12 relative overflow-hidden">
            <div className="container mx-auto py-12 px-4 text-center text-sm text-muted-foreground font-spirax">
              <div className="flex flex-col items-center gap-4 mb-6">
                <Logo className="w-auto h-16 opacity-80 text-primary/60 hover:text-primary transition-all grayscale hover:grayscale-0" />
                <p className="text-xl text-primary/80">Au jardin de Lison</p>
              </div>
              <p className="font-lora text-xs">© {new Date().getFullYear()} - Micro-ferme florale bio & locale</p>
            </div>
          </footer>
          <ThemeSwitcher />
        </MotionProvider>
      </body>
    </html>
  )
}