import { Poppins, Barlow } from 'next/font/google'

export const poppins = Poppins({
  weight: ['200', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export const barlow = Barlow({
  weight: '500',
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-barlow'
})
