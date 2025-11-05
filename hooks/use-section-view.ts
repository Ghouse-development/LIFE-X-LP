import { useEffect, useRef } from 'react'

// GTM dataLayer type
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

/**
 * Section view tracking hook
 * Fires GTM event when section becomes visible
 */
export function useSectionView(sectionId: string | undefined) {
  const hasTracked = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionId || hasTracked.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            // Fire GTM event
            if (typeof window !== 'undefined' && window.dataLayer) {
              window.dataLayer.push({
                event: 'section_view',
                section_id: sectionId,
              })
            }
            hasTracked.current = true
          }
        })
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '0px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [sectionId])

  return sectionRef
}
