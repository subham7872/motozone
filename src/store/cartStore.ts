import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ICartItem } from '../types';

interface CartStore {
  items: ICartItem[];
  isOpen: boolean;
  addItem: (item: ICartItem) => void;
  removeItem: (bikeId: string, color: string) => void;
  updateQuantity: (bikeId: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const existing = get().items.find(i => i.bikeId === item.bikeId && i.color === item.color);
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.bikeId === item.bikeId && i.color === item.color
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          }));
        } else {
          set(state => ({ items: [...state.items, item] }));
        }
        set({ isOpen: true });
      },

      removeItem: (bikeId, color) => set(state => ({
        items: state.items.filter(i => !(i.bikeId === bikeId && i.color === color))
      })),

      updateQuantity: (bikeId, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(bikeId, color);
          return;
        }
        set(state => ({
          items: state.items.map(i =>
            i.bikeId === bikeId && i.color === color ? { ...i, quantity } : i
          )
        }));
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      setCartOpen: (open) => set({ isOpen: open }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'motozone-bike-cart' }
  )
);
