import { useEffect } from "react";

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

/**
 * Reusable Pixel & GA4 Injector Component
 * Usage:
 * <PixelAnalytics
 *   facebookPixelId="1234567890"
 *   googleAnalyticsId="G-XXXXXXXXXX"
 * />
 */
export default function PixelAnalytics({ facebookPixelId, googleAnalyticsId }) {
  useEffect(() => {
    // 1. Initialize Facebook Pixel
    if (facebookPixelId && typeof window !== "undefined" && !window.fbq) {
      /* eslint-disable */
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      /* eslint-enable */

      window.fbq("init", facebookPixelId);
      window.fbq("track", "PageView");
    }

    // 2. Initialize Google Analytics 4 (GA4)
    if (googleAnalyticsId && typeof window !== "undefined" && !window.gtag) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", googleAnalyticsId);
    }
  }, [facebookPixelId, googleAnalyticsId]);

  return null;
}
