import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, MapPin, Mail, Phone, Settings } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { Logo } from './Logo';
import { trackPhoneClick, trackBookingTrigger } from '../utils/analytics';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenConfig?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenConfig }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Full Body Massage', path: '/full-body-massage' },
    { name: 'Couple Spa', path: '/couple-spa' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E3DACD] shadow-xs">
      
      {/* 1. Clean, Professional Top Utility Section */}
      <div className="bg-[#201C17] text-[#ECE4D8] text-xs py-2 px-4 md:px-8 border-b border-[#332D26]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Location & Sanctuary Timing */}
          <div className="flex items-center gap-4 text-[#C5BBAF]">
            <span className="flex items-center gap-1.5 text-[#F5F0E8]">
              <MapPin className="w-3.5 h-3.5 text-[#7A9988] shrink-0" />
              <span>{BUSINESS_CONFIG.city}, {BUSINESS_CONFIG.state}</span>
            </span>
            <span className="hidden sm:inline text-[#8C8275]">·</span>
            <span className="hidden sm:inline text-[#ECE4D8]/90">Open 24 Hours (24/7 Service)</span>
          </div>

          {/* Right Action Cluster: Contact & Settings */}
          <div className="flex items-center gap-4">
            <a 
              href={`mailto:${BUSINESS_CONFIG.email}`}
              className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors text-[#ECE4D8]"
            >
              <Mail className="w-3.5 h-3.5 text-[#7A9988]" />
              <span className="underline decoration-[#7A9988] underline-offset-2">{BUSINESS_CONFIG.email}</span>
            </a>

            {BUSINESS_CONFIG.isPhoneConfigured && BUSINESS_CONFIG.phone && (
              <a 
                href={`tel:${BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '')}`}
                onClick={() => trackPhoneClick('header_utility', BUSINESS_CONFIG.phone!)}
                className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors text-[#ECE4D8]"
                title={`Call ${BUSINESS_CONFIG.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-[#7A9988]" />
                <span>{BUSINESS_CONFIG.phone}</span>
              </a>
            )}

            {onOpenConfig && (
              <button
                onClick={onOpenConfig}
                title="Configure Business & Map settings"
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-[#2E2822] text-[#C5BBAF] hover:text-white hover:bg-[#446353] transition-colors cursor-pointer border border-[#3E362E]"
              >
                <Settings className="w-3 h-3 text-[#7A9988]" />
                <span className="hidden sm:inline">Settings</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar: Brand Identity, Nav Links & Action Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 h-16 sm:h-20">
          
          {/* Brand Identity: Nandini Spa */}
          <Link 
            to="/" 
            className="flex items-center group whitespace-nowrap shrink-0 min-w-0"
          >
            <Logo variant="dark" size="md" useFullBadge={true} />
          </Link>

          {/* Clean Navigation Links with Sage Accents */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-medium text-[#28231D]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive(link.path)
                    ? 'text-[#446353] font-semibold border-b-2 border-[#446353]'
                    : 'text-[#28231D] hover:text-[#446353]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Primary Action Button: Book Appointment */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                trackBookingTrigger('general', 'header_button');
                onOpenBooking();
              }}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#446353] hover:bg-[#365143] rounded-sm transition-all shadow-xs hover:shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile hamburger & quick call */}
          <div className="flex items-center gap-2 md:hidden">
            {BUSINESS_CONFIG.isPhoneConfigured && BUSINESS_CONFIG.phone && (
              <a
                href={`tel:${BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '')}`}
                onClick={() => trackPhoneClick('mobile_quick_call', BUSINESS_CONFIG.phone!)}
                aria-label={`Call ${BUSINESS_CONFIG.phone}`}
                className="w-10 h-10 flex items-center justify-center text-[#446353] hover:text-[#365143] rounded-md bg-[#E7EFEA] hover:bg-[#d8e6dc] transition-colors"
                title={`Call ${BUSINESS_CONFIG.phone}`}
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="w-10 h-10 flex items-center justify-center text-[#28231D] hover:text-[#446353] rounded-md hover:bg-[#F3EFE6] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E3DACD] bg-[#FAF7F2] px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#28231D]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#E7EFEA] text-[#446353] font-semibold'
                    : 'hover:bg-[#F3EFE6] text-[#28231D]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-[#E3DACD] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#446353] hover:bg-[#365143] rounded-sm transition-colors shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <div className="text-xs text-[#685F53] flex flex-col gap-1 pt-2">
                <span>📍 {BUSINESS_CONFIG.city}, {BUSINESS_CONFIG.state}</span>
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-[#446353] transition-colors">
                  ✉️ {BUSINESS_CONFIG.email}
                </a>
                {BUSINESS_CONFIG.phone && (
                  <a 
                    href={`tel:${BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '')}`}
                    className="hover:text-[#446353] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>📞</span>
                    <span>{BUSINESS_CONFIG.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
