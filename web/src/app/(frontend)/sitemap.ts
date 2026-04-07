import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://aujardindelison.fr'

  // 1. Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    '',
    '/la-ferme',
    '/fleurs',
    '/le-marche',
    '/blog',
    '/contact',
    '/mentions-legales',
    '/politique-de-confidentialite',
    '/cgu',
    '/cgv',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  // 2. Fleurs (Dynamique)
  const { docs: flowers } = await payload.find({
    collection: 'flowers',
    where: {
      status: { equals: 'published' }
    },
    limit: 1000,
    depth: 0,
  })
  
  const flowerPages: MetadataRoute.Sitemap = flowers.map((flower) => ({
    url: `${baseUrl}/fleurs/${flower.slug}`,
    lastModified: new Date(flower.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // 3. Produits du Marché (Dynamique)
  const { docs: products } = await payload.find({
    collection: 'products',
    where: {
      status: { equals: 'published' }
    },
    limit: 1000,
    depth: 0,
  })
  
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/le-marche/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 4. Articles de Blog (Dynamique)
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' }
    },
    limit: 1000,
    depth: 0,
  })
  
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [
    ...staticPages,
    ...flowerPages,
    ...productPages,
    ...postPages,
  ]
}
