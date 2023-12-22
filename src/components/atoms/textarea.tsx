import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import cn from '@/utils/libs/cn'

const textareaVariants = cva(
  'rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { variant, size, className, ...rest } = props

    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ variant, size, className }))}
        {...rest}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea, textareaVariants }
