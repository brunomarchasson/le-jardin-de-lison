import React from 'react'

export const AdminLogo: React.FC = () => {
  return (
    <div className="admin-logo-container">
      {/* Logo complet pour le Login */}
      <img 
        src="/logo.svg" 
        alt="Au jardin de Lison" 
        className="logo-full"
      />
      {/* Logo carré pour la Sidebar et le reste */}
      <img 
        src="/logo_square.svg" 
        alt="Au jardin de Lison" 
        className="logo-square"
      />
    </div>
  )
}
