import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Zap, Gauge, Flame, Heart, ArrowRightLeft } from 'lucide-react';
import { IBike } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCompareStore } from '../../store/compareStore';

interface BikeCardProps {
  bike: IBike;
  onOpenDetail: (bike: IBike) => void;
}

export const BikeCard: React.FC<BikeCardProps> = ({ bike, onOpenDetail }) => {
  const [selectedColor, setSelectedColor] = useState(bike.color[0] || 'Default');
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { isInCompare, toggleCompare } = useCompareStore();

  const isSaved = isInWishlist(bike._id);
  const isCompared = isInCompare(bike._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      bikeId: bike._id,
      bikeName: bike.name,
      price: bike.discountPrice || bike.price,
      quantity: 1,
      color: selectedColor,
      image: bike.images[0] || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80'
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(bike._id);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCompare(bike._id);
  };

  return (
    <div
      onClick={() => onOpenDetail(bike)}
      className="group bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 cursor-pointer flex flex-col justify-between relative"
    >
      <div>
        {/* Top Image Container */}
        <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden">
          <img
            src={bike.images[0] || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80'}
            alt={bike.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Category & Discount Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span className="text-[10px] font-black tracking-widest uppercase bg-zinc-950/80 border border-zinc-700 text-orange-400 px-2.5 py-1 rounded-full backdrop-blur-md">
              {bike.category}
            </span>
            {bike.discountPrice && (
              <span className="text-[10px] font-black uppercase bg-red-500 text-white px-2.5 py-0.5 rounded-full shadow-md">
                SAVE ₹{(bike.price - bike.discountPrice).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-zinc-950/80 border border-zinc-800 px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1 backdrop-blur-md z-10">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{bike.rating}</span>
          </div>

          {/* Quick Floating Action Buttons (Wishlist & Compare) */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                isSaved
                  ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/40'
                  : 'bg-zinc-950/80 border-zinc-700/80 text-zinc-300 hover:text-rose-400 hover:border-rose-400'
              }`}
              title={isSaved ? 'Saved to Wishlist' : 'Save to Wishlist'}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={handleToggleCompare}
              className={`p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                isCompared
                  ? 'bg-orange-500 border-orange-500 text-black shadow-lg shadow-orange-500/40'
                  : 'bg-zinc-950/80 border-zinc-700/80 text-zinc-300 hover:text-orange-400 hover:border-orange-400'
              }`}
              title={isCompared ? 'In Compare list' : 'Add to Compare'}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick View hover overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-zinc-900/90 text-white text-xs font-bold px-4 py-2 rounded-full border border-zinc-700 flex items-center gap-1.5 shadow-xl">
              <Eye className="w-3.5 h-3.5 text-orange-400" />
              <span>Click for Specs & Chart</span>
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 space-y-4">
          <div>
            <p className="text-[11px] font-extrabold uppercase text-orange-400 tracking-wider">
              {bike.brand} • {bike.year}
            </p>
            <h3 className="text-lg font-black text-white group-hover:text-orange-400 transition-colors line-clamp-1">
              {bike.name}
            </h3>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-300 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-1.5 truncate">
              <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="truncate">{bike.engine}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Gauge className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{bike.mileage}</span>
            </div>
            <div className="col-span-2 text-zinc-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>Power: <strong className="text-zinc-200">{bike.specs.power}</strong></span>
            </div>
          </div>

          {/* Color Selection Swatches */}
          <div>
            <p className="text-[10px] text-zinc-400 font-medium mb-1.5 uppercase tracking-wider">Available Colors</p>
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {bike.color.map((colorName, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(colorName)}
                  className={`text-[10px] px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                    selectedColor === colorName
                      ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                      : 'bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                  }`}
                >
                  {colorName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Action */}
      <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-800/60 mt-2">
        <div>
          <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Ex-Showroom Price</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-white">
              ₹{(bike.discountPrice || bike.price).toLocaleString('en-IN')}
            </span>
            {bike.discountPrice && (
              <span className="text-xs text-zinc-500 line-through">
                ₹{bike.price.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
            added
              ? 'bg-green-500 text-black'
              : 'bg-orange-500 hover:bg-orange-600 text-black shadow-md shadow-orange-500/20'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{added ? 'Added!' : 'Buy Now'}</span>
        </button>
      </div>
    </div>
  );
};
