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


  // Google Maps Integration — Exact geocoordinates for Board Office Chouraha, Zone-II, Maharana Pratap Nagar, Bhopal
  maps: {
    latitude: 23.2332,
    longitude: 77.4344,
    zoomLevel: 16,
    embedUrl: "https://maps.google.com/maps?q=Board+Office+Chouraha,+Zone-II,+Maharana+Pratap+Nagar,+Bhopal,+Madhya+Pradesh+462011&t=&z=16&ie=UTF8&iwloc=B&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Board+Office+Chouraha,+Zone-II,+Maharana+Pratap+Nagar,+Bhopal,+Madhya+Pradesh+462011,+India",
    apiKey: typeof import.meta !== "undefined" ? import.meta.env?.VITE_GOOGLE_MAPS_API_KEY : undefined,
  },

  // Operating Hours
  hours: {
    weekday: "Monday – Saturday: 9:00 AM – 9:00 PM",
    weekend: "Sunday: 10:00 AM – 8:00 PM",
    notes: "Advance reservations recommended. Private suites prepared freshly for every guest.",
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
export function getGoogleMapsEmbedUrl(query: string, zoom = 16): string {
  const apiKey = typeof import.meta !== "undefined" ? import.meta.env?.VITE_GOOGLE_MAPS_API_KEY : undefined;
  const encoded = encodeURIComponent(query);
  
  // If an official Google Maps Platform API key is available, use Maps Embed API Place mode with tracking
  if (apiKey && apiKey.trim()) {
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey.trim()}&q=${encoded}&center=23.2242,77.4363&zoom=${zoom}&solution_id=gmp_git_agentskills_v1`;
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
