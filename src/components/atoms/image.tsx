'use client'

import NextImage from 'next/image'
import React, { type PropsWithChildren } from 'react'

import cn from '@/utils/libs/cn'

export type ImageProps = {
  lazy?: boolean
} & React.ComponentPropsWithoutRef<typeof NextImage>

const Container: React.FC<PropsWithChildren<{ isLoading: boolean }>> = ({
  children,
  isLoading
}) => {
  return isLoading ? (
    <div className='animate-pulse overflow-hidden'>{children}</div>
  ) : (
    children
  )
}

const Image = (props: ImageProps) => {
  const { alt, src, className, quality, lazy = true, ...rest } = props
  const [isLoading, setLoading] = React.useState(true)

  return (
    <Container isLoading={isLoading}>
      <NextImage
        className={cn(
          className,
          'transition-[scale,filter] duration-700',
          isLoading && 'scale-[1.02] animate-pulse blur-xl grayscale'
        )}
        src={src}
        alt={alt}
        loading={lazy ? 'lazy' : undefined}
        priority={!lazy}
        quality={quality || 100}
        onLoad={() => setLoading(false)}
        {...rest}
      />
    </Container>
  )
}

Image.displayName = 'Image'

export { Image }
