import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Check, Copy, Settings, Info, ChevronDown, ChevronUp, AlertCircle, RefreshCw, Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface GoogleMapsEmbedProps {
  heightClass?: string;
  showCardOverlay?: boolean;
  onOpenConfig?: () => void;
  className?: string;
}

export const GoogleMapsEmbed: React.FC<GoogleMapsEmbedProps> = ({
  heightClass = 'h-[360px] sm:h-[450px] lg:h-[480px]',
  showCardOverlay = true,
  onOpenConfig,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [isCardCollapsed, setIsCardCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);

  const displayAddress = BUSINESS_CONFIG.isExactStreetAddressConfigured
    ? `${BUSINESS_CONFIG.streetAddressPlaceholder}, ${BUSINESS_CONFIG.city}, ${BUSINESS_CONFIG.state}`
    : `${BUSINESS_CONFIG.city}, ${BUSINESS_CONFIG.state}, ${BUSINESS_CONFIG.country} (${BUSINESS_CONFIG.streetAddressPlaceholder})`;

  // Official verified Google Maps Embed URL for Nandini Spa, Bhopal
  const effectiveEmbedUrl = BUSINESS_CONFIG.maps.embedUrl;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(displayAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReloadMap = () => {
    setIsLoading(true);
    setHasLoadError(false);
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-[#E3DACD] shadow-xs bg-[#F3EFE6] flex flex-col">
      {/* Map Display Container */}
      <div className={`w-full ${heightClass} relative z-0 bg-[#EAE5DC]`}>
        {/* Loading Skeleton */}
        {isLoading && !hasLoadError && (
          <div className="absolute inset-0 z-5 flex items-center justify-center bg-[#F3EFE6]/90 backdrop-blur-xs">
            <div className="flex flex-col items-center gap-3 text-center px-4">
              <div className="w-8 h-8 rounded-full border-2 border-[#446353] border-t-transparent animate-spin" />
              <p className="text-xs text-[#685F53] font-medium">
                Loading official Google Maps location...
              </p>
              <span className="text-[11px] text-[#8C8275]">
                {BUSINESS_CONFIG.locality || 'Zone-II, Maharana Pratap Nagar'}, {BUSINESS_CONFIG.city}
              </span>
            </div>
          </div>
        )}

        {/* Fallback Screen on Iframe Failure */}
        {hasLoadError ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#FAF7F2] p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-medium text-[#28231D]">
              Unable to load inline map preview
            </h4>
            <p className="text-xs text-[#685F53] max-w-md mt-1 leading-relaxed">
              Your browser or network restrictions may have prevented Google Maps from rendering inside the frame. 
              You can still open full turn-by-turn navigation directly in Google Maps.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={BUSINESS_CONFIG.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold rounded-sm transition-colors shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
              <button
                onClick={handleReloadMap}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#F3EFE6] text-[#28231D] text-xs font-medium rounded-sm border border-[#E3DACD] transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 text-[#446353]" />
                <span>Retry Loading</span>
              </button>
            </div>
          </div>
        ) : (
          <iframe
            title="Nandini Spa location on Google Maps"
            src={effectiveEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full filter saturate-[0.98] contrast-[1.01]"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasLoadError(true);
            }}
          />
        )}
      </div>

      {/* Responsive Collapsible Overlay Card */}
      {showCardOverlay && !hasLoadError && (
        <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-auto z-10 max-w-sm sm:max-w-md transition-all">
          <div className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-lg shadow-md border border-[#E3DACD] text-[#28231D]">
            {/* Header & Toggle */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="p-2 rounded-full bg-[#E7EFEA] text-[#446353] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-semibold text-[#28231D] text-base leading-snug truncate">
                      {BUSINESS_CONFIG.brandName}
                    </h4>
                    <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 bg-[#E7EFEA] text-[#446353] rounded shrink-0">
                      Verified Pin
                    </span>
                  </div>
                  <p className="text-xs text-[#685F53] mt-0.5 font-medium">
                    {BUSINESS_CONFIG.locality || 'Zone-II, Maharana Pratap Nagar'}, {BUSINESS_CONFIG.city}
                  </p>
                </div>
              </div>

              {/* Collapse/Expand Toggle for unobstructed map viewing */}
              <button
                onClick={() => setIsCardCollapsed(!isCardCollapsed)}
                className="p-1 rounded text-[#8C8275] hover:text-[#28231D] hover:bg-[#F3EFE6] transition-colors shrink-0 cursor-pointer"
                title={isCardCollapsed ? 'Expand location card' : 'Collapse card for full map view'}
                aria-label={isCardCollapsed ? 'Expand location card' : 'Collapse card for full map view'}
              >
                {isCardCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>

            {/* Expandable Content Area */}
            {!isCardCollapsed && (
              <div className="mt-2.5">
                <p className="text-[11px] text-[#685F53] leading-relaxed bg-[#FAF7F2] p-2 rounded border border-[#F3EFE6]">
                  {BUSINESS_CONFIG.streetAddressPlaceholder}
                </p>

                {/* Quick Actions */}
                <div className="mt-3 pt-3 border-t border-[#F3EFE6] flex flex-wrap items-center gap-2">
                  <a
                    href={BUSINESS_CONFIG.maps.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold rounded-sm transition-colors shadow-xs"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-0.5 opacity-80" />
                  </a>

                  {BUSINESS_CONFIG.isPhoneConfigured && BUSINESS_CONFIG.phone && (
                    <a
                      href={`tel:${BUSINESS_CONFIG.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F3EFE6] text-[#28231D] text-xs font-medium rounded-sm border border-[#E3DACD] transition-colors"
                    >
                      <Phone className="w-3 h-3 text-[#446353]" />
                      <span>Call Now</span>
                    </a>
                  )}

                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F3EFE6] hover:bg-[#E3DACD] text-[#28231D] text-xs font-medium rounded-sm transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-[#446353]" />}
                    <span>{copied ? 'Copied' : 'Copy Address'}</span>
                  </button>

                  {onOpenConfig && (
                    <button
                      onClick={onOpenConfig}
                      className="inline-flex items-center gap-1 px-2 py-1.5 bg-white hover:bg-[#F3EFE6] text-[#685F53] hover:text-[#28231D] text-xs rounded-sm transition-colors ml-auto cursor-pointer border border-[#E3DACD]"
                      title="Update address and maps in config"
                    >
                      <Settings className="w-3 h-3 text-[#446353]" />
                      <span className="hidden sm:inline">Settings</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Centralized config indicator & legal attribution strip */}
      <div className="bg-[#F3EFE6] border-t border-[#E3DACD] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs text-[#28231D]">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#446353] shrink-0" />
          <span>
            Pin: {BUSINESS_CONFIG.locality || 'Zone-II, Maharana Pratap Nagar'}, {BUSINESS_CONFIG.city} ({BUSINESS_CONFIG.maps.latitude.toFixed(4)}° N, {BUSINESS_CONFIG.maps.longitude.toFixed(4)}° E)
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#685F53]">
          <a
            href={BUSINESS_CONFIG.maps.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#446353] font-medium hover:underline inline-flex items-center gap-1"
          >
            <span>View on Google Maps</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <span className="text-[#8C8275]">·</span>
          <span>Google Maps</span>
        </div>
      </div>
    </div>
  );
};
