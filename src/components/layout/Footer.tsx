import React from 'react';
import { MapPin, Phone, Mail, Clock, Shield, Award, Sparkles } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openLeadModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, openLeadModal }) => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-black font-black text-lg">
              ⚡
            </div>
            <div className="flex items-baseline text-2xl font-black tracking-wider uppercase">
              <span className="text-white">MOTO</span>
              <span className="text-orange-500 ml-1">ZONE</span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-zinc-400">
            India's premier luxury motorcycle showroom. Featuring superbike sales, instant test drives, 0% EMI financing, and official authorized maintenance.
          </p>
          <div className="flex items-center gap-3 text-zinc-300 text-xs font-semibold pt-2">
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
              <Shield className="w-3.5 h-3.5 text-orange-400" />
              <span>Official Dealer</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>ISO Certified</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-4 border-l-2 border-orange-500 pl-2">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => setCurrentTab('home')} className="hover:text-orange-400 transition-colors">
                Home & Highlights
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('bikes')} className="hover:text-orange-400 transition-colors">
                Browse Superbikes
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('services')} className="hover:text-orange-400 transition-colors">
                Service, Maintenance & Repairs
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('about')} className="hover:text-orange-400 transition-colors">
                About MOTOZONE Story
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('contact')} className="hover:text-orange-400 transition-colors">
                Contact & Location
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('crm')} className="hover:text-orange-400 transition-colors font-semibold text-orange-400">
                🔒 Admin CRM Portal
              </button>
            </li>
          </ul>
        </div>

        {/* Showroom Contact & Hours */}
        <div>
          <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-4 border-l-2 border-orange-500 pl-2">
            Showroom Hours
          </h3>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>74 Ring Road, Indiranagar, Bengaluru, KA 560038</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-orange-400 shrink-0" />
              <span>+91 (080) 4920-8800 / +91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-orange-400 shrink-0" />
              <span>contact@motozone.com</span>
            </li>
            <li className="flex items-center gap-2.5 pt-1">
              <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
              <span className="text-zinc-300">Mon - Sun: 9:00 AM - 9:00 PM</span>
            </li>
          </ul>
        </div>

        {/* VIP Callout */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>VIP Concierge</span>
          </div>
          <h4 className="text-white font-bold text-sm">Want a private home test ride?</h4>
          <p className="text-xs text-zinc-400">
            Our luxury transport delivers any superbike right to your doorstep for a personal 30-minute test drive.
          </p>
          <button
            onClick={openLeadModal}
            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20"
          >
            Request Private VIP Drive
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
        <p>© 2026 MOTOZONE Superbike Showroom Ltd. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Sale</span>
          <span>EMI Disclaimer</span>
        </div>
      </div>
    </footer>
  );
};
