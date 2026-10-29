import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, MessageSquare, ExternalLink, Settings, Navigation, Calendar } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { GoogleMapsEmbed } from '../components/GoogleMapsEmbed';
import { SEOHead } from '../components/SEOHead';
import { ROUTE_SEO, generateBreadcrumbsSchema, getProductionBaseUrl } from '../data/seoData';
import { trackContactFormSubmitted, trackPhoneClick, trackWhatsAppClick, trackDirectionsClick } from '../utils/analytics';

interface ContactPageProps {
  onOpenConfig?: () => void;
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenConfig, onOpenBooking }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Consultation');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const baseUrl = getProductionBaseUrl();
  const seo = ROUTE_SEO.contact;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact & Location', path: '/contact' },
  ];

  const structuredData = [
    generateBreadcrumbsSchema(baseUrl, breadcrumbs),
  ];

  const validate = () => {
    const err: Record<string, string> = {};
    if (!name.trim()) err.name = 'Please provide your full name.';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) err.email = 'Please provide a valid email address.';
    if (!message.trim()) err.message = 'Please enter your message or question.';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      trackContactFormSubmitted(subject);
    }, 600);
  };

  return (
    <div className="w-full bg-[#FAF7F2]">
      <SEOHead config={seo} structuredData={structuredData} />
      
      {/* Header — Warm Espresso (#201C17) */}
      <section className="bg-[#201C17] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#332D26]">
        <div className="max-w-4xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs text-[#C5BBAF]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#7A9988] font-medium">Contact & Location</span>
          </nav>
          <div className="text-xs font-semibold uppercase tracking-widest text-[#7A9988] mb-2">
            Sanctuary Inquiries & Location · Bhopal
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#FAF7F2]">
            Contact {BUSINESS_CONFIG.brandName}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#ECE4D8] font-light max-w-2xl mx-auto leading-relaxed">
            Have questions about specialized musculoskeletal treatments, group reservations, or navigation? 
            Our concierge in Maharana Pratap Nagar, Bhopal is at your service.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Business Details & Location Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#446353] mb-1">
                Direct Channels
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#28231D] font-normal tracking-tight">
                Connect With Concierge
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#685F53] leading-relaxed">
                We respond to all guest inquiries and appointment consultation requests within 2 business hours.
              </p>
            </div>

            {/* Info Cards — Pure White with Warm Borders */}
            <div className="space-y-4">
              
              {/* Email Card */}
              <div className="p-5 bg-white rounded-xl border border-[#E3DACD] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E7EFEA] flex items-center justify-center text-[#446353] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#685F53] font-semibold">Official Email</div>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}`}
                    className="text-sm font-medium text-[#28231D] hover:text-[#446353] hover:underline mt-0.5 block"
                  >
                    {BUSINESS_CONFIG.email}
                  </a>
                  <div className="text-[11px] text-[#685F53] mt-1">
                    For bookings, bespoke packages, and concierge inquiries
                  </div>
                </div>
              </div>

              {/* Mobile Phone Card */}
              <div className="p-5 bg-white rounded-xl border border-[#E3DACD] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E7EFEA] flex items-center justify-center text-[#446353] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wider text-[#685F53] font-semibold">Telephone / Mobile</div>
                  {BUSINESS_CONFIG.isPhoneConfigured && BUSINESS_CONFIG.phone ? (
                    <a
                      href={`tel:${BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '')}`}
                      onClick={() => trackPhoneClick('contact_page_card', BUSINESS_CONFIG.phone!)}
                      className="text-sm font-medium text-[#28231D] hover:text-[#446353] hover:underline mt-0.5 block"
                    >
                      {BUSINESS_CONFIG.phone}
                    </a>
                  ) : (
                    <div className="text-xs text-[#685F53] italic mt-0.5">
                      {BUSINESS_CONFIG.phoneDisplayPlaceholder}
                    </div>
                  )}

                  {/* WhatsApp button */}
                  {BUSINESS_CONFIG.isWhatsappConfigured && BUSINESS_CONFIG.whatsappNumber && (
                    <a
                      href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick('contact_page_card')}
                      className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1.5 bg-[#446353] hover:bg-[#365143] text-white text-xs rounded transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Message on WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Physical Location Card */}
              <div className="p-5 bg-white rounded-xl border border-[#E3DACD] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E7EFEA] flex items-center justify-center text-[#446353] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#685F53] font-semibold">City & Office Address</div>
                  <div className="text-sm font-semibold text-[#28231D] mt-0.5">
                    {BUSINESS_CONFIG.locality ? `${BUSINESS_CONFIG.locality}, ${BUSINESS_CONFIG.city}` : `Mansarovar Complex, Shivaji Nagar, ${BUSINESS_CONFIG.city}`}
                  </div>
                  <div className="text-xs text-[#685F53] mt-1 leading-relaxed">
                    {BUSINESS_CONFIG.streetAddressPlaceholder}
                  </div>
                  <div className="mt-2.5 flex items-center gap-2">
                    <a
                      href={BUSINESS_CONFIG.maps.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#446353] font-semibold hover:underline"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="p-5 bg-white rounded-xl border border-[#E3DACD] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E7EFEA] flex items-center justify-center text-[#446353] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#685F53] font-semibold">Sanctuary Hours</div>
                  <div className="text-xs text-[#28231D] mt-1 font-medium">{BUSINESS_CONFIG.hours.weekday}</div>
                  <div className="text-xs text-[#28231D] mt-0.5 font-medium">{BUSINESS_CONFIG.hours.weekend}</div>
                  <div className="text-[11px] text-[#685F53] italic mt-1.5">{BUSINESS_CONFIG.hours.notes}</div>
                </div>
              </div>

            </div>

            {/* Admin Config Button Callout */}
            {onOpenConfig && (
              <div className="p-4 rounded-xl bg-[#F3EFE6] border border-[#E3DACD] flex items-center justify-between gap-3 text-xs">
                <div className="text-[#28231D]">
                  <span className="font-semibold">Administrator Notice:</span> Need to update address or map embed?
                </div>
                <button
                  onClick={onOpenConfig}
                  className="px-3 py-1.5 bg-[#446353] hover:bg-[#365143] text-white rounded text-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <Settings className="w-3 h-3" />
                  <span>Update Config</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-8 md:p-10 rounded-xl border border-[#E3DACD] shadow-xs">
            <div className="mb-6 sm:mb-8">
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#28231D]">
                Send a Message to {BUSINESS_CONFIG.brandShort} Concierge
              </h3>
              <p className="text-xs sm:text-sm text-[#685F53] mt-1">
                Fill out the form below for therapy consultations, customized wellness plans, or private group events.
              </p>
            </div>

            {isSent ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#E7EFEA] border border-[#7A9988] flex items-center justify-center text-[#446353] mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-semibold text-[#28231D]">
                  Inquiry Dispatched
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#685F53] max-w-md">
                  Thank you, <strong>{name}</strong>. Our concierge desk in Bhopal has received your note and will reply to 
                  <strong> {email}</strong> shortly.
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 bg-[#F3EFE6] hover:bg-[#E3DACD] text-[#28231D] text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                  <button
                    onClick={onOpenBooking}
                    className="px-5 py-2.5 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                  >
                    Book an Appointment
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Sameer Dixit"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#446353] ${
                        errors.name ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                      }`}
                    />
                    {errors.name && <p id="contact-name-error" className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. sameer@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#446353] ${
                        errors.email ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                      }`}
                    />
                    {errors.email && <p id="contact-email-error" className="text-red-600 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                      Contact Phone (Optional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="Mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E3DACD] text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#446353]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E3DACD] text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#446353]"
                    >
                      <option value="General Consultation">General Consultation</option>
                      <option value="Treatment Recommendation">Treatment Recommendation</option>
                      <option value="Sanctuary Couples Booking">Sanctuary Couples Booking</option>
                      <option value="Corporate Wellness Retreat">Corporate Wellness Retreat</option>
                      <option value="Gift Certificates">Gift Certificates</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="How can Nandini Spa concierge assist your restorative wellness journey?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#446353] placeholder:text-[#8C8275]/60 ${
                      errors.message ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                    }`}
                  />
                  {errors.message && <p id="contact-message-error" className="text-red-600 text-xs mt-1">{errors.message}</p>}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-[#685F53]">
                    Ready to schedule? Use our{' '}
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="text-[#446353] underline font-medium cursor-pointer"
                    >
                      direct booking form
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#446353] hover:bg-[#365143] disabled:bg-[#7A9988] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-xs"
                  >
                    {isSending ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Inquiry</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* Full Width Integrated Google Maps & Local Navigation Section */}
      <section className="py-16 bg-white border-t border-[#E3DACD] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header & Local SEO Overview */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#446353] mb-2">
                Maharana Pratap Nagar Bhopal Spa & Official Location
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#28231D] font-normal tracking-tight">
                Find Nandini Spa in MP Nagar, Bhopal
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#685F53] leading-relaxed">
                Centrally situated at Board Office Chouraha in Zone-II, MP Nagar, Nandini Spa is Bhopal’s serene sanctuary for certified musculoskeletal bodywork and restorative holistic therapy. Whether you need a rejuvenating{' '}
                <Link to="/full-body-massage" className="text-[#446353] font-medium hover:underline">
                  Full Body Massage in Bhopal
                </Link>
                , an exclusive suite for a relaxing{' '}
                <Link to="/couple-spa" className="text-[#446353] font-medium hover:underline">
                  Couple Spa Bhopal
                </Link>
                , or premium thermal amenities at our{' '}
                <Link to="/luxury-spa" className="text-[#446353] font-medium hover:underline">
                  Luxury Spa in Bhopal
                </Link>
                , our master therapists are ready to serve you.
              </p>
            </div>

            {/* Quick Actions Cluster */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={BUSINESS_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDirectionsClick('contact_map_header')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-xs"
                aria-label="Get turn-by-turn directions to Nandini Spa on Google Maps"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </a>

              {BUSINESS_CONFIG.isPhoneConfigured && BUSINESS_CONFIG.phone && (
                <a
                  href={`tel:${BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '')}`}
                  onClick={() => trackPhoneClick('contact_map_header', BUSINESS_CONFIG.phone!)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#F3EFE6] border border-[#446353] text-[#446353] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
                  aria-label={`Call Nandini Spa at ${BUSINESS_CONFIG.phone}`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              )}

              {BUSINESS_CONFIG.isWhatsappConfigured && BUSINESS_CONFIG.whatsappNumber && (
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Nandini Spa, I would like to inquire about spa appointments in MP Nagar, Bhopal.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('contact_map_header')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
                  aria-label="Chat with Nandini Spa Concierge on WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}

              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#B3644C] hover:bg-[#9C543E] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                aria-label="Open appointment booking modal"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>

          {/* Responsive Map Embed Container */}
          <div className="w-full max-w-full overflow-hidden rounded-xl border border-[#E3DACD] shadow-sm">
            <GoogleMapsEmbed heightClass="h-[380px] sm:h-[460px] lg:h-[520px]" onOpenConfig={onOpenConfig} />
          </div>

          {/* Local Information Strip Under Map */}
          <div className="mt-6 p-4 sm:p-5 bg-[#FAF7F2] rounded-xl border border-[#E3DACD] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[#28231D]">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E7EFEA] text-[#446353] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-[#28231D]">
                  {BUSINESS_CONFIG.brandName} · {BUSINESS_CONFIG.locality || 'Zone-II, Maharana Pratap Nagar'}, {BUSINESS_CONFIG.city}
                </div>
                <div className="text-[#685F53] mt-0.5">
                  {BUSINESS_CONFIG.streetAddressPlaceholder} (Coordinates: {BUSINESS_CONFIG.maps.latitude.toFixed(4)}° N, {BUSINESS_CONFIG.maps.longitude.toFixed(4)}° E)
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-[#E3DACD]">
              <Link
                to="/services"
                className="text-[#446353] font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>View Treatment Menu & Pricing</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <span className="text-[#8C8275] hidden sm:inline">·</span>
              <a
                href={BUSINESS_CONFIG.maps.placeUrl || BUSINESS_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#685F53] hover:text-[#28231D] underline"
              >
                Official Google Maps Listing
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
