import React, { useState } from 'react';
import { X, Save, Copy, Check, Info, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG, getGoogleMapsEmbedUrl, getGoogleMapsDirectionsUrl } from '../config/business';

interface ConfigEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemporaryConfig?: (newConfig: Partial<typeof BUSINESS_CONFIG>) => void;
}

export const ConfigEditorDrawer: React.FC<ConfigEditorDrawerProps> = ({
  isOpen,
  onClose,
  onApplyTemporaryConfig,
}) => {
  const [city, setCity] = useState(BUSINESS_CONFIG.city);
  const [state, setState] = useState(BUSINESS_CONFIG.state);
  const [streetAddress, setStreetAddress] = useState(BUSINESS_CONFIG.streetAddressPlaceholder);
  const [isExactAddress, setIsExactAddress] = useState(BUSINESS_CONFIG.isExactStreetAddressConfigured);
  const [email, setEmail] = useState(BUSINESS_CONFIG.email);
  const [phone, setPhone] = useState(BUSINESS_CONFIG.phone || '');
  const [isPhoneConfigured, setIsPhoneConfigured] = useState(BUSINESS_CONFIG.isPhoneConfigured);
  const [whatsappNumber, setWhatsappNumber] = useState(BUSINESS_CONFIG.whatsappNumber || '');
  const [isWhatsappConfigured, setIsWhatsappConfigured] = useState(BUSINESS_CONFIG.isWhatsappConfigured);
  const [embedUrl, setEmbedUrl] = useState(BUSINESS_CONFIG.maps.embedUrl);

  const [copiedCode, setCopiedCode] = useState(false);
  const [appliedNotice, setAppliedNotice] = useState(false);

  if (!isOpen) return null;

  const handleAddressChangeAndRegenerateMap = (newStreet: string, newCity: string) => {
    const query = `${newStreet ? newStreet + ', ' : ''}${newCity}, Madhya Pradesh, India`;
    setEmbedUrl(getGoogleMapsEmbedUrl(query));
  };

  const handleApplyPreview = () => {
    if (onApplyTemporaryConfig) {
      onApplyTemporaryConfig({
        city,
        state,
        streetAddressPlaceholder: streetAddress,
        isExactStreetAddressConfigured: isExactAddress,
        email,
        phone: phone.trim() ? phone : null,
        isPhoneConfigured,
        whatsappNumber: whatsappNumber.trim() ? whatsappNumber : null,
        isWhatsappConfigured,
        maps: {
          ...BUSINESS_CONFIG.maps,
          embedUrl,
          directionsUrl: getGoogleMapsDirectionsUrl(`${streetAddress}, ${city}`),
        },
      });
    }
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 2500);
  };

  const generatedTsCode = `export const BUSINESS_CONFIG: BusinessConfig = {
  brandName: "${BUSINESS_CONFIG.brandName}",
  brandShort: "${BUSINESS_CONFIG.brandShort}",
  tagline: "${BUSINESS_CONFIG.tagline}",
  city: "${city}",
  state: "${state}",
  country: "India",
  streetAddressPlaceholder: "${streetAddress}",
  isExactStreetAddressConfigured: ${isExactAddress},
  email: "${email}",
  phone: ${phone.trim() ? `"${phone.trim()}"` : 'null'},
  phoneDisplayPlaceholder: "${phone.trim() ? phone.trim() : '[Mobile Number To Be Provided]'}",
  isPhoneConfigured: ${isPhoneConfigured},
  whatsappNumber: ${whatsappNumber.trim() ? `"${whatsappNumber.trim()}"` : 'null'},
  isWhatsappConfigured: ${isWhatsappConfigured},
  zipFileName: "${BUSINESS_CONFIG.zipFileName}",
  maps: {
    latitude: 23.231228599999998,
    longitude: 77.43317379999999,
    zoomLevel: 15,
    embedUrl: "${embedUrl}",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=23.231228599999998%2C77.43317379999999&travelmode=driving",
  },
  ...
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedTsCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#201C17]/50 backdrop-blur-xs">
      <div 
        className="w-full max-w-full sm:max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-[#E3DACD] overflow-hidden"
        role="dialog"
      >
        {/* Header — Warm Espresso (#201C17) */}
        <div className="bg-[#201C17] text-white px-6 py-5 flex items-center justify-between border-b border-[#332D26]">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-[#7A9988]" />
            <div>
              <h3 className="font-serif text-lg font-medium text-[#FAF7F2]">
                {BUSINESS_CONFIG.brandShort} Business & Map Center
              </h3>
              <p className="text-xs text-[#7A9988]">
                Centralized in <code className="text-[#FAF7F2]">src/config/business.ts</code>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close settings drawer"
            className="p-1.5 text-[#C5BBAF] hover:text-white rounded-md hover:bg-[#2E2822] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-[#28231D] bg-[#FAF7F2]">
          
          <div className="p-3.5 bg-[#E7EFEA] rounded-lg border border-[#7A9988]/40 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#446353] shrink-0 mt-0.5" />
            <div className="leading-relaxed text-[#28231D]">
              <strong>Single Source of Truth:</strong> Update the fields below to preview how office location, 
              Google Maps embed, and contact details propagate across the entire website.
            </div>
          </div>

          {/* Location Configuration */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wider text-[#685F53] text-[11px]">
              1. Office Address & Google Maps Location
            </h4>

            <div>
              <label className="block font-medium text-[#28231D] mb-1">City & State</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    handleAddressChangeAndRegenerateMap(streetAddress, e.target.value);
                  }}
                  className="px-3 py-2 rounded border border-[#E3DACD] bg-white text-xs text-[#28231D] focus:ring-1 focus:ring-[#446353]"
                  placeholder="City"
                />
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="px-3 py-2 rounded border border-[#E3DACD] bg-white text-xs text-[#28231D] focus:ring-1 focus:ring-[#446353]"
                  placeholder="State"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#28231D] mb-1">Street Address or Office Suite</label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => {
                  setStreetAddress(e.target.value);
                  handleAddressChangeAndRegenerateMap(e.target.value, city);
                }}
                className="w-full px-3 py-2 rounded border border-[#E3DACD] bg-white text-xs text-[#28231D] focus:ring-1 focus:ring-[#446353]"
                placeholder="e.g. Nandini Spa, Bhopal, Madhya Pradesh"
              />
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="exactAddressCheck"
                  checked={isExactAddress}
                  onChange={(e) => setIsExactAddress(e.target.checked)}
                  className="rounded text-[#446353] focus:ring-[#446353]"
                />
                <label htmlFor="exactAddressCheck" className="text-[11px] text-[#685F53] cursor-pointer">
                  Mark exact address confirmed (removes placeholder badge)
                </label>
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#28231D] mb-1">Generated Google Maps Embed URL</label>
              <textarea
                rows={2}
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[#E3DACD] bg-white text-[11px] font-mono text-[#28231D] focus:ring-1 focus:ring-[#446353]"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 pt-4 border-t border-[#E3DACD]">
            <h4 className="font-semibold uppercase tracking-wider text-[#685F53] text-[11px]">
              2. Official Contact & Mobile Integration
            </h4>

            <div>
              <label className="block font-medium text-[#28231D] mb-1">Official Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[#E3DACD] bg-white text-xs text-[#28231D] focus:ring-1 focus:ring-[#446353]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#28231D] mb-1">Business Mobile Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setIsPhoneConfigured(Boolean(e.target.value.trim()));
                }}
                className="w-full px-3 py-2 rounded border border-[#E3DACD] bg-white text-xs text-[#28231D] focus:ring-1 focus:ring-[#446353]"
                placeholder="e.g. +91 90604 33848"
              />
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="phoneConfigCheck"
                  checked={isPhoneConfigured}
                  onChange={(e) => setIsPhoneConfigured(e.target.checked)}
                  className="rounded text-[#446353] focus:ring-[#446353]"
                />
                <label htmlFor="phoneConfigCheck" className="text-[11px] text-[#685F53] cursor-pointer">
                  Phone active & verified (activates click-to-call link)
                </label>
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#28231D] mb-1">WhatsApp Chat Number</label>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => {
                  setWhatsappNumber(e.target.value);
                  setIsWhatsappConfigured(Boolean(e.target.value.trim()));
                }}
                className="w-full px-3 py-2 rounded border border-[#E3DACD] bg-white text-xs text-[#28231D] focus:ring-1 focus:ring-[#446353]"
                placeholder="e.g. +91 90604 33848"
              />
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="whatsappConfigCheck"
                  checked={isWhatsappConfigured}
                  onChange={(e) => setIsWhatsappConfigured(e.target.checked)}
                  className="rounded text-[#446353] focus:ring-[#446353]"
                />
                <label htmlFor="whatsappConfigCheck" className="text-[11px] text-[#685F53] cursor-pointer">
                  Enable WhatsApp quick concierge buttons across website
                </label>
              </div>
            </div>

            {/* Google Maps Platform API Key Security Guide */}
            <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E3DACD] space-y-1.5 text-xs">
              <div className="font-semibold text-[#28231D] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#446353]" />
                <span>Google Maps API Key (Optional)</span>
              </div>
              <p className="text-[11px] text-[#685F53] leading-relaxed">
                The embedded interactive map is already configured to pin <strong>Nandini Spa, Bhopal</strong>. To connect a dedicated Google Cloud Embed API key:
              </p>
              <ol className="list-decimal list-inside text-[11px] text-[#685F53] space-y-1 pl-1">
                <li>Create or copy your key from <a href="https://console.cloud.google.com/google/maps-apis/credentials" target="_blank" rel="noopener noreferrer" className="text-[#446353] underline">Google Cloud Console</a>.</li>
                <li>Add <code className="bg-white px-1 py-0.5 rounded border border-[#E3DACD] text-[#28231D]">VITE_GOOGLE_MAPS_API_KEY="AIzaSy..."</code> into your local <code className="text-[#28231D]">.env</code> file.</li>
                <li>Apply <strong>HTTP Referrer restrictions</strong> to protect your key from unauthorized domains. Never commit API keys to source control.</li>
              </ol>
            </div>
          </div>

          {/* Generated Code Snippet */}
          <div className="pt-4 border-t border-[#E3DACD] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold uppercase tracking-wider text-[#685F53] text-[11px]">
                3. TypeScript Config Snippet
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-[11px] text-[#446353] hover:underline cursor-pointer"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-3 bg-[#201C17] text-[#FAF7F2] rounded text-[10px] font-mono overflow-x-auto leading-relaxed border border-[#3E362E]">
              {generatedTsCode}
            </pre>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-[#E3DACD] flex items-center justify-between gap-3">
          {appliedNotice && (
            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
              <Check className="w-4 h-4" /> Live preview updated!
            </span>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#685F53] hover:text-[#28231D] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleApplyPreview}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply Live Preview</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
