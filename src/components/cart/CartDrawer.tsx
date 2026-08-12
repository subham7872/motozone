import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

interface CartDrawerProps {
  goToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ goToCheckout }) => {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();

  if (!isOpen) return null;

  const subtotal = totalPrice();
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-950 border-l border-zinc-800 w-full max-w-md h-full flex flex-col text-white shadow-2xl relative animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-wider">
              Your Showroom Cart ({totalItems()})
            </h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-600 mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-zinc-300">Your cart is empty</h3>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Explore our showroom and add your favorite superbike or electric vehicle to your reservation.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.bikeId}-${item.color}`}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-4 items-center"
              >
                <img
                  src={item.image}
                  alt={item.bikeName}
                  className="w-20 h-16 object-cover rounded-xl bg-zinc-950 border border-zinc-800 shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-sm font-black text-white truncate">{item.bikeName}</h4>
                  <p className="text-[10px] text-orange-400 font-semibold uppercase">Color: {item.color}</p>
                  <p className="text-xs font-extrabold text-zinc-200">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.bikeId, item.color)}
                    className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-0.5 text-xs font-bold">
                    <button
                      onClick={() => updateQuantity(item.bikeId, item.color, item.quantity - 1)}
                      className="text-zinc-400 hover:text-white px-1"
                    >
                      -
                    </button>
                    <span className="text-orange-400 px-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.bikeId, item.color, item.quantity + 1)}
                      className="text-zinc-400 hover:text-white px-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Totals & Checkout button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-950 space-y-3">
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Showroom Subtotal</span>
                <span className="text-zinc-200 font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%) & Handling</span>
                <span className="text-zinc-200 font-semibold">₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm text-white font-black pt-2 border-t border-zinc-800">
                <span>Total Amount Payable</span>
                <span className="text-orange-400 text-base">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCartOpen(false);
                goToCheckout();
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-black text-sm py-4 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>Safe 256-Bit Encrypted Payment & Direct Booking</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
