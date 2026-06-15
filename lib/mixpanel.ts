import mixpanel from 'mixpanel-browser'

let initialized = false

function init() {
  if (initialized || typeof window === 'undefined') return
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!, {
    track_pageview: false,
    persistence: 'localStorage',
  })
  initialized = true
}

export function trackPageView(path: string) {
  init()
  mixpanel.track('Page View', { path })
}

export function track(event: string, props?: Record<string, unknown>) {
  init()
  mixpanel.track(event, props)
}
