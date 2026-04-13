"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean;
}

export function FadeIn({ children, delay = 0, direction = "up", fullWidth = false }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const directions = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]",
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : cn("opacity-0", directions[direction]),
        fullWidth ? "w-full" : "w-auto"
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export function FadeInStagger({ children }: { children: React.ReactNode }) {
  // En version CSS pure simplifiée, on laisse les enfants gérer leur propre délai
  return <div className="w-full">{children}</div>;
}
