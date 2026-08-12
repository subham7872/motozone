import React from 'react';
import { X, Heart, Trash2, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCartStore } from '../../store/cartStore';
import { IBike } from '../../types';

interface WishlistDrawerProps {
  bikes: IBike[];
  onOpenDetail: (bike: IBike) => void;
  setCurrentTab: (tab: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  bikes,
  onOpenDetail,
  setCurrentTab
}) => {
  const { wishlist, isOpen, setWishlistOpen, toggleWishlist, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  if (!isOpen) return null;

  const wishlistBikes = bikes.filter((b) => wishlist.includes(b._id));

  const handleAddToCart = (bike: IBike) => {
    addItem({
      bikeId: bike._id,
      bikeName: bike.name,
      price: bike.discountPrice || bike.price,
      quantity: 1,
      color: bike.color[0] || 'Default',
      image: bike.images[0] || ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={() => setWishlistOpen(false)}
      />

      <div className="relative w-full max-w-md bg-zinc-900 border-l border-zinc-800 h-full flex flex-col justify-between z-10 shadow-2xl text-white">
        {/* Drawer Header */}
        <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-wide">Saved Wishlist</h3>
              <p className="text-xs text-zinc-400">
                {wishlistBikes.length} {wishlistBikes.length === 1 ? 'superbike' : 'superbikes'} saved
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {wishlistBikes.length > 0 && (
              <button
                onClick={clearWishlist}
                className="text-[11px] text-zinc-400 hover:text-rose-400 px-2.5 py-1 rounded-lg border border-zinc-800 hover:border-rose-500/30 transition-all cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setWishlistOpen(false)}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-800/60 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistBikes.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-800/60 border border-zinc-700 flex items-center justify-center mx-auto text-zinc-500">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-zinc-200">Your Wishlist is Empty</h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Heart your favorite superbikes in the showroom to save them here for easy access.
                </p>
              </div>
              <button
                onClick={() => {
                  setWishlistOpen(false);
                  setCurrentTab('bikes');
                }}
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-2xl transition-all cursor-pointer"
              >
                Browse Showroom
              </button>
            </div>
          ) : (
            wishlistBikes.map((bike) => (
              <div
                key={bike._id}
                className="bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 flex gap-4 items-center group transition-all"
              >
                <img
                  src={bike.images[0]}
                  alt={bike.name}
                  className="w-20 h-20 rounded-xl object-cover bg-zinc-900 border border-zinc-800 shrink-0 cursor-pointer"
                  onClick={() => {
                    setWishlistOpen(false);
                    onOpenDetail(bike);
                  }}
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-black uppercase text-orange-400 tracking-wider">
                    {bike.brand}
                  </span>
                  <h4
                    onClick={() => {
                      setWishlistOpen(false);
                      onOpenDetail(bike);
                    }}
                    className="text-sm font-bold text-white truncate cursor-pointer hover:text-orange-400 transition-colors"
                  >
                    {bike.name}
                  </h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-black text-amber-400">
                      ₹{(bike.discountPrice || bike.price).toLocaleString('en-IN')}
                    </span>
                    {bike.discountPrice && (
                      <span className="text-[10px] text-zinc-500 line-through">
                        ₹{bike.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleAddToCart(bike)}
                      className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-[11px] px-3 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Buy Now</span>
                    </button>
                    <button
                      onClick={() => {
                        setWishlistOpen(false);
                        onOpenDetail(bike);
                      }}
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Specs</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => toggleWishlist(bike._id)}
                  className="text-zinc-500 hover:text-rose-500 p-2 rounded-xl hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistBikes.length > 0 && (
          <div className="p-6 border-t border-zinc-800/80 bg-zinc-950 space-y-3">
            <button
              onClick={() => {
                setWishlistOpen(false);
                setCurrentTab('bikes');
              }}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore More Superbikes</span>
              <ArrowRight className="w-4 h-4 text-orange-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
