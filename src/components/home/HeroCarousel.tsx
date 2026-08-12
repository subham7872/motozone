import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Zap, Calendar, Bike } from 'lucide-react';
import { IBike } from '../../types';

interface HeroCarouselProps {
  bikes?: IBike[];
  onOpenDetail?: (bike: IBike) => void;
  onOpenLeadModal?: (bikeName?: string) => void;
  setCurrentTab?: (tab: string) => void;
}

const slides = [
  {
    id: 1,
    tag: 'NEW ARRIVAL 2026',
    title: 'Yamaha YZF R15 V4',
    subtitle: 'Track-bred supersport precision with Quick Shifter, Traction Control & USD Telescopic Forks.',
    price: '₹1,89,900',
    originalPrice: '₹1,98,000',
    category: 'Track Supersport',
    badgeBg: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    accent: 'text-orange-400',
    bgGradient: 'from-zinc-950 via-zinc-950/80 to-orange-950/30',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1600&q=80',
    specs: ['155cc VVA Engine', '18.4 PS Power', 'Quick Shifter', 'USD Forks']
  },
  {
    id: 2,
    tag: 'TOP BESTSELLER',
    title: 'Royal Enfield Meteor 350',
    subtitle: 'Pure highway cruiser with refined J-Series engine and Tripper turn-by-turn navigation.',
    price: '₹2,12,000',
    originalPrice: '₹2,20,000',
    category: 'Highway Cruiser',
    badgeBg: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    accent: 'text-amber-400',
    bgGradient: 'from-zinc-950 via-zinc-950/80 to-amber-950/30',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1600&q=80',
    specs: ['349cc J-Series', '20.2 BHP Power', 'Tripper Nav', 'Dual ABS']
  },
  {
    id: 3,
    tag: 'EXTREME PERFORMANCE',
    title: 'KTM Duke 390 Gen 3',
    subtitle: 'Naked streetfighter built for agility with Cornering ABS, Launch Control & 5" TFT Dash.',
    price: '₹3,10,000',
    originalPrice: '₹3,25,000',
    category: 'Streetfighter',
    badgeBg: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    accent: 'text-orange-500',
    bgGradient: 'from-zinc-950 via-zinc-950/80 to-orange-950/30',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1600&q=80',
    specs: ['399cc Liquid Cooled', '46 PS Power', 'TFT Display', 'Launch Control']
  },
  {
    id: 4,
    tag: 'SUPERBIKE FLAGSHIP',
    title: 'Honda CBR 650R',
    subtitle: 'Screaming 4-cylinder Inline supersport performance engineered for adrenaline junkies.',
    price: '₹8,65,000',
    originalPrice: '₹8,90,000',
    category: 'Inline-4 Supersport',
    badgeBg: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    accent: 'text-rose-400',
    bgGradient: 'from-zinc-950 via-zinc-950/80 to-rose-950/30',
    image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=1600&q=80',
    specs: ['649cc Inline 4', '95 PS Power', 'Honda E-Clutch', 'Full TFT Screen']
  }
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  bikes = [],
  onOpenDetail,
  onOpenLeadModal,
  setCurrentTab
}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const s = slides[current];

  return (
    <section className="relative w-full min-h-[720px] lg:h-[90vh] lg:min-h-[650px] lg:max-h-[880px] overflow-hidden bg-zinc-950 pt-20 pb-20 lg:pb-0">
      {/* Background slide transition */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Vignette Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60 z-10" />
          
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out"
          />

          {/* Foreground Hero Card Content */}
          <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Active Slide Spotlight */}
              <div className="lg:col-span-7 space-y-4">
                {/* Category & Badge */}
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[11px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full border ${slide.badgeBg}`}
                  >
                    {slide.tag}
                  </span>
                  <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                    Category: <span className="text-white">{slide.category}</span>
                  </span>
                </div>

                {/* Bold Title */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>

                {/* Specs pill badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {slide.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-zinc-900/90 border border-zinc-800/90 text-zinc-200 px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 shadow-md"
                    >
                      <Zap className="w-3 h-3 text-orange-400" />
                      <span>{spec}</span>
                    </span>
                  ))}
                </div>

                {/* Price Tag */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className={`text-2xl sm:text-3xl font-black ${slide.accent}`}>
                    {slide.price}
                  </span>
                  <span className="text-xs text-zinc-500 line-through">
                    {slide.originalPrice}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>In Showroom Stock</span>
                  </span>
                </div>

                {/* Main Slide CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => onOpenLeadModal && onOpenLeadModal(slide.title)}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-xl shadow-orange-500/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <Calendar className="w-4 h-4 text-black" />
                    <span>Book a Test Ride</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (setCurrentTab) setCurrentTab('bikes');
                    }}
                    className="bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-extrabold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all hover:border-orange-500/50 cursor-pointer flex items-center gap-2"
                  >
                    <span>Explore Showroom</span>
                    <ArrowRight className="w-4 h-4 text-orange-400" />
                  </button>
                </div>
              </div>

              {/* Right Column: 4 Bike Cards Carousel Grid */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3 pt-4 lg:pt-0">
                {slides.map((item, index) => {
                  const isActive = index === current;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setCurrent(index)}
                      className={`group relative bg-zinc-900/90 backdrop-blur-md border rounded-2xl p-3 transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
                        isActive
                          ? 'border-orange-500 shadow-xl shadow-orange-500/20 ring-1 ring-orange-500/50 scale-[1.02]'
                          : 'border-zinc-800/80 hover:border-zinc-600 hover:bg-zinc-900'
                      }`}
                    >
                      {/* Thumbnail & Price */}
                      <div className="relative h-20 w-full overflow-hidden rounded-xl bg-zinc-950">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                        <span className="absolute bottom-1.5 left-2 text-[11px] font-black text-amber-400 bg-zinc-950/80 px-2 py-0.5 rounded-md border border-amber-500/30">
                          {item.price}
                        </span>
                      </div>

                      {/* Heading Title */}
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-black uppercase text-orange-400 tracking-wider block">
                          {item.category}
                        </span>
                        <h3 className="text-xs font-black text-white truncate group-hover:text-orange-400 transition-colors">
                          {item.title}
                        </h3>
                      </div>

                      {/* Card Button: Book a Test Ride */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenLeadModal) onOpenLeadModal(item.title);
                        }}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black text-[10px] uppercase tracking-wider py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <Calendar className="w-3 h-3 text-black" />
                        <span>Book a Test Ride</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Controls */}
      <div className="absolute bottom-8 right-6 sm:right-10 z-30 flex items-center gap-4">
        <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 rounded-full px-3.5 py-2 backdrop-blur-md shadow-2xl">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === current ? 'w-8 bg-orange-500' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            className="p-3 bg-zinc-900/90 border border-zinc-800 text-white rounded-full hover:bg-orange-500 hover:text-black transition-all cursor-pointer shadow-lg active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="p-3 bg-zinc-900/90 border border-zinc-800 text-white rounded-full hover:bg-orange-500 hover:text-black transition-all cursor-pointer shadow-lg active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

