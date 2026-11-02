import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { trackPhoneClick, trackWhatsAppClick, trackBookingTrigger } from '../utils/analytics';

interface MobileQuickActionBarProps {
  onOpenBooking: () => void;
}

export const MobileQuickActionBar: React.FC<MobileQuickActionBarProps> = ({ onOpenBooking }) => {
  const phoneTel = BUSINESS_CONFIG.phone ? BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '') : '+919060433848';
  const whatsappNum = BUSINESS_CONFIG.whatsappNumber ? BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, '') : '919060433848';
  const defaultWhatsAppText = encodeURIComponent(
    `Hello Nandini Spa, I would like to inquire about spa treatments and appointments in MP Nagar, Bhopal.`
  );

  return (
    <>
      {/* 1. Mobile Persistent Quick Action Bar (Screens < 1024px) */}
      <nav 
        aria-label="Quick mobile contact actions"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#201C17]/95 backdrop-blur-md border-t border-[#3E362E] py-2 px-3 shadow-2xl flex items-center justify-between gap-2"
      >
        {/* Call Now Button */}
        <a
          href={`tel:${phoneTel}`}
          onClick={() => trackPhoneClick('mobile_sticky_bar', phoneTel)}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded bg-[#2E2822] text-[#FAF7F2] active:bg-[#3E362E] transition-colors border border-[#3E362E]"
          aria-label="Call Nandini Spa concierge immediately"
        >
          <Phone className="w-4 h-4 text-[#7A9988] mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wider uppercase text-[#ECE4D8]">Call Now</span>
        </a>

        {/* WhatsApp Chat Button */}
        <a
          href={`https://wa.me/${whatsappNum}?text=${defaultWhatsAppText}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('mobile_sticky_bar')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white active:bg-emerald-900 transition-colors shadow-xs"
          aria-label="Message Nandini Spa on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wider uppercase">WhatsApp</span>
        </a>

        {/* Book Appointment CTA */}
        <button
          type="button"
          onClick={() => {
            trackBookingTrigger(undefined, 'mobile_sticky_bar');
            onOpenBooking();
          }}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded bg-[#446353] hover:bg-[#365143] text-white active:bg-[#2C4136] transition-colors shadow-xs cursor-pointer"
          aria-label="Book a spa appointment online"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wider uppercase">Book Now</span>
        </button>
      </nav>

      {/* 2. Desktop Floating WhatsApp & Call Buttons (Screens >= 1024px) */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto">
        {/* Desktop WhatsApp Trigger */}
        <a
          href={`https://wa.me/${whatsappNum}?text=${defaultWhatsAppText}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('desktop_floating_pill')}
          className="group flex items-center gap-2.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-lg transition-all transform hover:scale-105"
          aria-label="Chat with Nandini Spa concierge on WhatsApp"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-semibold tracking-wide pr-1">WhatsApp Us</span>
        </a>

        {/* Desktop Click-to-Call Trigger */}
        <a
          href={`tel:${phoneTel}`}
          onClick={() => trackPhoneClick('desktop_floating_pill', phoneTel)}
          className="group flex items-center gap-2.5 px-4 py-2.5 bg-[#201C17] hover:bg-[#2E2822] text-[#FAF7F2] border border-[#3E362E] rounded-full shadow-lg transition-all transform hover:scale-105"
          aria-label={`Call Nandini Spa at ${BUSINESS_CONFIG.phone || '+91 90604 33848'}`}
        >
          <Phone className="w-4 h-4 text-[#7A9988]" />
          <span className="text-xs font-medium tracking-wide pr-1">{BUSINESS_CONFIG.phone || '+91 90604 33848'}</span>
        </a>
      </div>
    </>
  );
};
