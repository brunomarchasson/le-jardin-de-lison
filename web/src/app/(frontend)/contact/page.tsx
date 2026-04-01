import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { PAGE_DEFAULTS } from '@/constants/defaults'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const payload = await getPayload({ config })
  const content = await payload.findGlobal({
    slug: 'page-content',
  })

  const p = content.contact || {}

  // Fallbacks
  const pageTitle = p.title || PAGE_DEFAULTS.contact.title
  const subText = p.subText || PAGE_DEFAULTS.contact.subText
  const adresse = p.adresse || PAGE_DEFAULTS.contact.adresse
  const email = p.email || PAGE_DEFAULTS.contact.email
  const telephone = p.telephone || PAGE_DEFAULTS.contact.telephone
  const horaires = p.horaires || PAGE_DEFAULTS.contact.horaires

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-12 max-w-5xl">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-spirax mb-6 text-primary">{pageTitle}</h1>
        <p className="text-xl text-muted-foreground font-light italic font-lora">
          {subText}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-lora">
        <Card className="border-none shadow-sm bg-muted/30">
          <CardHeader>
            <MapPin className="h-6 w-6 text-primary mb-2" />
            <CardTitle className="font-spirax text-2xl text-primary/80">Adresse</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">
              {adresse}
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-muted/30">
          <CardHeader>
            <Clock className="h-6 w-6 text-primary mb-2" />
            <CardTitle className="font-spirax text-2xl text-primary/80">Horaires</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {horaires}
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-muted/30">
          <CardHeader>
            <Mail className="h-6 w-6 text-primary mb-2" />
            <CardTitle className="font-spirax text-2xl text-primary/80">Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{telephone}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{email}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted aspect-video rounded-3xl overflow-hidden shadow-inner border border-muted-foreground/10 h-[400px]">
        <iframe 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          src={`https://maps.google.com/maps?q=${encodeURIComponent(adresse.replace('\n', ' '))}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          title="Plan d'accès au jardin"
        ></iframe>
      </div>
    </div>
  )
}
