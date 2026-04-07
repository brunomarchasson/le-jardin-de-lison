import React from 'react'
import './styles.css'
import Link from 'next/link'
import { fontVariables } from '@/styles/fonts'
import { cn } from '@/lib/utils'
import { MotionProvider } from '@/components/MotionProvider'
import { Logo } from '@/components/Logo'
import { HeaderNavigation } from '@/components/HeaderNavigation'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://aujardindelison.fr'

export const metadata = {
  metadataBase: new URL(baseUrl),
  description: 'Micro-ferme florale bio, locale et de saison à Le Puy-Sainte-Réparade. Bouquets de fleurs paysannes, glanage et slow floriculture.',
  title: {
    default: 'Au jardin de Lison | Fleurs bio et locales',
    template: '%s | Au jardin de Lison',
  },
  icons: {
    icon: '/logo_square.svg',
    apple: '/logo_square.svg',
  },
  openGraph: {
    title: 'Au jardin de Lison',
    description: 'Micro-ferme florale bio, locale et de saison. Cultiver la beauté sauvage au rythme des saisons.',
    url: baseUrl,
    siteName: 'Au jardin de Lison',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Au jardin de Lison',
    description: 'Micro-ferme florale bio, locale et de saison.',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr" className={cn(fontVariables)}>
      <body className="min-h-screen bg-background font-serif antialiased text-foreground selection:bg-primary/20">
        <MotionProvider>
          <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-24 items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-3 group">
                <Logo className="w-auto h-16 md:h-20 text-primary transition-transform duration-500 group-hover:scale-105" />
              </Link>
              <HeaderNavigation />
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-primary/10 bg-primary/5 mt-12 relative overflow-hidden">
            <div className="container mx-auto py-12 px-4 text-center text-sm text-muted-foreground font-spirax">
              <div className="flex flex-col items-center gap-4 mb-6">
                <Logo className="w-auto h-16 opacity-80 text-primary/60 hover:text-primary transition-all grayscale hover:grayscale-0" />
             
              </div>
              <p className="font-lora text-xs">© {new Date().getFullYear()} - Micro-ferme florale bio & locale</p>
              <div className="flex flex-wrap justify-center gap-6 mt-4 font-lora text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                <Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions Légales</Link>
                <Link href="/politique-de-confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link>
                <Link href="/cgu" className="hover:text-primary transition-colors">CGU</Link>
              </div>
              <p className="font-lora text-[9px] mt-8 opacity-40 uppercase tracking-tighter">
                Site créé par Bruno Marchasson
              </p>
            </div>
          </footer>
          {/* <ThemeSwitcher /> */}
        </MotionProvider>
      </body>
    </html>
  )
}