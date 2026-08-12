import React from 'react';
import { ArrowRightLeft, X, Check, Trash2 } from 'lucide-react';
import { useCompareStore } from '../../store/compareStore';
import { IBike } from '../../types';

interface FloatingCompareBarProps {
  bikes: IBike[];
}

export const FloatingCompareBar: React.FC<FloatingCompareBarProps> = ({ bikes }) => {
  const { selectedBikeIds, removeCompare, clearCompare, setIsOpen } = useCompareStore();

  if (selectedBikeIds.length === 0) return null;

  const selectedBikes = bikes.filter((b) => selectedBikeIds.includes(b._id));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-zinc-900/95 border border-amber-500/40 rounded-full px-5 py-3 shadow-2xl backdrop-blur-md flex items-center gap-4 text-white animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-orange-500 text-black flex items-center justify-center font-black">
          <ArrowRightLeft className="w-4 h-4" />
        </div>
        <div className="hidden sm:block">
          <p className="text-xs font-black uppercase text-amber-400">Bike Comparison</p>
          <p className="text-[10px] text-zinc-400 font-medium">
            {selectedBikes.length}/2 bikes selected
          </p>
        </div>
      </div>

      {/* Selected Bike Chips */}
      <div className="flex items-center gap-2">
        {selectedBikes.map((bike) => (
          <div
            key={bike._id}
            className="flex items-center gap-2 bg-zinc-950 border border-zinc-700 px-3 py-1.5 rounded-full text-xs font-bold"
          >
            <img src={bike.images[0]} alt="" className="w-5 h-5 rounded-full object-cover" />
            <span className="max-w-[100px] truncate">{bike.name}</span>
            <button
              onClick={() => removeCompare(bike._id)}
              className="text-zinc-400 hover:text-rose-400 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-black text-xs px-4 py-2 rounded-full shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>Compare Now ({selectedBikes.length})</span>
        </button>

        <button
          onClick={clearCompare}
          className="p-2 text-zinc-400 hover:text-rose-400 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
          title="Clear Compare"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
