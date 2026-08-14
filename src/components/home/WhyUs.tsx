import React from 'react';
import { ShieldCheck, Zap, Percent, Clock, Award, Headphones } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const highlights = [
    {
      icon: <Percent className="w-6 h-6 text-amber-500" />,
      title: '0% Down Payment Finance',
      description: 'Partnered with Top Banks (HDFC, ICICI, SBI) for flexible EMI schemes up to 60 months with minimal paperwork.'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: '60-Second VIP Response',
      description: 'Our superbike concierge guarantees an instant callback or doorstep test ride arrangement within 60 seconds.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: 'Official Manufacturer Warranty',
      description: '100% genuine showroom inventory backed by up to 5 years warranty, RTO registration, and road assistance.'
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-500" />,
      title: 'Same-Day Showroom Delivery',
      description: 'Complete inspection, ceramic coating, and official keys handover completed within 4 hours of booking.'
    }
  ];

  return (
    <section className="py-20 bg-[#111114] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold">The MOTOZONE Difference</p>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
            Why Superbike Enthusiasts <span className="font-semibold text-amber-500">Trust Us</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Over 5,000+ luxury motorcycles delivered across India with industry-leading customer satisfaction standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#16161a] border border-white/5 rounded-3xl p-6 space-y-4 hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="bg-[#16161a] border border-white/5 rounded-3xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-black text-amber-500">5,200+</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-1 font-semibold">Bikes Handed Over</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-white">99.4%</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-1 font-semibold">5-Star Customer Rating</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-amber-500">18+</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-1 font-semibold">Superbike Brands</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-white">24 / 7</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-1 font-semibold">AI Assistant Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};
