import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Percent,
  Calendar,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ArrowRight,
  TrendingUp,
  PieChart as PieChartIcon,
  Table as TableIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { IBike } from '../../types';

interface EmiCalculatorProps {
  bikes?: IBike[];
  selectedBike?: IBike | null;
  onSelectBike?: (bike: IBike) => void;
  openLeadModal?: (bikeName?: string) => void;
  goToCheckout?: () => void;
}

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({
  bikes = [],
  selectedBike: initialSelectedBike = null,
  onSelectBike,
  openLeadModal,
  goToCheckout
}) => {
  const [selectedBikeId, setSelectedBikeId] = useState<string>(
    initialSelectedBike?._id || bikes[0]?._id || ''
  );
  
  const currentBike = bikes.find((b) => b._id === selectedBikeId) || initialSelectedBike || bikes[0];

  // Base price (defaulting to current bike price or 2,50,000)
  const [customPrice, setCustomPrice] = useState<number>(
    currentBike ? (currentBike.discountPrice || currentBike.price) : 250000
  );

  const [isOnRoad, setIsOnRoad] = useState<boolean>(true);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20%
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% p.a.
  const [tenureMonths, setTenureMonths] = useState<number>(36); // 36 months
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Update custom price when bike selection changes
  useEffect(() => {
    if (currentBike) {
      setCustomPrice(currentBike.discountPrice || currentBike.price);
    }
  }, [selectedBikeId, currentBike]);

  // Price calculations
  const effectivePrice = isOnRoad ? Math.round(customPrice * 1.12) : customPrice;
  const downPaymentAmount = Math.round((effectivePrice * downPaymentPercent) / 100);
  const loanAmount = Math.max(0, effectivePrice - downPaymentAmount);

  // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculateEmi = () => {
    if (loanAmount <= 0) return 0;
    const monthlyInterestRate = interestRate / 12 / 100;
    const emi =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, tenureMonths)) /
      (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
    return Math.round(emi);
  };

  const monthlyEmi = calculateEmi();
  const totalPayment = monthlyEmi * tenureMonths;
  const totalInterest = Math.max(0, totalPayment - loanAmount);

  // Recharts Pie Data
  const pieData = [
    { name: 'Loan Principal', value: loanAmount, color: '#f97316' }, // orange-500
    { name: 'Total Interest', value: totalInterest, color: '#fbbf24' } // amber-400
  ];

  // Amortization Schedule generator (yearly summary)
  const generateAmortization = () => {
    const monthlyRate = interestRate / 12 / 100;
    let balance = loanAmount;
    const schedule: { month: number; principal: number; interest: number; balance: number }[] = [];

    for (let i = 1; i <= tenureMonths; i++) {
      const interestForMonth = Math.round(balance * monthlyRate);
      const principalForMonth = monthlyEmi - interestForMonth;
      balance = Math.max(0, balance - principalForMonth);

      schedule.push({
        month: i,
        principal: principalForMonth,
        interest: interestForMonth,
        balance
      });
    }

    return schedule;
  };

  const amortizationSchedule = generateAmortization();

  return (
    <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-8 text-white shadow-2xl my-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5 shadow-lg shadow-orange-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-orange-400">
              <Calculator className="w-6 h-6" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-400 tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Superbike Finance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Instant EMI & Loan Calculator
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl text-xs font-bold text-zinc-300">
          <button
            onClick={() => setIsOnRoad(false)}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              !isOnRoad ? 'bg-orange-500 text-black font-extrabold shadow-md' : 'hover:text-white'
            }`}
          >
            Ex-Showroom
          </button>
          <button
            onClick={() => setIsOnRoad(true)}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              isOnRoad ? 'bg-orange-500 text-black font-extrabold shadow-md' : 'hover:text-white'
            }`}
          >
            On-Road (+12% RTO & Ins)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs & Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Bike Picker */}
          {bikes.length > 0 && (
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 block mb-2">
                Select Superbike Model
              </label>
              <select
                value={selectedBikeId}
                onChange={(e) => setSelectedBikeId(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500 font-bold"
              >
                {bikes.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.brand} {b.name} — ₹{(b.discountPrice || b.price).toLocaleString('en-IN')}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Bike Custom Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold uppercase tracking-wider text-zinc-400">
                {isOnRoad ? 'Estimated On-Road Price' : 'Ex-Showroom Price'}
              </span>
              <span className="font-black text-amber-400 text-base">
                ₹{effectivePrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={2500000}
              step={10000}
              value={customPrice}
              onChange={(e) => setCustomPrice(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
          </div>

          {/* Down Payment % Slider */}
          <div className="bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold uppercase tracking-wider text-zinc-300">
                Down Payment ({downPaymentPercent}%)
              </span>
              <span className="font-bold text-orange-400">
                ₹{downPaymentAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-bold">
              <span>Min 10% (₹{Math.round(effectivePrice * 0.1).toLocaleString('en-IN')})</span>
              <span>Max 80% (₹{Math.round(effectivePrice * 0.8).toLocaleString('en-IN')})</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold uppercase tracking-wider text-zinc-300">
                Interest Rate (p.a.)
              </span>
              <span className="font-bold text-amber-400">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={5.0}
              max={16.0}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-bold">
              <span>Prime Rate (5.0%)</span>
              <span>Standard (16.0%)</span>
            </div>
          </div>

          {/* Loan Tenure Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 block">
              Loan Tenure
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[12, 24, 36, 48, 60].map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => setTenureMonths(months)}
                  className={`py-3 rounded-2xl border text-xs font-black transition-all cursor-pointer flex flex-col items-center justify-center ${
                    tenureMonths === months
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black border-orange-500 shadow-lg shadow-orange-500/20'
                      : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  <span className="text-sm">{months}m</span>
                  <span className="text-[9px] opacity-80">{months / 12} {months === 12 ? 'Year' : 'Years'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Dashboard (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-zinc-950 border border-zinc-800 p-6 rounded-3xl">
          <div className="space-y-6">
            {/* Display Monthly EMI */}
            <div className="bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/30 p-5 rounded-2xl text-center space-y-1">
              <span className="text-[10px] font-black uppercase text-orange-400 tracking-widest block">
                Estimated Monthly EMI
              </span>
              <div className="text-4xl font-black text-amber-400">
                ₹{monthlyEmi.toLocaleString('en-IN')}
                <span className="text-xs font-semibold text-zinc-400"> / month</span>
              </div>
              <p className="text-[10px] text-zinc-400 pt-1">
                For {tenureMonths} months at {interestRate}% interest rate
              </p>
            </div>

            {/* Recharts Pie Breakdown */}
            <div className="h-44 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number) => [`₹${val.toLocaleString('en-IN')}`, '']}
                    contentStyle={{
                      backgroundColor: '#18181b',
                      borderColor: '#3f3f46',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#fff'
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconSize={8} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Financial Totals List */}
            <div className="space-y-2.5 text-xs border-t border-zinc-800/80 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-medium">Principal Loan Amount</span>
                <span className="font-extrabold text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-medium">Total Interest Amount</span>
                <span className="font-extrabold text-amber-400">₹{totalInterest.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-black border-t border-zinc-800/80 pt-2">
                <span className="text-zinc-200">Total Payable Amount</span>
                <span className="text-orange-400">₹{totalPayment.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            {openLeadModal && (
              <button
                type="button"
                onClick={() => openLeadModal(currentBike?.name)}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-black text-xs uppercase tracking-wider py-3.5 rounded-2xl shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Apply For Instant Loan Approval</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <TableIcon className="w-3.5 h-3.5 text-orange-400" />
              <span>{showAmortization ? 'Hide Repayment Schedule' : 'View Full Repayment Schedule'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Amortization Schedule Table */}
      {showAmortization && (
        <div className="border-t border-zinc-800 pt-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span>Repayment Schedule Breakdown</span>
            </h3>
            <span className="text-xs text-zinc-400 font-mono">
              {tenureMonths} Monthly Installments
            </span>
          </div>

          <div className="max-h-60 overflow-y-auto border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800 text-xs">
            <div className="grid grid-cols-4 bg-zinc-950 p-3 font-extrabold uppercase text-orange-400 text-[10px] tracking-wider sticky top-0">
              <span>Month</span>
              <span>Principal</span>
              <span>Interest</span>
              <span>Remaining Balance</span>
            </div>
            {amortizationSchedule.map((row) => (
              <div key={row.month} className="grid grid-cols-4 p-3 hover:bg-zinc-900/50 transition-colors">
                <span className="font-mono text-zinc-400">Month #{row.month}</span>
                <span className="font-bold text-zinc-200">₹{row.principal.toLocaleString('en-IN')}</span>
                <span className="font-bold text-amber-400">₹{row.interest.toLocaleString('en-IN')}</span>
                <span className="font-mono text-zinc-400">₹{row.balance.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
