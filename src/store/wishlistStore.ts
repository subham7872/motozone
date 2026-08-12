import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  wishlist: string[]; // array of bike _ids
  isOpen: boolean;
  toggleWishlist: (bikeId: string) => void;
  isInWishlist: (bikeId: string) => boolean;
  clearWishlist: () => void;
  setWishlistOpen: (open: boolean) => void;
  toggleWishlistOpen: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: ['bike-1', 'bike-4'], // pre-populate couple of items for initial showcase
      isOpen: false,

      toggleWishlist: (bikeId: string) => {
        set((state) => {
          const exists = state.wishlist.includes(bikeId);
          if (exists) {
            return { wishlist: state.wishlist.filter((id) => id !== bikeId) };
          } else {
            return { wishlist: [...state.wishlist, bikeId] };
          }
        });
      },

      isInWishlist: (bikeId: string) => {
        return get().wishlist.includes(bikeId);
      },

      clearWishlist: () => set({ wishlist: [] }),
      setWishlistOpen: (open: boolean) => set({ isOpen: open }),
      toggleWishlistOpen: () => set((state) => ({ isOpen: !state.isOpen }))
    }),
    {
      name: 'motozone-wishlist'
    }
  )
);
