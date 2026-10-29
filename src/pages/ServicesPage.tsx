import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { SPA_SERVICES, SpaService } from '../data/spaData';
import { SEOHead } from '../components/SEOHead';
import { ROUTE_SEO, generateFAQSchema, generateBreadcrumbsSchema, getProductionBaseUrl } from '../data/seoData';
import { trackBookingTrigger } from '../utils/analytics';

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectService: (service: SpaService) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenBooking,
  onSelectService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const baseUrl = getProductionBaseUrl();
  const seo = ROUTE_SEO.services;

  const categories = [
    'All',
    'Bodywork & Muscle Relief',
    'Hydro & Thermal Therapy',
    'Vedic Healing Rituals',
    'Botanical Facial Care',
    'Sanctuary Packages',
  ];

  const filtered = SPA_SERVICES.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.idealFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const faqs = [
    {
      q: 'What is provided for my appointment at Nandini Spa?',
      a: 'We provide single-use organic modesty undergarments, plush waffle robes, and sanitized slippers. During your session, you are fully draped with freshly warmed towels, uncovering only the specific muscle area being treated.',
    },
    {
      q: 'How early should I arrive in Bhopal?',
      a: 'Please arrive 15 minutes prior to your scheduled reservation. This gives you time to unwind in our hydro-reflection lounge with a welcoming tisane and complete your wellness diagnostic sheet.',
    },
    {
      q: 'Can I adjust the massage pressure during my session?',
      a: 'Always. Your therapist will confirm your preferred depth (light, medium, or firm therapeutic) before starting. You are encouraged to communicate any adjustments at any time during your therapy.',
    },
    {
      q: 'Do your botanical oils accommodate skin sensitivities?',
      a: 'Yes. Our carrier oils (such as cold-pressed sweet almond, golden jojoba, and cold-pressed black sesame) are food-grade and free of synthetic stabilizers. Hypoallergenic organic grapeseed oil is always available upon request.',
    },
  ];

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services & Pricing', path: '/services' },
  ];

  const structuredData = [
    generateBreadcrumbsSchema(baseUrl, breadcrumbs),
    generateFAQSchema(faqs),
  ];

  return (
    <div className="w-full bg-[#FAF7F2]">
      <SEOHead config={seo} structuredData={structuredData} />
      
      {/* Page Header — Warm Espresso (#201C17) */}
      <section className="bg-[#201C17] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#332D26]">
        <div className="max-w-4xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs text-[#C5BBAF]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#7A9988] font-medium">Services & Pricing</span>
          </nav>
          <div className="text-xs font-semibold uppercase tracking-widest text-[#7A9988] mb-2">
            The Nandini Menu · Bhopal
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#FAF7F2]">
            Restorative Therapies & Rituals in Bhopal
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#ECE4D8] font-light max-w-2xl mx-auto leading-relaxed">
            Explore our curated menu of musculoskeletal bodywork, hydrothermal stone care, and organic cellular facials. 
            Every reservation includes private en-suite amenities and post-treatment tisanes.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar — Sticky Pure White with Warm Border */}
      <section className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#E3DACD] py-3 sm:py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#446353] text-white font-semibold shadow-xs'
                    : 'bg-[#F3EFE6] text-[#28231D] hover:bg-[#E7EFEA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#8C8275] absolute left-3 top-3 md:top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search treatments or concerns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 md:py-1.5 text-sm md:text-xs rounded-md border border-[#E3DACD] text-[#28231D] bg-[#FAF7F2] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#446353]"
            />
          </div>

        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-[#685F53] bg-white rounded-xl border border-[#E3DACD] p-8">
            <p className="text-base font-medium text-[#28231D]">No treatments matched your criteria.</p>
            <p className="text-xs text-[#685F53] mt-1">Try resetting the category filter or searching for a different keyword.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#446353] hover:bg-[#365143] text-white text-xs rounded font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-[#E3DACD] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-16/10 sm:h-56 w-full bg-[#F3EFE6] overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      loading="lazy"
                      width="600"
                      height="375"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-[#28231D]/85 backdrop-blur-xs text-[#FAF7F2] text-[11px] font-medium px-2.5 py-1 rounded">
                      {service.category}
                    </div>
                    {service.popular && (
                      <div className="absolute top-3 right-3 bg-[#F7EDE8] text-[#B3644C] border border-[#E8D3CB] text-[11px] font-semibold px-2.5 py-1 rounded">
                        Signature
                      </div>
                    )}
                  </div>

                  {/* Body Details */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#685F53] mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#446353]" />
                        <span>{service.duration}</span>
                      </span>
                      <span className="font-mono text-base font-semibold text-[#28231D]">
                        ₹{service.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#28231D] tracking-tight leading-snug line-clamp-2 min-h-[3rem] sm:min-h-[3.25rem] flex items-center">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#685F53] line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Key benefits */}
                    <div className="mt-4 pt-3 border-t border-[#F3EFE6] space-y-1.5">
                      {service.benefits.slice(0, 2).map((b, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-[#28231D]">
                          <Check className="w-3.5 h-3.5 text-[#446353] shrink-0 mt-0.5" />
                          <span className="truncate text-[#685F53]">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 flex items-center justify-between gap-2 sm:gap-3 border-t border-[#F3EFE6]">
                  <button
                    onClick={() => onSelectService(service)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#685F53] hover:text-[#446353] underline underline-offset-4 cursor-pointer py-1"
                  >
                    View Protocol
                  </button>
                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className="px-3.5 sm:px-4 py-2 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-xs shrink-0"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Etiquette & FAQs — Soft Cream (#F3EFE6) Section */}
      <section className="py-20 bg-[#F3EFE6] border-t border-[#E3DACD] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#446353] mb-1.5">
              Guest Guidance
            </div>
            <h2 className="font-serif text-3xl text-[#28231D] font-normal tracking-tight">
              Frequently Asked Questions & Etiquette
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-xl border border-[#E3DACD] shadow-xs"
              >
                <h4 className="font-serif text-base font-semibold text-[#28231D] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#446353] shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#685F53] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Quick CTA */}
          <div className="mt-12 text-center p-8 bg-[#201C17] text-white rounded-xl shadow-sm border border-[#332D26]">
            <h3 className="font-serif text-2xl font-medium text-[#FAF7F2]">
              Seeking a Bespoke Treatment Package?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#C5BBAF] max-w-xl mx-auto">
              Our reservation team in Bhopal will gladly recommend the ideal combination of therapies 
              tailored to your physical health and recovery schedule.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-xs"
              >
                Request Custom Sanctuary Reservation
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
