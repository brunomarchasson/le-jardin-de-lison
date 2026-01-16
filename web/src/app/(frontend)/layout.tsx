import React from 'react'
import './styles.css'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { Playfair_Display, Lato } from 'next/font/google'
import { cn } from '@/lib/utils'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
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
    <html lang="fr" className={cn(playfair.variable, lato.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20">
        <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-20 items-center justify-between px-4">
            <Link href="/" className="text-2xl font-serif font-bold text-primary tracking-tight">
              Au jardin de Lison
            </Link>
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <Link href="/la-ferme" className={cn(navigationMenuTriggerStyle(), "font-serif text-base bg-transparent hover:bg-primary/5 text-foreground/80")}>
                    La Ferme
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/fleurs" className={cn(navigationMenuTriggerStyle(), "font-serif text-base bg-transparent hover:bg-primary/5 text-foreground/80")}>
                    Nos Fleurs
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/blog" className={cn(navigationMenuTriggerStyle(), "font-serif text-base bg-transparent hover:bg-primary/5 text-foreground/80")}>
                    Blog
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" className={cn(navigationMenuTriggerStyle(), "font-serif text-base bg-transparent hover:bg-primary/5 text-foreground/80")}>
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-primary/10 bg-primary/5 mt-12 relative overflow-hidden">
          {/* Decorative pattern for footer could go here */}
          <div className="container mx-auto py-12 px-4 text-center text-sm text-muted-foreground font-serif">
            <p className="text-lg mb-2">Au jardin de Lison</p>
            <p>© {new Date().getFullYear()} - Micro-ferme florale bio & locale</p>
          </div>
        </footer>
      </body>
    </html>
  )
}