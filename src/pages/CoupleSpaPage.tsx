import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Check, Sparkles, Phone, MessageSquare, MapPin, Heart, ShieldCheck, Award } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { SEOHead } from '../components/SEOHead';
import { ROUTE_SEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbsSchema, getProductionBaseUrl } from '../data/seoData';
import { GoogleMapsEmbed } from '../components/GoogleMapsEmbed';
import { trackBookingTrigger, trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';

interface CoupleSpaPageProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const CoupleSpaPage: React.FC<CoupleSpaPageProps> = ({ onOpenBooking }) => {
  const baseUrl = getProductionBaseUrl();
  const seo = ROUTE_SEO.coupleSpa;

  const faqs = [
    {
      q: 'What is included in the Nandini Sanctuary Couples Haven package in Bhopal?',
      a: 'The Couples Haven includes complete private VIP suite seclusion for 90 minutes, side-by-side bespoke 75-minute therapeutic massages (Deep Tissue, Swedish, or Aromatherapy customized for each guest), warm rose and mint mineral foot soak rituals, subtle scalp tension release, private ensuite rainfall shower amenities, and artisan herbal tisanes with celebratory fruit delicacies.',
    },
    {
      q: 'Can both partners choose different massage therapies during the couple spa session?',
      a: 'Yes, absolutely. One partner can select firm deep tissue therapy while the other enjoys gentle lavender aromatherapy or warm basalt stone care. Each therapist tailors pressure and techniques to each individual guest.',
    },
    {
      q: 'Is advance reservation required for the VIP couple suite at Nandini Spa?',
      a: 'Yes. Because our VIP couples suite is prepared with fresh autoclaved linens, heated massage beds, and private hydrothermal preparations, we strongly recommend booking at least 24 hours in advance, especially for weekend and anniversary celebrations.',
    },
    {
      q: 'Can we book a couple spa session as an anniversary or birthday surprise gift?',
      a: 'Yes! We offer bespoke gift reservations and digital gift vouchers. Our concierge team can arrange custom welcome messages, floral touches, and discreet billing arrangements for surprise celebrations in Bhopal.',
    },
  ];

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Couple Spa Bhopal', path: '/couple-spa' },
  ];

  const structuredData = [
    generateServiceSchema(
      baseUrl,
      'Couple Spa in Bhopal',
      seo.description,
      '/couple-spa',
      '5899'
    ),
    generateFAQSchema(faqs),
    generateBreadcrumbsSchema(baseUrl, breadcrumbs),
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
            <span className="text-[#7A9988] font-medium">Couple Spa</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E2822] text-[#7A9988] text-xs font-semibold uppercase tracking-widest mb-4 border border-[#3E362E]">
            <Heart className="w-3.5 h-3.5 text-[#B3644C]" />
            <span>VIP Dual Sanctuary Suite · Bhopal</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF7F2] leading-tight">
            Luxury Couple Spa Sanctuary in Bhopal
          </h1>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-[#ECE4D8] font-light max-w-3xl mx-auto leading-relaxed">
            Escape into complete tranquility together. Experience side-by-side synchronized massages 
            in our private VIP executive suite, complete with private rainfall showers, aromatic rose foot soaks, 
            and artisan herbal refreshments in Maharana Pratap Nagar, Bhopal.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                trackBookingTrigger('nandini-couples-haven', 'couple_spa_hero');
                onOpenBooking('nandini-couples-haven');
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Couple Suite</span>
            </button>

            {BUSINESS_CONFIG.phone && (
              <a
                href={`tel:${BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '')}`}
                onClick={() => trackPhoneClick('couple_spa_hero', BUSINESS_CONFIG.phone!)}
                className="w-full sm:w-auto px-6 py-3.5 border border-[#ECE4D8] hover:border-white text-[#FAF7F2] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#7A9988]" />
                <span>Call {BUSINESS_CONFIG.phone}</span>
              </a>
            )}

            {BUSINESS_CONFIG.isWhatsappConfigured && BUSINESS_CONFIG.whatsappNumber && (
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Nandini Spa Bhopal, I would like to inquire about booking the Couple Spa package.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('couple_spa_hero')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Package Highlight Bento */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl border border-[#E3DACD] p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F7EDE8] text-[#B3644C] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premier VIP Experience · ₹5,899 / 90 Mins</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#28231D] font-normal tracking-tight">
              Nandini Sanctuary Couples Haven
            </h2>

            <p className="text-sm sm:text-base text-[#685F53] leading-relaxed">
              Designed specifically for couples, companions, or milestone celebrations seeking shared renewal 
              away from the bustle of daily life. Enjoy complete uninterrupted privacy within our climate-controlled suite.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-[#28231D]">
                <div className="w-5 h-5 rounded-full bg-[#E7EFEA] text-[#446353] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Side-by-Side Dual Massage (75 Mins):</strong> Synchronized therapeutic touch customized for each person.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#28231D]">
                <div className="w-5 h-5 rounded-full bg-[#E7EFEA] text-[#446353] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Aromatic Mineral Foot Soak:</strong> Soothing sea salts, organic rose petals, and peppermint oils.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#28231D]">
                <div className="w-5 h-5 rounded-full bg-[#E7EFEA] text-[#446353] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Private En-Suite Rainfall Shower:</strong> Luxury shower amenities, fresh waffle robes, and organic skin nourishment.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#28231D]">
                <div className="w-5 h-5 rounded-full bg-[#E7EFEA] text-[#446353] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Artisan Refreshment Service:</strong> Handcrafted cardamom tisane, infused waters, and seasonal delicacy bites.</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  trackBookingTrigger('nandini-couples-haven', 'couple_bento');
                  onOpenBooking('nandini-couples-haven');
                }}
                className="px-6 py-3 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Book Couple Package
              </button>
              <span className="text-xs text-[#685F53]">Advance 24hr reservation recommended</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden shadow-lg border border-[#E3DACD] aspect-4/3 bg-[#F3EFE6]">
              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80"
                alt="VIP Couples Spa Suite at Nandini Spa Bhopal"
                className="w-full h-full object-cover"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Celebrations Section */}
      <section className="py-16 bg-[#F3EFE6] border-y border-[#E3DACD] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#446353] mb-2">
              Unforgettable Memories
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#28231D] font-normal tracking-tight">
              Perfect For Special Occasions in Bhopal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#E3DACD] shadow-xs">
              <Heart className="w-8 h-8 text-[#B3644C] mb-4" />
              <h3 className="font-serif text-xl font-medium text-[#28231D] mb-2">Anniversaries & Milestones</h3>
              <p className="text-xs sm:text-sm text-[#685F53] leading-relaxed">
                Celebrate your partnership with hours of quiet relaxation, subtle acoustic melodies, and world-class bodywork in complete privacy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E3DACD] shadow-xs">
              <Sparkles className="w-8 h-8 text-[#446353] mb-4" />
              <h3 className="font-serif text-xl font-medium text-[#28231D] mb-2">Pre-Wedding Rejuvenation</h3>
              <p className="text-xs sm:text-sm text-[#685F53] leading-relaxed">
                De-stress before your wedding festivities. Release planning anxiety, soothe tight neck muscles, and restore natural skin glow together.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E3DACD] shadow-xs">
              <Award className="w-8 h-8 text-[#C89D66] mb-4" />
              <h3 className="font-serif text-xl font-medium text-[#28231D] mb-2">Weekend Wellness Retreat</h3>
              <p className="text-xs sm:text-sm text-[#685F53] leading-relaxed">
                The perfect weekend retreat without leaving Bhopal. Recharge bodily energy and enjoy uninterrupted connection in our sanctuary suites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#446353] mb-2">
            Common Questions
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#28231D] font-normal tracking-tight">
            Couple Spa FAQs · Bhopal
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
              Visit Nandini Spa at MP Nagar, Bhopal
            </h2>
            <p className="text-xs sm:text-sm text-[#685F53] mt-2">
              Board Office Chouraha, Zone-II, Maharana Pratap Nagar, Bhopal. Secure underground parking available.
            </p>
          </div>
          <GoogleMapsEmbed />
        </div>
      </section>
    </div>
  );
};
