import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Check, Sparkles, Phone, MessageSquare, MapPin, ShieldCheck, HeartHandshake, Award, Droplets, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { SEOHead } from '../components/SEOHead';
import { ROUTE_SEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbsSchema, getProductionBaseUrl } from '../data/seoData';
import { GoogleMapsEmbed } from '../components/GoogleMapsEmbed';
import { trackBookingTrigger, trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';

interface LuxurySpaPageProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const LuxurySpaPage: React.FC<LuxurySpaPageProps> = ({ onOpenBooking }) => {
  const baseUrl = getProductionBaseUrl();
  const seo = ROUTE_SEO.luxurySpa;

  const faqs = [
    {
      q: 'What distinguishes Nandini Spa as Bhopal’s premier luxury spa?',
      a: 'Nandini Spa redefines luxury wellness in Bhopal through uncompromising privacy and clinical standards. Every guest enjoys an individual climate-controlled suite with en-suite rainfall showers, autoclaved single-use linens, certified master therapists with deep musculoskeletal kinesiology training, 100% cold-pressed organic oils with no synthetic additives, and tailored post-therapy herbal infusions.',
    },
    {
      q: 'Are the treatment suites completely private and sound-damped?',
      a: 'Yes. Our suites are acoustically engineered to isolate outside city noise from MP Nagar, providing total tranquility. Each room features dedicated en-suite shower and changing facilities, eliminating the need to walk through public corridors in robes.',
    },
    {
      q: 'Can corporate leaders, executives, and hotel guests book private VIP packages?',
      a: 'Certainly. We cater extensively to business executives, travelers staying at Bhopal’s leading hotels (Courtyard by Marriott, Taj Lakefront, Jehan Numa), and local professionals requiring restorative deep-tissue decompression, quiet relaxation, and flexible appointments.',
    },
    {
      q: 'What hygiene and sterilization protocols are enforced at Nandini Spa?',
      a: 'We adhere to hospital-grade sanitation: therapy beds are dressed with fresh autoclaved linens, volcanic stones and kansa wands are sterilized between treatments, and all suites undergo thorough UV-air purification cycles after every guest.',
    },
  ];

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Luxury Spa Bhopal', path: '/luxury-spa' },
  ];

  const structuredData = [
    generateServiceSchema(
      baseUrl,
      'Luxury Spa in Bhopal',
      seo.description,
      '/luxury-spa',
      '3499'
    ),
    generateFAQSchema(faqs),
    generateBreadcrumbsSchema(baseUrl, breadcrumbs),
  ];

  const luxuryHallmarks = [
    {
      title: 'Acoustic Sound-Damped Treatment Suites',
      desc: 'Engineered with double-insulated acoustic materials so you hear only gentle hydro-acoustic resonance, never outside traffic.',
      icon: ShieldCheck,
    },
    {
      title: 'En-Suite Rainfall Showers in Every Room',
      desc: 'Complete privacy from arrival to departure. Freshen up at your leisure with premium botanical toiletries and waffle robes.',
      icon: Droplets,
    },
    {
      title: 'Wildcrafted Single-Origin Carrier Oils',
      desc: 'Unrefined sweet almond, golden jojoba, and black sesame oils cold-pressed from chemical-free organic farms.',
      icon: Sparkles,
    },
    {
      title: 'Certified Master Practitioners',
      desc: 'Every therapist undergoes extensive training in human muscular anatomy, trigger point release, and Vedic energy pathways.',
      icon: Award,
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F2]">
      <SEOHead config={seo} structuredData={structuredData} />

      {/* Hero Section */}
      <section className="bg-[#201C17] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#332D26]">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs text-[#C5BBAF]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-[#7A9988] font-medium">Luxury Spa</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E2822] text-[#7A9988] text-xs font-semibold uppercase tracking-widest mb-4 border border-[#3E362E]">
            <Award className="w-3.5 h-3.5 text-[#C89D66]" />
            <span>5-Star Sanctuary Experience · Bhopal</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF7F2] leading-tight">
            5-Star Luxury Spa & Wellness Sanctuary in Bhopal
          </h1>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-[#ECE4D8] font-light max-w-3xl mx-auto leading-relaxed">
            Elevate self-care into an art form. Nandini Spa unites the precision of anatomical deep-tissue therapies 
            with the soothing opulence of private en-suite rainfall showers, organic botanicals, and meditative calm 
            in the heart of Maharana Pratap Nagar, Bhopal.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                trackBookingTrigger('vedic-shirodhara-abhyanga', 'luxury_spa_hero');
                onOpenBooking('vedic-shirodhara-abhyanga');
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Luxury Experience</span>
            </button>

            {BUSINESS_CONFIG.phone && (
              <a
                href={`tel:${BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '')}`}
                onClick={() => trackPhoneClick('luxury_spa_hero', BUSINESS_CONFIG.phone!)}
                className="w-full sm:w-auto px-6 py-3.5 border border-[#ECE4D8] hover:border-white text-[#FAF7F2] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#7A9988]" />
                <span>Call Concierge</span>
              </a>
            )}

            {BUSINESS_CONFIG.isWhatsappConfigured && BUSINESS_CONFIG.whatsappNumber && (
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Nandini Spa Bhopal, I would like to inquire about luxury spa reservations.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('luxury_spa_hero')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp VIP Concierge</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Hallmarks Grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#446353] mb-2">
            The Gold Standard of Care
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#28231D] font-normal tracking-tight">
            The Hallmarks of True Luxury at Nandini Spa
          </h2>
          <p className="mt-3 text-sm text-[#685F53]">
            True luxury is never superficial; it is found in the absence of rush, the absolute purity of ingredients, 
            and the profound physical relief delivered by master therapeutic touch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {luxuryHallmarks.map((h, i) => {
            const Icon = h.icon;
            return (
              <div key={i} className="bg-white rounded-xl border border-[#E3DACD] p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#E7EFEA] flex items-center justify-center text-[#446353] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#28231D] mb-2">
                    {h.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#685F53] leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Luxury Signature Experience */}
      <section className="py-16 bg-[#F3EFE6] border-y border-[#E3DACD] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#446353]">
              Bespoke Sanctuary Ritual
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#28231D] font-normal tracking-tight">
              Authentic Shirodhara & Golden Abhyanga
            </h2>
            <p className="text-sm text-[#685F53] leading-relaxed">
              Our most celebrated luxury therapy in Bhopal. Following a synchronized full-body Abhyanga 
              with warm Ayurvedic medicated oils, you experience Shirodhara: a continuous, rhythmic pendulum flow 
              of warm herbal oil poured gently across the brow (third-eye chakra) for 35 minutes to dissolve mental fatigue 
              and restore deep nervous system harmony.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-[#28231D]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7A9988]" />
                <span>Duration: 80 Minutes of Pure Immersion</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7A9988]" />
                <span>Tariff: ₹3,499 (All inclusive)</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  trackBookingTrigger('vedic-shirodhara-abhyanga', 'luxury_shirodhara');
                  onOpenBooking('vedic-shirodhara-abhyanga');
                }}
                className="px-6 py-3 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Book Shirodhara Ritual
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden shadow-lg border border-[#E3DACD] aspect-4/3 bg-white">
              <img
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80"
                alt="Authentic Shirodhara and Ayurvedic Massage at Nandini Spa Bhopal"
                className="w-full h-full object-cover"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#446353] mb-2">
            Luxury Standard FAQs
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#28231D] font-normal tracking-tight">
            Frequently Asked Questions About Luxury Spa in Bhopal
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg border border-[#E3DACD] p-6 shadow-xs">
              <h3 className="font-serif text-lg font-medium text-[#28231D] mb-2">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-[#685F53] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="py-12 bg-[#FAF7F2] border-t border-[#E3DACD] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#28231D]">
              Convenient Central Location in Bhopal
            </h2>
            <p className="text-xs sm:text-sm text-[#685F53] mt-2">
              Board Office Chouraha, Zone-II, MP Nagar, Bhopal. Minutes away from DB City Mall and Habibganj Railway Station.
            </p>
          </div>
          <GoogleMapsEmbed />
        </div>
      </section>
    </div>
  );
};
