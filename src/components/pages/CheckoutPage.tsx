import React, { useState } from 'react';
import { CheckoutForm } from '../checkout/CheckoutForm';
import { Sparkles, CheckCircle2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

interface CheckoutPageProps {
  setCurrentTab: (tab: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ setCurrentTab }) => {
  const { items } = useCartStore();
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-500 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Secure Showroom Booking</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
              Finalize Your <span className="font-semibold text-amber-500">Superbike Order</span>
            </h1>
          </div>

          <button
            onClick={() => setCurrentTab('bikes')}
            className="self-start sm:self-auto bg-[#16161a] hover:bg-white/10 text-slate-300 font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-2xl border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Browsing Showroom</span>
          </button>
        </div>

        {/* Content */}
        {completedOrderId ? (
          <div className="bg-[#16161a] border border-emerald-500/30 rounded-3xl p-12 text-center max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">Superbike Booking Confirmed!</h2>
              <p className="text-xs text-slate-400">
                Order ID: <span className="font-mono font-bold text-amber-400">{completedOrderId}</span>
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              Our showroom concierge is preparing your official tax invoice, warranty docs, and scheduling your VIP delivery ceremony. Check your phone or WhatsApp for instant updates.
            </p>

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => setCurrentTab('crm')}
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-2xl transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                Track Booking in CRM Desk
              </button>
              <button
                onClick={() => setCurrentTab('bikes')}
                className="bg-[#0a0a0c] hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-2xl border border-white/10 transition-all cursor-pointer"
              >
                Back to Showroom
              </button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-[#16161a] border border-white/5 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
            <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-xl font-bold text-white">Your Reservation Cart is Empty</h3>
            <p className="text-xs text-slate-400">
              Select a superbike or accessory from our inventory to proceed with reservation.
            </p>
            <button
              onClick={() => setCurrentTab('bikes')}
              className="bg-amber-500 text-black font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-2xl hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Explore Showroom Models
            </button>
          </div>
        ) : (
          <CheckoutForm onOrderComplete={(id) => setCompletedOrderId(id)} />
        )}
      </div>
    </div>
  );
};
