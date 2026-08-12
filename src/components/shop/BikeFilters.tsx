import React from 'react';
import { Filter, RotateCcw, Search } from 'lucide-react';

interface BikeFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  priceRange: number;
  setPriceRange: (p: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
  resetFilters: () => void;
}

export const BikeFilters: React.FC<BikeFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  inStockOnly,
  setInStockOnly,
  resetFilters
}) => {
  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'sport', label: 'Sport & Racing' },
    { id: 'cruiser', label: 'Cruiser & Retro' },
    { id: 'adventure', label: 'Adventure & Tourer' },
    { id: 'electric', label: 'EV Electric' },
    { id: 'commuter', label: 'Naked Street' }
  ];

  const brands = ['All Brands', 'Yamaha', 'Royal Enfield', 'KTM', 'Ather', 'Honda', 'BMW Motorrad', 'Kawasaki', 'Ducati'];

  return (
    <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
          <Filter className="w-4 h-4 text-amber-500" />
          <span>Filter Superbikes</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-400 hover:text-amber-500 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">Search Model</label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="e.g. Duke 390, CBR 650R..."
            className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        </div>
      </div>

      {/* Category Pills */}
      <div>
        <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">Category</label>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-black font-bold shadow-md'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Select */}
      <div>
        <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">Brand</label>
        <select
          value={selectedBrand}
          onChange={e => setSelectedBrand(e.target.value)}
          className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
        >
          {brands.map((brand, i) => (
            <option key={i} value={brand === 'All Brands' ? '' : brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
          <span>Max Price</span>
          <span className="text-amber-500">₹{(priceRange / 100000).toFixed(1)} Lakhs</span>
        </div>
        <input
          type="range"
          min="100000"
          max="3500000"
          step="50000"
          value={priceRange}
          onChange={e => setPriceRange(Number(e.target.value))}
          className="w-full accent-amber-500 bg-[#0a0a0c] h-1.5 rounded-lg cursor-pointer"
        />
      </div>

      {/* In Stock Checkbox */}
      <div className="pt-2 border-t border-white/5">
        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={e => setInStockOnly(e.target.checked)}
            className="accent-amber-500 w-4 h-4 rounded border-white/10"
          />
          <span>In-Stock Ready for Delivery</span>
        </label>
      </div>
    </div>
  );
};
