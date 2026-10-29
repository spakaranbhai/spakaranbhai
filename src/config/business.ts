/**
 * Nandini Spa — Centralized Business Configuration
 * =====================================================
 * 
 * Update this file to modify office location, Google Maps integration,
 * contact email, phone status, or sanctuary operating hours.
 * 
 * All site components read directly from this configuration.
 */

export interface BusinessConfig {
  brandName: string;
  brandShort: string;
  tagline: string;
  shortDescription: string;
  siteUrl: string;
  city: string;
  state: string;
  country: string;
  locality?: string;
  zipCode?: string;
  zipFileName: string;
  
  /**
   * Official Brand Logo & Emblem configuration
   */
  logo: {
    horizontalUrl?: string;
    fullUrl: string;
    emblemUrl: string;
    originalUrl: string;
    useFullBadgeInHeader: boolean;
  };

  /**
   * Street address or office suite placeholder.
   */
  streetAddressPlaceholder: string;
  isExactStreetAddressConfigured: boolean;

  /**
   * Official contact email
   */
  email: string;

  /**
   * Business mobile number.
   * NOTE: Keep configurable as the actual phone number is pending client provision.
   */
  phone: string | null;
  phoneDisplayPlaceholder: string;
  isPhoneConfigured: boolean;

  /**
   * WhatsApp integration:
   * Enabled strictly after valid phone number is provided.
   */
  whatsappNumber: string | null;
  isWhatsappConfigured: boolean;


  /**
   * Google Maps Embed & Location Settings
   */
  maps: {
    latitude: number;
    longitude: number;
    zoomLevel: number;
    embedUrl: string;
    placeUrl?: string;
    directionsUrl: string;
    apiKey?: string;
  };

  /**
   * Operating and Appointment Hours
   */
  hours: {
    weekday: string;
    weekend: string;
    notes: string;
  };

  socials: {
    instagram?: string;
    facebook?: string;
    tripadvisor?: string;
  };
}

export const BUSINESS_CONFIG: BusinessConfig = {
  brandName: "Nandini Spa",
  brandShort: "Nandini Spa",
  tagline: "Sanctuary of Restorative Spa & Holistic Bodywork",
  shortDescription: "An exquisite restorative wellness and spa sanctuary in Bhopal, Madhya Pradesh. Uniting therapeutic deep-tissue bodywork, warm basalt stone care, authentic Ayurvedic rituals, and calming botanical aromatherapy in quiet, climate-controlled suites.",
  siteUrl: typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL ? import.meta.env.VITE_SITE_URL : "https://spakaranbhai.github.io",
  zipFileName: "nandini-spa-project.zip",
  
  // Official Brand Logo (From user horizontal lockup: media_1793003978134)
  logo: {
    horizontalUrl: "/nandini-logo-horizontal.png",
    fullUrl: "/nandini-logo-horizontal.png",
    emblemUrl: "/nandini-emblem.png",
    originalUrl: "/nandini-logo-horizontal-original.png",
    useFullBadgeInHeader: true,
  },

  // Official Location
  city: "Bhopal",
  state: "Madhya Pradesh",
  country: "India",
  locality: "Zone-II, Maharana Pratap Nagar",
  zipCode: "462011",
  streetAddressPlaceholder: "Board Office Chouraha, Zone-II, Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011",
  isExactStreetAddressConfigured: true,

  // Contact Information
  email: "Karanbhai25807@gmail.com",
  
  // Mobile / Phone configuration
  phone: "+91 90604 33848",
  phoneDisplayPlaceholder: "+91 90604 33848",
  isPhoneConfigured: true,

  // WhatsApp configuration
  whatsappNumber: "+91 90604 33848",
  isWhatsappConfigured: true,


  // Google Maps Integration — Official verified listing for Nandini Spa, Bhopal
  maps: {
    latitude: 23.2312286,
    longitude: 77.4331738,
    zoomLevel: 16,
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.325797556229!2d77.43317379999999!3d23.231228599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4306c83a65db%3A0x7d84842de233e7df!2sNandini%20Spa!5e0!3m2!1sen!2sin!4v1793265164425!5m2!1sen!2sin",
    placeUrl: "https://maps.google.com/?cid=9044390635205519327",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Nandini+Spa&destination_place_id=0x397c4306c83a65db:0x7d84842de233e7df",
    apiKey: typeof import.meta !== "undefined" ? import.meta.env?.VITE_GOOGLE_MAPS_API_KEY : undefined,
  },

  // Operating Hours — 24 Hours / 7 Days a week service
  hours: {
    weekday: "Open 24 Hours (Monday – Sunday)",
    weekend: "24/7 Round-the-Clock Service",
    notes: "Available 24 hours daily. Private suites prepared freshly for every guest. Walk-ins and reservations welcome.",
  },

  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tripadvisor: "https://tripadvisor.com",
  },
};

/**
 * Helper utility to build dynamic map embed URL with marker pin from any address query
 */
export function getGoogleMapsEmbedUrl(query?: string, zoom = 16): string {
  // If no custom query is provided or query matches Nandini Spa, return the verified exact embed URL
  if (!query || query.includes("Nandini") || query.includes("Board Office")) {
    return BUSINESS_CONFIG.maps.embedUrl;
  }

  const apiKey = typeof import.meta !== "undefined" ? import.meta.env?.VITE_GOOGLE_MAPS_API_KEY : undefined;
  const encoded = encodeURIComponent(query);
  
  // If an official Google Maps Platform API key is available, use Maps Embed API Place mode with tracking
  if (apiKey && apiKey.trim()) {
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey.trim()}&q=${encoded}&center=${BUSINESS_CONFIG.maps.latitude},${BUSINESS_CONFIG.maps.longitude}&zoom=${zoom}&solution_id=gmp_git_agentskills_v1`;
  }
  
  // Standard zero-config embed with exact location pin marker
  return `https://maps.google.com/maps?q=${encoded}&t=&z=${zoom}&ie=UTF8&iwloc=B&output=embed`;
}

/**
 * Helper utility to build navigation directions URL pointing to destination
 */
export function getGoogleMapsDirectionsUrl(destinationQuery: string): string {
  const encoded = encodeURIComponent(destinationQuery);
  return `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
}
