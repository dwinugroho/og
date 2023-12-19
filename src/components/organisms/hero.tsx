'use client'
import Link from 'next/link'

import { buttonVariants } from '@/components/atoms'
import { CrossOutUnderline } from '@/components/svgs'
import { HERO_LINKS } from '@/utils/config/links'

const Hero = () => {
  return (
    <div className='my-12 flex flex-col items-center space-y-8 text-center md:my-28'>
      <h1 className='text-5xl font-extrabold text-foreground sm:text-6xl'>
        Next.js 14 TypeScript Tailwind Boilerplate 🚀 by{' '}
        <span className='relative'>
          Krafan
          <CrossOutUnderline className='absolute !inset-x-0 -bottom-3 w-full' />
        </span>
      </h1>
      <div className='flex gap-6'>
        {HERO_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            aria-label={link.label}
            target='_blank'
            rel='noopener noreferrer'
          >
            {link.icon}
          </a>
        ))}
      </div>
      <Link
        href='https://github.com/dwinugroho/nextjs-typescript-tailwind'
        className={buttonVariants({})}
      >
        Getting Started
      </Link>
    </div>
  )
}

export { Hero }
