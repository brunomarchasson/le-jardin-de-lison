import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function FleursPage() {
  const payload = await getPayload({ config })
  const { docs: flowers } = await payload.find({
    collection: 'flowers',
    where: {
      status: { equals: 'published' }
    }
  })

  const seasonLabels = {
    spring: 'Printemps',
    summer: 'Été',
    autumn: 'Automne',
    winter: 'Hiver',
  }

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-12">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-serif italic mb-6">Nos Fleurs</h1>
        <p className="text-xl text-muted-foreground font-light italic max-w-2xl mx-auto">
          Découvrez les variétés qui s'épanouissent actuellement au jardin.
        </p>
      </header>

      {flowers.length === 0 ? (
        <div className="text-center py-24 bg-muted/20 rounded-3xl italic text-muted-foreground">
          Le catalogue est en cours de préparation. Revenez bientôt !
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {flowers.map((flower) => (
            <Card key={flower.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-muted aspect-[4/3] flex items-center justify-center text-muted-foreground italic">
                [Photo de {flower.name}]
              </div>
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="font-serif italic text-2xl">{flower.name}</CardTitle>
                  <span className="font-bold text-primary">{flower.price}€</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {flower.season?.map((s) => (
                    <Badge key={s} variant="secondary" className="font-normal">
                      {seasonLabels[s as keyof typeof seasonLabels]}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {flower.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
