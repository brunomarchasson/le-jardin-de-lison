import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Flower } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="p-6 bg-primary/5 rounded-full mb-8">
        <Flower className="w-16 h-16 text-primary/40 animate-pulse" />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-spirax text-primary mb-6">Oups ! Cette fleur est introuvable.</h1>
      
      <p className="text-xl text-muted-foreground font-lora max-w-lg mx-auto mb-12 italic">
        Il semble que vous vous soyez un peu égaré dans les allées du jardin. La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button size="lg" className="font-spirax text-xl px-8 py-6">
            Retourner à l&apos;accueil
          </Button>
        </Link>
        <Link href="/fleurs">
          <Button variant="outline" size="lg" className="font-spirax text-xl px-8 py-6">
            Voir nos fleurs
          </Button>
        </Link>
      </div>
    </div>
  )
}
