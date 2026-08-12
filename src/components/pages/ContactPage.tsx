import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import api from '../../lib/api';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/leads', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        city: form.city,
        notes: form.message,
        source: 'contact_page'
      });
      setSubmitted(true);
    } catch (err: any) {
      alert('Error submitting message: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold">Visit Our Flagship Showroom</p>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Get In <span className="font-semibold text-amber-500">Touch</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Have questions about bike availability, test rides, or custom financing? Our superbike concierges are ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Flagship Experience Center</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    MOTOZONE Towers, No. 42 Indiranagar 100ft Road, Bengaluru, Karnataka - 560038
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Superbike Concierge Hotline</h4>
                  <p className="text-xs font-mono font-bold text-amber-400">+91 98765 43210 / 080 4123 9900</p>
                  <p className="text-[10px] text-slate-500 mt-1">Available 9:00 AM - 9:00 PM (Mon - Sun)</p>
                </div>
              </div>
            </div>

            <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Email Desk</h4>
                  <p className="text-xs font-mono text-slate-300">sales@motozone.in</p>
                  <p className="text-[10px] text-slate-500 mt-1">Direct responses within 15 minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#16161a] border border-white/5 rounded-3xl p-8">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Thank you, {form.name}. Our senior superbike specialist will call you at {form.phone} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white border-l-2 border-amber-500 pl-3 mb-6">
                  Send Direct Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arjun Kapoor"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="arjun@domain.com"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">City</label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru"
                      value={form.city}
                      onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">Message or Specific Bike Inquiry</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what bike you're looking for or your financing questions..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Sending Inquiry...' : 'Submit Inquiry'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
