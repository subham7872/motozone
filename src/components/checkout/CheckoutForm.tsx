import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Building2,
  Smartphone,
  DollarSign,
  Truck,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { CheckoutProgressBar } from './CheckoutProgressBar';
import api from '../../lib/api';
import confetti from 'canvas-confetti';

interface CheckoutFormProps {
  onOrderComplete: (orderId: string) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onOrderComplete }) => {
  const { items, totalPrice, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'emi' | 'cod'>('card');

  const [customer, setCustomer] = useState({
    name: 'Vikramaditya Roy',
    email: 'vikram@domain.com',
    phone: '+91 98765 43210',
    address: '42, Indiranagar 100ft Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038'
  });

  const subtotal = totalPrice();
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.email || !customer.address || !customer.city) {
      alert('Please fill out all required shipping fields.');
      return;
    }
    setCurrentStep(2);
  };

  const handleNextStep2 = () => {
    setCurrentStep(3);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/orders', {
        customer,
        items: items.map((i) => ({
          bikeId: i.bikeId,
          bikeName: i.bikeName,
          price: i.price,
          quantity: i.quantity,
          color: i.color
        })),
        paymentMethod
      });

      if (res.success) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
        clearCart();
        onOrderComplete(res.data.orderId);
      }
    } catch (err: any) {
      alert(err.message || 'Order submission failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Visual Multi-step Progress Indicator */}
      <CheckoutProgressBar
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Step Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: Shipping & Delivery Info */}
          {currentStep === 1 && (
            <form onSubmit={handleNextStep1} className="bg-[#16161a] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-orange-400 tracking-wider">Step 1 of 3</span>
                    <h2 className="text-xl font-bold text-white">Delivery & Registration Details</h2>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Roy"
                    value={customer.name}
                    onChange={(e) => setCustomer((p) => ({ ...p, name: e.target.value }))}
                    className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={customer.phone}
                    onChange={(e) => setCustomer((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@domain.com"
                    value={customer.email}
                    onChange={(e) => setCustomer((p) => ({ ...p, email: e.target.value }))}
                    className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">Delivery Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="House / Flat No., Street, Landmark"
                    value={customer.address}
                    onChange={(e) => setCustomer((p) => ({ ...p, address: e.target.value }))}
                    className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bengaluru"
                    value={customer.city}
                    onChange={(e) => setCustomer((p) => ({ ...p, city: e.target.value }))}
                    className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">State & Pincode *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Karnataka"
                      value={customer.state}
                      onChange={(e) => setCustomer((p) => ({ ...p, state: e.target.value }))}
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-3 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="560038"
                      value={customer.pincode}
                      onChange={(e) => setCustomer((p) => ({ ...p, pincode: e.target.value }))}
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-3 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-black font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-lg shadow-orange-500/20 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Options */}
          {currentStep === 2 && (
            <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-orange-400 tracking-wider">Step 2 of 3</span>
                    <h2 className="text-xl font-bold text-white">Select Payment Method</h2>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                    paymentMethod === 'card'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                      : 'bg-[#0a0a0c] border-white/10 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <div>
                    <p className="text-xs font-bold text-white">Credit / Debit Card</p>
                    <p className="text-[9px] opacity-70">Stripe Secured</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                    paymentMethod === 'upi'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                      : 'bg-[#0a0a0c] border-white/10 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <div>
                    <p className="text-xs font-bold text-white">Instant UPI / QR</p>
                    <p className="text-[9px] opacity-70">GPay, PhonePe, Paytm</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('emi')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                    paymentMethod === 'emi'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                      : 'bg-[#0a0a0c] border-white/10 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  <div>
                    <p className="text-xs font-bold text-white">0% Finance EMI</p>
                    <p className="text-[9px] opacity-70">Instant Bank Approval</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                    paymentMethod === 'cod'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                      : 'bg-[#0a0a0c] border-white/10 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <DollarSign className="w-5 h-5" />
                  <div>
                    <p className="text-xs font-bold text-white">Showroom Pickup</p>
                    <p className="text-[9px] opacity-70">Pay On Handover</p>
                  </div>
                </button>
              </div>

              <div className="p-4 bg-[#0a0a0c] rounded-2xl border border-white/5 text-xs text-zinc-400 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  256-bit SSL Encrypted Transaction
                </p>
                <p className="text-[11px]">
                  All transactions are verified by MotoZone's direct banking gateway. Your payment security is guaranteed.
                </p>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="bg-[#0a0a0c] hover:bg-white/10 text-zinc-300 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep2}
                  className="bg-orange-500 hover:bg-orange-600 text-black font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-lg shadow-orange-500/20 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Review Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Final Confirmation */}
          {currentStep === 3 && (
            <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-orange-400 tracking-wider">Step 3 of 3</span>
                    <h2 className="text-xl font-bold text-white">Review & Confirm Booking</h2>
                  </div>
                </div>
              </div>

              {/* Delivery Summary Box */}
              <div className="bg-[#0a0a0c] p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="font-extrabold uppercase text-amber-400 tracking-wider text-[10px]">Recipient Details</span>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-[10px] text-orange-400 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <p className="font-bold text-white">{customer.name} ({customer.phone})</p>
                <p className="text-zinc-400">{customer.address}, {customer.city}, {customer.state} - {customer.pincode}</p>
                <p className="text-zinc-400">{customer.email}</p>
              </div>

              {/* Payment Summary Box */}
              <div className="bg-[#0a0a0c] p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="font-extrabold uppercase text-amber-400 tracking-wider text-[10px]">Payment Method</span>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-[10px] text-orange-400 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <p className="font-bold text-white uppercase">{paymentMethod} Payment</p>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-[#0a0a0c] hover:bg-white/10 text-zinc-300 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Payment</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={loading || items.length === 0}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-black text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
                >
                  {loading ? (
                    <span>Processing Reservation...</span>
                  ) : (
                    <>
                      <span>Confirm & Reserve (₹{total.toLocaleString('en-IN')})</span>
                      <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Right Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 space-y-6 sticky top-28">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3">
              Order Summary
            </h3>

            <div className="space-y-4 max-h-72 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.bikeId}-${item.color}`} className="flex gap-3 items-center text-xs">
                  <img src={item.image} alt={item.bikeName} className="w-14 h-12 rounded-xl object-cover bg-[#0a0a0c]" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">{item.bikeName}</p>
                    <p className="text-[10px] text-amber-500 font-semibold">{item.color} • Qty {item.quantity}</p>
                  </div>
                  <p className="font-bold text-slate-200">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-4 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Ex-Showroom Total</span>
                <span className="text-white font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax (18%)</span>
                <span className="text-white font-semibold">₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/5">
                <span>Total Amount</span>
                <span className="text-amber-500 text-base">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="bg-[#0a0a0c] p-4 rounded-2xl border border-white/5 text-[10px] text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Includes Free Warranty & RTO</span>
              </div>
              <p>Every purchase includes 1 Year Roadside Assistance, 1st Free Service voucher, and official RTO ownership transfer support.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
