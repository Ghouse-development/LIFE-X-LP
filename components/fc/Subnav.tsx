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
    <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <nav className="mx-auto max-w-6xl px-6 py-3">
        <ul className="flex flex-wrap gap-2">
          {items.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="h-10 px-4 inline-flex items-center rounded-full text-slate-600 bg-white border border-slate-300 text-[15px] font-medium hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
