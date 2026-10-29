import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/spaData';
import { SEOHead } from '../components/SEOHead';
import { ROUTE_SEO, generateBreadcrumbsSchema, getProductionBaseUrl } from '../data/seoData';

interface GalleryPageProps {
  onOpenBooking: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const baseUrl = getProductionBaseUrl();
  const seo = ROUTE_SEO.gallery;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Sanctuary Gallery', path: '/gallery' },
  ];

  const structuredData = [
    generateBreadcrumbsSchema(baseUrl, breadcrumbs),
  ];

  const categories = ['All', 'Sanctuary Spaces', 'Therapies', 'Botanicals'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((it) => it.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((it) => it.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
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
            <span className="text-[#7A9988] font-medium">Sanctuary Gallery</span>
          </nav>
          <div className="text-xs font-semibold uppercase tracking-widest text-[#7A9988] mb-2">
            Sanctuary Visual Tour · Bhopal
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#FAF7F2]">
            Visual Tour of Nandini Spa Sanctuary in Bhopal
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#ECE4D8] font-light max-w-2xl mx-auto leading-relaxed">
            Experience the soothing warm cream, eucalyptus sage, and natural stone aesthetics of our suites, 
            hydro-reflection spaces, and authentic therapy rooms in MP Nagar, Bhopal.
          </p>
        </div>
      </section>

      {/* Gallery Filter Tabs */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#446353] text-white font-semibold'
                  : 'bg-[#F3EFE6] text-[#28231D] hover:bg-[#E7EFEA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid — Pure White Cards with Delicate Warm Borders */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-xl overflow-hidden bg-[#F3EFE6] border border-[#E3DACD] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer aspect-4/3"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                width="600"
                height="450"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#201C17]/90 via-[#201C17]/30 to-transparent opacity-85 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 sm:p-5">
                <span className="text-[11px] uppercase tracking-wider text-[#7A9988] font-medium">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg text-white font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[#ECE4D8] mt-1 line-clamp-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.caption}
                </p>
              </div>

              {/* Zoom icon badge */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-[#201C17]/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Reserve Section — Soft Cream (#F3EFE6) Card with Eucalyptus CTA */}
        <div className="mt-14 sm:mt-16 text-center p-6 sm:p-10 bg-[#F3EFE6] border border-[#E3DACD] rounded-xl">
          <h3 className="font-serif text-xl sm:text-2xl text-[#28231D] font-normal">
            Immerse Yourself in Mindful Tranquility
          </h3>
          <p className="text-xs sm:text-sm text-[#685F53] max-w-xl mx-auto mt-2 leading-relaxed">
            Reserve your private treatment suite today and enjoy our serene Nandini sanctuary atmosphere firsthand.
          </p>
          <button
            onClick={onOpenBooking}
            className="mt-6 px-7 py-3 bg-[#446353] hover:bg-[#365143] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-xs"
          >
            Request Appointment
          </button>
        </div>
      </section>

      {/* Lightbox Zoom Modal */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#201C17]/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            onClick={() => setActiveItem(null)}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 p-2 sm:p-2.5 rounded-full bg-[#2E2822] text-[#C5BBAF] hover:text-white transition-colors cursor-pointer shadow-md"
            aria-label="Close image preview"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-20 p-2 sm:p-2.5 rounded-full bg-[#2E2822]/90 text-[#C5BBAF] hover:text-white hover:bg-[#446353] transition-colors cursor-pointer shadow-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Image & Caption Container */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center px-8 sm:px-12 w-full">
            <img
              src={activeItem.imageUrl}
              alt={activeItem.title}
              referrerPolicy="no-referrer"
              className="max-h-[55vh] sm:max-h-[65vh] max-w-full w-auto object-contain rounded-lg shadow-2xl border border-[#3E362E]"
            />
            <div className="mt-4 text-center text-white max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#7A9988] font-medium">
                {activeItem.category}
              </span>
              <h3 className="font-serif text-lg sm:text-2xl mt-1 text-[#FAF7F2] font-medium">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#ECE4D8] mt-1.5 leading-relaxed">
                {activeItem.caption}
              </p>
            </div>
          </div>

          {/* Navigation Next */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-[#2E2822]/90 text-[#C5BBAF] hover:text-white hover:bg-[#446353] transition-colors cursor-pointer shadow-md"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}

    </div>
  );
};
