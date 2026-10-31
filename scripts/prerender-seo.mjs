import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html does not exist. Run "vite build" first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf8');

const BASE_URL = (process.env.VITE_SITE_URL || 'https://www.nandinispa.online').replace(/\/+$/, '');

const NAP_DETAILS = {
  name: 'Nandini Spa',
  streetAddress: 'Board Office Chouraha, Zone-II, Maharana Pratap Nagar',
  addressLocality: 'Bhopal',
  addressRegion: 'Madhya Pradesh',
  postalCode: '462011',
  country: 'IN',
  phone: '+91 90604 33848',
  phoneTel: '+919060433848',
  email: 'Karanbhai25807@gmail.com',
  hours: 'Open 24 Hours (Monday – Sunday) / 24/7 Round-the-Clock Service',
  latitude: 23.2312286,
  longitude: 77.4331738,
  mapsUrl: 'https://maps.google.com/?cid=9044390635205519327',
  embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.325797556229!2d77.43317379999999!3d23.231228599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4306c83a65db%3A0x7d84842de233e7df!2sNandini%20Spa!5e0!3m2!1sen!2sin!4v1793265164425!5m2!1sen!2sin',
};

const routes = [
  {
    path: '/',
    outputPath: path.join(distDir, 'index.html'),
    title: 'Nandini Spa | Luxury Spa in Bhopal & Restorative Bodywork Sanctuary',
    description: 'Experience Bhopal’s premier luxury spa at Board Office Chouraha, MP Nagar. Therapeutic deep tissue massage, warm basalt stones, authentic Ayurvedic rituals & private suites.',
    h1: 'Sanctuary of Restorative Spa & Holistic Bodywork in Bhopal',
    ogImage: '/nandini-spa-location-updated.png',
    robots: 'index, follow',
    summary: 'Therapeutic musculoskeletal bodywork, hydrothermal volcanic basalt stones, and authentic Ayurvedic rituals in private climate-controlled suites in MP Nagar, Bhopal.',
    faqs: [
      {
        q: 'Where is Nandini Spa located in Bhopal?',
        a: 'Nandini Spa is centrally located at Board Office Chouraha, Zone-II, Maharana Pratap Nagar (MP Nagar), Bhopal, Madhya Pradesh 462011, near DB City Mall and Habibganj.',
      },
      {
        q: 'What are the operating hours of Nandini Spa?',
        a: 'Nandini Spa is open 24 hours daily (24/7 round-the-clock service) Monday through Sunday to accommodate business travelers, hotel guests, and local residents.',
      },
      {
        q: 'How can I book an appointment at Nandini Spa Bhopal?',
        a: 'You can book online at https://www.nandinispa.online/booking, call our concierge at +91 90604 33848, or message us on WhatsApp for instant booking confirmations.',
      },
    ],
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        name: 'Nandini Spa',
        alternateName: 'Nandini Spa Bhopal',
        url: `${BASE_URL}/`,
        description: 'An exquisite restorative wellness and spa sanctuary in Bhopal, Madhya Pradesh.',
        inLanguage: 'en-IN',
        publisher: {
          '@id': `${BASE_URL}/#spa`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': ['DaySpa', 'HealthAndBeautyBusiness'],
        '@id': `${BASE_URL}/#spa`,
        name: 'Nandini Spa',
        alternateName: 'Nandini Spa & Wellness Sanctuary Bhopal',
        description: 'An exquisite restorative wellness and spa sanctuary in Bhopal, Madhya Pradesh. Uniting therapeutic deep-tissue bodywork, warm basalt stone care, authentic Ayurvedic rituals, and calming botanical aromatherapy in quiet, climate-controlled suites.',
        url: `${BASE_URL}/`,
        telephone: NAP_DETAILS.phoneTel,
        email: NAP_DETAILS.email,
        logo: `${BASE_URL}/nandini-logo-horizontal.png`,
        image: [
          `${BASE_URL}/nandini-spa-location-updated.png`,
          `${BASE_URL}/nandini-logo-horizontal.png`,
          `${BASE_URL}/nandini-emblem.png`,
        ],
        priceRange: '₹₹ (₹1,799 - ₹5,899)',
        currenciesAccepted: 'INR',
        paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Net Banking',
        address: {
          '@type': 'PostalAddress',
          streetAddress: NAP_DETAILS.streetAddress,
          addressLocality: NAP_DETAILS.addressLocality,
          addressRegion: NAP_DETAILS.addressRegion,
          postalCode: NAP_DETAILS.postalCode,
          addressCountry: NAP_DETAILS.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: NAP_DETAILS.latitude,
          longitude: NAP_DETAILS.longitude,
        },
        hasMap: NAP_DETAILS.embedUrl,
        sameAs: [
          NAP_DETAILS.mapsUrl,
        ],
        openingHours: 'Mo-Su 00:00-24:00',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
          },
        ],
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Bhopal' },
          { '@type': 'AdministrativeArea', name: 'Maharana Pratap Nagar' },
          { '@type': 'AdministrativeArea', name: 'Arera Colony' },
          { '@type': 'AdministrativeArea', name: 'Shivaji Nagar' },
        ],
      },
    ],
  },
  {
    path: '/about',
    outputPath: path.join(distDir, 'about', 'index.html'),
    title: 'About Nandini Spa | Master Therapists & Restorative Ethos in Bhopal',
    description: 'Learn about Nandini Spa Bhopal. Discover our holistic philosophy, certified master kinesiologists, pristine suite privacy standards, and pure wildcrafted botanical oils.',
    h1: 'About Nandini Spa Sanctuary in Bhopal',
    ogImage: '/nandini-logo-horizontal.png',
    robots: 'index, follow',
    summary: 'Founded on the conviction that authentic wellness requires thoughtful anatomical care, unadulterated botanicals, and total sensory calm in MP Nagar, Bhopal.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
    ],
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${BASE_URL}/about#webpage`,
        url: `${BASE_URL}/about`,
        name: 'About Nandini Spa Bhopal',
        description: 'Learn about Nandini Spa Bhopal, certified master kinesiologists, private suites, and organic botanical care in MP Nagar.',
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: `${BASE_URL}/about` },
        ],
      },
    ],
  },
  {
    path: '/services',
    outputPath: path.join(distDir, 'services', 'index.html'),
    title: 'Spa Services & Pricing in Bhopal | Nandini Spa Treatment Menu',
    description: 'Explore our complete spa treatment menu & transparent INR tariffs in Bhopal. Deep tissue therapy, warm volcanic basalt stones, Vedic Shirodhara, herbal potli & couples packages.',
    h1: 'Restorative Spa Therapies & Treatment Tariffs in Bhopal',
    ogImage: '/nandini-logo-horizontal.png',
    robots: 'index, follow',
    summary: 'Explore our curated menu of musculoskeletal bodywork, hydrothermal stone care, and organic cellular facials with transparent tariffs in INR (₹).',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services & Pricing', path: '/services' },
    ],
    faqs: [
      {
        q: 'What is provided for my appointment at Nandini Spa?',
        a: 'We provide single-use organic modesty undergarments, plush waffle robes, and sanitized slippers. During your session, you are fully draped with freshly warmed towels, uncovering only the specific muscle area being treated.',
      },
      {
        q: 'How early should I arrive in Bhopal?',
        a: 'Please arrive 15 minutes prior to your scheduled reservation to unwind in our hydro-reflection lounge with a welcoming tisane and complete your wellness diagnostic sheet.',
      },
      {
        q: 'Can I adjust the massage pressure during my session?',
        a: 'Always. Your therapist will confirm your preferred depth (light, medium, or firm therapeutic) before starting. You are encouraged to communicate any adjustments at any time during your therapy.',
      },
      {
        q: 'Do your botanical oils accommodate skin sensitivities?',
        a: 'Yes. Our carrier oils (such as cold-pressed sweet almond, golden jojoba, and cold-pressed black sesame) are food-grade and free of synthetic stabilizers. Hypoallergenic organic grapeseed oil is always available upon request.',
      },
    ],
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Services & Pricing', item: `${BASE_URL}/services` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is provided for my appointment at Nandini Spa?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We provide single-use organic modesty undergarments, plush waffle robes, and sanitized slippers. During your session, you are fully draped with freshly warmed towels, uncovering only the specific muscle area being treated.',
            },
          },
          {
            '@type': 'Question',
            name: 'How early should I arrive in Bhopal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Please arrive 15 minutes prior to your scheduled reservation to unwind in our hydro-reflection lounge with a welcoming tisane and complete your wellness diagnostic sheet.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/full-body-massage',
    outputPath: path.join(distDir, 'full-body-massage', 'index.html'),
    title: 'Full Body Massage in Bhopal | Deep Tissue, Swedish & Therapeutic Bodywork',
    description: 'Looking for the best full body massage in Bhopal? Nandini Spa in MP Nagar provides expert deep tissue, Swedish stress recovery & Balinese massage. Call +91 90604 33848.',
    h1: 'Therapeutic Full Body Massage in Bhopal',
    ogImage: '/nandini-spa-location-updated.png',
    robots: 'index, follow',
    summary: 'Precision trigger-point therapy, myofascial release, heated basalt stones, and organic botanical massage in private climate suites in MP Nagar, Bhopal.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Full Body Massage Bhopal', path: '/full-body-massage' },
    ],
    faqs: [
      {
        q: 'What is included in a full body massage session at Nandini Spa Bhopal?',
        a: 'Every full body massage includes a preliminary muscular posture check, a warm floral foot soak, custom-blended organic carrier oils, full anatomical manipulation from neck to toes in a private climate-controlled suite, ensuite hot rainfall shower amenities, and a soothing herbal tisane.',
      },
      {
        q: 'Which full body massage is best for chronic neck, shoulder, and back stiffness?',
        a: 'Our signature Nandini Kinetic Muscle Reset & Deep Tissue Therapy is specifically formulated for chronic postural strain, office computer fatigue, and deep muscle spasms.',
      },
      {
        q: 'What should I wear during the massage, and how is guest privacy maintained?',
        a: 'Your modesty and comfort are our absolute priority. We provide sterile single-use disposable undergarments, plush waffle robes, and sanitized slippers. During therapy, you remain fully draped under freshly autoclaved warm towels.',
      },
      {
        q: 'Where in Bhopal is Nandini Spa located for body massage appointments?',
        a: 'Nandini Spa is located at Board Office Chouraha, Zone-II, Maharana Pratap Nagar (MP Nagar), Bhopal, Madhya Pradesh 462011, near Arera Colony, DB City Mall, and Shivaji Nagar.',
      },
    ],
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Full Body Massage in Bhopal',
        description: 'Looking for the best full body massage in Bhopal? Nandini Spa in MP Nagar provides expert deep tissue, Swedish stress recovery & Balinese massage.',
        url: `${BASE_URL}/full-body-massage`,
        provider: {
          '@type': 'DaySpa',
          name: 'Nandini Spa',
          url: `${BASE_URL}/`,
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Bhopal',
        },
        offers: {
          '@type': 'Offer',
          price: '2499',
          priceCurrency: 'INR',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: 'Full Body Massage Bhopal', item: `${BASE_URL}/full-body-massage` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is included in a full body massage session at Nandini Spa Bhopal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every full body massage includes a preliminary muscular posture check, a warm floral foot soak, custom-blended organic carrier oils, full anatomical manipulation from neck to toes in a private climate-controlled suite, ensuite hot rainfall shower amenities, and a soothing herbal tisane.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where in Bhopal is Nandini Spa located for body massage appointments?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nandini Spa is located at Board Office Chouraha, Zone-II, Maharana Pratap Nagar (MP Nagar), Bhopal, Madhya Pradesh 462011.',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/couple-spa',
    outputPath: path.join(distDir, 'couple-spa', 'index.html'),
    title: 'Couple Spa in Bhopal | Private VIP Suites & Dual Synchronized Massages',
    description: 'Reconnect with our luxury couple spa in Bhopal at Nandini Spa. Private VIP suites, side-by-side synchronized massages, floral foot soaks & herbal tisanes in MP Nagar.',
    h1: 'Luxury Couple Spa Sanctuary in Bhopal',
    ogImage: '/nandini-spa-location-updated.png',
    robots: 'index, follow',
    summary: 'Private VIP executive suite seclusion for couples in Bhopal with synchronized 75-minute therapeutic massages, rose foot soak, and private rainfall shower.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Couple Spa Bhopal', path: '/couple-spa' },
    ],
    faqs: [
      {
        q: 'What is included in the Nandini Sanctuary Couples Haven package in Bhopal?',
        a: 'The Couples Haven includes complete private VIP suite seclusion for 90 minutes, side-by-side bespoke 75-minute therapeutic massages, warm rose and mint mineral foot soak rituals, private ensuite rainfall shower amenities, and artisan herbal tisanes.',
      },
      {
        q: 'Can both partners choose different massage therapies during the couple spa session?',
        a: 'Yes. One partner can select firm deep tissue therapy while the other enjoys gentle lavender aromatherapy or warm basalt stone care. Each therapist tailors pressure and techniques individually.',
      },
    ],
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Couple Spa in Bhopal',
        description: 'Reconnect with our luxury couple spa in Bhopal at Nandini Spa. Private VIP suites, side-by-side synchronized massages, floral foot soaks & herbal tisanes in MP Nagar.',
        url: `${BASE_URL}/couple-spa`,
        provider: {
          '@type': 'DaySpa',
          name: 'Nandini Spa',
          url: `${BASE_URL}/`,
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Bhopal',
        },
        offers: {
          '@type': 'Offer',
          price: '5899',
          priceCurrency: 'INR',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: 'Couple Spa Bhopal', item: `${BASE_URL}/couple-spa` },
        ],
      },
    ],
  },
  {
    path: '/luxury-spa',
    outputPath: path.join(distDir, 'luxury-spa', 'index.html'),
    title: 'Luxury Spa in Bhopal | 5-Star Executive Wellness Sanctuary | Nandini Spa',
    description: 'Experience Bhopal’s most refined luxury spa. Private ensuite rainfall showers, sound-damped therapy suites, 100% organic botanicals & bespoke Ayurvedic bodywork in MP Nagar.',
    h1: '5-Star Luxury Spa & Wellness Sanctuary in Bhopal',
    ogImage: '/nandini-spa-location-updated.png',
    robots: 'index, follow',
    summary: 'Bhopal’s most distinguished wellness sanctuary featuring sound-damped private suites, ensuite rainfall showers, certified kinesiologists, and pure wildcrafted botanicals.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Luxury Spa Bhopal', path: '/luxury-spa' },
    ],
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Luxury Spa in Bhopal',
        description: 'Experience Bhopal’s most refined luxury spa. Private ensuite rainfall showers, sound-damped therapy suites, 100% organic botanicals & bespoke Ayurvedic bodywork in MP Nagar.',
        url: `${BASE_URL}/luxury-spa`,
        provider: {
          '@type': 'DaySpa',
          name: 'Nandini Spa',
          url: `${BASE_URL}/`,
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Bhopal',
        },
        offers: {
          '@type': 'Offer',
          price: '3499',
          priceCurrency: 'INR',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: 'Luxury Spa Bhopal', item: `${BASE_URL}/luxury-spa` },
        ],
      },
    ],
  },
  {
    path: '/booking',
    outputPath: path.join(distDir, 'booking', 'index.html'),
    title: 'Book Spa Appointment in Bhopal | Nandini Spa Online Reservation',
    description: 'Reserve your spa and massage appointment online at Nandini Spa Bhopal. Choose your preferred therapy, date, and time slot. Fast concierge confirmation via call or WhatsApp.',
    h1: 'Reserve Your Spa Sanctuary Appointment in Bhopal',
    ogImage: '/nandini-logo-horizontal.png',
    robots: 'index, follow',
    summary: 'Online reservation intake for restorative bodywork, couples suites, and Ayurvedic rituals at Nandini Spa Bhopal.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Book Appointment', path: '/booking' },
    ],
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Book Spa Appointment in Bhopal | Nandini Spa Online Reservation',
        url: `${BASE_URL}/booking`,
        description: 'Online reservation intake for restorative bodywork, couples suites, and Ayurvedic rituals at Nandini Spa Bhopal.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Book Appointment', item: `${BASE_URL}/booking` },
        ],
      },
    ],
  },
  {
    path: '/gallery',
    outputPath: path.join(distDir, 'gallery', 'index.html'),
    title: 'Sanctuary Ambiance Gallery | Nandini Spa Bhopal Treatment Suites',
    description: 'Tour Nandini Spa Bhopal through our visual gallery. Explore serene therapy suites, heated basalt stone rituals, authentic Shirodhara setups, and botanical ingredients.',
    h1: 'Visual Tour of Nandini Spa Sanctuary in Bhopal',
    ogImage: '/nandini-spa-location-updated.png',
    robots: 'index, follow',
    summary: 'Photographic tour of Nandini Spa treatment rooms, private hydro suites, volcanic basalt stones, and organic botanicals.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Sanctuary Gallery', path: '/gallery' },
    ],
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Sanctuary Gallery', item: `${BASE_URL}/gallery` },
        ],
      },
    ],
  },
  {
    path: '/contact',
    outputPath: path.join(distDir, 'contact', 'index.html'),
    title: 'Contact Nandini Spa Bhopal | Location, Directions & Appointments',
    description: 'Contact Nandini Spa at Board Office Chouraha, Zone-II, MP Nagar, Bhopal. Call +91 90604 33848 or chat on WhatsApp for reservations, directions & concierge consultations.',
    h1: 'Contact Nandini Spa & Sanctuary Directions in Bhopal',
    ogImage: '/nandini-spa-location-updated.png',
    robots: 'index, follow',
    summary: 'Official contact and location directory for Nandini Spa at Board Office Chouraha, Zone-II, MP Nagar, Bhopal.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact & Location', path: '/contact' },
    ],
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Nandini Spa Bhopal',
        url: `${BASE_URL}/contact`,
        mainEntity: {
          '@type': 'DaySpa',
          name: 'Nandini Spa',
          telephone: NAP_DETAILS.phoneTel,
          email: NAP_DETAILS.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: NAP_DETAILS.streetAddress,
            addressLocality: NAP_DETAILS.addressLocality,
            addressRegion: NAP_DETAILS.addressRegion,
            postalCode: NAP_DETAILS.postalCode,
            addressCountry: NAP_DETAILS.country,
          },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Contact & Location', item: `${BASE_URL}/contact` },
        ],
      },
    ],
  },
  {
    path: '/privacy-policy',
    outputPath: path.join(distDir, 'privacy-policy', 'index.html'),
    title: 'Privacy Policy | Nandini Spa Bhopal',
    description: 'Read the privacy policy for Nandini Spa Bhopal. Learn how we handle guest inquiries, appointment details, website cookies, and personal data securely.',
    h1: 'Privacy Policy & Guest Data Protection',
    ogImage: '/nandini-logo-horizontal.png',
    robots: 'index, follow',
    summary: 'Our data protection commitment regarding guest reservations, contact information, and website analytics.',
  },
  {
    path: '/terms',
    outputPath: path.join(distDir, 'terms', 'index.html'),
    title: 'Terms & Sanctuary Etiquette | Nandini Spa Bhopal',
    description: 'Review the terms of service, appointment cancellation policies, health contraindications, and sanctuary etiquette for Nandini Spa in Bhopal.',
    h1: 'Terms of Service & Sanctuary Guidelines',
    ogImage: '/nandini-logo-horizontal.png',
    robots: 'index, follow',
    summary: 'Sanctuary etiquette, arrival recommendations, cancellation guidelines, and health contraindication policies.',
  },
  {
    path: '/404',
    outputPath: path.join(distDir, '404.html'),
    title: 'Page Not Found (404) | Nandini Spa Bhopal',
    description: 'The page you requested could not be found. Explore our therapeutic spa treatments, full body massage options, or contact our concierge in Bhopal.',
    h1: '404 — Sanctuary Pathway Not Found',
    ogImage: '/nandini-logo-horizontal.png',
    robots: 'noindex, follow',
    summary: 'The requested route could not be found. Return to our sanctuary homepage or browse our treatments.',
  },
];

console.log(`Prerendering static SEO HTML files for ${routes.length} routes with canonical domain ${BASE_URL}...`);

for (const route of routes) {
  const canonicalUrl = `${BASE_URL}${route.path === '/' ? '/' : route.path}`;
  const outDir = path.dirname(route.outputPath);
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let html = templateHtml;

  // 1. Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // 2. Replace Description
  html = html.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="description" content="${route.description}" />`);

  // 3. Replace Canonical Link
  html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 4. Replace Robots Meta
  html = html.replace(/<meta\s+name=["']robots["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="robots" content="${route.robots}" />`);

  // 5. Replace Open Graph Tags
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${route.description}" />`);
  html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  if (route.ogImage) {
    const fullImg = `${BASE_URL}${route.ogImage.startsWith('/') ? '' : '/'}${route.ogImage}`;
    html = html.replace(/<meta\s+property=["']og:image["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:image" content="${fullImg}" />`);
    html = html.replace(/<meta\s+name=["']twitter:image["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:image" content="${fullImg}" />`);
  }

  // 6. Replace Twitter Tags
  html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${route.description}" />`);

  // 7. Inject Route-Specific Schema.org JSON-LD if provided
  if (route.structuredData) {
    const payload = Array.isArray(route.structuredData)
      ? { '@context': 'https://schema.org', '@graph': route.structuredData }
      : route.structuredData;
    const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(payload, null, 2)}\n    </script>`;
    html = html.replace(/<script type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i, jsonLdScript);
  }

  // 8. Inject Rich Semantic Crawlable Route Content into <div id="root">
  const breadcrumbHtml = route.breadcrumbs
    ? `<nav aria-label="Breadcrumb" style="font-size:12px; margin-bottom:16px;">
        ${route.breadcrumbs.map((b, i) => i === route.breadcrumbs.length - 1 ? `<span>${b.name}</span>` : `<a href="${b.path}" style="color:#7A9988; text-decoration:none;">${b.name}</a> · `).join('')}
       </nav>`
    : '';

  const faqHtml = route.faqs && route.faqs.length
    ? `<section style="margin-top:30px;">
        <h3>Frequently Asked Questions in Bhopal</h3>
        ${route.faqs.map(f => `<div style="margin-bottom:16px;"><p><strong>Q: ${f.q}</strong></p><p>A: ${f.a}</p></div>`).join('')}
       </section>`
    : '';

  const semanticBlock = `
      <!-- Crawlable Semantic SSR Markup for Search Engines & Non-JS Clients -->
      <noscript>
        <header style="background:#201C17; color:#FAF7F2; padding:24px 20px; text-align:center;">
          <h1>${route.h1}</h1>
          <p>Nandini Spa — ${NAP_DETAILS.streetAddress}, ${NAP_DETAILS.addressLocality}, ${NAP_DETAILS.addressRegion} ${NAP_DETAILS.postalCode} · Phone: <a href="tel:${NAP_DETAILS.phoneTel}" style="color:#ECE4D8;">${NAP_DETAILS.phone}</a> · ${NAP_DETAILS.hours}</p>
          <nav style="margin-top:14px; font-size:13px;">
            <a href="/" style="color:#7A9988; margin:0 8px;">Home</a>
            <a href="/about" style="color:#7A9988; margin:0 8px;">About Us</a>
            <a href="/services" style="color:#7A9988; margin:0 8px;">Services</a>
            <a href="/full-body-massage" style="color:#7A9988; margin:0 8px;">Full Body Massage</a>
            <a href="/couple-spa" style="color:#7A9988; margin:0 8px;">Couple Spa</a>
            <a href="/luxury-spa" style="color:#7A9988; margin:0 8px;">Luxury Spa</a>
            <a href="/gallery" style="color:#7A9988; margin:0 8px;">Gallery</a>
            <a href="/contact" style="color:#7A9988; margin:0 8px;">Contact</a>
            <a href="/booking" style="color:#7A9988; margin:0 8px; font-weight:bold;">Book Appointment</a>
          </nav>
        </header>
        <main style="padding:40px 20px; max-width:850px; margin:0 auto; font-family:sans-serif; line-height:1.7; color:#28231D;">
          ${breadcrumbHtml}
          <h2>${route.title}</h2>
          <p>${route.summary}</p>
          <div style="background:#F3EFE6; padding:20px; border-radius:8px; margin:24px 0;">
            <h3 style="margin-top:0;">Sanctuary Location & Contact Information</h3>
            <p><strong>Address:</strong> ${NAP_DETAILS.streetAddress}, ${NAP_DETAILS.addressLocality}, ${NAP_DETAILS.addressRegion} ${NAP_DETAILS.postalCode}</p>
            <p><strong>Phone / Reservations:</strong> <a href="tel:${NAP_DETAILS.phoneTel}">${NAP_DETAILS.phone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${NAP_DETAILS.email}">${NAP_DETAILS.email}</a></p>
            <p><strong>Operating Hours:</strong> ${NAP_DETAILS.hours}</p>
            <p><a href="${route.path === '/booking' ? '/booking' : '/booking'}" style="background:#446353; color:#fff; padding:10px 18px; text-decoration:none; display:inline-block; border-radius:4px; font-weight:bold; margin-top:8px;">Reserve Online Appointment</a></p>
          </div>
          ${faqHtml}
        </main>
      </noscript>
  `;

  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, semanticBlock);

  fs.writeFileSync(route.outputPath, html, 'utf8');
  console.log(`✓ Prerendered: ${route.path} -> ${path.relative(rootDir, route.outputPath)}`);

  // For cleanUrls compatibility: also create `route.html` if it's a subroute
  if (route.path !== '/' && route.path !== '/404') {
    const cleanHtmlPath = path.join(distDir, `${route.path.replace(/^\//, '')}.html`);
    fs.writeFileSync(cleanHtmlPath, html, 'utf8');
  }
}

// Ensure sitemap and robots.txt exist in dist
const publicSitemap = path.join(rootDir, 'public', 'sitemap.xml');
const distSitemap = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(publicSitemap)) {
  fs.copyFileSync(publicSitemap, distSitemap);
}

const publicRobots = path.join(rootDir, 'public', 'robots.txt');
const distRobots = path.join(distDir, 'robots.txt');
if (fs.existsSync(publicRobots)) {
  fs.copyFileSync(publicRobots, distRobots);
}

console.log('Static SEO prerendering complete.');