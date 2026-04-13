import React from 'react'
import './styles.css'
import Link from 'next/link'
import { fontVariables } from '@/styles/fonts'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/Logo'
import { HeaderNavigation } from '@/components/HeaderNavigation'
import { Metadata } from 'next'
import { MotionProvider } from '@/components/MotionProvider'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://aujardindelison.fr'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  description: 'Micro-ferme florale bio au Puy-Sainte-Réparade. Découvrez nos fleurs paysannes, bouquets de saison et notre démarche de slow floriculture près d\'Aix-en-Provence et du Luberon (13).',
  title: {
    default: 'Au jardin de Lison | Micro-ferme florale bio & locale (13)',
    template: '%s | Jardin de Lison',
  },
  icons: {
    icon: [
      { url: '/logo_square.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/logo_square.svg',
    apple: [
      { url: '/logo_square.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
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
    <html lang="fr" className={cn(fontVariables)} style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link
          rel="preload"
          href="/hero-accueil.png"
          as="image"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-screen bg-background font-serif antialiased text-foreground selection:bg-primary/20 overflow-x-hidden">
        <MotionProvider>
          <header className="sticky top-0 z-[100] w-full border-b border-primary/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-24 items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-3 group" aria-label="Retour à l'accueil">
                <Logo className="w-auto h-16 md:h-20 text-primary transition-transform duration-500 group-hover:scale-105" />
              </Link>
              <HeaderNavigation />
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-primary/10 bg-primary/5 mt-12 relative overflow-hidden">
            <div className="container mx-auto py-12 px-4 text-center text-sm text-muted-foreground font-spirax">
              <div className="flex flex-col items-center gap-4 mb-6">
                <Logo className="w-40 h-16 opacity-80 text-primary/60 hover:text-primary transition-all grayscale hover:grayscale-0" />
              </div>
              <p className="font-lora text-xs text-foreground/70">© {new Date().getFullYear()} - Micro-ferme florale bio & locale</p>
              <p className="font-lora text-[10px] text-foreground/40 mt-2 italic">
                Fleurs paysannes produites au Puy-Sainte-Réparade, disponibles à proximité d&apos;Aix-en-Provence, Pertuis et du Sud Luberon.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mt-4 font-lora text-[10px] uppercase tracking-widest text-foreground/60">
                <Link href="/mentions-legales" className="hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4">Mentions Légales</Link>
                <Link href="/politique-de-confidentialite" className="hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4">Confidentialité</Link>
                <Link href="/cgu" className="hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4">CGU</Link>
                <Link href="/cgv" className="hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4">CGV</Link>
              </div>
              <p className="font-lora text-[10px] mt-8 opacity-50 uppercase tracking-tighter text-foreground/50">
                Site créé par Bruno Marchasson
              </p>
            </div>
          </footer>
        </MotionProvider>
      </body>
    </html>
  )
}
