import { Inter, Manrope } from 'next/font/google'

// Use Inter as a replacement for Apparat - it has a similar clean, modern look
export const apparatFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-apparat',
  display: 'swap',
})
