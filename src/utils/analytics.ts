/**
 * Google Analytics 4 (GA4) Utility
 * 
 * Safe, privacy-conscious event tracking for conversion goals:
 * - Phone call clicks
 * - WhatsApp inquiries
 * - Appointment booking attempts & completions
 * - Contact inquiries
 * - Directions / Map clicks
 */

// Global window gtag declaration
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const getMeasurementId = (): string | undefined => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GA_MEASUREMENT_ID) {
    const id = import.meta.env.VITE_GA_MEASUREMENT_ID.trim();
    if (/^G-[A-Z0-9]+$/i.test(id)) {
      return id;
    }
  }
  return undefined;
};

let isInitialized = false;

/**
 * Initialize GA4 script dynamically if a valid Measurement ID is configured
 */
export const initGA = (): void => {
  if (typeof window === 'undefined' || isInitialized) return;

  const measurementId = getMeasurementId();
  if (!measurementId) {
    // GA4 is unconfigured; tracking remains gracefully dormant
    return;
  }

  isInitialized = true;

  // Append gtag script asynchronously
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false, // Page views managed via React Router
    anonymize_ip: true,
  });
};

/**
 * Track route changes
 */
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window === 'undefined' || !window.gtag) return;
  const measurementId = getMeasurementId();
  if (!measurementId) return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
};

/**
 * General purpose event tracker
 */
export const trackEvent = (
  eventName: string,
  eventParams: Record<string, string | number | boolean> = {}
): void => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, eventParams);
};

/**
 * Conversion Event: Phone Call Click
 */
export const trackPhoneClick = (source: string, phoneNumber: string): void => {
  trackEvent('phone_call_click', {
    event_category: 'engagement',
    event_label: source,
    contact_target: phoneNumber,
  });
};

/**
 * Conversion Event: WhatsApp Click
 */
export const trackWhatsAppClick = (source: string): void => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: source,
  });
};

/**
 * Conversion Event: Book Appointment Trigger
 */
export const trackBookingTrigger = (serviceId?: string, source = 'cta_button'): void => {
  trackEvent('booking_intent', {
    event_category: 'conversion',
    event_label: source,
    service_id: serviceId || 'general',
  });
};

/**
 * Conversion Event: Appointment Submission Completed
 */
export const trackBookingCompleted = (referenceId: string, serviceTitle: string): void => {
  trackEvent('booking_completed', {
    event_category: 'conversion',
    transaction_id: referenceId,
    service_name: serviceTitle,
  });
};

/**
 * Conversion Event: Contact Form Submission
 */
export const trackContactFormSubmitted = (subject: string): void => {
  trackEvent('contact_form_submission', {
    event_category: 'lead',
    inquiry_subject: subject,
  });
};

/**
 * Conversion Event: Directions / Map Click
 */
export const trackDirectionsClick = (source: string): void => {
  trackEvent('get_directions_click', {
    event_category: 'local_action',
    event_label: source,
  });
};
