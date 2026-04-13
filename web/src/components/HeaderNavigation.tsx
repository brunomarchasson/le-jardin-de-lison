"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { createPortal } from "react-dom";

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
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation pillule Desktop
  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current) return;
      const activeLink = navRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeLink) {
        setPillStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1,
        });
      } else {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };
    const timer = setTimeout(updatePill, 150);
    window.addEventListener("resize", updatePill);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePill);
    };
  }, [pathname]);

  // Gestion du scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* --- DESKTOP --- */}
      <nav ref={navRef} className="hidden md:flex items-center gap-1 bg-primary/5 p-1 rounded-full border border-primary/10 relative">
        <div 
          className="absolute h-[calc(100%-8px)] bg-secondary/40 rounded-full shadow-sm transition-all duration-500 ease-out"
          style={{
            left: `${pillStyle.left}px`,
            width: `${pillStyle.width}px`,
            opacity: pillStyle.opacity,
            top: '4px'
          }}
        />
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
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

      {/* --- MOBILE --- */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(true)} 
          className="p-2 text-primary w-12 h-12 flex items-center justify-center"
          aria-label="Menu"
        >
          <Menu className="w-8 h-8" />
        </button>

        {mounted && createPortal(
          <div className={cn(
            "fixed inset-0 z-[10000] md:hidden transition-all duration-500",
            isOpen ? "visible" : "invisible"
          )}>
            {/* Backdrop */}
            <div 
              className={cn(
                "absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500",
                isOpen ? "opacity-100" : "opacity-0"
              )}
              onClick={() => setIsOpen(false)} 
            />
            
            {/* Drawer Colé à droite et Translucide */}
            <div 
              className={cn(
                "absolute top-0 right-0 h-full w-[280px] shadow-2xl transition-transform duration-500 ease-out flex flex-col border-l border-white/20",
                isOpen ? "translate-x-0" : "translate-x-full"
              )}
              style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.75)", 
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)" 
              }}
            >
              <div className="p-6 flex justify-between items-center border-b border-primary/5">
                <Logo className="h-10 w-auto text-primary" />
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 text-primary rounded-full hover:bg-primary/5"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-2 p-6 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-2xl font-spirax py-4 px-6 rounded-2xl text-center transition-all",
                      (pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)))
                        ? "bg-secondary/30 text-primary scale-105" 
                        : "text-foreground/70"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-auto p-8 text-center opacity-60 border-t border-primary/5">
                 <p className="font-spirax text-muted-foreground text-xs italic leading-relaxed">
                   Au jardin de Lison<br/>
                   Micro-ferme florale
                 </p>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </>
  );
}
