import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Image from 'next/image'

import '@/styles/globals.css'
import { Navbar } from '@/components/organisms/navbar'
import site from '@/utils/config/site'
import cn from '@/utils/libs/cn'
import ogImage from '@/utils/libs/og-image'

import Providers from './providers'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s ${site.titleTemplate}`
  },
  description: site.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  manifest: '/favicon/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    site: '@krafanid',
    creator: '@krafanid',
    images: [
      ogImage({
        title: 'Open Graph Image Generator 🚀 by Krafan',
        description: 'Generate stunning open graph image effortlessly!',
        information: site.url.replace('https://', '')
      })
    ]
  },
  keywords: site.keywords,
  creator: site.githubUsername,
  openGraph: {
    url: site.url,
    type: 'website',
    title: site.title,
    siteName: site.title,
    description: site.description,
    locale: 'en',
    images: [
      {
        url: ogImage({
          title: 'Open Graph Image Generator 🚀 by Krafan',
          description: 'Generate stunning open graph image effortlessly!',
          information: site.url.replace('https://', '')
        }),
        width: 1200,
        height: 630,
        alt: site.description,
        type: 'image/png'
      }
    ]
  },
  icons: {
    icon: '/favicon/favicon.svg',
    shortcut: '/favicon/favicon.svg',
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [...site.favicons]
  }
}

export const viewport: Viewport = {
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#ffffff'
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#000000'
    }
  ]
}

const MonaFont = localFont({
  src: '../../public/fonts/mona-sans/Mona-Sans.woff2',
  variable: '--font-mona-sans'
})

const HubotFont = localFont({
  src: '../../public/fonts/hubot-sans/Hubot-Sans.woff2',
  variable: '--font-hubot-sans'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={cn('scroll-smooth')}>
      <body className={cn('relative', MonaFont.variable, HubotFont.variable)}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <div className='absolute inset-0 -z-10 overflow-x-hidden'>
            <div className='absolute right-0 top-[-160px] -z-10 w-[100vw] sm:w-[80vw] lg:w-[40vw] '>
              <div className='relative aspect-square w-full'>
                <Image
                  draggable={false}
                  fill
                  quality={1}
                  src='/images/gradient-right.png'
                  alt='Gradient background'
                  className='opacity-80 dark:opacity-30'
                  sizes='100%'
                  priority
                />
              </div>
            </div>
            <div className='absolute left-0 top-1/2 -z-10 w-[100vw] -translate-y-1/2 sm:w-[80vw] lg:w-[40vw]'>
              <div className='relative aspect-square w-full'>
                <Image
                  draggable={false}
                  fill
                  quality={1}
                  src='/images/gradient-left.png'
                  alt='Gradient background'
                  className='opacity-80 dark:opacity-30'
                  sizes='100%'
                  priority
                />
              </div>
            </div>
            <div className='absolute bottom-0 left-1/2 -z-10 w-[100vw] sm:w-[80vw] lg:w-[40vw]'>
              <div className='relative aspect-square w-full'>
                <Image
                  draggable={false}
                  fill
                  quality={1}
                  src='/images/gradient-left.png'
                  alt='Gradient background'
                  className='opacity-80 dark:opacity-30'
                  sizes='100%'
                  priority
                />
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
