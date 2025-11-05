import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  variant?: 'light' | 'dark' | 'white'
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  width?: 'full' | 'wide' | 'narrow'
  className?: string
  id?: string
}

export function Section({
  children,
  variant = 'white',
  spacing = 'xl',
  width = 'wide',
  className,
  id,
}: SectionProps) {
  const bgColors = {
    light: 'bg-[#F8F9FA]',
    dark: 'bg-[#0B0D0F] text-[#EDEFF1]',
    white: 'bg-white text-[#0E1113]',
  }

  const spacings = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-28',
    lg: 'py-24 md:py-36',
    xl: 'py-28 md:py-46',
    '2xl': 'py-36 md:py-60',
  }

  const widths = {
    full: 'w-full',
    wide: 'container mx-auto px-4 md:px-6 lg:px-8',
    narrow: 'container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl',
  }

  return (
    <section id={id} className={cn(bgColors[variant], spacings[spacing], className)}>
      <div className={widths[width]}>{children}</div>
    </section>
  )
}
