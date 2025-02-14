import {LOCALE_PARAMS} from '@smart-i18n/next/config'
import I18nProvider from '@smart-i18n/next/I18nProvider'
import {resolveServerI18n} from '@smart-i18n/next/server/utils'
import type {Metadata, Viewport} from 'next'
import localFont from 'next/font/local'
import React from 'react'
import PALETTES from '../../../palette'
import '../globals.css'
import LocaleParam = I18n.LocaleParam

// https://rastikerdar.github.io/vazirmatn/fa/docs/Vazirmatn-Variable-fa
const vazirFont = localFont({
  src: '../../assets/fonts/Vazirmatn-RD[wght].woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  adjustFontFallback: false, // Don't automatically set a fallback font (other than them that we set)
  fallback: ['"Vazirmatn RD"', 'Vazirmatn', 'Vazir', 'Roboto'],
})

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{localeParam: LocaleParam}>
}): Promise<Metadata> {
  const params = await paramsPromise
  const {dict: t} = await resolveServerI18n(params.localeParam)
  return {
    title: t['Gold it'],
    description:
      t[
        "Your only true possession is the same inherently valuable thing you've kept within yourself. So, turn your all fake money into GOLD and keep it with you and on't think about it until you need it. When the time comes, sell it and enjoy the value of your real money you've managed to preserve!"
      ],
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: PALETTES.light.primary},
    {media: '(prefers-color-scheme: dark)', color: PALETTES.dark.primary},
  ],
}

export default async function RootLayout({
  children,
  params: paramsPromise,
}: Readonly<{children: React.ReactNode; params: Promise<{localeParam: LocaleParam}>}>) {
  const params = await paramsPromise
  const {dict, locale} = await resolveServerI18n(params.localeParam)
  return (
    <html dir={locale.direction} lang={locale.language}>
      <body className={`${vazirFont.className} antialiased`}>
        <I18nProvider dict={dict}>{children}</I18nProvider>
      </body>
    </html>
  )
}

export const generateStaticParams = () => LOCALE_PARAMS.map((localeParam) => ({localeParam}))
export const dynamicParams = false
