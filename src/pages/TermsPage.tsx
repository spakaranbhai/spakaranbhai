import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { SEOHead } from '../components/SEOHead';
import { ROUTE_SEO, generateBreadcrumbsSchema, getProductionBaseUrl } from '../data/seoData';

export const TermsPage: React.FC = () => {
  const baseUrl = getProductionBaseUrl();
  const seo = ROUTE_SEO.terms;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Terms of Service', path: '/terms' },
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
            <span className="text-[#7A9988] font-medium">Terms & Etiquette</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#FAF7F2]">
            Terms of Service & Sanctuary Etiquette
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#C5BBAF]">
            Operating standards · Nandini Spa, Bhopal, Madhya Pradesh
          </p>
        </div>
      </section>

      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl border border-[#E3DACD] p-6 sm:p-10 shadow-xs space-y-8 text-[#28231D]">
          
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-[#28231D]">
              1. Sanctuary Environment & Conduct
            </h2>
            <p className="text-sm text-[#685F53] leading-relaxed">
              <strong>{BUSINESS_CONFIG.brandName}</strong> is an intentional sanctuary dedicated to physical renewal, 
              musculoskeletal therapy, and quiet tranquility. We require all guests to maintain quiet voices, 
              switch mobile phones to silent mode, and respect the serenity of adjacent treatment suites. 
              Any inappropriate or disrespectful conduct will result in the immediate termination of the session without refund.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-[#28231D]">
              2. Appointment Reservations & Arrivals
            </h2>
            <p className="text-sm text-[#685F53] leading-relaxed">
              To ensure full treatment duration, please arrive 15 minutes prior to your scheduled reservation time. 
              Late arrivals will receive therapy for the remaining allocated suite time, with full session fees applicable, 
              to prevent inconveniencing subsequent guests.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-[#28231D]">
              3. Rescheduling & Cancellation Policy
            </h2>
            <p className="text-sm text-[#685F53] leading-relaxed">
              Because therapy suites, linens, and certified practitioners are scheduled exclusively for your booking, 
              we kindly ask for at least 3 hours advance notice for single appointments and 12 hours advance notice 
              for couples or group reservations if you must reschedule.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-[#28231D]">
              4. Health Contraindications & Disclosure
            </h2>
            <p className="text-sm text-[#685F53] leading-relaxed">
              Guests must disclose any acute cardiovascular conditions, severe spinal surgeries, recent fractures, 
              infectious skin conditions, or active pregnancies prior to treatment. Certain modalities (such as intense 
              hot basalt stones or deep lumbar manipulation) may be contraindicated and will be substituted with gentle, 
              safe alternatives by your practitioner.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-medium text-[#28231D]">
              5. Transparent Pricing & Tariffs
            </h2>
            <p className="text-sm text-[#685F53] leading-relaxed">
              All treatment tariffs are quoted in Indian Rupees (INR ₹) and are all-inclusive of suite amenities, 
              fresh towels, and herbal infusions. We accept cash, major debit/credit cards, UPI (Google Pay, PhonePe, Paytm), 
              and net banking.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};
