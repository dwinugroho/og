'use client'

import { IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

import { REPO_LINK } from '@/utils/config/links'
import cn from '@/utils/libs/cn'

import { Separator } from '../atoms'
import { Logo } from '../atoms'
import { ThemeSwitcher } from '../molecules'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    document.addEventListener('scroll', changeBackground)

    return () => document.removeEventListener('scroll', changeBackground)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 bg-background/30 shadow-sm saturate-100 backdrop-blur-[10px] transition-colors duration-500',
        isScrolled && 'bg-background/80'
      )}
    >
      <div className='mx-auto flex h-[72px] max-w-7xl items-center justify-between px-8'>
        <Link
          href='/'
          className='flex items-center justify-center gap-1'
          aria-label='Homepage'
        >
          <Logo width={40} height={40} />
        </Link>
        <div className='flex items-center gap-2'>
          <a
            href={REPO_LINK.href}
            className='mr-2 cursor-pointer'
            rel='noopener noreferrer'
          >
            <IconBrandGithub width={20} height={20} />
          </a>
          <Separator orientation='vertical' className='h-6' />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
