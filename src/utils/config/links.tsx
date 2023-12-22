import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin
} from '@tabler/icons-react'

export type Link = {
  href: string
  title: string
}

type HeroLinks = Array<{
  id: string
  label: string
  icon: React.ReactNode
  href: string
}>

export const LINKEDIN_LINK: Link = {
  title: 'linkedin',
  href: 'https://www.linkedin.com/in/dwi-nugroho'
}

export const REPO_LINK: Link = {
  title: 'github repository',
  href: 'https://github.com/dwinugroho/og'
}

export const HERO_LINKS: HeroLinks = [
  {
    id: 'github',
    label: 'GitHub',
    icon: <IconBrandGithub size={28} />,
    href: 'https://github.com/dwinugroho'
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: <IconBrandInstagram size={28} />,
    href: 'https://www.instagram.com/krafanid'
  },
  {
    id: 'linkedin',
    label: LINKEDIN_LINK.title,
    icon: <IconBrandLinkedin size={28} />,
    href: LINKEDIN_LINK.href
  }
]
