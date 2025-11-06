'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ChevronUp } from 'lucide-react'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

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
      {/* Desktop: 3 buttons horizontal */}
      <div className="hidden md:flex gap-2 rounded-2xl border border-black/5 bg-white/95 backdrop-blur shadow-xl p-2">
        <Button
          asChild
          variant="primary"
          size="sm"
          data-cta="floating_request"
        >
          <Link href="#contact">資料請求</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="sm"
          data-cta="floating_consult"
        >
          <Link href="#contact">個別相談</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          data-cta="floating_webinar"
        >
          <Link href="#webinar">ウェビナー</Link>
        </Button>
      </div>

      {/* Mobile: 1 button + expandable */}
      <div className="md:hidden flex flex-col gap-2 items-end">
        {/* Secondary buttons (expanded) */}
        {isExpanded && (
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full shadow-lg bg-white/95 backdrop-blur min-w-[120px]"
              data-cta="floating_consult_mobile"
            >
              <Link href="#contact">個別相談</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-full shadow-lg bg-white/95 backdrop-blur min-w-[120px]"
              data-cta="floating_webinar_mobile"
            >
              <Link href="#webinar">ウェビナー</Link>
            </Button>
          </div>
        )}

        {/* Primary button with expand toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur shadow-xl border border-black/5 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label={isExpanded ? 'メニューを閉じる' : 'メニューを開く'}
          >
            <ChevronUp
              className={cn(
                'w-5 h-5 text-gray-700 transition-transform duration-200',
                isExpanded && 'rotate-180'
              )}
            />
          </button>
          <Button
            asChild
            variant="primary"
            size="sm"
            className="rounded-full shadow-xl min-w-[100px]"
            data-cta="floating_request_mobile"
          >
            <Link href="#contact">資料請求</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
