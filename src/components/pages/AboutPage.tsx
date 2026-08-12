import React from 'react';
import { ShieldCheck, Award, Flame, Users, Sparkles, Trophy } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-500 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Founded in 2018</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
              India's Premier <span className="font-semibold text-amber-500">Superbike Experience</span> Store
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              MOTOZONE was born out of pure passion for track racing and high-displacement motorcycling. We set out to redefine superbike ownership in India by eliminating deceptive gray-market imports and bringing 100% official, manufacturer-backed motorcycles under one luxury roof.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-amber-500">5,000+</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Riders Served</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">18+</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Global Brands</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-amber-500">100%</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Official OEM</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80"
              alt="MOTOZONE Showroom"
              className="rounded-3xl border border-white/10 relative z-10 shadow-2xl object-cover w-full h-[400px]"
            />
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#16161a] border border-white/5 rounded-3xl p-8 space-y-4">
            <Trophy className="w-8 h-8 text-amber-500" />
            <h3 className="text-lg font-bold text-white">Curated Flagship Lineup</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every bike in our showroom undergoes a 120-point mechanical evaluation. From 200hp track monsters to eco-conscious EV racers.
            </p>
          </div>

          <div className="bg-[#16161a] border border-white/5 rounded-3xl p-8 space-y-4">
            <Users className="w-8 h-8 text-amber-500" />
            <h3 className="text-lg font-bold text-white">Active Riding Community</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We host monthly weekend breakfast rides, track day coaching at BIC & MMRT, and international motorcycle touring expeditions.
            </p>
          </div>

          <div className="bg-[#16161a] border border-white/5 rounded-3xl p-8 space-y-4">
            <Award className="w-8 h-8 text-amber-500" />
            <h3 className="text-lg font-bold text-white">Full Financial Transparency</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero hidden charges on road-tax or handling fees. Instant bank approval with partner schemes up to 60 months tenure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
