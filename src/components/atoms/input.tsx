import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import cn from '@/utils/libs/cn'

const inputVariants = cva(
  'rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:read-only:ring-0 focus-visible:read-only:ring-offset-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary/90 dark:hover:bg-primary'
      },
      size: {
        default: 'px-4 py-2',
        sm: 'rounded-md px-3 py-1',
        lg: 'rounded-md px-8 py-4'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export type InputProp = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>

const Input = React.forwardRef<HTMLInputElement, InputProp>((props, ref) => {
  const { type = 'text', variant, size, className, ...rest } = props

  return (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants({ variant, size, className }))}
      {...rest}
    />
  )
})

Input.displayName = 'Input'

export { Input, inputVariants }
