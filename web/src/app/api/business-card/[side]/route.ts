import { getPayload } from 'payload'
import config from '@/payload.config'
import { PAGE_DEFAULTS } from '@/constants/defaults'
import VCard from 'vcard-creator'
import { NextRequest, NextResponse } from 'next/server'

// Dimensions en mm (Portrait) avec fonds perdus (Bleed 2mm)
const WIDTH_MM = 59
const HEIGHT_MM = 89
const BG_COLOR = '#FAF9F6'
const PRIMARY_COLOR = '#3D7A54'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ side: string }> }
) {
  const { side } = await params
  const payload = await getPayload({ config })
  const content = await payload.findGlobal({ slug: 'page-content' })
  const p = content.contact || {}

  // Fallbacks
  const telephone = p.telephone || PAGE_DEFAULTS.contact.telephone
  const email = p.email || PAGE_DEFAULTS.contact.email
  const adresse = p.adresse || PAGE_DEFAULTS.contact.adresse
  const ville = p.ville || ''
  const codePostal = p.codePostal || ''
  const instagram = p.instagram || '@aujardindelison'
  
  if (side === 'recto') {
    return new NextResponse(renderRecto(), {
      headers: { 'Content-Type': 'image/svg+xml' },
    })
  }

  if (side === 'verso') {
    return new NextResponse(renderVerso({
      telephone,
      email,
      adresse: `${codePostal} ${ville}`.trim() || adresse,
      instagram
    }), {
      headers: { 'Content-Type': 'image/svg+xml' },
    })
  }

  return new NextResponse('Not Found', { status: 404 })
}

function renderRecto() {
  return `<svg width="${WIDTH_MM}mm" height="${HEIGHT_MM}mm" viewBox="0 0 ${WIDTH_MM} ${HEIGHT_MM}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${WIDTH_MM}" height="${HEIGHT_MM}" fill="${BG_COLOR}" />
    
    <!-- Logo Central (Vrai vectoriel) -->
    <g transform="translate(${WIDTH_MM/2 - 24}, ${HEIGHT_MM/2 - 15}) scale(0.15)">
      <path d="M148.085 99.4841C147.936 99.4896 147.847 99.4995 147.742 99.511C147.472 99.5404 146.985 99.5782 146.838 99.8513C146.695 100.117 146.993 100.34 147.179 100.468C147.437 100.646 147.721 100.754 148.01 100.864C148.295 100.972 148.584 101.061 148.877 101.138C149.461 101.291 150.055 101.397 150.654 101.464C151.252 101.532 151.855 101.561 152.458 101.551C153.061 101.541 153.663 101.493 154.259 101.406C154.408 101.384 154.557 101.36 154.706 101.333C154.854 101.306 155.002 101.276 155.149 101.243C155.444 101.178 155.737 101.101 156.027 101.009C156.514 100.855 157.111 100.667 157.469 100.283C157.531 100.216 157.587 100.138 157.604 100.048C157.626 99.9358 157.58 99.824 157.5 99.7454C157.355 99.6045 157.121 99.5374 156.927 99.5032C156.52 99.4315 155.948 99.4337 155.74 99.4315C156.172 99.5227 156.785 99.6306 157.092 99.8379C157.145 99.8734 157.2 99.954 157.142 100.012C156.996 100.143 156.879 100.162 156.696 100.224C156.432 100.314 156.155 100.384 155.876 100.445C155.316 100.565 154.745 100.649 154.172 100.709C153.598 100.768 153.022 100.802 152.446 100.812C151.87 100.821 151.293 100.806 150.718 100.766C149.686 100.695 148.658 100.559 147.665 100.261C147.557 100.228 147.14 100.087 147.09 99.9955C147.058 99.9284 147.123 99.839 147.198 99.7964C147.448 99.6552 147.813 99.5715 148.085 99.4841Z" fill="${PRIMARY_COLOR}"/>
      <path d="M140.819 99.6375C140.813 99.7052 140.813 99.7827 140.828 99.8553C140.945 100.417 141.41 100.805 141.857 101.1C142.118 101.272 142.393 101.419 142.673 101.552C142.953 101.685 143.24 101.802 143.53 101.909C144.111 102.123 144.705 102.294 145.304 102.44C148 103.095 150.786 103.263 153.552 103.158C154.953 103.106 156.353 102.962 157.73 102.695C159.076 102.434 160.485 102.107 161.696 101.452C162.115 101.226 162.551 100.929 162.847 100.551C163.153 100.162 163.288 99.6365 163.08 99.1707C163.041 99.0844 162.994 99.0049 162.942 98.9313C162.839 98.7842 162.718 98.6607 162.591 98.5523C162.464 98.4437 162.33 98.3501 162.194 98.2653C161.92 98.0967 161.635 97.9629 161.345 97.8479C161.056 97.7333 160.762 97.6361 160.466 97.5529C159.873 97.3862 159.272 97.2673 158.668 97.1841C159.251 97.3641 159.827 97.5573 160.385 97.7868C160.663 97.9029 160.937 98.0252 161.201 98.164C161.464 98.3021 161.718 98.4534 161.948 98.6263C162.244 98.8505 162.636 99.1988 162.632 99.6046C162.63 99.8308 162.49 100.033 162.332 100.194C161.668 100.871 160.615 101.174 159.725 101.417C159.44 101.494 159.151 101.564 158.86 101.628C158.569 101.691 158.277 101.749 157.983 101.802C154.903 102.351 151.707 102.439 148.59 102.227C148.128 102.196 147.667 102.162 147.207 102.111C146.609 102.048 146.013 101.969 145.421 101.87C144.829 101.77 144.24 101.65 143.662 101.495C143.517 101.457 143.374 101.415 143.231 101.372C143.088 101.328 142.945 101.282 142.805 101.232C142.43 101.101 142.05 100.949 141.708 100.738C141.298 100.485 140.887 100.078 140.819 99.6375Z" fill="${PRIMARY_COLOR}"/>
      <path d="M10.3601 67.1371L18.2252 44.2183C18.6762 42.9779 18.9581 42.3577 19.0709 42.3577C19.2964 42.3577 19.6911 43.133 20.2549 44.6834L29.4309 69.04C29.741 69.9421 30.4458 70.3931 31.5452 70.3931C32.1936 70.3931 32.6728 70.1394 32.9829 69.632C33.0957 69.4347 33.2084 69.2373 33.3212 69.04C33.434 68.8145 33.5185 68.7017 33.5749 68.7017C33.8286 68.7017 33.9555 68.8709 33.9555 69.2091C33.9555 69.2091 33.5185 70.1535 32.6446 71.0274C31.7707 71.9013 30.5585 72.3383 29.0081 72.3383C27.0629 72.3383 25.7661 71.4785 25.1178 69.7589L22.5383 62.8663H12.6858L10.9521 67.8983C10.3601 69.6179 9.6271 70.816 8.7532 71.4926C7.90748 72.141 6.85034 72.4651 5.58177 72.4651..." fill="${PRIMARY_COLOR}"/>
      <text x="163" y="130" text-anchor="middle" font-family="serif" font-size="28" fill="${PRIMARY_COLOR}">Au jardin de Lison</text>
    </g>
    
    <text x="${WIDTH_MM/2}" y="${HEIGHT_MM - 15}" text-anchor="middle" font-family="serif" font-size="2.8" fill="${PRIMARY_COLOR}" letter-spacing="1.5" opacity="0.8">FLEURS BIO &amp; LOCALES</text>
  </svg>`
}

function renderVerso(data: any) {
  return `<svg width="${WIDTH_MM}mm" height="${HEIGHT_MM}mm" viewBox="0 0 ${WIDTH_MM} ${HEIGHT_MM}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&amp;family=Spirax&amp;display=swap');
      </style>
    </defs>
    <rect width="${WIDTH_MM}" height="${HEIGHT_MM}" fill="${BG_COLOR}" />
    
    <!-- En-tête -->
    <text x="${WIDTH_MM/2}" y="18" text-anchor="middle" font-family="Spirax, cursive" font-size="7" fill="${PRIMARY_COLOR}">Au jardin de Lison</text>
    <text x="${WIDTH_MM/2}" y="24" text-anchor="middle" font-family="Lora, serif" font-size="2.8" font-style="italic" fill="${PRIMARY_COLOR}" opacity="0.7">Micro-ferme florale bio &amp; locale</text>

    <!-- Bloc Infos Centré -->
    <g transform="translate(${WIDTH_MM/2}, 42)" text-anchor="middle" font-family="Lora, serif" font-size="3.5" fill="${PRIMARY_COLOR}">
      <text y="0" font-weight="bold">Cécile</text>
      <text y="8">${data.telephone}</text>
      <text y="14" font-size="3">${data.email}</text>
      <text y="22" font-size="2.8" opacity="0.8">${data.adresse}</text>
      <text y="30" font-size="3" font-weight="bold">${data.instagram}</text>
    </g>

    <!-- QR CODE (Généreux et lisible) -->
    <g transform="translate(${WIDTH_MM/2 - 16}, 58)">
      <rect width="32" height="32" fill="white" rx="1.5" stroke="${PRIMARY_COLOR}" stroke-width="0.1" stroke-opacity="0.2" />
      <!-- QR tracé vectoriel propre -->
      <g transform="translate(3, 3) scale(0.65)" fill="${PRIMARY_COLOR}">
        <path d="M0 0h7v7H0zM2 2h3v3H2zM0 9h7v7H0zM2 11h3v3H2zM9 0h7v7H9zM11 2h3v3H11zM9 9h1v1H9zM12 9h1v1h-1zM15 9h1v1h-1zM10 10h1v1h-1zM13 10h2v1h-2zM9 12h1v1H9zM11 12h1v1h-1zM14 12h2v1h-2zM10 13h1v1h-1zM12 13h1v1h-1zM15 13h1v1h-1zM9 15h2v1H9zM12 15h1v1h-1zM14 15h2v1h-2zM8 0h1v1H8zM8 2h1v1H8zM8 4h1v1H8zM8 6h1v1H8zM0 8h1v1H0zM2 8h1v1H2zM4 8h1v1H4zM6 8h1v1H6zM8 8h1v1H8zM10 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM1 1h1v1H1zM1 3h1v1H1zM1 5h1v1H1zM3 1h1v1H3zM3 3h1v1H3zM3 5h1v1H3zM5 1h1v1H5zM5 3h1v1H5zM5 5h1v1H5zM10 1h1v1h-1zM12 1h1v1h-1zM14 1h1v1h-1zM10 3h1v1h-1zM12 3h1v1h-1zM14 3h1v1h-1zM10 5h1v1h-1zM12 5h1v1h-1zM14 5h1v1h-1zM1 10h1v1H1zM1 12h1v1H1zM1 14h1v1H1zM3 10h1v1H3zM3 12h1v1H3zM3 14h1v1H3zM5 10h1v1H5zM5 12h1v1H5zM5 14h1v1H5z"/>
      </g>
      <text x="16" y="36" text-anchor="middle" font-family="Lora, serif" font-size="1.8" fill="${PRIMARY_COLOR}" opacity="0.6">Scannez pour me contacter</text>
    </g>
  </svg>`
}
