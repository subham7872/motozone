import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, PhoneCall, Sparkles } from 'lucide-react';
import api from '../../lib/api';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'test_ride' as 'test_ride' | 'purchase' | 'service' | 'general',
    bikeInterested: 'Yamaha YZF R15 V4',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return;

    setLoading(true);
    try {
      await api.post('/leads', { ...form, source: 'modal' });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    } catch (err) {
      console.error('Lead submission failed', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-white overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-zinc-800/80 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Instant VIP Concierge Call</span>
            </div>
            <h2 className="text-2xl font-black text-white leading-tight mb-2">
              Book a Free Test Ride & Exclusive Offers
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              Leave your details below and our senior superbike specialist will call you within 60 seconds.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="aarav@gmail.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">I am interested in</label>
                <select
                  value={form.interest}
                  onChange={e => setForm(p => ({ ...p, interest: e.target.value as any }))}
                  className="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                >
                  <option value="test_ride">Schedule a Test Ride</option>
                  <option value="purchase">Buy a Motorcycle (0% Down Payment)</option>
                  <option value="service">Service & Customization</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Motorcycle Model of Interest</label>
                <select
                  value={form.bikeInterested}
                  onChange={e => setForm(p => ({ ...p, bikeInterested: e.target.value }))}
                  className="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                >
                  <option value="Yamaha YZF R15 V4">Yamaha YZF R15 V4 (₹1,89,900)</option>
                  <option value="Royal Enfield Meteor 350">Royal Enfield Meteor 350 (₹2,12,000)</option>
                  <option value="KTM Duke 390 Gen 3">KTM Duke 390 Gen 3 (₹3,10,000)</option>
                  <option value="Ather 450X Apex">Ather 450X Apex (₹1,55,000)</option>
                  <option value="Honda CBR 650R">Honda CBR 650R (₹8,65,000)</option>
                  <option value="BMW S 1000 RR">BMW S 1000 RR (₹22,50,000)</option>
                  <option value="Kawasaki Z900">Kawasaki Z900 (₹9,30,000)</option>
                  <option value="Ducati Panigale V4 S">Ducati Panigale V4 S (₹33,000,000)</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-black text-sm py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <PhoneCall className="w-4 h-4" />
                      <span>Get Instant Callback</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-sm rounded-xl transition-colors"
                >
                  Skip
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center text-green-400 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">Callback Scheduled!</h3>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-xs mx-auto">
              Thank you, <span className="font-bold text-orange-400">{form.name}</span>. Our showroom manager will call you at <span className="font-bold text-white">{form.phone}</span> within 60 seconds.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
