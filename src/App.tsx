import React, { useState, useEffect } from 'react';
import { IBike } from './types';
import api from './lib/api';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Home Components
import { HeroCarousel } from './components/home/HeroCarousel';
import { FeaturedBikes } from './components/home/FeaturedBikes';
import { WhyUs } from './components/home/WhyUs';
import { Testimonials } from './components/home/Testimonials';
import { LeadModal } from './components/home/LeadModal';

// Pages
import { ShopPage } from './components/pages/ShopPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { CrmPage } from './components/pages/CrmPage';
import { CheckoutPage } from './components/pages/CheckoutPage';

// Modals, Drawers & Comparison
import { BikeDetail } from './components/shop/BikeDetail';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';
import { BikeCompareModal } from './components/compare/BikeCompareModal';
import { FloatingCompareBar } from './components/compare/FloatingCompareBar';
import { Chatbot } from './components/chatbot/Chatbot';
import { VoiceAgent } from './components/voice/VoiceAgent';
import { EmiCalculator } from './components/calculator/EmiCalculator';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [bikes, setBikes] = useState<IBike[]>([]);
  const [selectedBikeDetail, setSelectedBikeDetail] = useState<IBike | null>(null);

  // Lead modal state
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalBikeName, setLeadModalBikeName] = useState<string | undefined>(undefined);

  // Voice agent trigger state
  const [voiceAgentTrigger, setVoiceAgentTrigger] = useState(0);

  // Fetch bikes on mount
  useEffect(() => {
    const loadBikes = async () => {
      try {
        const res = await api.get('/bikes');
        if (res.success && res.data) {
          setBikes(res.data);
        }
      } catch (err) {
        console.error('Error fetching bikes:', err);
      }
    };
    loadBikes();
  }, []);

  const handleOpenLeadModal = (bikeName?: string) => {
    setLeadModalBikeName(bikeName);
    setIsLeadModalOpen(true);
  };

  const handleOpenBikeDetail = (bike: IBike) => {
    setSelectedBikeDetail(bike);
  };

  const handleGoToCheckout = () => {
    setSelectedBikeDetail(null);
    setCurrentTab('checkout');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openVoiceAgent={() => setVoiceAgentTrigger((prev) => prev + 1)}
        openLeadModal={() => handleOpenLeadModal()}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div>
            <HeroCarousel
              bikes={bikes}
              onOpenDetail={handleOpenBikeDetail}
              onOpenLeadModal={handleOpenLeadModal}
              setCurrentTab={setCurrentTab}
            />
            <FeaturedBikes
              bikes={bikes}
              onOpenDetail={handleOpenBikeDetail}
              setCurrentTab={setCurrentTab}
            />
            <WhyUs />
            <Testimonials />
          </div>
        )}

        {currentTab === 'bikes' && (
          <ShopPage bikes={bikes} onOpenDetail={handleOpenBikeDetail} />
        )}

        {currentTab === 'emi' && (
          <div className="pt-24 pb-16 px-4">
            <EmiCalculator
              bikes={bikes}
              openLeadModal={handleOpenLeadModal}
              goToCheckout={handleGoToCheckout}
            />
          </div>
        )}

        {currentTab === 'services' && (
          <ServicesPage onOpenLeadModal={() => handleOpenLeadModal()} />
        )}

        {currentTab === 'about' && <AboutPage />}

        {currentTab === 'contact' && <ContactPage />}

        {currentTab === 'crm' && <CrmPage />}

        {currentTab === 'checkout' && (
          <CheckoutPage setCurrentTab={setCurrentTab} />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer goToCheckout={handleGoToCheckout} />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        bikes={bikes}
        onOpenDetail={handleOpenBikeDetail}
        setCurrentTab={setCurrentTab}
      />

      {/* Bike Comparison Side-by-Side Modal */}
      <BikeCompareModal
        bikes={bikes}
        openLeadModal={handleOpenLeadModal}
      />

      {/* Floating Bottom Comparison Bar */}
      <FloatingCompareBar bikes={bikes} />

      {/* Bike Quick View / Detail Modal */}
      <BikeDetail
        bike={selectedBikeDetail}
        onClose={() => setSelectedBikeDetail(null)}
        openLeadModal={handleOpenLeadModal}
        goToCheckout={handleGoToCheckout}
        onOpenEmiCalculator={(bike) => {
          setSelectedBikeDetail(null);
          setCurrentTab('emi');
        }}
      />

      {/* Test Drive Lead Form Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        bikeName={leadModalBikeName}
        bikes={bikes}
      />

      {/* AI Assistant Floating Widgets */}
      <Chatbot />
      <VoiceAgent externalTrigger={voiceAgentTrigger} />
    </div>
  );
}
