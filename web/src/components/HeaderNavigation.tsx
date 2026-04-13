"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/la-ferme", label: "La Ferme" },
  { href: "/fleurs", label: "Nos Fleurs" },
  { href: "/le-marche", label: "Le Marché" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function HeaderNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
      <nav className="hidden md:flex items-center gap-1 bg-primary/5 p-1.5 rounded-full border border-primary/10 relative">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-5 py-2 rounded-full font-spirax text-base transition-colors duration-300 relative z-10",
                isActive ? "text-primary" : "text-foreground/60 hover:text-primary"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-secondary/40 rounded-full shadow-sm -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
                transition={{ type: "spring", damping: 35, stiffness: 350 }}
                className="relative h-screen w-[280px] bg-background shadow-2xl flex flex-col grainy border-l border-primary/10 overflow-y-auto"
              >
                <div className="p-6 flex items-center justify-between border-b border-primary/5">
                  <Link onClick={() => setIsOpen(false)} href="/" className="flex items-center gap-3">
                    <Logo className="w-auto h-10 text-primary" />
                  </Link>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-primary/5 text-primary w-10 h-10 flex items-center justify-center"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>

                <nav className="flex flex-col gap-4 p-6">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-center text-2xl font-spirax py-3 px-6 rounded-full transition-all text-center w-full relative",
                          isActive ? "text-primary bg-secondary/30 scale-105 shadow-sm" : "text-foreground/70"
                        )}
                      >
                        {link.label}
                      </Link>
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
        </AnimatePresence>
      </div>
    </>
  );
}
