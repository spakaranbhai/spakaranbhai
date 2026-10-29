import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Mail, Sparkles, CheckCircle2, AlertCircle, Users, MessageSquare } from 'lucide-react';
import { SPA_SERVICES, SpaService } from '../data/spaData';
import { BUSINESS_CONFIG } from '../config/business';
import { SEOHead } from '../components/SEOHead';
import { ROUTE_SEO, generateBreadcrumbsSchema, getProductionBaseUrl } from '../data/seoData';
import { trackBookingCompleted, trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';
import { GoogleMapsEmbed } from '../components/GoogleMapsEmbed';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialServiceId = searchParams.get('service') || SPA_SERVICES[0]?.id || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [serviceId, setServiceId] = useState(initialServiceId);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('1');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    name: string;
    email: string;
    serviceTitle: string;
    date: string;
    time: string;
  } | null>(null);

  const baseUrl = getProductionBaseUrl();
  const seo = ROUTE_SEO.booking;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Book Appointment', path: '/booking' },
  ];

  const structuredData = [
    generateBreadcrumbsSchema(baseUrl, breadcrumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo.title,
      description: seo.description,
      url: `${baseUrl}/booking`,
    },
  ];

  const selectedService = SPA_SERVICES.find((s) => s.id === serviceId);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!name.trim()) err.name = 'Please enter your full name.';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) err.email = 'Please enter a valid email address.';
    if (!mobile.trim() || mobile.replace(/\D/g, '').length < 10) {
      err.mobile = 'Please enter a valid 10-digit mobile number.';
    }
    if (!serviceId) err.serviceId = 'Please select a preferred therapy.';
    if (!date) err.date = 'Please pick a requested appointment date.';
    if (!time) err.time = 'Please pick an appointment time slot.';

    if (date) {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        err.date = 'Please select a date today or in the future.';
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const refCode = `NANDINI-${Math.floor(100000 + Math.random() * 900000)}`;
      const title = selectedService?.title || 'Sanctuary Treatment';
      setSubmittedData({
        referenceId: refCode,
        name,
        email,
        serviceTitle: title,
        date,
        time,
      });
      trackBookingCompleted(refCode, title);
    }, 600);
  };

  return (
    <div className="w-full bg-[#FAF7F2]">
      <SEOHead config={seo} structuredData={structuredData} />

      {/* Header Banner */}
      <section className="bg-[#201C17] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#332D26]">
        <div className="max-w-4xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs text-[#C5BBAF]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#7A9988] font-medium">Book Appointment</span>
          </nav>

          <div className="text-xs font-semibold uppercase tracking-widest text-[#7A9988] mb-2">
            Sanctuary Reservations · Bhopal
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#FAF7F2]">
            Reserve Your Spa Sanctuary Appointment in Bhopal
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#ECE4D8] font-light max-w-2xl mx-auto leading-relaxed">
            Schedule your personalized bodywork, basalt stone therapy, or couples session. 
            Our guest concierge will verify practitioner availability and confirm your private suite.
          </p>
        </div>
      </section>

      {/* Main Reservation Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#E3DACD] p-6 sm:p-8 md:p-10 shadow-xs">
            {submittedData ? (
              <div className="py-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#E7EFEA] border border-[#7A9988] flex items-center justify-center text-[#446353] mb-5">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#28231D]">
                  Appointment Request Dispatched
                </h2>
                <p className="text-xs text-[#685F53] uppercase tracking-wider mt-1">
                  Concierge Reference Code: <span className="font-mono font-bold text-[#446353]">{submittedData.referenceId}</span>
                </p>

                <div className="mt-6 w-full max-w-md bg-[#FAF7F2] border border-[#E3DACD] rounded-lg p-5 text-left text-xs text-[#28231D] flex flex-col gap-2.5 shadow-xs">
                  <div className="flex justify-between py-1 border-b border-[#E3DACD]/50">
                    <span className="text-[#685F53]">Guest Name:</span>
                    <span className="font-medium text-[#28231D]">{submittedData.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E3DACD]/50">
                    <span className="text-[#685F53]">Selected Therapy:</span>
                    <span className="font-medium text-[#28231D]">{submittedData.serviceTitle}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E3DACD]/50">
                    <span className="text-[#685F53]">Requested Time:</span>
                    <span className="font-medium text-[#28231D]">{submittedData.date} at {submittedData.time}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#685F53]">Contact Email:</span>
                    <span className="font-medium text-[#28231D]">{submittedData.email}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-[#E7EFEA] border border-[#7A9988]/40 text-[#28231D] text-xs text-left leading-relaxed">
                  <p className="font-semibold mb-1 flex items-center gap-1.5 text-[#446353]">
                    <AlertCircle className="w-4 h-4 text-[#446353] shrink-0" />
                    Confirmation Protocol:
                  </p>
                  <p className="text-[#685F53]">
                    Our sanctuary concierge will review therapist availability and call or message you on WhatsApp 
                    within 2 business hours to finalize your appointment.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setSubmittedData(null);
                      setName('');
                      setEmail('');
                      setMobile('');
                      setDate('');
                      setTime('');
                      setNotes('');
                    }}
                    className="px-5 py-2.5 bg-[#F3EFE6] hover:bg-[#E3DACD] text-[#28231D] text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                  >
                    Submit Another Booking
                  </button>
                  <Link
                    to="/services"
                    className="px-5 py-2.5 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold rounded-sm transition-colors"
                  >
                    Explore Treatment Menu
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-medium text-[#28231D]">
                    Appointment Intake Form
                  </h2>
                  <p className="text-xs text-[#685F53] mt-1">
                    Fill in your details below. Fields marked with an asterisk (*) are required.
                  </p>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-name" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'booking-name-error' : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#446353] ${
                        errors.name ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                      }`}
                    />
                    {errors.name && <p id="booking-name-error" className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="booking-email" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'booking-email-error' : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#446353] ${
                        errors.email ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                      }`}
                    />
                    {errors.email && <p id="booking-email-error" className="text-red-600 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Mobile Phone & Treatment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-mobile" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                      Mobile Phone (10-Digit) *
                    </label>
                    <input
                      id="booking-mobile"
                      type="tel"
                      placeholder="e.g. 98765 43210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      aria-invalid={!!errors.mobile}
                      aria-describedby={errors.mobile ? 'booking-mobile-error' : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#446353] ${
                        errors.mobile ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                      }`}
                    />
                    {errors.mobile && <p id="booking-mobile-error" className="text-red-600 text-xs mt-1">{errors.mobile}</p>}
                  </div>

                  <div>
                    <label htmlFor="booking-service" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                      Selected Treatment *
                    </label>
                    <select
                      id="booking-service"
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E3DACD] text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#446353]"
                    >
                      {SPA_SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title} (₹{s.price})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="booking-date" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                      Date *
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      aria-invalid={!!errors.date}
                      aria-describedby={errors.date ? 'booking-date-error' : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#446353] ${
                        errors.date ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                      }`}
                    />
                    {errors.date && <p id="booking-date-error" className="text-red-600 text-xs mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <label htmlFor="booking-time" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                      Time Slot *
                    </label>
                    <select
                      id="booking-time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      aria-invalid={!!errors.time}
                      aria-describedby={errors.time ? 'booking-time-error' : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#446353] ${
                        errors.time ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                      }`}
                    >
                      <option value="">Choose slot (24 Hours Available)</option>
                      <option value="08:00 AM">Morning · 08:00 AM</option>
                      <option value="09:30 AM">Morning · 09:30 AM</option>
                      <option value="11:00 AM">Morning · 11:00 AM</option>
                      <option value="12:30 PM">Afternoon · 12:30 PM</option>
                      <option value="02:30 PM">Afternoon · 02:30 PM</option>
                      <option value="04:00 PM">Late Afternoon · 04:00 PM</option>
                      <option value="05:30 PM">Evening · 05:30 PM</option>
                      <option value="07:00 PM">Evening · 07:00 PM</option>
                      <option value="08:30 PM">Night · 08:30 PM</option>
                      <option value="10:00 PM">Night · 10:00 PM</option>
                      <option value="11:30 PM">Late Night · 11:30 PM</option>
                      <option value="01:00 AM">Late Night (24h) · 01:00 AM</option>
                      <option value="03:00 AM">Early Hours (24h) · 03:00 AM</option>
                      <option value="05:00 AM">Early Hours (24h) · 05:00 AM</option>
                      <option value="Immediate (24 Hours)">Immediate / Walk-in Now (24 Hours)</option>
                    </select>
                    {errors.time && <p id="booking-time-error" className="text-red-600 text-xs mt-1">{errors.time}</p>}
                  </div>

                  <div>
                    <label htmlFor="booking-guests" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                      Guests
                    </label>
                    <select
                      id="booking-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E3DACD] text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#446353]"
                    >
                      <option value="1">1 Guest (Single Suite)</option>
                      <option value="2">2 Guests (VIP Couple Suite)</option>
                      <option value="3+">3+ Guests (Group Sanctuary)</option>
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="booking-notes" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                    Special Musculoskeletal Concerns or Preferences (Optional)
                  </label>
                  <textarea
                    id="booking-notes"
                    rows={3}
                    placeholder="e.g. Focus on lower back and neck; prefer firm pressure; sensitive skin requiring hypoallergenic oils."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#E3DACD] text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#446353]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Request Reservation</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Policies & Quick Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-[#E3DACD] p-6 shadow-xs">
              <h3 className="font-serif text-xl font-medium text-[#28231D] mb-4">
                Sanctuary Policies & Etiquette
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-[#685F53] leading-relaxed">
                <p>
                  <strong>Arrival:</strong> Please arrive 15 minutes before your scheduled treatment to unwind in our lounge and complete your diagnostic sheet.
                </p>
                <p>
                  <strong>Suite Preparation:</strong> Private suites and en-suite rainfall showers are prepared exclusively for you with autoclaved linens.
                </p>
                <p>
                  <strong>Cancellation:</strong> If you must reschedule, please notify us at least 3 hours in advance so another guest may be accommodated.
                </p>
              </div>
            </div>

            {/* Direct Phone / WhatsApp Card */}
            <div className="bg-[#201C17] text-white rounded-xl p-6 border border-[#332D26]">
              <h3 className="font-serif text-xl font-normal text-[#FAF7F2] mb-2">
                Need Immediate Confirmation?
              </h3>
              <p className="text-xs text-[#C5BBAF] mb-4 leading-relaxed">
                For same-day reservations or bespoke celebrations, reach our concierge directly.
              </p>

              <div className="space-y-3">
                {BUSINESS_CONFIG.phone && (
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '')}`}
                    onClick={() => trackPhoneClick('booking_sidebar', BUSINESS_CONFIG.phone!)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-[#2E2822] hover:bg-[#3E362E] text-xs font-medium text-[#FAF7F2] transition-colors border border-[#3E362E]"
                  >
                    <Phone className="w-4 h-4 text-[#7A9988]" />
                    <span>Call {BUSINESS_CONFIG.phone}</span>
                  </a>
                )}

                {BUSINESS_CONFIG.isWhatsappConfigured && BUSINESS_CONFIG.whatsappNumber && (
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Nandini Spa Bhopal, I would like to book an appointment.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('booking_sidebar')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-[#25D366] hover:bg-[#20ba59] text-xs font-medium text-white transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Concierge</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-[#FAF7F2] border-t border-[#E3DACD] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-serif text-2xl text-[#28231D]">
              Our Sanctuary Location in Bhopal
            </h2>
            <p className="text-xs sm:text-sm text-[#685F53] mt-1">
              Board Office Chouraha, Zone-II, Maharana Pratap Nagar, Bhopal
            </p>
          </div>
          <GoogleMapsEmbed />
        </div>
      </section>
    </div>
  );
};
