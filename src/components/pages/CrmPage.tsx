import React, { useState, useEffect } from 'react';
import { ILead, IOrder } from '../../types';
import api from '../../lib/api';
import { StatsCards } from '../crm/StatsCards';
import { LeadsTable } from '../crm/LeadsTable';
import { OrdersTable } from '../crm/OrdersTable';
import { Sparkles, Users, ShoppingBag, LayoutDashboard, RefreshCw } from 'lucide-react';

export const CrmPage: React.FC = () => {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    testDriveScheduled: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [activeTab, setActiveTab] = useState<'leads' | 'orders'>('leads');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, ordersRes, statsRes] = await Promise.all([
        api.get('/leads'),
        api.get('/orders'),
        api.get('/stats')
      ]);

      if (leadsRes.success) setLeads(leadsRes.data);
      if (ordersRes.success) setOrders(ordersRes.data);
      if (statsRes.success) setStats(statsRes.data);
    } catch (err) {
      console.error('Failed to fetch CRM data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateLeadStatus = async (id: string, status: ILead['status']) => {
    try {
      const res = await api.patch(`/leads/${id}`, { status });
      if (res.success) {
        setLeads(prev => prev.map(l => l._id === id ? { ...l, status } : l));
        fetchData();
      }
    } catch (err: any) {
      alert('Error updating lead: ' + err.message);
    }
  };

  const handleUpdateOrderStatus = async (id: string, orderStatus: IOrder['orderStatus']) => {
    try {
      const res = await api.patch(`/orders/${id}`, { orderStatus });
      if (res.success) {
        setOrders(prev => prev.map(o => o._id === id ? { ...o, orderStatus } : o));
        fetchData();
      }
    } catch (err: any) {
      alert('Error updating order: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-500 font-bold">
              <LayoutDashboard className="w-4 h-4" />
              <span>Showroom Operations Desk</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-light text-white tracking-tight">
              MOTOZONE <span className="font-semibold text-amber-500">CRM & Sales Console</span>
            </h1>
          </div>

          <button
            onClick={fetchData}
            disabled={loading}
            className="self-start sm:self-auto bg-[#16161a] hover:bg-amber-500 hover:text-black border border-white/10 text-white font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Data</span>
          </button>
        </div>

        {/* Stats Metrics */}
        <StatsCards stats={stats} />

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-white/5">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-xs uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              activeTab === 'leads'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Test Ride Leads ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-xs uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Showroom Reservations ({orders.length})</span>
          </button>
        </div>

        {/* Active View */}
        {activeTab === 'leads' ? (
          <LeadsTable leads={leads} onUpdateStatus={handleUpdateLeadStatus} />
        ) : (
          <OrdersTable orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
        )}
      </div>
    </div>
  );
};
