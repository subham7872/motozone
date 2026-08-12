import React from 'react';
import { Wrench, Shield, Sparkles, Cpu, Clock, CheckCircle2, Headphones, Flame } from 'lucide-react';

interface ServicesPageProps {
  onOpenLeadModal: (bikeName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenLeadModal }) => {
  const services = [
    {
      icon: <Wrench className="w-6 h-6 text-amber-500" />,
      title: 'Desmo & Superbike Servicing',
      desc: 'Master technicians equipped with official brand diagnostic OBD scanners for Ducati, BMW, Kawasaki, and KTM.',
      perks: ['Computerized Engine Diagnostics', 'Dyno Testing & ECU Remapping', 'Full Synthetic Liquid Moly Oil Service']
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: 'Ceramic Coating & PPF Protection',
      desc: '9H Hardness Nano Ceramic Coating and self-healing Paint Protection Film (PPF) for mirror gloss and scratch shielding.',
      perks: ['Hydrophobic Water Repellency', 'UV Shield Against Paint Fading', '3-Year Warranty Included']
    },
    {
      icon: <Cpu className="w-6 h-6 text-amber-500" />,
      title: 'Custom Performance Exhaust & Tuning',
      desc: 'Authorized installation of Akrapovič, SC-Project, and Arrow exhaust systems with fuel map calibration.',
      perks: ['DB Killer Custom Tuning', 'Weight Reduction Upgrades', 'Track Sound Profiling']
    },
    {
      icon: <Shield className="w-6 h-6 text-amber-500" />,
      title: 'Insurance Claim & Crash Restoration',
      desc: 'Seamless cashless insurance claims with official OEM spare parts replacement and laser chassis alignment check.',
      perks: ['Zero Dep Cashless Claims', 'Laser Frame Measurement', 'Free Pickup & Drop Towing']
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold">MOTOZONE Pitstop & Care</p>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Precision <span className="font-semibold text-amber-500">Superbike Servicing</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            India's premiere superbike service station. Certified mechanics, official OEM diagnostics, and climate-controlled detailing bays.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, i) => (
            <div
              key={i}
              className="bg-[#16161a] border border-white/5 rounded-3xl p-8 space-y-6 hover:border-amber-500/40 transition-all duration-300 shadow-xl relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                {svc.icon}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{svc.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{svc.desc}</p>
              </div>

              <ul className="space-y-2 border-t border-white/5 pt-4">
                {svc.perks.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onOpenLeadModal('Superbike Service Appointment')}
                className="w-full bg-[#0a0a0c] hover:bg-amber-500 hover:text-black border border-white/10 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-2xl transition-all cursor-pointer"
              >
                Book Service Slot
              </button>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="bg-gradient-to-r from-[#16161a] to-[#111114] border border-amber-500/20 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Need Emergency Superbike Towing?</h3>
            <p className="text-xs text-slate-400 max-w-lg">
              24/7 Hydraulic Flatbed Towing Service across South India. Zero-scratch secure tie-down transport to our workshop.
            </p>
          </div>

          <button
            onClick={() => onOpenLeadModal('Emergency Towing Assistance')}
            className="bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-amber-500/20"
          >
            Call Towing Hotline
          </button>
        </div>
      </div>
    </div>
  );
};
