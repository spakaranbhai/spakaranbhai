import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ConfigEditorDrawer } from './components/ConfigEditorDrawer';
import { SpaService } from './data/spaData';
import { initGA, trackPageView } from './utils/analytics';

// Lazy-loaded routes for code splitting and optimal bundle performance
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const FullBodyMassagePage = lazy(() => import('./pages/FullBodyMassagePage').then((m) => ({ default: m.FullBodyMassagePage })));
const CoupleSpaPage = lazy(() => import('./pages/CoupleSpaPage').then((m) => ({ default: m.CoupleSpaPage })));
const LuxurySpaPage = lazy(() => import('./pages/LuxurySpaPage').then((m) => ({ default: m.LuxurySpaPage })));
const BookingPage = lazy(() => import('./pages/BookingPage').then((m) => ({ default: m.BookingPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

/**
 * ScrollToTop component: resets scroll position & dispatches GA4 pageview on route transitions
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);

  return null;
};

/**
 * Accessible route loading fallback
 */
const RouteLoadingFallback: React.FC = () => (
  <div 
    role="status" 
    aria-live="polite"
    className="min-h-[50vh] flex flex-col items-center justify-center gap-3 bg-[#FAF7F2]"
  >
    <div className="w-9 h-9 rounded-full border-3 border-[#446353] border-t-transparent animate-spin" />
    <span className="text-xs text-[#685F53] font-medium tracking-wide">
      Preparing sanctuary experience...
    </span>
  </div>
);

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [selectedServiceForDetail, setSelectedServiceForDetail] = useState<SpaService | null>(null);
  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false);

  useEffect(() => {
    initGA();
  }, []);

  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedServiceId(undefined);
  };

  const handleOpenDetail = (service: SpaService) => {
    setSelectedServiceForDetail(service);
  };

  const handleCloseDetail = () => {
    setSelectedServiceForDetail(null);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* Accessible Skip to Content Link (WCAG 2.4.1) */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#446353] focus:text-white focus:text-xs focus:font-semibold focus:rounded-sm focus:shadow-xl focus:outline-hidden"
      >
        Skip to main content
      </a>

      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#28231D] selection:bg-[#E7EFEA] selection:text-[#365143] font-sans">
        
        {/* Responsive Header */}
        <Header 
          onOpenBooking={handleOpenBooking}
          onOpenConfig={() => setIsConfigDrawerOpen(true)}
        />

        {/* Main Application Routing Landmark */}
        <main id="main-content" className="flex-1 focus:outline-hidden" tabIndex={-1}>
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage 
                    onOpenBooking={handleOpenBooking}
                    onSelectService={handleOpenDetail}
                    onOpenConfig={() => setIsConfigDrawerOpen(true)}
                  />
                } 
              />
              <Route 
                path="/about" 
                element={
                  <AboutPage 
                    onOpenBooking={handleOpenBooking} 
                  />
                } 
              />
              <Route 
                path="/services" 
                element={
                  <ServicesPage 
                    onOpenBooking={handleOpenBooking}
                    onSelectService={handleOpenDetail}
                  />
                } 
              />
              <Route 
                path="/full-body-massage" 
                element={
                  <FullBodyMassagePage 
                    onOpenBooking={handleOpenBooking}
                    onSelectService={handleOpenDetail}
                  />
                } 
              />
              <Route 
                path="/couple-spa" 
                element={
                  <CoupleSpaPage 
                    onOpenBooking={handleOpenBooking} 
                  />
                } 
              />
              <Route 
                path="/luxury-spa" 
                element={
                  <LuxurySpaPage 
                    onOpenBooking={handleOpenBooking} 
                  />
                } 
              />
              <Route 
                path="/booking" 
                element={
                  <BookingPage />
                } 
              />
              <Route 
                path="/gallery" 
                element={
                  <GalleryPage 
                    onOpenBooking={handleOpenBooking} 
                  />
                } 
              />
              <Route 
                path="/contact" 
                element={
                  <ContactPage 
                    onOpenBooking={handleOpenBooking}
                    onOpenConfig={() => setIsConfigDrawerOpen(true)}
                  />
                } 
              />
              <Route 
                path="/privacy-policy" 
                element={
                  <PrivacyPolicyPage />
                } 
              />
              <Route 
                path="/terms" 
                element={
                  <TermsPage />
                } 
              />
              {/* Accessible 404 Route */}
              <Route 
                path="*" 
                element={
                  <NotFoundPage />
                } 
              />
            </Routes>
          </Suspense>
        </main>

        {/* Global Footer */}
        <Footer 
          onOpenBooking={handleOpenBooking}
          onOpenConfig={() => setIsConfigDrawerOpen(true)}
        />

        {/* Interactive Modals & Drawers */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          preselectedServiceId={preselectedServiceId}
        />

        <ServiceDetailModal
          service={selectedServiceForDetail}
          onClose={handleCloseDetail}
          onBook={handleOpenBooking}
        />

        <ConfigEditorDrawer
          isOpen={isConfigDrawerOpen}
          onClose={() => setIsConfigDrawerOpen(false)}
        />

      </div>
    </BrowserRouter>
  );
}
