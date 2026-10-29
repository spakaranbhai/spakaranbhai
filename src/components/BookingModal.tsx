import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, Sparkles, CheckCircle2, AlertCircle, Users, ArrowRight } from 'lucide-react';
import { SPA_SERVICES, SpaService } from '../data/spaData';
import { BUSINESS_CONFIG } from '../config/business';
import { Logo } from './Logo';
import { trackBookingCompleted } from '../utils/analytics';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [serviceId, setServiceId] = useState(preselectedServiceId || SPA_SERVICES[0]?.id || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('1');
  const [notes, setNotes] = useState('');

  // Validation & Submission States
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

  useEffect(() => {
    if (preselectedServiceId) {
      setServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleResetAndClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedService = SPA_SERVICES.find((s) => s.id === serviceId);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!name.trim()) err.name = 'Please provide your full name.';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) err.email = 'Please provide a valid email address.';
    if (!mobile.trim() || mobile.replace(/\D/g, '').length < 10) {
      err.mobile = 'Please provide a valid 10-digit mobile number.';
    }
    if (!serviceId) err.serviceId = 'Please select a preferred treatment.';
    if (!date) err.date = 'Please pick a requested appointment date.';
    if (!time) err.time = 'Please pick a requested time slot.';
    
    // Check date is not in the past
    if (date) {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        err.date = 'Please select a current or upcoming date.';
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate concierge appointment intake
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
    }, 650);
  };

  const handleResetAndClose = () => {
    setSubmittedData(null);
    setName('');
    setEmail('');
    setMobile('');
    setDate('');
    setTime('');
    setNotes('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#201C17]/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#E3DACD] overflow-hidden my-auto sm:my-8 max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Header — Warm Espresso (#201C17) */}
        <div className="bg-[#201C17] text-white px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-[#332D26] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <Logo variant="light" size="sm" showTagline={false} useFullBadge={false} />
            <div className="min-w-0">
              <h3 id="booking-modal-title" className="font-serif text-lg sm:text-xl font-medium tracking-tight text-[#FAF7F2] truncate">
                Reserve Your Sanctuary Experience
              </h3>
              <p className="text-[11px] sm:text-xs text-[#7A9988] truncate">
                {BUSINESS_CONFIG.city}, {BUSINESS_CONFIG.state} · {BUSINESS_CONFIG.brandShort} Concierge Intake
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            aria-label="Close booking modal"
            className="p-1.5 text-[#C5BBAF] hover:text-white rounded-md hover:bg-[#2E2822] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto bg-[#FAF7F2]">
          {submittedData ? (
            /* Success Confirmation State */
            <div className="py-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#E7EFEA] border border-[#7A9988] flex items-center justify-center text-[#446353] mb-5">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="font-serif text-2xl font-semibold text-[#28231D]">
                Appointment Request Submitted
              </h4>
              <p className="text-xs text-[#685F53] uppercase tracking-wider mt-1">
                Concierge Reference Code: <span className="font-mono font-bold text-[#446353]">{submittedData.referenceId}</span>
              </p>

              <div className="mt-6 w-full max-w-md bg-white border border-[#E3DACD] rounded-lg p-5 text-left text-xs text-[#28231D] flex flex-col gap-2.5 shadow-xs">
                <div className="flex justify-between py-1 border-b border-[#F3EFE6]">
                  <span className="text-[#685F53]">Guest Name:</span>
                  <span className="font-medium text-[#28231D]">{submittedData.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F3EFE6]">
                  <span className="text-[#685F53]">Requested Treatment:</span>
                  <span className="font-medium text-[#28231D]">{submittedData.serviceTitle}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F3EFE6]">
                  <span className="text-[#685F53]">Requested Slot:</span>
                  <span className="font-medium text-[#28231D]">{submittedData.date} at {submittedData.time}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#685F53]">Confirmation Email:</span>
                  <span className="font-medium text-[#28231D]">{submittedData.email}</span>
                </div>
              </div>

              {/* Sanctuary Reservation Policy */}
              <div className="mt-6 p-4 rounded-lg bg-[#E7EFEA] border border-[#7A9988]/40 text-[#28231D] text-xs text-left leading-relaxed">
                <p className="font-semibold mb-1 flex items-center gap-1.5 text-[#446353]">
                  <AlertCircle className="w-4 h-4 text-[#446353] shrink-0" />
                  Sanctuary Reservation Policy:
                </p>
                <p className="text-[#685F53]">
                  To guarantee adequate therapist preparation and customized treatment suite readiness, 
                  all bookings at <strong>{BUSINESS_CONFIG.brandName}</strong> are confirmed individually. 
                  Our guest concierge will review practitioner availability and contact you at <strong>{submittedData.email}</strong> within 
                  2 business hours to finalize your scheduled appointment time.
                </p>
              </div>

              <button
                onClick={handleResetAndClose}
                className="mt-6 px-6 py-2.5 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-xs"
              >
                Return to Sanctuary
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div className="bg-[#E7EFEA] border border-[#7A9988]/40 rounded-lg p-4 text-xs text-[#28231D] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#446353] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#28231D]">Tailored Mindful Care:</span> Submit your preferred 
                  treatment and timing. Our concierge desk in Bhopal will review therapist availability and promptly confirm your slot.
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="bm-service" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                  Select Treatment / Ritual *
                </label>
                <select
                  id="bm-service"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#446353] transition-colors ${
                    errors.serviceId ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                  }`}
                >
                  {SPA_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.duration} — ₹{s.price.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
                {errors.serviceId && <p className="text-red-600 text-xs mt-1">{errors.serviceId}</p>}
              </div>

              {/* Selected Service Preview Strip */}
              {selectedService && (
                <div className="flex items-center justify-between p-3 bg-[#F3EFE6] rounded-md border border-[#E3DACD] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#685F53] font-medium">Session Duration:</span>
                    <span className="font-semibold text-[#28231D]">{selectedService.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#685F53] font-medium">Tariff:</span>
                    <span className="font-mono text-base font-semibold text-[#28231D]">₹{selectedService.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bm-name" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C8275] absolute left-3 top-3 pointer-events-none" />
                    <input
                      id="bm-name"
                      type="text"
                      placeholder="e.g. Radhika Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={!!errors.name}
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#446353] ${
                        errors.name ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="bm-email" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C8275] absolute left-3 top-3 pointer-events-none" />
                    <input
                      id="bm-email"
                      type="email"
                      placeholder="e.g. radhika@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={!!errors.email}
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#446353] ${
                        errors.email ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Mobile Phone & Number of Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bm-mobile" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C8275] absolute left-3 top-3 pointer-events-none" />
                    <input
                      id="bm-mobile"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#446353] ${
                        errors.mobile ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                      }`}
                    />
                  </div>
                  {errors.mobile && <p className="text-red-600 text-xs mt-1">{errors.mobile}</p>}
                </div>

                <div>
                  <label htmlFor="bm-guests" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#8C8275] absolute left-3 top-3 pointer-events-none" />
                    <select
                      id="bm-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-md border border-[#E3DACD] text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#446353]"
                    >
                      <option value="1">1 Guest (Private Suite)</option>
                      <option value="2">2 Guests (Couples Suite)</option>
                      <option value="3">3 Guests (Group Reservation)</option>
                      <option value="4+">4+ Guests (Spa Day Party)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bm-date" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#8C8275] absolute left-3 top-3 pointer-events-none" />
                    <input
                      id="bm-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full pl-9 pr-3.5 py-2 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#446353] ${
                        errors.date ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                      }`}
                    />
                  </div>
                  {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label htmlFor="bm-time" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                    Preferred Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#8C8275] absolute left-3 top-3 pointer-events-none" />
                    <select
                      id="bm-time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-md border text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#446353] ${
                        errors.time ? 'border-red-400 bg-red-50/20' : 'border-[#E3DACD]'
                      }`}
                    >
                      <option value="">Select a preferred time (24 Hours Available)</option>
                      <option value="08:00 AM">Morning · 08:00 AM</option>
                      <option value="10:00 AM">Morning · 10:00 AM</option>
                      <option value="11:30 AM">Morning · 11:30 AM</option>
                      <option value="01:00 PM">Afternoon · 01:00 PM</option>
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
                  </div>
                  {errors.time && <p className="text-red-600 text-xs mt-1">{errors.time}</p>}
                </div>
              </div>

              {/* Special Requests or Health Notes */}
              <div>
                <label htmlFor="bm-notes" className="block text-xs font-semibold uppercase tracking-wider text-[#28231D] mb-1.5">
                  Pressure Preference or Special Focus Areas (Optional)
                </label>
                <textarea
                  id="bm-notes"
                  rows={2}
                  placeholder="e.g. Focus on neck and shoulder tightness, prefer firm pressure, or any allergies..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E3DACD] text-sm text-[#28231D] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#446353] placeholder:text-[#8C8275]/60"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E3DACD]">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 text-xs font-medium text-[#685F53] hover:text-[#28231D] rounded-sm hover:bg-[#F3EFE6] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#446353] hover:bg-[#365143] disabled:bg-[#7A9988] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-sm cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Submit Appointment Request</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
