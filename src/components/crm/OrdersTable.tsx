import React, { useState } from 'react';
import { IOrder } from '../../types';
import { Search, Package, Shield, CheckCircle2, Clock, Truck } from 'lucide-react';

interface OrdersTableProps {
  orders: IOrder[];
  onUpdateStatus: (id: string, status: IOrder['orderStatus']) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onUpdateStatus }) => {
  const [search, setSearch] = useState('');

  const filtered = orders.filter((order) => {
    return (
      order.orderId.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.phone.includes(search)
    );
  });

  const getOrderStatusBadge = (status: IOrder['orderStatus']) => {
    switch (status) {
      case 'pending':
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Payment Pending</span>;
      case 'confirmed':
        return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Confirmed</span>;
      case 'processing':
        return <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">In Inspection</span>;
      case 'delivered':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Delivered</span>;
      case 'cancelled':
        return <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Showroom Reservations & Orders</h3>
          <p className="text-xs text-slate-400">Track paid bookings, RTO registrations, and delivery handovers.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search order ID or customer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 bg-[#0a0a0c] border-y border-white/5">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Bikes Ordered</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-slate-500">
                  No orders recorded yet.
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr key={order._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-extrabold text-amber-500 font-mono">
                    {order.orderId}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {order.customer.name}
                    <span className="block text-[10px] text-slate-500 font-normal">{order.customer.phone}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {order.items.map(i => `${i.bikeName} (${i.color})`).join(', ')}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    {getOrderStatusBadge(order.orderStatus)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={order.orderStatus}
                      onChange={e => onUpdateStatus(order._id, e.target.value as IOrder['orderStatus'])}
                      className="bg-[#0a0a0c] border border-white/10 rounded-xl px-2.5 py-1 text-[11px] text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">In Inspection</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
