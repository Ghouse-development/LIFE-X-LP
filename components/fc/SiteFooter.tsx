import Link from 'next/link'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0B0D0F] text-[#EDEFF1] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Left: Logo & Description */}
          <div className="flex-1 max-w-md">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              LIFE X
            </h3>
            <p className="text-sm text-[#EDEFF1]/70 leading-relaxed mb-6">
              規格住宅の美しさと再現性を、あなたの商圏の武器に。
            </p>
            <nav className="flex flex-wrap gap-4" aria-label="フッターナビゲーション">
              <Link href="#concept" className="text-xs text-[#EDEFF1]/60 hover:text-[var(--brand)] transition-colors">
                特徴
              </Link>
              <Link href="#value" className="text-xs text-[#EDEFF1]/60 hover:text-[var(--brand)] transition-colors">
                収益モデル
              </Link>
              <Link href="#performance" className="text-xs text-[#EDEFF1]/60 hover:text-[var(--brand)] transition-colors">
                性能
              </Link>
              <Link href="#process" className="text-xs text-[#EDEFF1]/60 hover:text-[var(--brand)] transition-colors">
                導入フロー
              </Link>
              <Link href="#faq" className="text-xs text-[#EDEFF1]/60 hover:text-[var(--brand)] transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Right: Contact Info (small, subdued) */}
          <div className="text-right">
            <p className="text-xs text-[#EDEFF1]/40 mb-2">お問い合わせ</p>
            <div className="flex flex-col gap-1 text-xs text-[#EDEFF1]/50">
              <a
                href="tel:06-1234-5678"
                className="hover:text-[var(--brand)] transition-colors"
                data-gtm="footer_phone_click"
              >
                TEL: 06-1234-5678
              </a>
              <p className="text-[10px]">受付：平日 9:00–18:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#EDEFF1]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#EDEFF1]/40">
            © {currentYear} LIFE X Franchise. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-[#EDEFF1]/40 hover:text-[#D9B66A] transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/legal" className="text-xs text-[#EDEFF1]/40 hover:text-[#D9B66A] transition-colors">
              特定商取引法
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
