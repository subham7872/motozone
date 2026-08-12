import React, { useState } from 'react';
import { IBike } from '../../types';
import { BikeCard } from '../shop/BikeCard';
import { BikeFilters } from '../shop/BikeFilters';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

interface ShopPageProps {
  bikes: IBike[];
  onOpenDetail: (bike: IBike) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ bikes, onOpenDetail }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(3500000);
  const [inStockOnly, setInStockOnly] = useState(false);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('');
    setSearchQuery('');
    setPriceRange(3500000);
    setInStockOnly(false);
  };

  const filteredBikes = bikes.filter((bike) => {
    if (selectedCategory !== 'all' && bike.category !== selectedCategory) return false;
    if (selectedBrand && bike.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = bike.name.toLowerCase().includes(q);
      const matchBrand = bike.brand.toLowerCase().includes(q);
      if (!matchName && !matchBrand) return false;
    }
    if (bike.price > priceRange) return false;
    if (inStockOnly && !bike.inStock) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="space-y-3 border-b border-white/5 pb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-500 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Showroom Collection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Explore All <span className="font-semibold text-amber-500">Superbikes & EVs</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Filter through India's premier lineup of track racing bikes, luxury cruisers, adventure tourers, and next-gen electric motorcycles.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filters */}
          <div className="lg:col-span-3">
            <BikeFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              resetFilters={resetFilters}
            />
          </div>

          {/* Bike Grid */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <p>
                Showing <span className="font-bold text-amber-500">{filteredBikes.length}</span> bikes
              </p>
            </div>

            {filteredBikes.length === 0 ? (
              <div className="bg-[#16161a] border border-white/5 rounded-3xl p-12 text-center space-y-4">
                <SlidersHorizontal className="w-10 h-10 text-amber-500 mx-auto opacity-50" />
                <h3 className="text-lg font-bold text-white">No Superbikes Match Your Search</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Try broadening your price range or resetting brand and category filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-amber-500 text-black font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-2xl hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBikes.map((bike) => (
                  <BikeCard key={bike._id} bike={bike} onOpenDetail={onOpenDetail} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
