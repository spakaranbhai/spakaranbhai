import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Check, Sparkles, Phone, MessageSquare, MapPin, ArrowRight, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { SEOHead } from '../components/SEOHead';
import { ROUTE_SEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbsSchema, getProductionBaseUrl } from '../data/seoData';
import { GoogleMapsEmbed } from '../components/GoogleMapsEmbed';
import { trackBookingTrigger, trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';
import { SpaService } from '../data/spaData';

interface FullBodyMassagePageProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectService?: (service: SpaService) => void;
}

export const FullBodyMassagePage: React.FC<FullBodyMassagePageProps> = ({ onOpenBooking }) => {
  const baseUrl = getProductionBaseUrl();
  const seo = ROUTE_SEO.fullBodyMassage;

  const faqs = [
    {
      q: 'What is included in a full body massage session at Nandini Spa Bhopal?',
      a: 'Every full body massage includes a preliminary muscular posture check, a warm floral foot soak, custom-blended organic carrier oils (sweet almond, jojoba, or black sesame), full anatomical manipulation from neck to toes in a private climate-controlled suite, en-suite hot rainfall shower amenities, and a soothing herbal tisane.',
    },
    {
      q: 'Which full body massage is best for chronic neck, shoulder, and back stiffness?',
      a: 'Our signature Nandini Kinetic Muscle Reset & Deep Tissue Therapy is specifically formulated for chronic postural strain, office computer fatigue, and deep muscle spasms. Our practitioners apply sustained forearm and thumb compression along trigger points to break down tight myofascial knots.',
    },
    {
      q: 'What should I wear during the massage, and how is guest privacy maintained?',
      a: 'Your modesty and comfort are our absolute priority. We provide sterile single-use disposable undergarments, plush waffle robes, and sanitized slippers. During therapy, you remain fully draped under freshly autoclaved warm towels, with only the specific muscle area being worked on uncovered.',
    },
    {
      q: 'Where in Bhopal is Nandini Spa located for body massage appointments?',
      a: 'Nandini Spa is conveniently located at Board Office Chouraha, Zone-II, Maharana Pratap Nagar (MP Nagar), Bhopal, Madhya Pradesh 462011. We are easily accessible from Arera Colony, DB City Mall, Shivaji Nagar, and Habibganj.',
    },
    {
      q: 'How do I book a full body massage slot in Bhopal?',
      a: 'You can reserve online through our appointment booking system, call our concierge directly at +91 90604 33848, or message us on WhatsApp for same-day availability.',
    },
  ];

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Full Body Massage Bhopal', path: '/full-body-massage' },
  ];

  const structuredData = [
    generateServiceSchema(
      baseUrl,
      'Full Body Massage in Bhopal',
      seo.description,
      '/full-body-massage',
      '2499'
    ),
    generateFAQSchema(faqs),
    generateBreadcrumbsSchema(baseUrl, breadcrumbs),
  ];

  const massageModalities = [
    {
      id: 'nandini-deep-recovery',
      title: 'Kinetic Deep Tissue & Muscle Reset',
      duration: '60 / 90 Mins',
      price: '₹2,699',
      ideal: 'Chronic desk stiffness, deep knots, lower back strain, and sports fatigue.',
      highlights: ['Targeted trigger-point ischemic compression', 'Postural myofascial realignment', 'Arnica and wintergreen organic botanical extracts'],
    },
    {
      id: 'swedish-stress-recovery',
      title: 'Classic Swedish Stress Recovery',
      duration: '60 Mins',
      price: '₹2,499',
      ideal: 'General relaxation, circulation enhancement, and mental stress relief.',
      highlights: ['Rhythmic effleurage and petrissage gliding', 'Accelerates venous circulation', 'Warm lavender and sweet almond oil hydration'],
    },
    {
      id: 'oceanic-basalt-stone',
      title: 'Warm Basalt Stone Bodywork',
      duration: '75 Mins',
      price: '₹3,199',
      ideal: 'Stubborn joint stiffness, deep systemic tension, and cold weather relief.',
      highlights: ['Wave-smoothed mineral volcanic stones', 'Thermal penetration without harsh manual pressure', 'Chakra spinal alignment and mineral oil sweep'],
    },
    {
      id: 'balinese-palm-harmony',
      title: 'Balinese Harmony & Acupressure',
      duration: '75 Mins',
      price: '₹2,799',
      ideal: 'Energy restoration, full-body balance, and medium-firm holistic pressure.',
      highlights: ['Ancient Indonesian palm rolling and thumb kneeling', 'Organic frangipani and coconut aromatics', 'Stimulates deep lymphatic drainage'],
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F2]">
      <SEOHead config={seo} structuredData={structuredData} />

      {/* Hero Section */}
      <section className="bg-[#201C17] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#332D26]">
        <div className="max-w-5xl mx-auto text-center">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs text-[#C5BBAF]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-[#7A9988] font-medium">Full Body Massage</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E2822] text-[#7A9988] text-xs font-semibold uppercase tracking-widest mb-4 border border-[#3E362E]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Maharana Pratap Nagar (MP Nagar), Bhopal</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF7F2] leading-tight">
            Therapeutic Full Body Massage in Bhopal
          </h1>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-[#ECE4D8] font-light max-w-3xl mx-auto leading-relaxed">
            Relieve physical exhaustion and deep-seated spinal compression with master anatomical bodywork. 
            Enjoy personalized trigger-point manipulation, heated basalt stones, and cold-pressed botanical essences 
            in private, sound-damped treatment suites at <strong>Nandini Spa Bhopal</strong>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                trackBookingTrigger('nandini-deep-recovery', 'full_body_hero');
                onOpenBooking('nandini-deep-recovery');
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Full Body Massage</span>
            </button>

            {BUSINESS_CONFIG.phone && (
              <a
                href={`tel:${BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '')}`}
                onClick={() => trackPhoneClick('full_body_hero', BUSINESS_CONFIG.phone!)}
                className="w-full sm:w-auto px-6 py-3.5 border border-[#ECE4D8] hover:border-white text-[#FAF7F2] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#7A9988]" />
                <span>Call {BUSINESS_CONFIG.phone}</span>
              </a>
            )}

            {BUSINESS_CONFIG.isWhatsappConfigured && BUSINESS_CONFIG.whatsappNumber && (
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Nandini Spa Bhopal, I would like to inquire about full body massage appointments.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('full_body_hero')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-8 bg-[#F3EFE6] border-b border-[#E3DACD] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3">
            <ShieldCheck className="w-6 h-6 text-[#446353] mx-auto mb-1.5" />
            <div className="text-xs font-semibold text-[#28231D]">100% Suite Privacy</div>
            <div className="text-[11px] text-[#685F53]">Ensuite rainfall showers & climate control</div>
          </div>
          <div className="p-3">
            <Award className="w-6 h-6 text-[#446353] mx-auto mb-1.5" />
            <div className="text-xs font-semibold text-[#28231D]">Certified Kinesiologists</div>
            <div className="text-[11px] text-[#685F53]">Trained in musculoskeletal trigger-points</div>
          </div>
          <div className="p-3">
            <Sparkles className="w-6 h-6 text-[#446353] mx-auto mb-1.5" />
            <div className="text-xs font-semibold text-[#28231D]">Pure Cold-Pressed Oils</div>
            <div className="text-[11px] text-[#685F53]">Zero mineral oils, parabens, or synthetic fragrance</div>
          </div>
          <div className="p-3">
            <HeartHandshake className="w-6 h-6 text-[#446353] mx-auto mb-1.5" />
            <div className="text-xs font-semibold text-[#28231D]">Strict Hygiene Standards</div>
            <div className="text-[11px] text-[#685F53]">Autoclaved linens & fresh towels for each guest</div>
          </div>
        </div>
      </section>

      {/* Modalities Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#446353] mb-2">
            Signature Bodywork Therapies · Bhopal
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#28231D] font-normal tracking-tight">
            Our Full Body Massage Modalities
          </h2>
          <p className="mt-3 text-sm text-[#685F53]">
            Whether you need deep trigger-point deactivation from long work hours or gentle aromatherapeutic calm, 
            our certified therapists tailor pressure, techniques, and botanical oils to your exact bodily needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {massageModalities.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-[#E3DACD] p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#28231D]">
                    {item.title}
                  </h3>
                  <span className="font-mono text-base font-bold text-[#446353]">{item.price}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-[#685F53] mb-4">
                  <Clock className="w-3.5 h-3.5 text-[#7A9988]" />
                  <span>{item.duration}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#28231D] mb-4 leading-relaxed">
                  <strong>Recommended For:</strong> {item.ideal}
                </p>

                <div className="space-y-2 mb-6">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#685F53]">
                      <Check className="w-3.5 h-3.5 text-[#446353] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#F3EFE6] flex items-center justify-between">
                <span className="text-[11px] text-[#685F53]">Private ensuite amenities included</span>
                <button
                  onClick={() => {
                    trackBookingTrigger(item.id, 'modality_card');
                    onOpenBooking(item.id);
                  }}
                  className="px-4 py-2 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Book This</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Body Massage Benefits & Protocol */}
      <section className="py-16 bg-[#F3EFE6] border-y border-[#E3DACD] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#446353]">
              Musculoskeletal Recovery
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#28231D] font-normal tracking-tight">
              Clinically Informed Bodywork for Everyday Wellness
            </h2>
            <p className="text-sm text-[#685F53] leading-relaxed">
              Sedentary desk work, long commutes across Bhopal, and high stress compress the lumbar spine 
              and tighten the upper trapezius muscles. At Nandini Spa, our treatments do not simply glide over the skin; 
              they engage the fascial system, stretch tight tendons, and restore venous blood flow.
            </p>
            <ul className="space-y-3 text-sm text-[#28231D]">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E7EFEA] text-[#446353] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Relieves Chronic Knots:</strong> Targeted ischemic pressure breaks up stubborn lactic acid pockets.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E7EFEA] text-[#446353] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Stimulates Lymphatic Drainage:</strong> Reduces water retention and drains stagnant fluids.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E7EFEA] text-[#446353] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span><strong>Deep Theta Relaxation:</strong> Lowers circulating cortisol levels to promote restorative nighttime sleep.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden shadow-lg border border-[#E3DACD] aspect-4/3 bg-white">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80"
                alt="Therapist performing deep tissue full body massage in Bhopal at Nandini Spa"
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
            Guest Inquiries
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#28231D] font-normal tracking-tight">
            Frequently Asked Questions About Body Massage in Bhopal
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

      {/* Location & Directions */}
      <section className="py-12 bg-[#FAF7F2] border-t border-[#E3DACD] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#28231D]">
              Visit Our Sanctuary in MP Nagar, Bhopal
            </h2>
            <p className="text-xs sm:text-sm text-[#685F53] mt-2">
              Located at {BUSINESS_CONFIG.streetAddressPlaceholder}. Easily accessible with dedicated visitor parking.
            </p>
          </div>
          <GoogleMapsEmbed />
        </div>
      </section>
    </div>
  );
};
