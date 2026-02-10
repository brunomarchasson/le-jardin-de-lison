"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/la-ferme", label: "La Ferme" },
  { href: "/fleurs", label: "Nos Fleurs" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function HeaderNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Refs pour calculer la position de la pillule
  const navRef = useRef<HTMLDivElement>(null);
  const [pillStyles, setPillStyles] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calcul de la position de la pillule active
  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current) return;
      
      const activeLink = navRef.current.querySelector(`[data-active="true"]`) as HTMLElement;
      if (activeLink) {
        setPillStyles({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1,
        });
      } else {
        setPillStyles(prev => ({ ...prev, opacity: 0 }));
      }
    };

    // On attend un court instant que le DOM soit à jour après la navigation
    const timeout = setTimeout(updatePill, 50);
    
    // On écoute aussi le redimensionnement de la fenêtre
    window.addEventListener('resize', updatePill);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updatePill);
    };
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {/* --- NAVIGATION DESKTOP --- */}
      <nav 
        ref={navRef}
        className="hidden md:flex items-center gap-1 bg-primary/5 p-1.5 rounded-full border border-primary/10 relative"
      >
        {/* LA PILLULE UNIQUE (Animation fluide) */}
        <motion.div
          className="absolute h-[calc(100%-12px)] bg-secondary/40 rounded-full shadow-sm z-0"
          initial={false}
          animate={{
            left: pillStyles.left,
            width: pillStyles.width,
            opacity: pillStyles.opacity,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 350, 
            damping: 30 
          }}
        />

        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              data-active={isActive}
              className={cn(
                "px-5 py-2 rounded-full font-spirax text-base transition-colors duration-300 relative z-10",
                isActive ? "text-primary" : "text-foreground/60 hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* --- NAVIGATION MOBILE --- */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-primary hover:bg-primary/5 rounded-full transition-colors outline-none"
        >
          <Menu className="w-8 h-8" />
          <span className="sr-only">Ouvrir le menu</span>
        </button>

        {mounted && createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-[9999] flex justify-end">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="relative h-screen w-[280px] bg-background shadow-2xl flex flex-col grainy border-l border-primary/10 overflow-y-auto"
                >
                  <div className="p-6 flex items-center justify-between border-b border-primary/5">
                    <div className="flex items-center gap-3">
                       <Link onClick={() => setIsOpen(false)} href="/" className="flex items-center gap-3 group">
                         <Logo className="w-auto h-10 text-primary" />
                       </Link>
                      
                    </div>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-full hover:bg-primary/5 text-primary transition-colors"
                    >
                      <X className="w-8 h-8" />
                    </button>
                  </div>

                  <nav className="flex flex-col gap-4 p-6">
                    {navLinks.map((link, idx) => {
                      const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                      
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + idx * 0.05 }}
                          className="relative"
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center justify-center text-2xl font-spirax py-3 px-6 rounded-full transition-all text-center w-full relative z-10",
                              isActive ? "text-primary" : "text-foreground/70"
                            )}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="active-pill-mobile"
                                className="absolute inset-0 bg-secondary/40 rounded-full shadow-sm -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                              />
                            )}
                            {link.label}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  <div className="mt-auto p-8 text-center opacity-60">
                     <p className="font-spirax text-muted-foreground text-xs italic leading-relaxed">
                       Au jardin de Lison<br/>
                       Micro-ferme florale
                     </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </>
  );
}
