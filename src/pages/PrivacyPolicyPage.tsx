import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { SEOHead } from '../components/SEOHead';
import { ROUTE_SEO, generateBreadcrumbsSchema, getProductionBaseUrl } from '../data/seoData';

export const PrivacyPolicyPage: React.FC = () => {
  const baseUrl = getProductionBaseUrl();
  const seo = ROUTE_SEO.privacyPolicy;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];

  const structuredData = [
    generateBreadcrumbsSchema(baseUrl, breadcrumbs),
  ];

  return (
    <div className="w-full bg-[#FAF7F2]">
      <SEOHead config={seo} structuredData={structuredData} />

      <section className="bg-[#201C17] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#332D26]">
        <div className="max-w-4xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs text-[#C5BBAF]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#7A9988] font-medium">Privacy Policy</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#FAF7F2]">
            Privacy Policy & Data Protection
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#C5BBAF]">
            Last updated: October 2026 · Nandini Spa, Bhopal, Madhya Pradesh
          </p>
        </div>
      </section>

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl border border-[#E3DACD] p-6 sm:p-10 shadow-xs space-y-8 text-[#28231D]">
          
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-[#28231D]">
              1. Our Privacy Commitment
            </h2>
            <p className="text-sm text-[#685F53] leading-relaxed">
              At <strong>{BUSINESS_CONFIG.brandName}</strong>, we respect your personal privacy and are committed 
              to safeguarding the information you share when inquiring about therapies, booking reservations, 
              or navigating our website. This policy details how guest information is collected, utilized, and secured.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-[#28231D]">
              2. Information We Collect
            </h2>
            <p className="text-sm text-[#685F53] leading-relaxed">
              When requesting an appointment or submitting a consultation message, we collect:
            </p>
            <ul className="list-disc list-inside text-sm text-[#685F53] space-y-1.5 pl-2">
              <li>Guest Name and contact telephone / WhatsApp number.</li>
              <li>Email address for confirmation notices and digital receipts.</li>
              <li>Preferred therapy selections, appointment dates, and time slots.</li>
              <li>Optional health or pressure preferences submitted voluntarily for treatment personalization.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-[#28231D]">
              3. How We Use Guest Information
            </h2>
            <p className="text-sm text-[#685F53] leading-relaxed">
              Guest information is strictly utilized to:
            </p>
            <ul className="list-disc list-inside text-sm text-[#685F53] space-y-1.5 pl-2">
              <li>Verify practitioner availability and confirm sanctuary reservations.</li>
              <li>Communicate directly via phone or WhatsApp regarding appointment schedules.</li>
              <li>Ensure treatments adhere to any disclosed skin allergies or pressure preferences.</li>
              <li>Maintain lawful business records and accounting compliance.</li>
            </ul>
            <p className="text-sm text-[#685F53] leading-relaxed">
              We never sell, rent, trade, or distribute your personal contact information to third-party marketing companies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-[#28231D]">
              4. Website Analytics & Cookies
            </h2>
            <p className="text-sm text-[#685F53] leading-relaxed">
              Our website may utilize anonymous analytical cookies (such as Google Analytics 4) to monitor aggregate 
              visitor counts, traffic origins, and popular pages. These analytics collect no personally identifiable information (PII) 
              and operate with IP anonymization enabled.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-[#28231D]">
              5. Contact Us Regarding Your Data
            </h2>
            <p className="text-sm text-[#685F53] leading-relaxed">
              If you wish to review, update, or request deletion of any contact information provided to our sanctuary, 
              please contact our concierge desk:
            </p>
            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E3DACD] text-xs space-y-2">
              <div className="font-semibold text-[#28231D]">{BUSINESS_CONFIG.brandName} Concierge Desk</div>
              <div className="flex items-center gap-2 text-[#685F53]">
                <MapPin className="w-4 h-4 text-[#446353]" />
                <span>{BUSINESS_CONFIG.streetAddressPlaceholder}</span>
              </div>
              <div className="flex items-center gap-2 text-[#685F53]">
                <Mail className="w-4 h-4 text-[#446353]" />
                <span>{BUSINESS_CONFIG.email}</span>
              </div>
              {BUSINESS_CONFIG.phone && (
                <div className="flex items-center gap-2 text-[#685F53]">
                  <Phone className="w-4 h-4 text-[#446353]" />
                  <span>{BUSINESS_CONFIG.phone}</span>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
