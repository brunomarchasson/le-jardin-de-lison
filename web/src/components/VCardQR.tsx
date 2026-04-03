'use client'

import React, { useMemo, useRef, useState, useEffect } from 'react'
import VCard from 'vcard-creator'
import { QRCodeSVG } from 'qrcode.react'

interface VCardQRProps {
  email: string
  phone: string
  organization?: string
  address?: string
  city?: string
  zipCode?: string
  instagram?: string
  facebook?: string
  photoUrl?: string
}

export const VCardQR: React.FC<VCardQRProps> = ({
  email,
  phone,
  organization,
  address,
  city,
  zipCode,
  instagram,
  facebook,
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [logoDataUrl, setLogoDataUrl] = useState<string>('')
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const orgName = organization || 'Au jardin de Lison'

  // Load logo as Data URL for embedding
  useEffect(() => {
    fetch('/logo_square.svg')
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader()
        reader.onloadend = () => setLogoDataUrl(reader.result as string)
        reader.readAsDataURL(blob)
      })
  }, [])

  const vCardString = useMemo(() => {
    const myVCard = new VCard()
    
    // Pour éviter le découpage du nom sur mobile (Prénom/Nom), 
    // on laisse le prénom vide et on met tout dans le Nom de famille.
    myVCard
      .addName(orgName, '', '', '', '') 
      .addCompany(orgName)
      .addEmail(email)
      .addPhoneNumber(phone, 'WORK')
    
    if (address || city || zipCode) {
      myVCard.addAddress('', '', address || '', city || '', '', zipCode || '', 'France')
    }

    if (instagram) myVCard.addSocial(instagram, 'Instagram', 'instagram')
    if (facebook) myVCard.addSocial(facebook, 'Facebook', 'facebook')

    return myVCard.toString()
  }, [email, phone, orgName, address, city, zipCode, instagram, facebook])

  // Generate the final image for display & right-click
  useEffect(() => {
    if (!svgRef.current || !logoDataUrl) return

    const timer = setTimeout(() => {
      let svgData = svgRef.current!.outerHTML
      if (!svgData.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        svgData = svgData.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"')
      }
      const svgHeader = '<?xml version="1.0" standalone="no"?>\r\n'
      const base64Svg = btoa(unescape(encodeURIComponent(svgHeader + svgData)))
      setQrDataUrl(`data:image/svg+xml;base64,${base64Svg}`)
    }, 150)

    return () => clearTimeout(timer)
  }, [vCardString, logoDataUrl])

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-xl border-none shadow-sm bg-muted/30 w-full max-w-[240px]">
      <div className="hidden">
        <QRCodeSVG 
          ref={svgRef}
          value={vCardString} 
          size={400}
          level="M" 
          bgColor="transparent"
          imageSettings={{
            src: logoDataUrl,
            height: 60,
            width: 60,
            excavate: true,
          }}
        />
      </div>

      <div className="p-2 border-4 border-primary/5 rounded-lg bg-transparent flex items-center justify-center">
        {qrDataUrl ? (
          <img 
            src={qrDataUrl} 
            alt="QR Code Au jardin de Lison" 
            className="w-40 h-40"
          />
        ) : (
          <div className="w-40 h-40 animate-pulse bg-primary/10 rounded flex items-center justify-center text-[8px] text-primary/40 uppercase font-lora">
            Génération...
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-1 w-full text-center font-lora">
        <p className="text-[10px] text-primary/70 leading-tight uppercase tracking-tighter">
          Ajouter le contact
        </p>
      </div>
    </div>
  )
}
