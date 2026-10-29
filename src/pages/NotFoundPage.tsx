import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Calendar, Phone, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { SEOHead } from '../components/SEOHead';
import { ROUTE_SEO } from '../data/seoData';

export const NotFoundPage: React.FC = () => {
  const seo = ROUTE_SEO.notFound;

  return (
    <div className="w-full bg-[#FAF7F2] min-h-[70vh] flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8">
      <SEOHead config={seo} />

      <div className="max-w-xl text-center">
        <div className="w-16 h-16 rounded-full bg-[#E7EFEA] border border-[#7A9988] flex items-center justify-center text-[#446353] mx-auto mb-6">
          <Compass className="w-8 h-8" />
        </div>

        <div className="text-xs font-semibold uppercase tracking-widest text-[#B3644C] mb-2">
          Error 404 · Uncharted Route
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#28231D] leading-tight">
          Sanctuary Pathway Not Found
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#685F53] leading-relaxed">
          The page or ritual you are seeking may have been relocated or is no longer available. 
          Allow us to guide you back to our restorative treatments in Bhopal.
        </p>

        {/* Helpful Pathway Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <Link
            to="/"
            className="p-4 rounded-lg bg-white border border-[#E3DACD] hover:border-[#446353] transition-colors flex items-center justify-between group shadow-xs"
          >
            <div>
              <div className="text-xs font-semibold text-[#28231D]">Sanctuary Home</div>
              <div className="text-[11px] text-[#685F53]">Overview & Ambiance</div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7A9988] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/services"
            className="p-4 rounded-lg bg-white border border-[#E3DACD] hover:border-[#446353] transition-colors flex items-center justify-between group shadow-xs"
          >
            <div>
              <div className="text-xs font-semibold text-[#28231D]">Treatment Menu</div>
              <div className="text-[11px] text-[#685F53]">Tariffs & Protocols</div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7A9988] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/full-body-massage"
            className="p-4 rounded-lg bg-white border border-[#E3DACD] hover:border-[#446353] transition-colors flex items-center justify-between group shadow-xs"
          >
            <div>
              <div className="text-xs font-semibold text-[#28231D]">Full Body Massage</div>
              <div className="text-[11px] text-[#685F53]">Deep Tissue & Swedish</div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7A9988] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/couple-spa"
            className="p-4 rounded-lg bg-white border border-[#E3DACD] hover:border-[#446353] transition-colors flex items-center justify-between group shadow-xs"
          >
            <div>
              <div className="text-xs font-semibold text-[#28231D]">Couple Spa Sanctuary</div>
              <div className="text-[11px] text-[#685F53]">VIP Double Suite</div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7A9988] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-xs inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Sanctuary</span>
          </Link>

          <Link
            to="/contact"
            className="px-5 py-3 border border-[#E3DACD] hover:border-[#28231D] text-[#28231D] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
          >
            Contact Concierge
          </Link>
        </div>
      </div>
    </div>
  );
};
