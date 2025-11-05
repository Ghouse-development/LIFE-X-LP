'use client'

export function Subnav() {
  const items = [
    ['#value', '特徴'],
    ['#performance', '性能'],
    ['#process', '導入フロー'],
    ['#faq', 'FAQ'],
  ]

  return (
    <div className="sticky top-0 z-40 bg-[var(--surface)]/90 backdrop-blur supports-[backdrop-filter]:bg-[var(--surface)]/80 border-b border-black/10">
      <nav className="mx-auto max-w-6xl px-6 py-3">
        <ul className="flex flex-wrap gap-2">
          {items.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="h-10 px-4 inline-flex items-center rounded-full border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
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
