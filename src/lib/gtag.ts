/* eslint-disable @typescript-eslint/ban-ts-comment */
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

type TEvent = {
  action: string
  category: string
  label: string
  value: string
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function pageview (url: string): void {
  // @ts-ignore
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function event ({ action, category, label, value }: TEvent): void {
  // @ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}
