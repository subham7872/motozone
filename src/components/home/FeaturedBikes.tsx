import React from 'react';
import { ArrowRight, Flame, Star, Sparkles } from 'lucide-react';
import { IBike } from '../../types';
import { BikeCard } from '../shop/BikeCard';

interface FeaturedBikesProps {
  bikes: IBike[];
  onOpenDetail: (bike: IBike) => void;
  setCurrentTab: (tab: string) => void;
}

export const FeaturedBikes: React.FC<FeaturedBikesProps> = ({
  bikes,
  onOpenDetail,
  setCurrentTab
}) => {
  const featured = bikes.filter(b => b.isFeatured).slice(0, 4);

  return (
    <section className="py-20 bg-[#0a0a0c] border-t border-white/5 relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-500 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Flagship Performance</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              Featured <span className="font-semibold text-amber-500">Superbikes</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg">
              Engineered for velocity, track dynamics, and highway cruising. Hand-picked models ready for instant test ride and immediate delivery.
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('bikes')}
            className="self-start md:self-auto bg-[#16161a] hover:bg-amber-500 hover:text-black border border-white/10 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2 cursor-pointer group shadow-lg"
          >
            <span>View All Showroom Inventory</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bike Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((bike) => (
            <BikeCard key={bike._id} bike={bike} onOpenDetail={onOpenDetail} />
          ))}
        </div>
      </div>
    </section>
  );
};
