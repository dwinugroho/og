'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

const Providers: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props

  return (
    <ThemeProvider attribute='class' disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}

export default Providers
