import React, { useState, useEffect } from 'react';
import { ShoppingBag, Mic, Menu, X, PhoneCall, Heart, ArrowRightLeft } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCompareStore } from '../../store/compareStore';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openVoiceAgent: () => void;
  openLeadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openVoiceAgent,
  openLeadModal
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { totalItems, toggleCart } = useCartStore();
  const { wishlist, toggleWishlistOpen } = useWishlistStore();
  const { selectedBikeIds, setIsOpen: setCompareOpen } = useCompareStore();

  const cartCount = totalItems();
  const wishlistCount = wishlist.length;
  const compareCount = selectedBikeIds.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'bikes', label: 'Showroom' },
    { id: 'emi', label: 'EMI Calculator' },
    { id: 'services', label: 'Services & Care' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
    { id: 'crm', label: 'CRM Portal' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-xl'
          : 'bg-gradient-to-b from-zinc-950/90 via-zinc-950/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => {
            setCurrentTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group text-left cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <div className="flex items-baseline text-2xl font-black tracking-wider uppercase">
              <span className="text-white">MOTO</span>
              <span className="text-orange-500 ml-1">ZONE</span>
            </div>
            <p className="text-[10px] tracking-widest text-zinc-400 font-medium -mt-1 uppercase">
              Superbike Showroom
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-0.5 xl:gap-1 bg-zinc-900/80 border border-zinc-800/80 rounded-full px-2.5 py-1.5 backdrop-blur-sm shadow-inner">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentTab(link.id)}
                className={`px-2.5 lg:px-3 xl:px-4 py-1.5 rounded-full text-[10px] lg:text-[11px] xl:text-xs font-semibold tracking-wider transition-all uppercase whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-orange-500 text-black shadow-md shadow-orange-500/20 font-bold'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Bike Compare Modal Icon */}
          <button
            onClick={() => setCompareOpen(true)}
            className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white transition-all relative cursor-pointer"
            title="Bike Comparison"
            aria-label="Compare Bikes"
          >
            <ArrowRightLeft className="w-4 h-4 text-orange-400" />
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>

          {/* Wishlist Heart Icon */}
          <button
            onClick={toggleWishlistOpen}
            className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white transition-all relative cursor-pointer group"
            title="View Saved Wishlist"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 text-rose-500 ${wishlistCount > 0 ? 'fill-rose-500' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white transition-all relative cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-zinc-900 text-white border border-zinc-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                currentTab === link.id
                  ? 'bg-orange-500 text-black font-bold'
                  : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <button
              onClick={() => {
                toggleWishlistOpen();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-zinc-900 text-rose-400 border border-zinc-800 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-rose-500" />
              Wishlist ({wishlistCount})
            </button>
            <button
              onClick={() => {
                openLeadModal();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-orange-500 text-black py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              Request Instant Callback
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
