"use client";

import React, { useEffect, useState } from "react";
import { Settings2, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const fonts = [
  { id: "lora", label: "Lora (Botanique)", variable: "var(--font-lora), ui-serif, serif" },
  { id: "opensans", label: "Open Sans (Moderne)", variable: "var(--font-opensans), ui-sans-serif, sans-serif" },
  { id: "nanum", label: "Nanum Gothic (Clair)", variable: "var(--font-nanum), ui-sans-serif, sans-serif" },
  { id: "corben", label: "Corben (Vintage)", variable: "var(--font-corben), ui-serif, serif" },
];

const colorThemes = [
  { 
    id: "original", 
    label: "Jardin Originel", 
    colors: { primary: "oklch(0.45 0.08 140)", secondary: "oklch(0.92 0.06 40)", background: "oklch(0.98 0.01 90)" } 
  },
  { 
    id: "earth", 
    label: "Terre Cuite", 
    colors: { primary: "oklch(0.45 0.12 45)", secondary: "oklch(0.90 0.08 80)", background: "oklch(0.97 0.02 70)" } 
  },
  { 
    id: "lavender", 
    label: "Douce Lavande", 
    colors: { primary: "oklch(0.40 0.08 280)", secondary: "oklch(0.92 0.04 280)", background: "oklch(0.98 0.01 280)" } 
  },
];

export function ThemeSwitcher() {
  const [activeFont, setActiveFont] = useState("lora");
  const [activeColor, setActiveColor] = useState("original");

  const updateFont = (fontId: string) => {
    const font = fonts.find(f => f.id === fontId);
    if (font) {
      document.documentElement.style.setProperty('--font-current-serif', font.variable);
      setActiveFont(fontId);
    }
  };

  const updateColors = (themeId: string) => {
    const theme = colorThemes.find(t => t.id === themeId);
    if (theme) {
      document.documentElement.style.setProperty('--primary', theme.colors.primary);
      document.documentElement.style.setProperty('--secondary', theme.colors.secondary);
      document.documentElement.style.setProperty('--background', theme.colors.background);
      setActiveColor(themeId);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[200]">
      <Popover>
        <PopoverTrigger asChild>
          <button className="p-3 bg-white/80 backdrop-blur-md border border-primary/20 rounded-full shadow-lg text-primary hover:scale-110 transition-all">
            <Settings2 className="w-6 h-6" />
          </button>
        </PopoverTrigger>
        <PopoverContent side="top" align="start" className="w-80 p-6 bg-background/95 backdrop-blur-xl border-primary/10 shadow-2xl rounded-[2rem] grainy">
          <div className="space-y-8">
            <div>
              <h4 className="font-spirax text-xl text-primary mb-4">Typographie</h4>
              <RadioGroup value={activeFont} onValueChange={updateFont} className="grid grid-cols-1 gap-2">
                {fonts.map((f) => (
                  <div key={f.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={f.id} id={`f-${f.id}`} />
                    <Label htmlFor={`f-${f.id}`} className="font-lora cursor-pointer">{f.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="pt-4 border-t border-primary/5">
              <h4 className="font-spirax text-xl text-primary mb-4">Ambiance Couleur</h4>
              <div className="grid grid-cols-1 gap-3">
                {colorThemes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateColors(t.id)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-2xl border transition-all text-left",
                      activeColor === t.id ? "border-primary bg-primary/5 shadow-inner" : "border-primary/5 hover:bg-white/50"
                    )}
                  >
                    <span className="font-lora text-sm">{t.label}</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.colors.primary }} />
                      <div className="w-4 h-4 rounded-full border border-black/5" style={{ backgroundColor: t.colors.background }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <p className="text-[10px] text-muted-foreground italic text-center pt-2">
              Note : Ces réglages sont temporaires pour la démonstration.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
