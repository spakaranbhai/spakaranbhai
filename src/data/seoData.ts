import { BUSINESS_CONFIG } from '../config/business';

export interface RouteSEOConfig {
  title: string;
  description: string;
  canonicalPath: string;
  robots?: string;
  keywords?: string;
  ogType?: 'website' | 'article' | 'place';
  ogImage?: string;
  h1: string;
}

/**
 * Verified absolute base URL for production
 */
export const getProductionBaseUrl = (): string => {
  if (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost') && !window.location.origin.includes('127.0.0.1')) {
    return window.location.origin.replace(/\/+$/, '');
  }
  return (BUSINESS_CONFIG.siteUrl || 'https://www.nandinispa.online').replace(/\/+$/, '');
};

/**
 * Route-by-route metadata registry
 */
export const ROUTE_SEO: Record<string, RouteSEOConfig> = {
  home: {
    title: 'Best Spa in Bhopal | Nandini Spa | Luxury Body Massage Sanctuary',
    description: 'Discover Nandini Spa, the best luxury spa in Bhopal at Board Office Chouraha, MP Nagar. Full body massage, couple spa & Ayurvedic rituals. Call +91 90604 33848!',
    canonicalPath: '/',
    robots: 'index, follow',
    keywords: 'Best Spa in Bhopal, Spa in Bhopal, Body Massage in Bhopal, Luxury Spa in Bhopal, Full Body Massage in Bhopal, Spa Near Me, Couple Spa in Bhopal, Bhopal Spa, Spa in MP Nagar Bhopal, Spa in Maharana Pratap Nagar Bhopal',
    ogType: 'website',
    ogImage: '/nandini-spa-location-updated.png',
    h1: 'Best Spa in Bhopal — Luxury Body Massage & Wellness Sanctuary',
  },
  about: {
    title: 'About Nandini Spa | Master Therapists & Restorative Ethos in Bhopal',
    description: 'Learn about Nandini Spa Bhopal. Discover our holistic philosophy, certified master kinesiologists, pristine suite privacy standards, and pure wildcrafted botanical oils.',
    canonicalPath: '/about',
    robots: 'index, follow',
    keywords: 'About Nandini Spa Bhopal, Best Spa in Bhopal, Certified Massage Therapists Bhopal, Ayurvedic Spa Bhopal, MP Nagar Wellness Clinic',
    ogType: 'website',
    ogImage: '/nandini-logo-horizontal.png',
    h1: 'About Nandini Spa Sanctuary in Bhopal',
  },
  services: {
    title: 'Spa Services & Pricing in Bhopal | Nandini Spa Treatment Menu',
    description: 'Explore our complete spa treatment menu & transparent INR tariffs in Bhopal. Deep tissue therapy, warm volcanic basalt stones, Vedic Shirodhara, herbal potli & couples packages.',
    canonicalPath: '/services',
    robots: 'index, follow',
    keywords: 'Spa Services in Bhopal, Massage Menu Bhopal, Spa Prices Bhopal, Deep Tissue Massage Price, Shirodhara Bhopal, Hot Stone Massage Bhopal, Thai Massage Bhopal',
    ogType: 'website',
    ogImage: '/nandini-logo-horizontal.png',
    h1: 'Restorative Spa Therapies & Treatment Tariffs in Bhopal',
  },
  fullBodyMassage: {
    title: 'Full Body Massage in Bhopal | Best Body Massage Spa in MP Nagar',
    description: 'Looking for the best full body massage in Bhopal? Nandini Spa in MP Nagar provides expert deep tissue, Swedish stress recovery & Balinese massage from ₹2,499. Call now!',
    canonicalPath: '/full-body-massage',
    robots: 'index, follow',
    keywords: 'Full Body Massage in Bhopal, Body Massage in Bhopal, Full Body Massage Bhopal, Deep Tissue Massage Bhopal, Swedish Massage Bhopal, Relaxation Massage Bhopal, MP Nagar Body Massage, Full Body Massage MP Nagar',
    ogType: 'website',
    ogImage: '/nandini-spa-location-updated.png',
    h1: 'Therapeutic Full Body Massage in Bhopal — Deep Tissue & Swedish Bodywork',
  },
  coupleSpa: {
    title: 'Couple Spa in Bhopal | Private VIP Suite Massage in MP Nagar',
    description: 'Book a luxury couple spa in Bhopal at Nandini Spa. Private VIP suite, side-by-side synchronized massages, floral foot soaks & herbal tisanes in MP Nagar. Reserve online!',
    canonicalPath: '/couple-spa',
    robots: 'index, follow',
    keywords: 'Couple Spa in Bhopal, Couple Spa Bhopal, Couple Massage Bhopal, Couples Spa Package Bhopal, Romantic Spa Bhopal, Anniversary Spa Gift Bhopal, VIP Couple Suite MP Nagar, Couple Spa MP Nagar',
    ogType: 'website',
    ogImage: '/nandini-spa-location-updated.png',
    h1: 'Luxury Couple Spa in Bhopal — Private VIP Suite & Synchronized Massages',
  },
  luxurySpa: {
    title: 'Luxury Spa in Bhopal | 5-Star Wellness Sanctuary in MP Nagar',
    description: 'Experience Bhopal’s most refined luxury spa at Nandini Spa in MP Nagar. Private ensuite rainfall showers, sound-damped therapy suites & bespoke Ayurvedic bodywork. Call now!',
    canonicalPath: '/luxury-spa',
    robots: 'index, follow',
    keywords: 'Luxury Spa in Bhopal, Luxury Spa Bhopal, Premium Spa in Bhopal, 5 Star Spa Experience Bhopal, VIP Spa Sanctuary MP Nagar, Luxury Spa MP Nagar, Executive Wellness Bhopal',
    ogType: 'website',
    ogImage: '/nandini-spa-location-updated.png',
    h1: '5-Star Luxury Spa in Bhopal — Executive Wellness & Private Suites',
  },
  thaiMassage: {
    title: 'Thai Massage in Bhopal | Traditional Yoga Stretch & Mobility Spa',
    description: 'Restore joint mobility with authentic Thai massage in Bhopal at Nandini Spa, MP Nagar. Traditional passive stretching, Sen line acupressure & relief from ₹2,899. Call now!',
    canonicalPath: '/thai-massage',
    robots: 'index, follow',
    keywords: 'Thai Massage in Bhopal, Thai Massage Bhopal, Traditional Thai Massage Bhopal, Thai Bodywork MP Nagar Bhopal, Assisted Yoga Stretch Bhopal, Deep Stretch Massage Bhopal',
    ogType: 'website',
    ogImage: '/nandini-spa-location-updated.png',
    h1: 'Traditional Thai Massage in Bhopal — Assisted Yoga Stretch & Mobility',
  },
  contact: {
    title: 'Contact Nandini Spa Bhopal | Spa in MP Nagar, Maharana Pratap Nagar',
    description: 'Contact Nandini Spa at Board Office Chouraha, Zone-II, MP Nagar, Bhopal. Open 24 hours daily. Call +91 90604 33848 or chat on WhatsApp for instant appointments & directions!',
    canonicalPath: '/contact',
    robots: 'index, follow',
    keywords: 'Spa in Maharana Pratap Nagar Bhopal, Spa in MP Nagar Bhopal, Nandini Spa Bhopal Contact, Board Office Chouraha Spa, Spa Directions Bhopal, Spa Near Me Bhopal, Massage Services in Bhopal',
    ogType: 'place',
    ogImage: '/nandini-spa-location-updated.png',
    h1: 'Contact Nandini Spa — Spa in Maharana Pratap Nagar, Bhopal',
  },
  booking: {
    title: 'Book Spa Appointment in Bhopal | Nandini Spa Online Reservation',
    description: 'Reserve your spa and massage appointment online at Nandini Spa Bhopal. Choose your preferred therapy, date, and time slot. Fast concierge confirmation via call or WhatsApp.',
    canonicalPath: '/booking',
    robots: 'index, follow',
    keywords: 'Massage service booking in Bhopal, Book Spa Appointment Bhopal, Nandini Spa Reservation, Online Spa Booking MP Nagar',
    ogType: 'website',
    ogImage: '/nandini-logo-horizontal.png',
    h1: 'Reserve Your Spa Sanctuary Appointment in Bhopal',
  },
  gallery: {
    title: 'Sanctuary Ambiance Gallery | Nandini Spa Bhopal Treatment Suites',
    description: 'Tour Nandini Spa Bhopal through our visual gallery. Explore serene therapy suites, heated basalt stone rituals, authentic Shirodhara setups, and botanical ingredients.',
    canonicalPath: '/gallery',
    robots: 'index, follow',
    keywords: 'Spa Photos Bhopal, Nandini Spa Ambiance Bhopal, Massage Therapy Rooms Bhopal, Spa Suite Images MP Nagar',
    ogType: 'website',
    ogImage: '/nandini-spa-location-updated.png',
    h1: 'Visual Tour of Nandini Spa Sanctuary in Bhopal',
  },
  privacyPolicy: {
    title: 'Privacy Policy | Nandini Spa Bhopal',
    description: 'Read the privacy policy for Nandini Spa Bhopal. Learn how we handle guest inquiries, appointment details, website cookies, and personal data securely.',
    canonicalPath: '/privacy-policy',
    robots: 'index, follow',
    keywords: 'Nandini Spa Privacy Policy, Spa Data Protection Bhopal',
    ogType: 'website',
    ogImage: '/nandini-logo-horizontal.png',
    h1: 'Privacy Policy & Guest Data Protection',
  },
  terms: {
    title: 'Terms & Sanctuary Etiquette | Nandini Spa Bhopal',
    description: 'Review the terms of service, appointment cancellation policies, health contraindications, and sanctuary etiquette for Nandini Spa in Bhopal.',
    canonicalPath: '/terms',
    robots: 'index, follow',
    keywords: 'Nandini Spa Terms of Service, Spa Cancellation Policy Bhopal, Sanctuary Etiquette Guidelines',
    ogType: 'website',
    ogImage: '/nandini-logo-horizontal.png',
    h1: 'Terms of Service & Sanctuary Guidelines',
  },
  notFound: {
    title: 'Page Not Found (404) | Nandini Spa Bhopal',
    description: 'The page you requested could not be found. Explore our therapeutic spa treatments, full body massage options, or contact our concierge in Bhopal.',
    canonicalPath: '/404',
    robots: 'noindex, follow',
    keywords: 'Page Not Found, Nandini Spa Bhopal 404',
    ogType: 'website',
    ogImage: '/nandini-logo-horizontal.png',
    h1: '404 — Sanctuary Pathway Not Found',
  },
};

/**
 * Generate LocalBusiness / DaySpa Schema.org JSON-LD
 */
export const generateLocalBusinessSchema = (baseUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': ['DaySpa', 'HealthAndBeautyBusiness'],
    '@id': `${baseUrl}/#spa`,
    name: BUSINESS_CONFIG.brandName,
    alternateName: `${BUSINESS_CONFIG.brandName} & Wellness Sanctuary Bhopal`,
    description: BUSINESS_CONFIG.shortDescription,
    url: baseUrl,
    telephone: BUSINESS_CONFIG.phone ? BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '') : '+919060433848',
    email: BUSINESS_CONFIG.email,
    logo: `${baseUrl}/nandini-logo-horizontal.png`,
    image: [
      `${baseUrl}/nandini-spa-location-updated.png`,
      `${baseUrl}/nandini-logo-horizontal.png`,
      `${baseUrl}/nandini-emblem.png`,
    ],
    priceRange: '₹₹ (₹1,799 – ₹5,899)',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Net Banking',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_CONFIG.streetAddressPlaceholder,
      addressLocality: BUSINESS_CONFIG.city,
      addressRegion: BUSINESS_CONFIG.state,
      postalCode: BUSINESS_CONFIG.zipCode || '462011',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_CONFIG.maps.latitude,
      longitude: BUSINESS_CONFIG.maps.longitude,
    },
    hasMap: BUSINESS_CONFIG.maps.embedUrl,
    sameAs: [
      BUSINESS_CONFIG.maps.placeUrl,
      BUSINESS_CONFIG.socials?.instagram,
      BUSINESS_CONFIG.socials?.facebook,
      BUSINESS_CONFIG.socials?.tripadvisor,
    ].filter(Boolean),
    openingHours: 'Mo-Su 00:00-24:00',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Bhopal',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Maharana Pratap Nagar',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Arera Colony',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Shivaji Nagar',
      },
    ],
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Private Climate-Controlled En-Suite Showers',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Autoclaved Fresh Linens for Every Guest',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Organic Wildcrafted Carrier & Essential Oils',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Certified Kinesiologists & Ayurvedic Practitioners',
        value: true,
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Nandini Spa Restorative Treatments Catalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Nandini Kinetic Muscle Reset & Deep Tissue',
            description: 'Precision targeted trigger point therapy addressing dense sub-layer tightness, postural compression, and physical fatigue.',
          },
          price: '2699',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Warm Basalt Stone & Geothermal Therapy',
            description: 'Mineral-rich volcanic basalt stones smoothed by ocean waves, heated to therapeutic perfection to melt stress away.',
          },
          price: '3199',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Authentic Shirodhara & Golden Abhyanga',
            description: 'A rhythmic flow of warm medicated herbal oils poured over the brow accompanied by synchronized dosha bodywork.',
          },
          price: '3499',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Nandini Sanctuary Couples Haven',
            description: 'Synchronized dual massage in our premier VIP suite featuring private hydro-tub, floral foot bath, and artisan refreshments.',
          },
          price: '5899',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Traditional Thai Assisted Stretch & Mobility',
            description: 'Dynamic mat bodywork combining acupressure along Sen energy lines with assisted yoga-based passive stretches in MP Nagar.',
          },
          price: '2899',
          priceCurrency: 'INR',
        },
      ],
    },
  };
};

/**
 * Generate WebSite Schema.org JSON-LD
 */
export const generateWebSiteSchema = (baseUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: BUSINESS_CONFIG.brandName,
    alternateName: `${BUSINESS_CONFIG.brandName} Bhopal`,
    url: baseUrl,
    description: BUSINESS_CONFIG.shortDescription,
    inLanguage: 'en-IN',
    publisher: {
      '@id': `${baseUrl}/#spa`,
    },
  };
};

/**
 * Generate BreadcrumbList Schema.org JSON-LD
 */
export const generateBreadcrumbsSchema = (
  baseUrl: string,
  crumbs: Array<{ name: string; path: string }>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  };
};

/**
 * Generate FAQPage Schema.org JSON-LD
 */
export const generateFAQSchema = (faqs: Array<{ q: string; a: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
};

/**
 * Generate Service Schema.org JSON-LD
 */
export const generateServiceSchema = (
  baseUrl: string,
  serviceName: string,
  description: string,
  serviceUrl: string,
  price?: string,
  providerName = BUSINESS_CONFIG.brandName
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    url: `${baseUrl}${serviceUrl}`,
    provider: {
      '@type': 'DaySpa',
      name: providerName,
      url: baseUrl,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Bhopal',
    },
    ...(price
      ? {
          offers: {
            '@type': 'Offer',
            price: price,
            priceCurrency: 'INR',
          },
        }
      : {}),
  };
};
