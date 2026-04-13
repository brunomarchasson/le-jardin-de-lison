import React from 'react'

export function Logo({ className }: { className?: string }) {
  return (
    /* 
       On utilise une balise img pour le logo complexe. 
       Cela évite d'ajouter 1500+ éléments au DOM, 
       ce qui est la cause principale de la lenteur sur mobile.
    */
    <img 
      src="/logo.svg" 
      alt="Au jardin de Lison" 
      className={className}
      width={326}
      height={137}
      loading="eager"
      fetchPriority="high"
    />
  )
}
