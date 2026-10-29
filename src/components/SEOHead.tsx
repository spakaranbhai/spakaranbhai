import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductionBaseUrl, RouteSEOConfig } from '../data/seoData';
import { BUSINESS_CONFIG } from '../config/business';

interface SEOHeadProps {
  config: RouteSEOConfig;
  structuredData?: object | object[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({ config, structuredData }) => {
  const location = useLocation();
  const baseUrl = getProductionBaseUrl();
  const canonicalUrl = `${baseUrl}${config.canonicalPath === '/' ? '/' : config.canonicalPath}`;
  
  // Resolve absolute image URL
  const rawImage = config.ogImage || BUSINESS_CONFIG.logo?.horizontalUrl || '/nandini-logo-horizontal.png';
  const absoluteImageUrl = rawImage.startsWith('http')
    ? rawImage
    : `${baseUrl}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

  const robots = config.robots || 'index, follow';

  useEffect(() => {
    // 1. Update document title
    document.title = config.title;

    // Helper to safely set or create a <meta> element
    const setMetaTag = (attribute: 'name' | 'property', value: string, content: string) => {
      let meta = document.head.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, value);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    setMetaTag('name', 'description', config.description);
    setMetaTag('name', 'robots', robots);
    if (config.keywords) {
      setMetaTag('name', 'keywords', config.keywords);
    }
    setMetaTag('name', 'author', BUSINESS_CONFIG.brandName);

    // 3. Canonical Link tag
    let canonicalLink = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', config.title);
    setMetaTag('property', 'og:description', config.description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', config.ogType || 'website');
    setMetaTag('property', 'og:site_name', BUSINESS_CONFIG.brandName);
    setMetaTag('property', 'og:locale', 'en_IN');
    setMetaTag('property', 'og:image', absoluteImageUrl);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:image:alt', `${BUSINESS_CONFIG.brandName} - ${config.title}`);

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', config.title);
    setMetaTag('name', 'twitter:description', config.description);
    setMetaTag('name', 'twitter:image', absoluteImageUrl);
    setMetaTag('name', 'twitter:image:alt', `${BUSINESS_CONFIG.brandName} - ${config.title}`);

    // 6. Schema.org JSON-LD structured data
    const existingScript = document.head.querySelector('#schema-org-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    if (structuredData) {
      const script = document.createElement('script');
      script.id = 'schema-org-jsonld';
      script.type = 'application/ld+json';
      const payload = Array.isArray(structuredData)
        ? { '@context': 'https://schema.org', '@graph': structuredData }
        : structuredData;
      script.text = JSON.stringify(payload);
      document.head.appendChild(script);
    }

    return () => {
      // Optional cleanup on unmount
    };
  }, [location.pathname, config, structuredData, canonicalUrl, absoluteImageUrl, robots]);

  // In React 19, native metadata tags can also be rendered directly
  return (
    <>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <meta name="robots" content={robots} />
      {config.keywords && <meta name="keywords" content={config.keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={config.ogType || 'website'} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
    </>
  );
};
