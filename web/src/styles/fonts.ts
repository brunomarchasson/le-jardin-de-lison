import { Spirax, Lora, Open_Sans, Nanum_Gothic, Corben, Lato } from 'next/font/google'

export const spirax = Spirax({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-spirax',
  display: 'swap',
})

export const lora = Lora({ 
  subsets: ['latin'], 
  variable: '--font-lora', 
  display: 'swap' 
})

export const openSans = Open_Sans({ 
  subsets: ['latin'], 
  variable: '--font-opensans', 
  display: 'swap' 
})

export const nanumGothic = Nanum_Gothic({ 
  subsets: ['latin'], 
  weight: ['400', '700'], 
  variable: '--font-nanum', 
  display: 'swap' 
})

export const corben = Corben({ 
  subsets: ['latin'], 
  weight: ['400', '700'], 
  variable: '--font-corben', 
  display: 'swap' 
})

export const lato = Lato({ 
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const fontVariables = [
  spirax.variable,
  lora.variable,
  openSans.variable,
  nanumGothic.variable,
  corben.variable,
  lato.variable,
].join(' ')
