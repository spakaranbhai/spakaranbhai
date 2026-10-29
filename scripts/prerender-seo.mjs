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

const BASE_URL = process.env.VITE_SITE_URL || 'https://spakaranbhai.github.io';

const routes = [
  {
    path: '/',
    outputPath: path.join(distDir, 'index.html'),
    title: 'Nandini Spa | Luxury Spa in Bhopal & Restorative Bodywork Sanctuary',
    description: 'Experience Bhopal’s premier luxury spa at Board Office Chouraha, MP Nagar. Therapeutic deep tissue massage, warm basalt stones, authentic Ayurvedic rituals & private suites.',
    h1: 'Sanctuary of Restorative Spa & Holistic Bodywork in Bhopal',
    robots: 'index, follow',
    summary: 'Therapeutic musculoskeletal bodywork, hydrothermal volcanic basalt stones, and authentic Ayurvedic rituals in Bhopal.',
  },
  {
    path: '/about',
    outputPath: path.join(distDir, 'about', 'index.html'),
    title: 'About Nandini Spa | Master Therapists & Restorative Ethos in Bhopal',
    description: 'Learn about Nandini Spa Bhopal. Discover our holistic philosophy, certified master kinesiologists, pristine suite privacy standards, and pure wildcrafted botanical oils.',
    h1: 'About Nandini Spa Sanctuary in Bhopal',
    robots: 'index, follow',
    summary: 'Founded on the conviction that authentic wellness requires thoughtful anatomical care, unadulterated botanicals, and total sensory calm in MP Nagar, Bhopal.',
  },
  {
    path: '/services',
    outputPath: path.join(distDir, 'services', 'index.html'),
    title: 'Spa Services & Pricing in Bhopal | Nandini Spa Treatment Menu',
    description: 'Explore our complete spa treatment menu & transparent INR tariffs in Bhopal. Deep tissue therapy, warm volcanic basalt stones, Vedic Shirodhara, herbal potli & couples packages.',
    h1: 'Restorative Spa Therapies & Treatment Tariffs in Bhopal',
    robots: 'index, follow',
    summary: 'Explore our curated menu of musculoskeletal bodywork, hydrothermal stone care, and organic cellular facials with transparent tariffs in INR (₹).',
  },
  {
    path: '/full-body-massage',
    outputPath: path.join(distDir, 'full-body-massage', 'index.html'),
    title: 'Full Body Massage in Bhopal | Deep Tissue, Swedish & Therapeutic Bodywork',
    description: 'Looking for the best full body massage in Bhopal? Nandini Spa in MP Nagar provides expert deep tissue, Swedish stress recovery & Balinese massage. Call +91 90604 33848.',
    h1: 'Therapeutic Full Body Massage in Bhopal',
    robots: 'index, follow',
    summary: 'Precision trigger-point therapy, myofascial release, heated basalt stones, and organic botanical massage in private climate suites in MP Nagar, Bhopal.',
  },
  {
    path: '/couple-spa',
    outputPath: path.join(distDir, 'couple-spa', 'index.html'),
    title: 'Couple Spa in Bhopal | Private VIP Suites & Dual Synchronized Massages',
    description: 'Reconnect with our luxury couple spa in Bhopal at Nandini Spa. Private VIP suites, side-by-side synchronized massages, floral foot soaks & herbal tisanes in MP Nagar.',
    h1: 'Luxury Couple Spa Sanctuary in Bhopal',
    robots: 'index, follow',
    summary: 'Private VIP executive suite seclusion for couples in Bhopal with synchronized 75-minute therapeutic massages, rose foot soak, and private rainfall shower.',
  },
  {
    path: '/luxury-spa',
    outputPath: path.join(distDir, 'luxury-spa', 'index.html'),
    title: 'Luxury Spa in Bhopal | 5-Star Executive Wellness Sanctuary | Nandini Spa',
    description: 'Experience Bhopal’s most refined luxury spa. Private ensuite rainfall showers, sound-damped therapy suites, 100% organic botanicals & bespoke Ayurvedic bodywork in MP Nagar.',
    h1: '5-Star Luxury Spa & Wellness Sanctuary in Bhopal',
    robots: 'index, follow',
    summary: 'Bhopal’s most distinguished wellness sanctuary featuring sound-damped private suites, ensuite rainfall showers, certified kinesiologists, and pure wildcrafted botanicals.',
  },
  {
    path: '/booking',
    outputPath: path.join(distDir, 'booking', 'index.html'),
    title: 'Book Spa Appointment in Bhopal | Nandini Spa Online Reservation',
    description: 'Reserve your spa and massage appointment online at Nandini Spa Bhopal. Choose your preferred therapy, date, and time slot. Fast concierge confirmation via call or WhatsApp.',
    h1: 'Reserve Your Spa Sanctuary Appointment in Bhopal',
    robots: 'index, follow',
    summary: 'Online reservation intake for restorative bodywork, couples suites, and Ayurvedic rituals at Nandini Spa Bhopal.',
  },
  {
    path: '/gallery',
    outputPath: path.join(distDir, 'gallery', 'index.html'),
    title: 'Sanctuary Ambiance Gallery | Nandini Spa Bhopal Treatment Suites',
    description: 'Tour Nandini Spa Bhopal through our visual gallery. Explore serene therapy suites, heated basalt stone rituals, authentic Shirodhara setups, and botanical ingredients.',
    h1: 'Visual Tour of Nandini Spa Sanctuary in Bhopal',
    robots: 'index, follow',
    summary: 'Photographic tour of Nandini Spa treatment rooms, private hydro suites, volcanic basalt stones, and organic botanicals.',
  },
  {
    path: '/contact',
    outputPath: path.join(distDir, 'contact', 'index.html'),
    title: 'Contact Nandini Spa Bhopal | Location, Directions & Appointments',
    description: 'Contact Nandini Spa at Board Office Chouraha, Zone-II, MP Nagar, Bhopal. Call +91 90604 33848 or chat on WhatsApp for reservations, directions & concierge consultations.',
    h1: 'Contact Nandini Spa & Sanctuary Directions in Bhopal',
    robots: 'index, follow',
    summary: 'Official contact and location directory for Nandini Spa at Board Office Chouraha, Zone-II, MP Nagar, Bhopal.',
  },
  {
    path: '/privacy-policy',
    outputPath: path.join(distDir, 'privacy-policy', 'index.html'),
    title: 'Privacy Policy | Nandini Spa Bhopal',
    description: 'Read the privacy policy for Nandini Spa Bhopal. Learn how we handle guest inquiries, appointment details, website cookies, and personal data securely.',
    h1: 'Privacy Policy & Guest Data Protection',
    robots: 'index, follow',
    summary: 'Our data protection commitment regarding guest reservations, contact information, and website analytics.',
  },
  {
    path: '/terms',
    outputPath: path.join(distDir, 'terms', 'index.html'),
    title: 'Terms & Sanctuary Etiquette | Nandini Spa Bhopal',
    description: 'Review the terms of service, appointment cancellation policies, health contraindications, and sanctuary etiquette for Nandini Spa in Bhopal.',
    h1: 'Terms of Service & Sanctuary Guidelines',
    robots: 'index, follow',
    summary: 'Sanctuary etiquette, arrival recommendations, cancellation guidelines, and health contraindication policies.',
  },
  {
    path: '/404',
    outputPath: path.join(distDir, '404.html'),
    title: 'Page Not Found (404) | Nandini Spa Bhopal',
    description: 'The page you requested could not be found. Explore our therapeutic spa treatments, full body massage options, or contact our concierge in Bhopal.',
    h1: '404 — Sanctuary Pathway Not Found',
    robots: 'noindex, follow',
    summary: 'The requested route could not be found. Return to our sanctuary homepage or browse our treatments.',
  },
];

console.log(`Prerendering static SEO HTML files for ${routes.length} routes...`);

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

  // 3. Replace Canonical
  html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 4. Replace Robots
  html = html.replace(/<meta\s+name=["']robots["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="robots" content="${route.robots}" />`);

  // 5. Replace Open Graph Tags
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:description" content="${route.description}" />`);
  html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);

  // 6. Replace Twitter Tags
  html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i, `<meta name="twitter:description" content="${route.description}" />`);

  // 7. Inject Semantic Route Content into noscript block inside #root
  const semanticBlock = `
      <noscript>
        <header style="background:#201C17; color:#FAF7F2; padding:20px; text-align:center;">
          <h1>${route.h1}</h1>
          <p>Nandini Spa — Board Office Chouraha, Zone-II, MP Nagar, Bhopal, MP 462011 · Phone: +91 90604 33848</p>
          <nav style="margin-top:10px;">
            <a href="/" style="color:#7A9988; margin:0 8px;">Home</a>
            <a href="/about" style="color:#7A9988; margin:0 8px;">About Us</a>
            <a href="/services" style="color:#7A9988; margin:0 8px;">Services</a>
            <a href="/full-body-massage" style="color:#7A9988; margin:0 8px;">Full Body Massage</a>
            <a href="/couple-spa" style="color:#7A9988; margin:0 8px;">Couple Spa</a>
            <a href="/luxury-spa" style="color:#7A9988; margin:0 8px;">Luxury Spa</a>
            <a href="/contact" style="color:#7A9988; margin:0 8px;">Contact</a>
            <a href="/booking" style="color:#7A9988; margin:0 8px;">Book Appointment</a>
          </nav>
        </header>
        <main style="padding:40px 20px; max-width:800px; margin:0 auto; font-family:sans-serif; line-height:1.6;">
          <h2>${route.title}</h2>
          <p>${route.summary}</p>
          <p>For immediate reservations in Bhopal, call <strong>+91 90604 33848</strong> or visit Board Office Chouraha, Zone-II, MP Nagar, Bhopal.</p>
        </main>
      </noscript>
  `;

  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, semanticBlock);

  fs.writeFileSync(route.outputPath, html, 'utf8');
  console.log(`✓ Prerendered: ${route.path} -> ${path.relative(rootDir, route.outputPath)}`);
}

// Ensure sitemap and robots.txt exist in dist
const publicSitemap = path.join(rootDir, 'public', 'sitemap.xml');
const distSitemap = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(publicSitemap) && !fs.existsSync(distSitemap)) {
  fs.copyFileSync(publicSitemap, distSitemap);
}

const publicRobots = path.join(rootDir, 'public', 'robots.txt');
const distRobots = path.join(distDir, 'robots.txt');
if (fs.existsSync(publicRobots) && !fs.existsSync(distRobots)) {
  fs.copyFileSync(publicRobots, distRobots);
}

console.log('Static SEO prerendering complete.');
