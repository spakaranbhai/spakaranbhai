import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Clock, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { Logo } from './Logo';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenConfig?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenConfig }) => {
  return (
    <footer className="bg-[#1E1A15] text-[#ECE4D8] border-t border-[#332D26]">
      
      {/* Top Banner / Booking Strip — Warm Espresso with Eucalyptus accent */}
      <div className="bg-[#28231D] border-b border-[#3E362E] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-normal tracking-tight">
              Restore Balance to Body and Mind
            </h3>
            <p className="mt-2 text-[#C5BBAF] text-sm leading-relaxed">
              Step away from the rush of Bhopal into quiet, climate-controlled treatment suites. 
              Surrender tension to anatomical muscle manipulation, warm basalt stones, and pure botanical essences.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto text-center px-6 py-3 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-sm"
            >
              Request Appointment
            </button>
            <Link
              to="/services"
              className="w-full sm:w-auto text-center px-6 py-3 border border-[#7A9988] hover:border-white text-[#FAF7F2] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              Explore Treatments
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          
          {/* Col 1: Brand & Identity */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="group inline-block">
              <Logo variant="light" size="md" useFullBadge={false} />
            </Link>
            <p className="text-xs text-[#C5BBAF] leading-relaxed">
              Bhopal’s premier restorative spa sanctuary. We combine kinetic bodywork, 
              mineral hydro-therapies, and ancient Ayurvedic rituals to awaken holistic equilibrium.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-[#C5BBAF]/90">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7A9988]" />
                100% Unrefined Organic Botanical Oils
              </span>
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#7A9988]" />
                Certified Master Kinesiologists & Therapists
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#FAF7F2] font-semibold mb-4">
              Explore Sanctuary
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#C5BBAF]">
              <li>
                <Link to="/" className="hover:text-[#FAF7F2] transition-colors">Sanctuary Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FAF7F2] transition-colors">About {BUSINESS_CONFIG.brandShort}</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#FAF7F2] transition-colors">Treatments & Pricing</Link>
              </li>
              <li>
                <Link to="/full-body-massage" className="hover:text-[#FAF7F2] transition-colors">Full Body Massage Bhopal</Link>
              </li>
              <li>
                <Link to="/couple-spa" className="hover:text-[#FAF7F2] transition-colors">Couple Spa Bhopal</Link>
              </li>
              <li>
                <Link to="/luxury-spa" className="hover:text-[#FAF7F2] transition-colors">Luxury Spa Experience</Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-[#FAF7F2] transition-colors">Book Online Appointment</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#FAF7F2] transition-colors">Ambiance Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FAF7F2] transition-colors">Location & Directions</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#FAF7F2] font-semibold mb-4">
              Sanctuary Hours
            </h4>
            <div className="flex flex-col gap-3 text-xs text-[#C5BBAF]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#7A9988] shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-[#FAF7F2]">{BUSINESS_CONFIG.hours.weekday}</div>
                  <div className="font-medium text-[#FAF7F2] mt-1">{BUSINESS_CONFIG.hours.weekend}</div>
                  <div className="text-[#C5BBAF]/70 italic text-[11px] mt-2">
                    {BUSINESS_CONFIG.hours.notes}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Official Contact & Location */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-[#FAF7F2] font-semibold mb-4">
              Contact & Location
            </h4>
            <div className="flex flex-col gap-3 text-xs text-[#C5BBAF]">
              
              {/* City & Office Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7A9988] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#FAF7F2]">
                    {BUSINESS_CONFIG.locality ? `${BUSINESS_CONFIG.locality}, ${BUSINESS_CONFIG.city}` : `Mansarovar Complex, Shivaji Nagar, ${BUSINESS_CONFIG.city}`}
                  </div>
                  <div className="text-[11px] text-[#C5BBAF]/80 mt-0.5">
                    {BUSINESS_CONFIG.streetAddressPlaceholder}
                  </div>
                  <a
                    href={BUSINESS_CONFIG.maps.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#7A9988] hover:text-[#FAF7F2] underline mt-1.5"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5 pt-2">
                <Mail className="w-4 h-4 text-[#7A9988] shrink-0" />
                <a 
                  href={`mailto:${BUSINESS_CONFIG.email}`} 
                  className="hover:text-[#FAF7F2] underline decoration-[#7A9988]"
                >
                  {BUSINESS_CONFIG.email}
                </a>
              </div>

              {/* Mobile Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7A9988] shrink-0" />
                {BUSINESS_CONFIG.isPhoneConfigured && BUSINESS_CONFIG.phone ? (
                  <a href={`tel:${BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#FAF7F2]">
                    {BUSINESS_CONFIG.phone}
                  </a>
                ) : (
                  <span className="text-[#C5BBAF]/70 italic text-[11px]">
                    {BUSINESS_CONFIG.phoneDisplayPlaceholder}
                  </span>
                )}
              </div>

              {/* WhatsApp Button */}
              {BUSINESS_CONFIG.isWhatsappConfigured && BUSINESS_CONFIG.whatsappNumber && (
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#446353] hover:bg-[#365143] text-white rounded text-xs transition-colors"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar & Bhopal Local Context */}
        <div className="mt-14 pt-8 border-t border-[#332D26] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#C5BBAF]/80">
          <div>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.brandName}. All rights reserved. 
            <span className="hidden md:inline"> · </span>
            <span className="block md:inline text-[#C5BBAF]/60">
              Luxury Spa & Restorative Sanctuary in Bhopal, Madhya Pradesh.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Etiquette
            </Link>
            <span>·</span>
            {onOpenConfig && (
              <button
                onClick={onOpenConfig}
                className="text-[11px] text-[#FAF7F2] hover:text-[#7A9988] underline cursor-pointer"
              >
                Admin Config
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
