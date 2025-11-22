export function trackEvent(event, data = {}) {
  // For demo: log to console. In production, send to analytics service.
  console.log("Analytics event:", event, data);
}
