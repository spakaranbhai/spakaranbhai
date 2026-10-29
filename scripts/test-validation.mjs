import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

console.log('--- Starting Automated SEO, Schema & File Validation ---');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`FAIL: ${message}`);
  }
}

// 1. Validate sitemap.xml
const sitemapPath = path.join(distDir, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'dist/sitemap.xml exists');
if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf8');
  assert(content.includes('<urlset'), 'sitemap.xml has <urlset>');
  assert(content.includes('https://spakaranbhai.github.io/'), 'sitemap.xml contains homepage');
  assert(content.includes('https://spakaranbhai.github.io/full-body-massage'), 'sitemap.xml contains /full-body-massage');
  assert(content.includes('https://spakaranbhai.github.io/couple-spa'), 'sitemap.xml contains /couple-spa');
  assert(content.includes('https://spakaranbhai.github.io/luxury-spa'), 'sitemap.xml contains /luxury-spa');
  assert(content.includes('https://spakaranbhai.github.io/booking'), 'sitemap.xml contains /booking');
  assert(!content.includes('/404'), 'sitemap.xml correctly excludes 404 page');
}

// 2. Validate robots.txt
const robotsPath = path.join(distDir, 'robots.txt');
assert(fs.existsSync(robotsPath), 'dist/robots.txt exists');
if (fs.existsSync(robotsPath)) {
  const content = fs.readFileSync(robotsPath, 'utf8');
  assert(content.includes('User-agent: *'), 'robots.txt allows all crawlers');
  assert(content.includes('Sitemap: https://spakaranbhai.github.io/sitemap.xml'), 'robots.txt points to canonical sitemap');
  assert(content.includes('Disallow: /*.zip$'), 'robots.txt blocks private zip files');
  assert(content.includes('Disallow: /404'), 'robots.txt blocks /404');
}

// 2b. Validate Google Maps Integration & Exact Embed URL
const EXACT_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.325797556229!2d77.43317379999999!3d23.231228599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4306c83a65db%3A0x7d84842de233e7df!2sNandini%20Spa!5e0!3m2!1sen!2sin!4v1793265164425!5m2!1sen!2sin";
const businessConfigPath = path.join(rootDir, 'src', 'config', 'business.ts');
assert(fs.existsSync(businessConfigPath), 'src/config/business.ts exists');
if (fs.existsSync(businessConfigPath)) {
  const bContent = fs.readFileSync(businessConfigPath, 'utf8');
  assert(bContent.includes(EXACT_MAPS_EMBED_URL), 'business.ts contains exact Google Maps embed URL for Nandini Spa');
  assert(bContent.includes('23.2312286'), 'business.ts contains verified latitude 23.2312286');
  assert(bContent.includes('77.4331738'), 'business.ts contains verified longitude 77.4331738');
  assert(bContent.includes('0x397c4306c83a65db%3A0x7d84842de233e7df') || bContent.includes('0x7d84842de233e7df'), 'business.ts directions URL references Nandini Spa place ID');
  assert(bContent.includes('24 Hours') || bContent.includes('24/7'), 'business.ts specifies 24-hour service');
}

// 2c. Validate 24-Hour Service Schema in index.html
const indexHtmlPath = path.join(rootDir, 'index.html');
assert(fs.existsSync(indexHtmlPath), 'index.html exists');
if (fs.existsSync(indexHtmlPath)) {
  const iContent = fs.readFileSync(indexHtmlPath, 'utf8');
  assert(iContent.includes('"opens": "00:00"') && iContent.includes('"closes": "23:59"'), 'index.html Schema.org specifies 24-hour service (00:00 to 23:59)');
  assert(iContent.includes('24 hours') || iContent.includes('24/7'), 'index.html noscript specifies 24-hour service availability');
}

const mapsEmbedComponentPath = path.join(rootDir, 'src', 'components', 'GoogleMapsEmbed.tsx');
assert(fs.existsSync(mapsEmbedComponentPath), 'src/components/GoogleMapsEmbed.tsx exists');
if (fs.existsSync(mapsEmbedComponentPath)) {
  const gContent = fs.readFileSync(mapsEmbedComponentPath, 'utf8');
  assert(gContent.includes('title="Nandini Spa location on Google Maps"'), 'GoogleMapsEmbed.tsx uses meaningful title attribute');
  assert(gContent.includes('loading="lazy"'), 'GoogleMapsEmbed.tsx preserves lazy loading');
  assert(gContent.includes('referrerPolicy="strict-origin-when-cross-origin"'), 'GoogleMapsEmbed.tsx preserves referrerpolicy');
  assert(gContent.includes('allowFullScreen'), 'GoogleMapsEmbed.tsx enables allowFullScreen');
}

// 3. Validate Prerendered HTML routes
const routesToCheck = [
  { file: 'index.html', title: 'Spa in Bhopal', canonical: 'https://spakaranbhai.github.io/' },
  { file: 'about/index.html', title: 'About Nandini Spa', canonical: 'https://spakaranbhai.github.io/about' },
  { file: 'services/index.html', title: 'Spa Services', canonical: 'https://spakaranbhai.github.io/services' },
  { file: 'full-body-massage/index.html', title: 'Full Body Massage in Bhopal', canonical: 'https://spakaranbhai.github.io/full-body-massage' },
  { file: 'couple-spa/index.html', title: 'Couple Spa in Bhopal', canonical: 'https://spakaranbhai.github.io/couple-spa' },
  { file: 'luxury-spa/index.html', title: 'Luxury Spa in Bhopal', canonical: 'https://spakaranbhai.github.io/luxury-spa' },
  { file: 'booking/index.html', title: 'Book Spa Appointment', canonical: 'https://spakaranbhai.github.io/booking' },
  { file: 'gallery/index.html', title: 'Sanctuary Ambiance Gallery', canonical: 'https://spakaranbhai.github.io/gallery' },
  { file: 'contact/index.html', title: 'Contact Nandini Spa', canonical: 'https://spakaranbhai.github.io/contact' },
  { file: 'privacy-policy/index.html', title: 'Privacy Policy', canonical: 'https://spakaranbhai.github.io/privacy-policy' },
  { file: 'terms/index.html', title: 'Terms & Sanctuary Etiquette', canonical: 'https://spakaranbhai.github.io/terms' },
  { file: '404.html', title: 'Page Not Found (404)', canonical: 'https://spakaranbhai.github.io/404', robots: 'noindex, follow' },
];

for (const r of routesToCheck) {
  const filePath = path.join(distDir, r.file);
  assert(fs.existsSync(filePath), `HTML file exists: ${r.file}`);
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, 'utf8');
    assert(html.includes(r.title), `${r.file} contains expected title keyword (${r.title})`);
    assert(html.includes(`canonical" href="${r.canonical}"`), `${r.file} has correct absolute canonical URL`);
    
    if (r.robots) {
      assert(html.includes(`robots" content="${r.robots}"`), `${r.file} has explicit robots directive (${r.robots})`);
    } else {
      assert(html.includes('robots" content="index, follow"'), `${r.file} has index, follow robots directive`);
    }

    assert(html.includes('property="og:title"'), `${r.file} has Open Graph title`);
    assert(html.includes('property="og:image"'), `${r.file} has Open Graph image`);
    assert(html.includes('name="twitter:card"'), `${r.file} has Twitter card`);
    assert(html.includes('application/ld+json'), `${r.file} has JSON-LD structured data`);
    assert(html.includes('<noscript>'), `${r.file} has static noscript fallback for non-JS crawlers`);

    // Verify JSON-LD parses cleanly
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
    assert(jsonLdMatch !== null, `${r.file} contains JSON-LD script block`);
    if (jsonLdMatch) {
      try {
        const parsed = JSON.parse(jsonLdMatch[1]);
        assert(parsed['@context'] === 'https://schema.org', `${r.file} JSON-LD has schema.org context`);
        assert(parsed['@type'] !== undefined, `${r.file} JSON-LD has @type`);
      } catch (err) {
        assert(false, `${r.file} JSON-LD parse error: ${err.message}`);
      }
    }
  }
}

console.log(`\nValidation Summary: ${passedTests} / ${totalTests} tests passed.`);
if (passedTests === totalTests) {
  console.log('SUCCESS: All Technical SEO, Sitemap, Robots, and Schema tests passed!');
  process.exit(0);
} else {
  console.error('FAILURE: Some tests failed.');
  process.exit(1);
}
