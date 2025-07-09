import localFont from 'next/font/local'
import { Manrope } from 'next/font/google'

// Use actual Apparat font
export const apparatFont = localFont({
  src: [
    {
      path: '../public/fonts/apparat/Apparat-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/apparat/Apparat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/apparat/Apparat-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/apparat/Apparat-Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/apparat/Apparat-Bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-apparat',
  display: 'swap',
})
