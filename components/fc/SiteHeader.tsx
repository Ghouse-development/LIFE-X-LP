'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: '特徴', href: '#concept' },
    { label: '収益モデル', href: '#value' },
    { label: '性能', href: '#performance' },
    { label: '導入フロー', href: '#process' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="#hero"
            className="font-serif text-xl md:text-2xl font-bold text-[#0E1113]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            LIFE X <span className="text-[#D9B66A]">FC</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#0E1113] hover:text-[#D9B66A] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-[#D9B66A] hover:bg-[#E5C889] text-[#0E1113]"
              data-gtm="nav_cta_request"
            >
              <Link href="#contact">資料請求</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニューを開く"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-sm text-[#0E1113] hover:text-[#D9B66A]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              className="w-full mt-4 bg-[#D9B66A] hover:bg-[#E5C889] text-[#0E1113]"
              data-gtm="mobile_nav_cta_request"
            >
              <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                資料請求
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
