"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

// Instance unique d'IntersectionObserver partagée pour tout le site
let sharedObserver: IntersectionObserver | null = null;

const getObserver = () => {
  if (typeof window === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // On arrête d'observer une fois visible pour économiser des ressources
            sharedObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
  }
  return sharedObserver;
};

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean;
  className?: string;
}

export function FadeIn({ children, delay = 0, direction = "up", fullWidth = false, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = getObserver();
    const currentRef = ref.current;
    if (currentRef && observer) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef && observer) observer.unobserve(currentRef);
    };
  }, []);

  const directions = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "fade-in-on-scroll", // Classe de base avec opacity: 0
        directions[direction], // On applique la translation initiale
        fullWidth ? "w-full" : "w-auto",
        className
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export function FadeInStagger({ children, staggerDelay = 0.1 }: { children: React.ReactNode, staggerDelay?: number }) {
  return (
    <div className="w-full">
      {React.Children.map(children, (child, i) => {
        if (React.isValidElement<{ delay?: number }>(child)) {
          return React.cloneElement(child, {
            delay: (child.props.delay || 0) + i * staggerDelay,
          });
        }
        return child;
      })}
    </div>
  );
}
