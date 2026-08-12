import React from 'react';
import { Users, ShoppingCart, DollarSign, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { ILead, IOrder } from '../../types';

interface StatsCardsProps {
  leads: ILead[];
  orders: IOrder[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ leads, orders }) => {
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'paid' || o.orderStatus === 'confirmed')
    .reduce((sum, o) => sum + o.total, 0);

  const convertedLeads = leads.filter(l => l.status === 'converted').length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Revenue */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-2 relative overflow-hidden">
        <div className="absolute top-4 right-4 p-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-xl">
          <DollarSign className="w-5 h-5" />
        </div>
        <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block">Total Showroom Revenue</span>
        <h3 className="text-2xl font-black text-white">
          ₹{totalRevenue.toLocaleString('en-IN')}
        </h3>
        <p className="text-[11px] text-green-400 font-medium flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+18.4% from last month</span>
        </p>
      </div>

      {/* Leads */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-2 relative overflow-hidden">
        <div className="absolute top-4 right-4 p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
          <Users className="w-5 h-5" />
        </div>
        <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block">Active Customer Leads</span>
        <h3 className="text-2xl font-black text-white">
          {totalLeads} <span className="text-xs text-orange-400 font-bold">({newLeads} new)</span>
        </h3>
        <p className="text-[11px] text-zinc-400">Captured via Modal, AI Chat & Voice</p>
      </div>

      {/* Orders */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-2 relative overflow-hidden">
        <div className="absolute top-4 right-4 p-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
          <ShoppingCart className="w-5 h-5" />
        </div>
        <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block">Superbike Orders</span>
        <h3 className="text-2xl font-black text-white">
          {totalOrders}
        </h3>
        <p className="text-[11px] text-amber-400 font-medium">Card, UPI & 0% Finance</p>
      </div>

      {/* Conversion Rate */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-2 relative overflow-hidden">
        <div className="absolute top-4 right-4 p-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block">Lead Conversion Rate</span>
        <h3 className="text-2xl font-black text-green-400">
          {conversionRate}%
        </h3>
        <p className="text-[11px] text-zinc-400">Target benchmark: 25%</p>
      </div>
    </div>
  );
};
