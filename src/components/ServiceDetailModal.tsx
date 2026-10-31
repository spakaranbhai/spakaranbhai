import React, { useEffect } from 'react';
import { X, Clock, Check, Sparkles, Calendar, Heart } from 'lucide-react';
import { SpaService } from '../data/spaData';

interface ServiceDetailModalProps {
  service: SpaService | null;
  onClose: () => void;
  onBook: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBook,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && service) {
        onClose();
      }
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#201C17]/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-[#E3DACD] overflow-hidden my-auto sm:my-8 max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-detail-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#28231D] hover:text-[#446353] shadow-sm transition-colors cursor-pointer border border-[#E3DACD]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Banner with Fallback */}
        <div className="relative h-52 sm:h-64 md:h-72 w-full shrink-0 bg-[#F3EFE6] overflow-hidden">
          <img
            src={service.imageUrl}
            alt={service.title}
            width="800"
            height="400"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#201C17] via-[#201C17]/60 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8">
            <div className="text-[#7A9988] text-[11px] sm:text-xs uppercase tracking-widest font-medium mb-1">
              {service.category}
            </div>
            <h3 id="service-detail-title" className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-medium tracking-tight pr-8">
              {service.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs text-[#ECE4D8] font-sans">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#7A9988]" />
                <span>{service.duration}</span>
              </span>
              <span aria-hidden="true" className="text-[#8C8275]">·</span>
              <span className="font-mono text-sm sm:text-base font-semibold text-white">
                ₹{service.price.toLocaleString('en-IN')}
              </span>
              {service.popular && (
                <>
                  <span aria-hidden="true" className="text-[#8C8275]">·</span>
                  <span className="text-[#F7EDE8] bg-[#B3644C] px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Signature Ritual
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto space-y-5 sm:space-y-6 text-[#28231D] bg-[#FAF7F2]">
          
          {/* Full Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#685F53] mb-2">
              Therapeutic Description
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-[#28231D]">
              {service.fullDesc}
            </p>
          </div>

          {/* Benefits Grid */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#685F53] mb-3">
              Key Restorative Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#28231D]">
                  <div className="w-4 h-4 rounded-full bg-[#E7EFEA] flex items-center justify-center text-[#446353] shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Treatment Steps Sequence */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#685F53] mb-3">
              Step-by-Step Treatment Protocol
            </h4>
            <div className="space-y-2.5">
              {service.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#28231D]">
                  <span className="font-mono text-xs font-semibold text-[#446353] shrink-0 w-5">
                    0{idx + 1}.
                  </span>
                  <span className="text-[#685F53]">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal For Callout */}
          <div className="p-4 rounded-lg bg-white border border-[#E3DACD] text-xs sm:text-sm text-[#28231D] flex items-start gap-2.5 shadow-xs">
            <Heart className="w-4 h-4 text-[#B3644C] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#28231D]">Recommended For: </span>
              <span className="text-[#685F53]">{service.idealFor}</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-[#F3EFE6] border-t border-[#E3DACD] px-6 py-4 flex items-center justify-between gap-4">
          <div className="text-xs text-[#685F53] hidden sm:block">
            Includes private climate suite preparation and post-ritual herbal infusion.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#685F53] hover:text-[#28231D] transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(service.id);
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book This Ritual</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
