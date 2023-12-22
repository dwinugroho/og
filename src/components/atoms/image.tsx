'use client'

import NextImage from 'next/image'
import React, { type PropsWithChildren } from 'react'

import cn from '@/utils/libs/cn'

export type ImageProps = {
  lazy?: boolean
} & React.ComponentPropsWithoutRef<typeof NextImage>

export const Container: React.FC<
  PropsWithChildren<{ isLoading: boolean; className?: string }>
> = ({ children, isLoading, className }) => {
  const rounded =
    className?.split(' ').find((clss) => clss.startsWith('rounded')) || ''

  return isLoading ? (
    <div className={cn('overflow-hidden', rounded)}>{children}</div>
  ) : (
    children
  )
}

const Image = (props: ImageProps) => {
  const { alt, src, className, quality, lazy = true, ...rest } = props
  const [isLoading, setLoading] = React.useState(true)

  return (
    <Container isLoading={isLoading} className={className}>
      <NextImage
        className={cn(
          className,
          'transition-[scale,filter] duration-700',
          isLoading && 'scale-[1.04] animate-pulse blur-xl grayscale'
        )}
        src={src}
        alt={alt}
        loading={lazy ? 'lazy' : undefined}
        priority={!lazy}
        quality={quality || 100}
        onLoad={() => {
          setLoading(false)
        }}
        {...rest}
      />
    </Container>
  )
}

Image.displayName = 'Image'

export { Image }
