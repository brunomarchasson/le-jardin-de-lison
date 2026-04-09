import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Users, Briefcase, MessageCircle, Facebook, Instagram } from 'lucide-react'
import { PAGE_DEFAULTS } from '@/constants/defaults'
import { VCardQR } from '@/components/VCardQR'
import { RichText } from '@/components/RichText'
import { Metadata } from 'next'

export const revalidate = 3600 // La page sera régénérée au maximum toutes les heures

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Une question ? Envie de commander des fleurs ? Contactez Cécile au jardin de Lison, micro-ferme florale au Puy-Sainte-Réparade.',
  alternates: {
    canonical: '/contact',
  },
}

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
  
  const nomOrganisation = p.nomOrganisation || undefined
  const ville = p.ville || undefined
  const codePostal = p.codePostal || undefined
  const instagram = p.instagram || undefined
  const facebook = p.facebook || undefined
  const whatsapp = p.whatsapp || telephone?.replace(/\s/g, '') || ''
  
  const contactPhotoUrl = 'https://aujardindelison.fr/logo.svg'

  const displayAdresse = adresse || ''
  const fullAdresse = `${displayAdresse}${codePostal || ville ? '\n' : ''}${codePostal || ''} ${ville || ''}`.trim()

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-12 max-w-5xl">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-spirax mb-6 text-primary">{pageTitle}</h1>
        <p className="text-xl text-muted-foreground font-light italic font-lora">
          {subText}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-lora">
        <Card className="border-none shadow-sm bg-muted/30">
          <CardHeader>
            <MapPin className="h-6 w-6 text-primary mb-2" />
            <CardTitle className="font-spirax text-2xl text-primary/80">Adresse</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">
              {fullAdresse || 'Adresse non renseignée'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-muted/30 ">
          <CardHeader>
            <Mail className="h-6 w-6 text-primary mb-2" />
            <CardTitle className="font-spirax text-2xl text-primary/80">Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 text-sm">
              {telephone && (
                <a href={`tel:${telephone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 text-primary/60" />
                  <span>{telephone}</span>
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 text-primary/60" />
                  <span className="break-all">{email}</span>
                </a>
              )}
            </div>

            <div className="pt-4 border-t border-primary/5">
              <p className="text-[10px] uppercase tracking-widest text-primary/40 font-bold mb-4">Suivez-nous</p>

              <div className="flex items-center gap-6">
                {whatsapp && (
                  <a 
                    href={`https://wa.me/${whatsapp.replace('+', '').replace(/\s/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-green-600 transition-colors"
                    title="WhatsApp"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                )}

                {instagram && (
                  <a 
                    href={instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-pink-600 transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}

                {facebook && (
                  <a 
                    href={facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-600 transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center items-center lg:pt-0">
          <VCardQR 
            organization={nomOrganisation}
            email={email}
            phone={telephone}
            address={displayAdresse}
            city={ville}
            zipCode={codePostal}
            instagram={instagram}
            facebook={facebook}
            photoUrl={contactPhotoUrl}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-4">
        <section className="bg-primary/5 rounded-3xl p-8 border border-primary/10 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Briefcase className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-spirax text-primary">Professionnels</h2>
          </div>
          <div className="prose prose-stone font-lora text-muted-foreground flex-grow">
            {p.prosSection ? (
              <RichText content={p.prosSection} />
            ) : (
              <p>Vous êtes fleuriste ou commerçant et souhaitez proposer nos fleurs ? Nous envoyons nos disponibilités chaque lundi et mercredi. Contactez-nous pour rejoindre notre liste de diffusion.</p>
            )}
          </div>
        </section>

        <section className="bg-secondary/5 rounded-3xl p-8 border border-secondary/10 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/10 rounded-full text-secondary-foreground">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-spirax text-primary">Particuliers</h2>
          </div>
          <div className="prose prose-stone font-lora text-muted-foreground flex-grow">
            {p.particuliersSection ? (
              <RichText content={p.particuliersSection} />
            ) : (
              <p>Envie d&apos;un bouquet pour un événement ou simplement pour le plaisir ? Contactez-nous par message ou venez nous voir directement au jardin pendant les heures d&apos;ouverture.</p>
            )}
          </div>
        </section>
      </div>

      <div className="bg-muted aspect-video rounded-3xl overflow-hidden shadow-inner border border-muted-foreground/10 h-[400px]">
        <iframe 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          src={`https://maps.google.com/maps?q=${encodeURIComponent(fullAdresse.replace('\n', ' '))}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          title="Plan d'accès au jardin"
        ></iframe>
      </div>
    </div>
  )
}
