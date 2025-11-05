import Link from 'next/link'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0B0D0F] text-[#EDEFF1] py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">
              LIFE X <span className="text-[#D9B66A]">フランチャイズ</span>
            </h3>
            <p className="text-sm text-[#EDEFF1]/80">
              少人数×短期立上げで始める高性能規格住宅
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm">クイックリンク</h4>
            <nav className="flex flex-col gap-2">
              <Link href="#concept" className="text-sm text-[#EDEFF1]/80 hover:text-[#D9B66A] transition-colors">
                特徴
              </Link>
              <Link href="#value" className="text-sm text-[#EDEFF1]/80 hover:text-[#D9B66A] transition-colors">
                収益モデル
              </Link>
              <Link href="#performance" className="text-sm text-[#EDEFF1]/80 hover:text-[#D9B66A] transition-colors">
                性能
              </Link>
              <Link href="#process" className="text-sm text-[#EDEFF1]/80 hover:text-[#D9B66A] transition-colors">
                導入フロー
              </Link>
              <Link href="#faq" className="text-sm text-[#EDEFF1]/80 hover:text-[#D9B66A] transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-sm">お問い合わせ</h4>
            <div className="flex flex-col gap-2 text-sm text-[#EDEFF1]/80">
              <a
                href="tel:06-1234-5678"
                className="hover:text-[#D9B66A] transition-colors"
                data-gtm="footer_phone_click"
              >
                TEL: 06-1234-5678
              </a>
              <a
                href="mailto:fc@g-house.osaka.jp"
                className="hover:text-[#D9B66A] transition-colors"
                data-gtm="footer_email_click"
              >
                fc@g-house.osaka.jp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#EDEFF1]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#EDEFF1]/60">
            © {currentYear} LIFE X Franchise. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-[#EDEFF1]/60 hover:text-[#D9B66A] transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/legal" className="text-xs text-[#EDEFF1]/60 hover:text-[#D9B66A] transition-colors">
              特定商取引法
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
