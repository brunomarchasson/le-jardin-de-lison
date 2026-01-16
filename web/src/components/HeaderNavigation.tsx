"use client";

import React, { useState, useEffect } from "react";
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

  // Pour éviter les erreurs d'hydratation avec le Portal
  useEffect(() => {
    setMounted(true);
  }, []);

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
      <nav className="hidden md:flex items-center gap-1 bg-primary/5 p-1.5 rounded-full border border-primary/10">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-5 py-2 rounded-full font-spirax text-base transition-colors duration-300 relative",
                isActive ? "text-primary" : "text-foreground/60 hover:text-primary"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-secondary/40 rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
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
                {/* Overlay sombre plein écran */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Panneau latéral plein écran */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="relative h-screen w-[280px] bg-background shadow-2xl flex flex-col grainy border-l border-primary/10 overflow-y-auto"
                >
                  <div className="p-6 flex items-center justify-between border-b border-primary/5">
                    <div className="flex items-center gap-3">
                      <Logo className="w-auto h-10 text-primary" />
                      <span className="font-spirax text-xl text-primary">Lison</span>
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
                      
                      const handleLinkClick = () => {
                        setTimeout(() => {
                          setIsOpen(false);
                        }, 200);
                      };

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
                            onClick={handleLinkClick}
                            className={cn(
                              "flex items-center justify-center text-2xl font-spirax py-3 px-6 rounded-full transition-all text-center w-full relative z-10",
                              isActive ? "text-primary" : "text-foreground/70"
                            )}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="active-pill-mobile"
                                className="absolute inset-0 bg-secondary/40 rounded-full shadow-sm"
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
