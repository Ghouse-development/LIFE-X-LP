/**
 * Analytics Events Tracking
 *
 * GA4 and Meta Pixel events
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type EventName =
  | 'cta_click'
  | 'lead_submit'
  | 'webinar_view'
  | 'webinar_submit'
  | 'section_view'
  | 'phone_click'
  | 'email_click';

interface EventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

/**
 * Track event to GA4
 */
export function trackEvent(eventName: EventName, params: EventParams = {}) {
  if (typeof window === 'undefined') return;

  // GA4
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Meta Pixel
  if (window.fbq) {
    const metaEventMap: Record<EventName, string> = {
      cta_click: 'Lead',
      lead_submit: 'Contact',
      webinar_view: 'ViewContent',
      webinar_submit: 'CompleteRegistration',
      section_view: 'PageView',
      phone_click: 'Contact',
      email_click: 'Contact',
    };

    const metaEvent = metaEventMap[eventName];
    if (metaEvent) {
      window.fbq('track', metaEvent, params);
    }
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Event]', eventName, params);
  }
}

/**
 * Track CTA click
 */
export function trackCTAClick(label: string, href?: string) {
  trackEvent('cta_click', {
    category: 'engagement',
    label,
    href,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmit(formType: 'lead' | 'webinar', data?: Record<string, unknown>) {
  const eventName = formType === 'lead' ? 'lead_submit' : 'webinar_submit';
  trackEvent(eventName, {
    category: 'conversion',
    label: formType,
    ...data,
  });
}

/**
 * Track section view (Intersection Observer)
 */
export function trackSectionView(sectionName: string) {
  trackEvent('section_view', {
    category: 'engagement',
    label: sectionName,
  });
}

/**
 * Track phone/email click
 */
export function trackContactClick(type: 'phone' | 'email', contactValue: string) {
  trackEvent(type === 'phone' ? 'phone_click' : 'email_click', {
    category: 'engagement',
    label: type,
    contact: contactValue,
  });
}

/**
 * Get UTM parameters from URL
 */
export function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};

  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  return utmParams;
}
