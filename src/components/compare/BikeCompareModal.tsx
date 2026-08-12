import React from 'react';
import { X, Check, ArrowRightLeft, ShoppingBag, PhoneCall, Sparkles, Plus, Trash2 } from 'lucide-react';
import { IBike } from '../../types';
import { useCompareStore } from '../../store/compareStore';
import { useCartStore } from '../../store/cartStore';

interface BikeCompareModalProps {
  bikes: IBike[];
  openLeadModal: (bikeName?: string) => void;
}

export const BikeCompareModal: React.FC<BikeCompareModalProps> = ({
  bikes,
  openLeadModal
}) => {
  const { selectedBikeIds, isOpen, setIsOpen, removeCompare, toggleCompare, clearCompare } = useCompareStore();
  const addItem = useCartStore((state) => state.addItem);

  if (!isOpen) return null;

  const bike1 = bikes.find((b) => b._id === selectedBikeIds[0]);
  const bike2 = bikes.find((b) => b._id === selectedBikeIds[1]);

  const handleSelectBike = (slotIndex: number, bikeId: string) => {
    if (slotIndex === 0) {
      if (bike2 && bike2._id === bikeId) return; // avoid selecting same bike
      useCompareStore.setState({ selectedBikeIds: [bikeId, selectedBikeIds[1]].filter(Boolean) as string[] });
    } else {
      if (bike1 && bike1._id === bikeId) return;
      useCompareStore.setState({ selectedBikeIds: [selectedBikeIds[0], bikeId].filter(Boolean) as string[] });
    }
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto text-white shadow-2xl relative my-auto">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-zinc-900/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-orange-400 font-extrabold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Side-by-Side Comparison</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Compare Superbike Specifications
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs text-zinc-400 hover:text-rose-400 px-3 py-1.5 rounded-xl border border-zinc-800 hover:border-rose-500/30 transition-all cursor-pointer hidden sm:block"
            >
              Reset Selection
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-800/80 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="p-6 space-y-6">
          {/* Top Bike Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slot 1 */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 space-y-3">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-orange-400 block">
                Bike #1
              </label>
              <select
                value={bike1?._id || ''}
                onChange={(e) => handleSelectBike(0, e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-bold"
              >
                <option value="" disabled>-- Select First Bike --</option>
                {bikes.map((b) => (
                  <option key={b._id} value={b._id} disabled={b._id === bike2?._id}>
                    {b.brand} {b.name} (₹{(b.discountPrice || b.price).toLocaleString('en-IN')})
                  </option>
                ))}
              </select>

              {bike1 ? (
                <div className="flex gap-4 items-center pt-2">
                  <img
                    src={bike1.images[0]}
                    alt={bike1.name}
                    className="w-24 h-20 rounded-xl object-cover bg-zinc-900 border border-zinc-800"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">{bike1.category}</span>
                    <h3 className="text-base font-black text-white">{bike1.name}</h3>
                    <p className="text-sm font-black text-amber-400">
                      ₹{(bike1.discountPrice || bike1.price).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                  Select a bike to compare
                </div>
              )}
            </div>

            {/* Slot 2 */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 space-y-3">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-orange-400 block">
                Bike #2
              </label>
              <select
                value={bike2?._id || ''}
                onChange={(e) => handleSelectBike(1, e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-bold"
              >
                <option value="" disabled>-- Select Second Bike --</option>
                {bikes.map((b) => (
                  <option key={b._id} value={b._id} disabled={b._id === bike1?._id}>
                    {b.brand} {b.name} (₹{(b.discountPrice || b.price).toLocaleString('en-IN')})
                  </option>
                ))}
              </select>

              {bike2 ? (
                <div className="flex gap-4 items-center pt-2">
                  <img
                    src={bike2.images[0]}
                    alt={bike2.name}
                    className="w-24 h-20 rounded-xl object-cover bg-zinc-900 border border-zinc-800"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">{bike2.category}</span>
                    <h3 className="text-base font-black text-white">{bike2.name}</h3>
                    <p className="text-sm font-black text-amber-400">
                      ₹{(bike2.discountPrice || bike2.price).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                  Select a second bike to compare
                </div>
              )}
            </div>
          </div>

          {/* Comparison Matrix Table */}
          {bike1 || bike2 ? (
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800/80 text-xs">
              {/* Row: Ex-Showroom Price */}
              <div className="grid grid-cols-3 p-4 items-center">
                <span className="font-extrabold uppercase text-zinc-400 tracking-wider">Ex-Showroom Price</span>
                <span className="font-black text-amber-400 text-sm text-center">
                  {bike1 ? `₹${(bike1.discountPrice || bike1.price).toLocaleString('en-IN')}` : '-'}
                </span>
                <span className="font-black text-amber-400 text-sm text-center">
                  {bike2 ? `₹${(bike2.discountPrice || bike2.price).toLocaleString('en-IN')}` : '-'}
                </span>
              </div>

              {/* Row: Brand & Category */}
              <div className="grid grid-cols-3 p-4 items-center bg-zinc-900/40">
                <span className="font-extrabold uppercase text-zinc-400 tracking-wider">Brand & Type</span>
                <span className="text-center font-bold text-zinc-200">
                  {bike1 ? `${bike1.brand} (${bike1.category})` : '-'}
                </span>
                <span className="text-center font-bold text-zinc-200">
                  {bike2 ? `${bike2.brand} (${bike2.category})` : '-'}
                </span>
              </div>

              {/* Row: Engine */}
              <div className="grid grid-cols-3 p-4 items-center">
                <span className="font-extrabold uppercase text-zinc-400 tracking-wider">Engine Displacement</span>
                <span className="text-center text-zinc-200">{bike1?.engine || '-'}</span>
                <span className="text-center text-zinc-200">{bike2?.engine || '-'}</span>
              </div>

              {/* Row: Max Power */}
              <div className="grid grid-cols-3 p-4 items-center bg-zinc-900/40">
                <span className="font-extrabold uppercase text-zinc-400 tracking-wider">Max Horsepower</span>
                <span className="text-center font-bold text-orange-400">{bike1?.specs.power || '-'}</span>
                <span className="text-center font-bold text-orange-400">{bike2?.specs.power || '-'}</span>
              </div>

              {/* Row: Torque */}
              <div className="grid grid-cols-3 p-4 items-center">
                <span className="font-extrabold uppercase text-zinc-400 tracking-wider">Peak Torque</span>
                <span className="text-center font-bold text-amber-400">{bike1?.specs.torque || '-'}</span>
                <span className="text-center font-bold text-amber-400">{bike2?.specs.torque || '-'}</span>
              </div>

              {/* Row: Mileage / Range */}
              <div className="grid grid-cols-3 p-4 items-center bg-zinc-900/40">
                <span className="font-extrabold uppercase text-zinc-400 tracking-wider">Fuel Efficiency / Range</span>
                <span className="text-center text-zinc-200">{bike1?.mileage || '-'}</span>
                <span className="text-center text-zinc-200">{bike2?.mileage || '-'}</span>
              </div>

              {/* Row: Kerb Weight */}
              <div className="grid grid-cols-3 p-4 items-center">
                <span className="font-extrabold uppercase text-zinc-400 tracking-wider">Kerb Weight</span>
                <span className="text-center text-zinc-200">{bike1?.specs.weight || '-'}</span>
                <span className="text-center text-zinc-200">{bike2?.specs.weight || '-'}</span>
              </div>

              {/* Row: Seat Height */}
              <div className="grid grid-cols-3 p-4 items-center bg-zinc-900/40">
                <span className="font-extrabold uppercase text-zinc-400 tracking-wider">Seat Height</span>
                <span className="text-center text-zinc-200">{bike1?.specs.seatHeight || '-'}</span>
                <span className="text-center text-zinc-200">{bike2?.specs.seatHeight || '-'}</span>
              </div>

              {/* Row: Fuel Tank */}
              <div className="grid grid-cols-3 p-4 items-center">
                <span className="font-extrabold uppercase text-zinc-400 tracking-wider">Fuel Tank Capacity</span>
                <span className="text-center text-zinc-200">{bike1?.specs.fuelCapacity || '-'}</span>
                <span className="text-center text-zinc-200">{bike2?.specs.fuelCapacity || '-'}</span>
              </div>

              {/* Row: Key Features */}
              <div className="grid grid-cols-3 p-4 items-start bg-zinc-900/40">
                <span className="font-extrabold uppercase text-zinc-400 tracking-wider">Key Highlights</span>
                <ul className="space-y-1 text-zinc-300 px-2">
                  {bike1?.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-[11px]">
                      <Check className="w-3 h-3 text-orange-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-1 text-zinc-300 px-2">
                  {bike2?.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-[11px]">
                      <Check className="w-3 h-3 text-orange-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Row: Action Buttons */}
              <div className="grid grid-cols-3 p-4 items-center bg-zinc-950">
                <span className="font-extrabold uppercase text-zinc-400 tracking-wider">Reservation</span>
                <div className="flex flex-col gap-2 p-1">
                  {bike1 && (
                    <>
                      <button
                        onClick={() => handleAddToCart(bike1)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 rounded-xl flex items-center justify-center gap-1 text-[11px] cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Reserve {bike1.brand}</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          openLeadModal(bike1.name);
                        }}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-1.5 rounded-xl text-[10px] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <PhoneCall className="w-3 h-3 text-amber-400" />
                        <span>Book Test Ride</span>
                      </button>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-2 p-1">
                  {bike2 && (
                    <>
                      <button
                        onClick={() => handleAddToCart(bike2)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 rounded-xl flex items-center justify-center gap-1 text-[11px] cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Reserve {bike2.brand}</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          openLeadModal(bike2.name);
                        }}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-1.5 rounded-xl text-[10px] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <PhoneCall className="w-3 h-3 text-amber-400" />
                        <span>Book Test Ride</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500">
              Select two bikes from the dropdown above to view side-by-side specs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
