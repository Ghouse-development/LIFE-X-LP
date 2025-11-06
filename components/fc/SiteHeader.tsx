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
    { label: '受け取れるもの', href: '#package' },
    { label: '導入', href: '#roadmap' },
    { label: '事例', href: '#samples' },
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
            className="font-serif text-xl md:text-2xl font-bold text-[var(--ink-strong)]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            LIFE X
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="メインナビゲーション">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[var(--ink-strong)] hover:text-[var(--primary)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="btn-primary"
              data-gtm="nav_cta_request"
            >
              サンプル一式を請求
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden py-4 border-t border-gray-200"
            aria-label="モバイルナビゲーション"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-sm font-medium text-[var(--ink-strong)] hover:text-[var(--primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="btn-primary w-full mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
              data-gtm="mobile_nav_cta_request"
            >
              サンプル一式を請求
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
