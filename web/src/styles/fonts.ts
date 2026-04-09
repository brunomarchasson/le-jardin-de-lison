import { Spirax, Lora } from 'next/font/google'

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

export const fontVariables = [
  spirax.variable,
  lora.variable,
].join(' ')
