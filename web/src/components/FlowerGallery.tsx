"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlowerGalleryProps {
  images: Array<{
    url: string;
    alt: string;
  }>;
}

export function FlowerGallery({ images }: FlowerGalleryProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [fullApi, setFullApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on("select", () => {
      setCurrentIndex(mainApi.selectedScrollSnap());
    });
  }, [mainApi]);

  useEffect(() => {
    if (!fullApi) return;
    fullApi.on("select", () => {
      setCurrentIndex(fullApi.selectedScrollSnap());
    });
  }, [fullApi]);

  useEffect(() => {
    if (!isFullscreen && mainApi) {
      mainApi.scrollTo(currentIndex, true);
    }
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isFullscreen, currentIndex, mainApi]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-muted flex items-center justify-center text-muted-foreground italic font-serif shadow-inner">
        [Aucune photo disponible]
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto md:max-w-none">
      
      {/* --- VUE PETITE --- */}
      <motion.div 
        layoutId="gallery-container"
        className="relative rounded-3xl overflow-hidden bg-muted shadow-lg group"
      >
        <Carousel setApi={setMainApi} opts={{ loop: true, startIndex: currentIndex }} className="w-full">
          <CarouselContent>
            {images.map((img, idx) => (
              <CarouselItem key={idx}>
                <div 
                 
                  className="relative aspect-[4/5] md:aspect-square  overflow-hidden"
                >
                  <motion.div layoutId={`image-${idx}`} className="w-full h-full">
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div  onClick={() => setIsFullscreen(true)} className="bg-background/80 cursor-zoom-in backdrop-blur-md p-3 rounded-full shadow-lg">
                      <ZoomIn className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-background/50 border-none backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          <CarouselNext className="right-4 bg-background/50 border-none backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
        </Carousel>
      </motion.div>

      {/* Points Indicateurs (Petit) */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => mainApi?.scrollTo(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              idx === currentIndex ? "bg-primary w-6" : "bg-primary/20 w-1.5"
            )}
          />
        ))}
      </div>

      {/* --- VUE PLEIN ÉCRAN --- */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden h-screen w-screen">
            {/* Overlay animé (Fond noir + Flou) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFullscreen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl z-0"
            />

            {/* Conteneur Carrousel */}
            <motion.div
              layoutId="gallery-container"
              className="relative w-full h-full flex flex-col items-center justify-center z-10 pointer-events-none"
            >
              <Carousel 
                setApi={setFullApi} 
                opts={{ loop: true, startIndex: currentIndex }} 
                className="w-full h-full pointer-events-auto [&>div]:h-full"
              >
                <CarouselContent className="h-full -ml-0">
                  {images.map((img, idx) => (
                    <CarouselItem key={idx} className="pl-0 h-full flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 lg:p-20">
                        <motion.div 
                          layoutId={`image-${idx}`} 
                          className="relative w-full h-full max-w-7xl"
                        >
                          <Image
                            src={img.url}
                            alt={img.alt}
                            fill
                            className="object-contain"
                            quality={100}
                            priority
                          />
                        </motion.div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <CarouselPrevious className="left-4 md:left-12 h-14 w-14 bg-white/10 hover:bg-white/20 border-none text-white transition-all pointer-events-auto" />
                <CarouselNext className="right-4 md:right-12 h-14 w-14 bg-white/10 hover:bg-white/20 border-none text-white transition-all pointer-events-auto" />
              </Carousel>

              {/* Points Indicateurs (Grand) */}
              <div className="absolute bottom-10 flex justify-center gap-3 pointer-events-auto">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => fullApi?.scrollTo(idx)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      idx === currentIndex ? "bg-white w-10" : "bg-white/30 w-2"
                    )}
                  />
                ))}
              </div>
            </motion.div>

            {/* Bouton Fermer */}
            <button
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[120] shadow-2xl"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
