import React from 'react'
import './styles.css'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { Spirax, Lato } from 'next/font/google'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { MotionProvider } from '@/components/MotionProvider'

const spirax = Spirax({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-spirax',
  display: 'swap',
})

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
    <html lang="fr" className={cn(spirax.variable, lato.variable)}>
      <body className="min-h-screen bg-background font-spirax antialiased text-foreground selection:bg-primary/20">
        <MotionProvider>
          <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-24 items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-3">
                <Image 
                  src="/logo.svg" 
                  alt="Au jardin de Lison" 
                  width={80} 
                  height={80} 
                  className="w-auto h-16 md:h-20"
                />
                <span className="text-2xl md:text-3xl font-spirax text-primary tracking-tight hidden sm:block">
                  Au jardin de Lison
                </span>
              </Link>
              <NavigationMenu>
                <NavigationMenuList className="gap-1 md:gap-2">
                  <NavigationMenuItem>
                    <Link href="/la-ferme" className={cn(navigationMenuTriggerStyle(), "font-spirax text-base bg-transparent hover:bg-primary/5 text-foreground/80")}>
                      La Ferme
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/fleurs" className={cn(navigationMenuTriggerStyle(), "font-spirax text-base bg-transparent hover:bg-primary/5 text-foreground/80")}>
                      Nos Fleurs
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/blog" className={cn(navigationMenuTriggerStyle(), "font-spirax text-base bg-transparent hover:bg-primary/5 text-foreground/80")}>
                      Blog
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/contact" className={cn(navigationMenuTriggerStyle(), "font-spirax text-base bg-transparent hover:bg-primary/5 text-foreground/80")}>
                      Contact
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-primary/10 bg-primary/5 mt-12 relative overflow-hidden">
            <div className="container mx-auto py-12 px-4 text-center text-sm text-muted-foreground font-spirax">
              <div className="flex flex-col items-center gap-4 mb-6">
                <Image 
                  src="/logo.svg" 
                  alt="Au jardin de Lison" 
                  width={60} 
                  height={60} 
                  className="opacity-80 grayscale hover:grayscale-0 transition-all"
                />
                <p className="text-xl text-primary/80">Au jardin de Lison</p>
              </div>
              <p>© {new Date().getFullYear()} - Micro-ferme florale bio & locale</p>
            </div>
          </footer>
        </MotionProvider>
      </body>
    </html>
  )
}