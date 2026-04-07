'use client'

import React, { useMemo, useRef, useState, useEffect } from 'react'
import VCard from 'vcard-creator'
import { QRCodeSVG } from 'qrcode.react'
import { Download } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'

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

  const handleDownload = () => {
    const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${orgName.replace(/\s+/g, '_')}.vcf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

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
    <div className="flex flex-col items-center gap-4 p-6 rounded-xl border-none shadow-sm bg-muted/30 w-full">
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

      <div 
        onClick={handleDownload}
        className="cursor-pointer group relative p-2 border-4 border-primary/5 rounded-lg bg-transparent flex items-center justify-center transition-all hover:border-primary/20"
      >
        {qrDataUrl ? (
          <>
            <Image 
              src={qrDataUrl} 
              alt="QR Code Au jardin de Lison" 
              width={160}
              height={160}
              unoptimized
              className="w-40 h-40 group-hover:opacity-40 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Download className="w-12 h-12 text-primary" />
            </div>
          </>
        ) : (
          <div className="w-40 h-40 animate-pulse bg-primary/10 rounded flex items-center justify-center text-[8px] text-primary/40 uppercase font-lora">
            Génération...
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-2 w-full text-center font-lora">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDownload}
          className="text-[10px] text-primary leading-tight uppercase tracking-tighter hover:bg-primary/5 h-auto py-2 flex items-center gap-2 border-primary/10 font-spirax"
        >
          <Download className="w-3 h-3" />
          Ajouter le contact
        </Button>
        <p className="text-[8px] text-muted-foreground italic">
          (Cliquez ou scannez)
        </p>
      </div>
    </div>
  )
}
