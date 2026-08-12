import React, { useState } from 'react';
import { X, BellRing, CheckCircle2, Sparkles, TrendingDown, ArrowRight } from 'lucide-react';
import { IBike } from '../../types';
import confetti from 'canvas-confetti';

interface PriceDropModalProps {
  isOpen: boolean;
  onClose: () => void;
  bike: IBike | null;
}

export const PriceDropModal: React.FC<PriceDropModalProps> = ({ isOpen, onClose, bike }) => {
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !bike) return null;

  const currentPrice = bike.discountPrice || bike.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Save alert to local storage
    const savedAlerts = JSON.parse(localStorage.getItem('motozone_price_alerts') || '[]');
    savedAlerts.push({
      bikeId: bike._id,
      bikeName: bike.name,
      email,
      currentPrice,
      targetPrice: targetPrice || currentPrice,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('motozone_price_alerts', JSON.stringify(savedAlerts));

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setEmail('');
    setTargetPrice('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative">
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-zinc-800/80 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">Price Alert Set!</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                We'll notify <strong className="text-amber-400 font-mono">{email}</strong> immediately as soon as{' '}
                <strong className="text-white">{bike.name}</strong> goes on sale or drops in price!
              </p>
            </div>
            <button
              onClick={handleResetAndClose}
              className="bg-orange-500 text-black font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-2xl hover:bg-orange-400 transition-colors cursor-pointer"
            >
              Back to Showroom
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <BellRing className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-orange-400 uppercase tracking-widest">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>Instant Discount Notification</span>
                </div>
                <h3 className="text-lg font-black text-white">Price Drop Alert</h3>
              </div>
            </div>

            {/* Bike Info Preview */}
            <div className="flex items-center gap-3 bg-zinc-950 p-3 rounded-2xl border border-zinc-800">
              <img src={bike.images[0]} alt="" className="w-14 h-12 rounded-xl object-cover" />
              <div>
                <p className="text-xs font-bold text-white line-clamp-1">{bike.name}</p>
                <p className="text-xs font-black text-amber-400">
                  Current: ₹{currentPrice.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 block mb-1">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="rider@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700/80 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 block mb-1">
                  Desired Target Price (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder={(currentPrice * 0.9).toFixed(0)}
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700/80 rounded-2xl pl-8 pr-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-black text-xs uppercase tracking-wider py-3.5 rounded-2xl shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <BellRing className="w-4 h-4" />
              <span>Notify Me On Price Drop</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
