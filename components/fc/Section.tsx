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
    sm: 'py-10 md:py-14',
    md: 'py-14 md:py-24',
    lg: 'py-20 md:py-32',
    xl: 'py-24 md:py-40',
    '2xl': 'py-32 md:py-52',
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
