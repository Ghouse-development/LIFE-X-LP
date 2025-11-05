'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Phone, Mail, Video } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // ヒーローセクションを過ぎたら表示
      setIsVisible(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-40 flex flex-col gap-3 transition-all duration-300',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      )}
    >
      {/* 資料請求 */}
      <Button
        asChild
        size="lg"
        className="bg-[#D9B66A] hover:bg-[#E5C889] text-[#0E1113] shadow-lg rounded-full w-14 h-14 p-0 md:w-auto md:h-auto md:px-6 md:py-3"
        data-gtm="floating_cta_request"
      >
        <Link href="#contact" className="flex items-center justify-center gap-2">
          <Mail size={20} />
          <span className="hidden md:inline">資料請求</span>
        </Link>
      </Button>

      {/* 個別相談 */}
      <Button
        asChild
        size="lg"
        variant="outline"
        className="bg-white hover:bg-gray-50 text-[#0E1113] shadow-lg border-2 border-[#D9B66A] rounded-full w-14 h-14 p-0 md:w-auto md:h-auto md:px-6 md:py-3"
        data-gtm="floating_cta_consult"
      >
        <a href="tel:06-1234-5678" className="flex items-center justify-center gap-2">
          <Phone size={20} />
          <span className="hidden md:inline">個別相談</span>
        </a>
      </Button>

      {/* ウェビナー */}
      <Button
        asChild
        size="lg"
        variant="outline"
        className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg border-0 rounded-full w-14 h-14 p-0 md:w-auto md:h-auto md:px-6 md:py-3"
        data-gtm="floating_cta_tertiary_webinar"
      >
        <Link href="#webinar" className="flex items-center justify-center gap-2">
          <Video size={20} />
          <span className="hidden md:inline">ウェビナー</span>
        </Link>
      </Button>
    </div>
  )
}
