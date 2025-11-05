'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FileText, MessageCircle, Video, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero
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
      {/* Mobile: Expandable single button */}
      <div className="md:hidden">
        <div className={cn(
          'rounded-2xl bg-white/95 backdrop-blur shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-black/5 p-2 flex flex-col gap-2 transition-all duration-300',
          isExpanded ? 'mb-2' : ''
        )}>
          {isExpanded && (
            <>
              <Button
                asChild
                size="sm"
                className="bg-[#D9B66A] hover:bg-[#E5C889] text-[#0E1113] text-xs"
                data-gtm="floating_cta_request"
              >
                <Link href="#contact">資料請求</Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="text-xs"
                data-gtm="floating_cta_consult"
              >
                <Link href="#contact">個別相談</Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="text-xs"
                data-gtm="floating_cta_webinar"
              >
                <Link href="#webinar">ウェビナー</Link>
              </Button>
            </>
          )}
          <Button
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-[#D9B66A] hover:bg-[#E5C889] text-[#0E1113]"
          >
            <ChevronUp className={cn('transition-transform', isExpanded && 'rotate-180')} size={16} />
          </Button>
        </div>
      </div>

      {/* Desktop: Horizontal box with 3 buttons */}
      <div className="hidden md:block">
        <div className="rounded-2xl bg-white/95 backdrop-blur shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-black/5 p-2 flex gap-2">
          <Button
            asChild
            size="sm"
            className="bg-[#D9B66A] hover:bg-[#E5C889] text-[#0E1113] text-sm px-4"
            data-gtm="floating_cta_request"
          >
            <Link href="#contact" className="flex items-center gap-2">
              <FileText size={16} />
              資料請求
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="text-sm px-4"
            data-gtm="floating_cta_consult"
          >
            <Link href="#contact" className="flex items-center gap-2">
              <MessageCircle size={16} />
              個別相談
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="text-sm px-4"
            data-gtm="floating_cta_webinar"
          >
            <Link href="#webinar" className="flex items-center gap-2">
              <Video size={16} />
              ウェビナー
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
