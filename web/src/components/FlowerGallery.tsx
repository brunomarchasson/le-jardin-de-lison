'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { ZoomIn, X } from 'lucide-react'

interface FlowerGalleryProps {
  images: Array<{
    url: string
    alt: string
  }>
}

export function FlowerGallery({ images }: FlowerGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [api, setApi] = useState<CarouselApi>()
  const [dialogApi, setDialogApi] = useState<CarouselApi>()

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-muted flex items-center justify-center text-muted-foreground italic font-serif shadow-inner">
        [Aucune photo disponible]
      </div>
    )
  }

  const openLightbox = (index: number) => {
    setIsOpen(true)
    setTimeout(() => {
      dialogApi?.scrollTo(index, true)
    }, 50) // Augmentation légère du délai pour garantir le montage
  }

  return (
    <div className="w-full max-w-lg mx-auto md:max-w-none">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx}>
              <div 
                onClick={() => openLightbox(idx)}
                className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden bg-muted shadow-md group cursor-zoom-in"
              >
                <Image 
                  src={img.url} 
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <div className="bg-background/80 backdrop-blur-md p-3 rounded-full shadow-lg">
                      <ZoomIn className="w-6 h-6 text-primary" />
                   </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-4 bg-background/50 hover:bg-background/80 border-none backdrop-blur-sm" />
            <CarouselNext className="right-4 bg-background/50 hover:bg-background/80 border-none backdrop-blur-sm" />
          </>
        )}
      </Carousel>

      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, idx) => (
            <div key={idx} className="w-2 h-2 rounded-full bg-primary/20" />
          ))}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-screen max-h-screen w-screen h-screen p-0 bg-black/95 border-none shadow-none flex flex-col items-center justify-center overflow-hidden">
          <DialogTitle className="sr-only">Galerie photo plein écran</DialogTitle>
          
          <div className="relative w-full h-full flex items-center justify-center">
            <Carousel setApi={setDialogApi} opts={{ loop: true }} className="w-full h-full flex items-center">
              <CarouselContent className="h-screen -ml-0">
                {images.map((img, idx) => (
                  <CarouselItem key={idx} className="pl-0 h-screen w-screen flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center p-2 md:p-8">
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        className="object-contain"
                        quality={100}
                        priority
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {images.length > 1 && (
                <>
                  <CarouselPrevious className="left-6 md:left-12 h-14 w-14 bg-white/10 hover:bg-white/20 border-none text-white z-50" />
                  <CarouselNext className="right-6 md:right-12 h-14 w-14 bg-white/10 hover:bg-white/20 border-none text-white z-50" />
                </>
              )}
            </Carousel>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-[60] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
