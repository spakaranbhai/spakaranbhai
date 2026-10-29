import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Droplets, HeartHandshake, Compass, Award, Calendar, Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { SEOHead } from '../components/SEOHead';
import { ROUTE_SEO, generateBreadcrumbsSchema, getProductionBaseUrl } from '../data/seoData';
import { trackBookingTrigger, trackPhoneClick } from '../utils/analytics';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const baseUrl = getProductionBaseUrl();
  const seo = ROUTE_SEO.about;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
  ];

  const structuredData = [
    generateBreadcrumbsSchema(baseUrl, breadcrumbs),
  ];

  return (
    <div className="w-full bg-[#FAF7F2]">
      <SEOHead config={seo} structuredData={structuredData} />
      
      {/* Header Banner — Warm Espresso (#201C17) */}
      <section className="bg-[#201C17] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#332D26]">
        <div className="max-w-4xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs text-[#C5BBAF]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#7A9988] font-medium">About Us</span>
          </nav>
          <div className="text-xs font-semibold uppercase tracking-widest text-[#7A9988] mb-3">
            Our Purpose & Ethos · Bhopal
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF7F2]">
            About {BUSINESS_CONFIG.brandName}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#ECE4D8] font-light max-w-2xl mx-auto leading-relaxed">
            Founded on the conviction that authentic wellness requires more than temporary relaxation—it requires 
            thoughtful anatomical care, unadulterated botanicals, and total sensory calm in MP Nagar, Bhopal.
          </p>
        </div>
      </section>

      {/* Main Philosophy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-[#28231D]">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#446353]">
              The Nandini Origin
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#28231D] font-normal tracking-tight leading-tight">
              An Architectural Sanctuary of Pure Restoration
            </h2>
            <p className="text-sm sm:text-base text-[#685F53] leading-relaxed">
              Urban living subjects our bodies to unrelenting postural strain, elevated cortisol, 
              and cognitive fatigue. <strong>{BUSINESS_CONFIG.brandName}</strong> was created in Bhopal 
              to provide an intentional counterweight—a sanctuary designed around water, warmth, and deliberate touch.
            </p>
            <p className="text-sm sm:text-base text-[#685F53] leading-relaxed">
              Every detail—from the acoustic dampening in each private suite to our custom organic oil formulations—is 
              engineered to guide brainwave activity into calming theta states, enabling the body to repair 
              musculoskeletal strain and restore internal harmony.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden shadow-xl aspect-4/3 bg-[#F3EFE6] border border-[#E3DACD]">
              <img
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80"
                alt="Therapeutic wellness sanctuary suites at Nandini Spa Bhopal"
                referrerPolicy="no-referrer"
                loading="lazy"
                width="800"
                height="600"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Mission & Core Values Bento — Soft Cream (#F3EFE6) Section */}
      <section className="py-20 bg-[#F3EFE6] border-y border-[#E3DACD] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#446353] mb-2">
              Our Core Commitments
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#28231D] font-normal tracking-tight">
              The Guiding Principles of {BUSINESS_CONFIG.brandShort}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-[#E3DACD] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#E7EFEA] flex items-center justify-center text-[#446353] mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#28231D] mb-3">
                  Our Sanctuary Mission
                </h3>
                <p className="text-xs sm:text-sm text-[#685F53] leading-relaxed">
                  To provide Bhopal with an uncompromising standard of holistic therapy, combining 
                  precision physical kinesiology with timeless restorative rituals.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F3EFE6] text-xs text-[#446353] font-medium">
                Individualized therapeutic plans
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-[#E3DACD] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#E7EFEA] flex items-center justify-center text-[#446353] mb-6">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#28231D] mb-3">
                  100% Pure Formulations
                </h3>
                <p className="text-xs sm:text-sm text-[#685F53] leading-relaxed">
                  We blend single-origin essential oils and organic cold-pressed carrier oils without 
                  fillers, synthetic fragrances, parabens, or mineral oils.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F3EFE6] text-xs text-[#446353] font-medium">
                Ethical, chemical-free botanicals
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-[#E3DACD] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#E7EFEA] flex items-center justify-center text-[#446353] mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#28231D] mb-3">
                  Hospitality & Hygiene
                </h3>
                <p className="text-xs sm:text-sm text-[#685F53] leading-relaxed">
                  Every suite is sanitized between guests. Autoclaved linens, private en-suite rainfall 
                  showers, and respectful modesty protocols are strictly observed.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F3EFE6] text-xs text-[#446353] font-medium">
                Rigorous sanitation standards
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certified Master Therapists Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-lg aspect-4/3 bg-[#F3EFE6] border border-[#E3DACD]">
            <img
              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80"
              alt="Thermal volcanic stone treatment at Nandini Spa"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#446353]">
              Practitioner Excellence
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#28231D] font-normal tracking-tight">
              Certified Master Therapists
            </h2>
            <p className="text-sm sm:text-base text-[#685F53] leading-relaxed">
              At {BUSINESS_CONFIG.brandName}, therapy is treated as a clinical craft. Our practitioners hold formal certifications 
              in musculoskeletal manipulation, trigger point deactivation, and authentic Vedic Marma point therapy.
            </p>
            <p className="text-sm sm:text-base text-[#685F53] leading-relaxed">
              Before each session, your therapist consults with you to note recent strains, postural tension, 
              and ideal pressure depth. Communication is continuously welcomed throughout your stay.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-xs"
              >
                Schedule Practitioner Consultation
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
