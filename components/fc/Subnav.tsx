'use client'

export function Subnav() {
  const items = [
    ['#concept', '特徴'],
    ['#value', '収益モデル'],
    ['#performance', '性能'],
    ['#process', '導入フロー'],
    ['#faq', 'FAQ'],
  ]

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-black/10 shadow-sm">
      <nav className="mx-auto max-w-6xl px-6 py-4">
        <ul className="flex flex-wrap gap-3">
          {items.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="h-11 px-5 inline-flex items-center rounded-full border-2 border-[var(--primary)] text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)] hover:text-white transition-all duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
