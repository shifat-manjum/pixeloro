/**
 * Track Meta / Facebook Pixel event
 */
export const trackPixel = (eventName, data = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, data);
  }
};

/**
 * Track Google Analytics 4 event
 */
export const trackGA = (eventName, data = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, data);
  }
};

/**
 * Unified event tracker (fires both Pixel and GA4)
 */
export const trackAnalyticsEvent = (eventName, data = {}) => {
  trackPixel(eventName, data);
  trackGA(eventName, data);
};
