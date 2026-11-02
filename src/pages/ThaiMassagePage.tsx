import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Check, Sparkles, Phone, MessageSquare, MapPin, ShieldCheck, HeartHandshake, Award, Activity, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { SEOHead } from '../components/SEOHead';
import { ROUTE_SEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbsSchema, getProductionBaseUrl } from '../data/seoData';
import { GoogleMapsEmbed } from '../components/GoogleMapsEmbed';
import { trackBookingTrigger, trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';
import { SpaService } from '../data/spaData';

interface ThaiMassagePageProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectService?: (service: SpaService) => void;
}

export const ThaiMassagePage: React.FC<ThaiMassagePageProps> = ({ onOpenBooking }) => {
  const baseUrl = getProductionBaseUrl();
  const seo = ROUTE_SEO.thaiMassage;

  const faqs = [
    {
      q: 'What is Traditional Thai Massage (Nuad Thai) at Nandini Spa Bhopal?',
      a: 'Traditional Thai Massage is an ancient therapeutic discipline that integrates assisted yoga stretches, rhythmic palm and thumb acupressure along Sen energy channels, and joint mobilization. Unlike Western oil massages, it is performed on a comfortable floor mat with the guest wearing loose, comfortable cotton clothing provided by our sanctuary.',
    },
    {
      q: 'What should I wear during a Thai massage session?',
      a: 'No special preparation is required. Upon arrival at Nandini Spa, we provide clean, sanitized, breathable loose cotton fisherman pants and a tunic designed specifically for maximum stretching flexibility and comfort.',
    },
    {
      q: 'Is Thai massage painful or too intense?',
      a: 'Not at all. While Thai massage is invigorating and deeply stretching, our certified therapists carefully evaluate your individual flexibility beforehand and tailor every stretch to your personal comfort threshold. The rhythm is meditative, gentle, and deeply restorative.',
    },
    {
      q: 'Who benefits most from Thai massage in Bhopal?',
      a: 'Thai massage is exceptionally beneficial for athletes, yoga practitioners, corporate professionals with hip flexor and lower back stiffness from prolonged sitting, travelers suffering from flight fatigue, and anyone desiring profound flexibility without heavy oil application.',
    },
    {
      q: 'Where in Bhopal is Nandini Spa located for Thai massage sessions?',
      a: 'Nandini Spa is conveniently located in Bhopal, Madhya Pradesh, offering easy accessibility and dedicated sanctuary suites.',
    },
    {
      q: 'How can I book an authentic Thai massage appointment at Nandini Spa?',
      a: 'You can book online through our instant reservation system, call our concierge desk directly at +91 90604 33848, or message us on WhatsApp for real-time slot confirmation.',
    },
  ];

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Thai Massage Bhopal', path: '/thai-massage' },
  ];

  const structuredData = [
    generateServiceSchema(
      baseUrl,
      'Traditional Thai Massage in Bhopal',
      seo.description,
      '/thai-massage',
      '2899'
    ),
    generateFAQSchema(faqs),
    generateBreadcrumbsSchema(baseUrl, breadcrumbs),
  ];

  const thaiHighlights = [
    {
      title: 'Sen Meridian Acupressure',
      desc: 'Therapists apply rhythmic thumb, palm, and elbow pressure along the 10 primary energetic pathways to release stagnant muscular tension and enhance vitality.',
      icon: Activity,
    },
    {
      title: 'Assisted Yogic Stretches',
      desc: 'Gentle, guided passive stretches decompress the spine, elongate tight hamstrings, open restricted hip capsules, and expand joint range of motion.',
      icon: HeartHandshake,
    },
    {
      title: 'Zero Heavy Oils Applied',
      desc: 'Conducted fully clothed in sterile, loose-fitting cotton sanctuary garments, making it ideal for busy professionals returning directly to meetings.',
      icon: ShieldCheck,
    },
    {
      title: 'Certified Master Bodyworkers',
      desc: 'Practiced by master therapists trained in authentic Southeast Asian bodywork mechanics and therapeutic musculoskeletal alignment.',
      icon: Award,
    },
  ];

  const sessionSteps = [
    {
      step: '01',
      title: 'Diagnostic Range of Motion Consultation',
      desc: 'A brief pre-session evaluation of your joint mobility, spinal curvature, and focal tight spots (hamstrings, hips, neck, or lower back).',
    },
    {
      step: '02',
      title: 'Comfortable Cotton Sanctuary Attire',
      desc: 'Guests change into freshly laundered, loose-fitting cotton clothing in a private, quiet climate-controlled suite.',
    },
    {
      step: '03',
      title: 'Rhythmic Compression from Feet to Crown',
      desc: 'Therapist applies rhythmic pressure starting from the soles of the feet, systematically ascending through legs and spine to warm the musculature.',
    },
    {
      step: '04',
      title: 'Dynamic Passive Stretches & Joint Traction',
      desc: 'Assisted yoga postures (cobra arch, spinal twists, shoulder chest openers) guided gently with patient breath synchronization.',
    },
    {
      step: '05',
      title: 'Cranial & Temple Acupressure with Jasmine Tisane',
      desc: 'Closing with gentle neck traction, scalp acupressure, and a calming antioxidant-rich herbal jasmine tisane.',
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F2]">
      <SEOHead config={seo} structuredData={structuredData} />

      {/* Hero Section */}
      <section className="bg-[#201C17] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#332D26]">
        <div className="max-w-4xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs text-[#C5BBAF]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-[#7A9988] font-medium">Thai Massage Bhopal</span>
          </nav>
          
          <div className="text-xs font-semibold uppercase tracking-widest text-[#7A9988] mb-2">
            Ancient Nuad Thai Bodywork · MP Nagar, Bhopal
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#FAF7F2] leading-tight text-balance">
            Traditional Thai Massage in Bhopal — Assisted Yoga Stretch & Mobility
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#ECE4D8] font-light max-w-2xl mx-auto leading-relaxed">
            Experience the ancient art of passive yoga stretching and rhythmic acupressure. 
            Conducted on comfortable firm floor mats with loose clothing provided in our quiet sanctuary suites in Bhopal.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onOpenBooking('thai-assisted-yoga-stretch')}
              className="px-6 py-3 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-sm flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Thai Massage (₹2,899)</span>
            </button>

            {BUSINESS_CONFIG.isPhoneConfigured && BUSINESS_CONFIG.phone && (
              <a
                href={`tel:${BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '')}`}
                onClick={() => trackPhoneClick('thai_massage_hero', BUSINESS_CONFIG.phone!)}
                className="px-6 py-3 border border-[#7A9988] hover:border-white text-[#FAF7F2] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#7A9988]" />
                <span>Call {BUSINESS_CONFIG.phone}</span>
              </a>
            )}

            {BUSINESS_CONFIG.isWhatsappConfigured && BUSINESS_CONFIG.whatsappNumber && (
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Nandini Spa, I would like to inquire about Traditional Thai Massage appointments in Bhopal.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('thai_massage_hero')}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Content & Hallmarks */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#446353] mb-1">
            Restorative Mobility & Energy Balance
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#28231D] font-normal tracking-tight">
            Why Choose Traditional Thai Massage at Nandini Spa?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#685F53] leading-relaxed">
            Unlike superficial oil rubs, authentic Thai bodywork acts as assisted yoga. 
            The therapist moves your limbs into gentle, therapeutic stretches while applying 
            targeted acupressure along biological Sen lines to discharge chronic lumbar compression, 
            relieve tight IT bands, and restore effortless physical posture.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {thaiHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-xl border border-[#E3DACD] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#E7EFEA] text-[#446353] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg text-[#28231D] font-medium mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#685F53] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Treatment Protocol: Step-by-Step */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E3DACD] shadow-xs mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#446353]">
              The 75-Minute Journey
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#28231D] font-medium mt-1">
              What to Expect During Your Thai Massage Session
            </h3>
            <p className="text-xs sm:text-sm text-[#685F53] mt-2">
              Every appointment is conducted in a serene, private suite with soft ambient lighting and soothing meditation music.
            </p>
          </div>

          <div className="space-y-6">
            {sessionSteps.map((stepItem) => (
              <div key={stepItem.step} className="flex items-start gap-4 sm:gap-6 pb-6 border-b border-[#F3EFE6] last:border-b-0 last:pb-0">
                <span className="font-serif text-xl sm:text-2xl text-[#446353] font-semibold shrink-0">
                  {stepItem.step}
                </span>
                <div>
                  <h4 className="font-serif text-base sm:text-lg text-[#28231D] font-medium">
                    {stepItem.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#685F53] mt-1 leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing & CTA Card inside Protocol */}
          <div className="mt-10 p-5 bg-[#FAF7F2] rounded-xl border border-[#E3DACD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-[#685F53] uppercase tracking-wider font-semibold">Standard Session Tariff</div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-serif font-bold text-[#28231D]">₹2,899</span>
                <span className="text-xs text-[#685F53]">/ 75 Minutes Complete Session</span>
              </div>
              <div className="text-[11px] text-[#446353] mt-1 font-medium">
                Includes loose therapy attire, private suite, and complimentary jasmine tisane.
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('thai-assisted-yoga-stretch')}
              className="w-full sm:w-auto px-6 py-3 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              Reserve Appointment
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-[#FAF7F2] p-6 sm:p-10 rounded-2xl border border-[#E3DACD] mb-16">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#446353]">
              Frequently Asked Questions
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#28231D] font-medium mt-1">
              Thai Massage in Bhopal: Answers for First-Time Guests
            </h3>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-[#E3DACD]">
                <h4 className="font-serif text-base text-[#28231D] font-semibold">
                  Q: {faq.q}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#685F53] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Treatments Navigation */}
        <div className="p-6 bg-white rounded-xl border border-[#E3DACD] flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          <div>
            <h4 className="font-serif text-lg text-[#28231D] font-medium">Explore Other Specialized Bodywork in Bhopal</h4>
            <p className="text-xs text-[#685F53] mt-0.5">Looking for oil-based deep tissue or couple packages?</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/full-body-massage"
              className="text-xs font-medium text-[#446353] hover:underline flex items-center gap-1"
            >
              <span>Full Body Massage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[#E3DACD]">·</span>
            <Link
              to="/couple-spa"
              className="text-xs font-medium text-[#446353] hover:underline flex items-center gap-1"
            >
              <span>Couple Spa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[#E3DACD]">·</span>
            <Link
              to="/luxury-spa"
              className="text-xs font-medium text-[#446353] hover:underline flex items-center gap-1"
            >
              <span>Luxury Spa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Location Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#446353]">
              Sanctuary Location
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#28231D] font-medium mt-1">
              Visit Nandini Spa in Bhopal
            </h3>
            <p className="text-xs text-[#685F53] mt-2">
              {BUSINESS_CONFIG.streetAddressPlaceholder}. Open 24 hours daily.
            </p>
          </div>

          <div className="w-full max-w-full overflow-hidden rounded-xl border border-[#E3DACD] shadow-sm">
            <GoogleMapsEmbed heightClass="h-[360px] sm:h-[420px]" />
          </div>
        </div>

      </section>
    </div>
  );
};
