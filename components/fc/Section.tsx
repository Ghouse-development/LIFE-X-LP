'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { useSectionView } from '@/hooks/use-section-view'

interface SectionProps {
  children: ReactNode
  tone?: 'light' | 'alt' | 'dark'
  variant?: 'light' | 'dark' | 'white' // 後方互換性
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  width?: 'full' | 'wide' | 'narrow'
  className?: string
  id?: string
}

export function Section({
  children,
  tone,
  variant = 'white',
  spacing = 'xl',
  width = 'wide',
  className,
  id,
}: SectionProps) {
  const sectionRef = useSectionView(id)

  // tone優先、fallbackとしてvariant
  const effectiveTone = tone || (variant === 'light' ? 'alt' : variant === 'dark' ? 'dark' : 'light')

  const toneClasses = {
    light: 'bg-[var(--surface)] text-[var(--ink)]',
    alt: 'bg-[var(--surface-alt)] text-[var(--ink)]',
    dark: 'bg-[var(--surface-dark)] text-[var(--surface)]',
  }

  const spacings = {
    sm: 'pt-16 md:pt-20 pb-12 md:pb-16',
    md: 'pt-20 md:pt-24 pb-16 md:pb-20',
    lg: 'pt-24 md:pt-28 pb-18 md:pb-22',
    xl: 'pt-28 md:pt-36 pb-20 md:pb-24',
    '2xl': 'pt-32 md:pt-40 pb-28 md:pb-32',
  }

  const widths = {
    full: 'w-full',
    wide: 'mx-auto max-w-6xl px-6 sm:px-4',
    narrow: 'mx-auto max-w-4xl px-6 sm:px-4',
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(toneClasses[effectiveTone], spacings[spacing], className)}
    >
      <div className={widths[width]}>{children}</div>
    </section>
  )
}
