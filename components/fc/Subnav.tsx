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
    <div className="sticky top-0 z-40 bg-[var(--surface)]/92 backdrop-blur border-b border-black/10">
      <nav className="mx-auto max-w-6xl px-6 py-3">
        <ul className="flex flex-wrap gap-2">
          {items.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="h-10 px-4 inline-flex items-center rounded-full border border-[var(--ink-strong)] text-[var(--ink-strong)] text-[15px] font-medium hover:bg-[var(--ink-strong)] hover:text-white transition-colors"
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
