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
    sm: 'pt-20 md:pt-28 pb-16 md:pb-20',
    md: 'pt-24 md:pt-32 pb-18 md:pb-22',
    lg: 'pt-26 md:pt-34 pb-20 md:pb-24',
    xl: 'pt-28 md:pt-36 pb-20 md:pb-24',
    '2xl': 'pt-28 md:pt-36 pb-20 md:pb-24',
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
