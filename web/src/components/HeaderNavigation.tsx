"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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

  // Verrouiller le scroll quand le menu est ouvert
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
                "px-5 py-2 rounded-full font-spirax text-base transition-all duration-300 relative",
                isActive 
                  ? "bg-secondary/40 text-primary shadow-sm" 
                  : "text-foreground/60 hover:text-primary hover:bg-white/50"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* --- NAVIGATION MOBILE --- */}
      <div className="md:hidden">
        {/* Bouton Hamburger */}
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-primary hover:bg-primary/5 rounded-full transition-colors outline-none"
        >
          <Menu className="w-8 h-8" />
          <span className="sr-only">Ouvrir le menu</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100]">
              {/* Overlay sombre */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Panneau latéral */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-background shadow-2xl flex flex-col grainy"
              >
                {/* Header du menu */}
                <div className="p-6 flex items-center justify-between border-b border-primary/5">
                  <div className="flex items-center gap-3">
                    <Logo className="w-auto h-10 text-primary" />
                    <span className="font-spirax text-xl text-primary">Le Jardin</span>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-primary/5 text-primary transition-colors"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>

                {/* Liens */}
                <nav className="flex flex-col gap-4 p-8">
                  {navLinks.map((link, idx) => {
                    const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center justify-center text-3xl font-spirax py-4 px-6 rounded-full transition-all text-center w-full",
                            isActive 
                              ? "bg-secondary/40 text-primary shadow-md" 
                              : "text-foreground/70 hover:bg-primary/5"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Footer du menu */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-auto p-12 text-center"
                >
                   <p className="font-spirax text-muted-foreground text-base italic leading-relaxed opacity-70">
                     "Là où les fleurs s'épanouissent, l'espoir en fait de même."
                   </p>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}