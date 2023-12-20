import { type IconDescriptor } from 'next/dist/lib/metadata/types/metadata-types'

type Site = {
  url: string
  ogImageHost: string
  title: string
  name: string
  keywords: string[]
  titleTemplate: string
  description: string
  githubUsername: string
  favicons: IconDescriptor[]
}

const prodBaseURL = 'https://og.krafan.com'
const devBaseURL = 'http://127.0.0.1:3000'

const site: Site = {
  url: process.env.NODE_ENV === 'production' ? prodBaseURL : devBaseURL,
  ogImageHost: 'https://og.krafan.com/api',
  title: 'Open Graph Image Generator by Krafan',
  name: 'Krafan',
  keywords: [
    'dwinugroho',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Dwi Nugroho',
    'Krafan'
  ],
  titleTemplate: '- Open Graph Image Generator by Krafan',
  description:
    'Next.js 14 boilerplate powered by TypeScript and styled with Tailwind CSS',
  githubUsername: 'dwinugroho',
  favicons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png'
    }
  ]
}

export default site
