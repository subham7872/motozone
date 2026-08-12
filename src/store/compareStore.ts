import { create } from 'zustand';

interface CompareStore {
  selectedBikeIds: string[]; // max 2 bike _ids
  isOpen: boolean;
  toggleCompare: (bikeId: string) => void;
  removeCompare: (bikeId: string) => void;
  clearCompare: () => void;
  setIsOpen: (open: boolean) => void;
  isInCompare: (bikeId: string) => boolean;
}

export const useCompareStore = create<CompareStore>((set, get) => ({
  selectedBikeIds: [],
  isOpen: false,

  toggleCompare: (bikeId: string) => {
    const current = get().selectedBikeIds;
    if (current.includes(bikeId)) {
      set({ selectedBikeIds: current.filter(id => id !== bikeId) });
    } else {
      if (current.length >= 2) {
        // Replace second item or alert
        set({ selectedBikeIds: [current[0], bikeId] });
      } else {
        set({ selectedBikeIds: [...current, bikeId] });
      }
    }
  },

  removeCompare: (bikeId: string) => {
    set((state) => ({
      selectedBikeIds: state.selectedBikeIds.filter(id => id !== bikeId)
    }));
  },

  clearCompare: () => set({ selectedBikeIds: [], isOpen: false }),

  setIsOpen: (open: boolean) => set({ isOpen: open }),

  isInCompare: (bikeId: string) => get().selectedBikeIds.includes(bikeId)
}));
