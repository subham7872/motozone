import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Gauge,
  Zap,
  Fuel,
  Scale,
  PhoneCall,
  Calculator,
  BellRing,
  Heart,
  ArrowRightLeft
} from 'lucide-react';
import { IBike } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCompareStore } from '../../store/compareStore';
import { PriceDropModal } from './PriceDropModal';
import { BikePerformanceChart } from './BikePerformanceChart';

interface BikeDetailProps {
  bike: IBike | null;
  onClose: () => void;
  openLeadModal: (bikeName?: string) => void;
  goToCheckout: () => void;
  onOpenEmiCalculator?: (bike: IBike) => void;
}

export const BikeDetail: React.FC<BikeDetailProps> = ({
  bike,
  onClose,
  openLeadModal,
  goToCheckout,
  onOpenEmiCalculator
}) => {
  if (!bike) return null;

  const [activeImage, setActiveImage] = useState(bike.images[0] || '');
  const [selectedColor, setSelectedColor] = useState(bike.color[0] || 'Default');
  const [quantity] = useState(1);
  const [emiTenure, setEmiTenure] = useState(36); // months
  const [isPriceAlertOpen, setIsPriceAlertOpen] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { isInCompare, toggleCompare } = useCompareStore();

  const isSaved = isInWishlist(bike._id);
  const isCompared = isInCompare(bike._id);

  const price = bike.discountPrice || bike.price;

  // Approximate EMI calculation (7.5% annual interest)
  const calculateEMI = () => {
    const loanAmount = price * 0.85; // 15% down payment
    const monthlyRate = 0.075 / 12;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, emiTenure)) /
      (Math.pow(1 + monthlyRate, emiTenure) - 1);
    return Math.round(emi);
  };

  const handleAddToCart = () => {
    addItem({
      bikeId: bike._id,
      bikeName: bike.name,
      price: price,
      quantity,
      color: selectedColor,
      image: bike.images[0] || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80'
    });
  };

  const handleBuyNowDirect = () => {
    handleAddToCart();
    onClose();
    goToCheckout();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
        <div className="bg-zinc-900 border border-zinc-700/80 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto text-white shadow-2xl relative my-auto">
          {/* Top control bar: Wishlist, Compare, Close */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist(bike._id)}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                isSaved
                  ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/30'
                  : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:text-rose-400'
              }`}
              title={isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>

            {/* Compare button */}
            <button
              onClick={() => toggleCompare(bike._id)}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                isCompared
                  ? 'bg-orange-500 text-black border-orange-500 font-bold shadow-lg shadow-orange-500/30'
                  : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:text-orange-400'
              }`}
              title={isCompared ? 'Added to Compare' : 'Compare Bike'}
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2.5 text-zinc-400 hover:text-white bg-zinc-800/80 border border-zinc-700 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8">
            {/* Left: Images gallery & Performance Chart */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl bg-zinc-950 overflow-hidden border border-zinc-800 relative">
                <img
                  src={activeImage || bike.images[0]}
                  alt={bike.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-orange-500 text-black text-xs font-extrabold uppercase px-3 py-1 rounded-full">
                  {bike.category}
                </div>
              </div>

              {/* Thumbnails */}
              {bike.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {bike.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImage === img ? 'border-orange-500 scale-105' : 'border-zinc-800 opacity-60'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Performance Graph (Recharts) */}
              <BikePerformanceChart bike={bike} />

              {/* Interactive EMI Calculator Card */}
              <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-orange-400">
                  <div className="flex items-center gap-1.5">
                    <Calculator className="w-4 h-4" />
                    <span>Instant EMI Estimator</span>
                  </div>
                  <span className="text-zinc-400">85% Loan • 7.5% p.a.</span>
                </div>

                <div className="flex items-center justify-between bg-zinc-900 p-3 rounded-xl">
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase font-semibold">Estimated Monthly EMI</p>
                    <p className="text-2xl font-black text-green-400">
                      ₹{calculateEMI().toLocaleString('en-IN')}
                      <span className="text-xs text-zinc-400 font-normal">/mo</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex gap-1.5">
                      {[12, 24, 36, 48].map((months) => (
                        <button
                          key={months}
                          onClick={() => setEmiTenure(months)}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-bold ${
                            emiTenure === months
                              ? 'bg-orange-500 border-orange-500 text-black'
                              : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                          }`}
                        >
                          {months}m
                        </button>
                      ))}
                    </div>
                    {onOpenEmiCalculator && (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenEmiCalculator(bike);
                        }}
                        className="text-[10px] text-orange-400 hover:text-orange-300 font-bold underline cursor-pointer"
                      >
                        Customize Loan in Full EMI Calculator →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Specs & Purchasing details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">
                  <span>{bike.brand}</span>
                  <span>•</span>
                  <span>{bike.year} Model</span>
                </div>
                <h2 className="text-3xl font-black text-white">{bike.name}</h2>
                <p className="text-xs text-zinc-400 mt-1">{bike.model}</p>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{bike.rating} ({bike.reviewCount} customer reviews)</span>
                  </div>
                  <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-lg font-semibold">
                    In Stock ({bike.stockCount} units left)
                  </span>
                </div>
              </div>

              {/* Pricing & Price Drop Alert trigger block */}
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold">Special Offer Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-orange-400">₹{price.toLocaleString('en-IN')}</span>
                    {bike.discountPrice && (
                      <span className="text-sm text-zinc-500 line-through">₹{bike.price.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-0.5">+ 18% GST & On-Road Registration Assistance</p>
                </div>

                {/* Price Drop Alert Button */}
                <button
                  onClick={() => setIsPriceAlertOpen(true)}
                  className="bg-zinc-900 hover:bg-orange-500 hover:text-black border border-zinc-700 text-orange-400 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg group shrink-0"
                >
                  <BellRing className="w-4 h-4 group-hover:animate-bounce" />
                  <span>Price Drop Alert</span>
                </button>
              </div>

              {/* Specs Breakdown Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Technical Specifications</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700/60 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Max Horsepower</span>
                      <strong className="text-white">{bike.specs.power}</strong>
                    </div>
                  </div>

                  <div className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700/60 flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Max Torque</span>
                      <strong className="text-white">{bike.specs.torque}</strong>
                    </div>
                  </div>

                  <div className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700/60 flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-teal-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Fuel / Battery</span>
                      <strong className="text-white">{bike.specs.fuelCapacity}</strong>
                    </div>
                  </div>

                  <div className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700/60 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Kerb Weight</span>
                      <strong className="text-white">{bike.specs.weight}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Swatch Selector */}
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-2 uppercase tracking-wider">Choose Color Variant</label>
                <div className="flex flex-wrap gap-2">
                  {bike.color.map((colorName, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(colorName)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedColor === colorName
                          ? 'bg-orange-500 border-orange-500 text-black shadow-md shadow-orange-500/20'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                      }`}
                    >
                      {colorName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNowDirect}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-black py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    openLeadModal(bike.name);
                  }}
                  className="w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-orange-400 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book Home Test Drive or Request Callback</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Drop Alert Modal */}
      <PriceDropModal
        isOpen={isPriceAlertOpen}
        onClose={() => setIsPriceAlertOpen(false)}
        bike={bike}
      />
    </>
  );
};
