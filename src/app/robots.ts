import { type MetadataRoute } from 'next'

import site from '@/utils/config/site'

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: ['/', '/**/*', '/api/**/*'],
      disallow: ['/404', '/500']
    }
  ],
  // sitemap: `${site.url}/sitemap.xml`,
  host: `${site.url}`
})

export default robots
