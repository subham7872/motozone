import React, { useState } from 'react';
import { ILead } from '../../types';
import { Search, PhoneCall, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface LeadsTableProps {
  leads: ILead[];
  onUpdateStatus: (id: string, status: ILead['status']) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onUpdateStatus }) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      (lead.interestedBikeName && lead.interestedBikeName.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ILead['status']) => {
    switch (status) {
      case 'new':
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">New Inquiry</span>;
      case 'contacted':
        return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">In Discussion</span>;
      case 'qualified':
        return <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Qualified</span>;
      case 'converted':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Converted</span>;
      case 'lost':
        return <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Closed Lost</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Superbike Inquiries & Test Drive Leads</h3>
          <p className="text-xs text-slate-400">Manage real-time leads captured from web, phone, and AI Assistant.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search lead name or phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
          </div>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-[#0a0a0c] border border-white/10 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">In Discussion</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 bg-[#0a0a0c] border-y border-white/5">
            <tr>
              <th className="py-3 px-4">Lead Name</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Interested Bike</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-slate-500">
                  No leads found matching criteria.
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr key={lead._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    {lead.name}
                    <span className="block text-[10px] text-slate-500 font-normal">{lead.email}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-amber-400">
                    {lead.phone}
                  </td>
                  <td className="py-3.5 px-4 text-slate-200">
                    {lead.interestedBikeName || 'General Inquiry'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {lead.city || 'N/A'}
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(lead.status)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                    {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={lead.status}
                      onChange={e => onUpdateStatus(lead._id, e.target.value as ILead['status'])}
                      className="bg-[#0a0a0c] border border-white/10 rounded-xl px-2.5 py-1 text-[11px] text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
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
