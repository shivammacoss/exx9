'use client'

import { useEffect } from 'react'
import '@/landing/landing.css'
import { Toaster } from '@/landing/components/ui/sonner'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement
    const prevTheme = html.getAttribute('data-theme')
    html.setAttribute('data-theme', 'light')
    html.style.backgroundColor = '#ffffff'
    return () => {
      if (prevTheme) html.setAttribute('data-theme', prevTheme)
      else html.removeAttribute('data-theme')
      html.style.backgroundColor = ''
    }
  }, [])

  return (
    <div className="exx9-landing">
      {children}
      <Toaster />
    </div>
  )
}
