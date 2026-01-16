import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-12 max-w-5xl">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-spirax mb-6 text-primary">Contact & Infos</h1>
        <p className="text-xl text-muted-foreground font-light italic font-lora">
          Une question ? Envie de venir nous voir ?
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-lora">
        <Card className="border-none shadow-sm bg-muted/30">
          <CardHeader>
            <MapPin className="h-6 w-6 text-primary mb-2" />
            <CardTitle className="font-spirax text-2xl text-primary/80">Adresse</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Au jardin de Lison<br />
              123 Chemin des Fleurs<br />
              33000 Bordeaux (environ)
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
              Mercredi : 14h - 18h<br />
              Samedi : 10h - 13h<br />
              (Ouvert selon météo des fleurs)
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
              <span>06 00 00 00 00</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>hello@aujardindelison.fr</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted aspect-video rounded-3xl flex items-center justify-center text-muted-foreground italic font-spirax text-xl shadow-inner">
        [Carte Interactive / Google Maps Placeholder]
      </div>
    </div>
  )
}
