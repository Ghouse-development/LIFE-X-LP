'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-5 right-5 z-50 transition-all duration-300',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      )}
    >
      <div className="flex gap-2 rounded-2xl border border-black/5 bg-white/95 backdrop-blur shadow-xl p-2">
        <Button
          asChild
          size="sm"
          className="bg-[#D9B66A] hover:bg-[#E5C889] text-[#0E1113]"
          data-gtm="cta_primary_request"
        >
          <Link href="#contact">資料請求</Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant="outline"
          data-gtm="cta_secondary_consult"
        >
          <Link href="#contact">個別相談</Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant="ghost"
          data-gtm="cta_tertiary_webinar"
        >
          <Link href="#webinar">ウェビナー</Link>
        </Button>
      </div>
    </div>
  )
}
