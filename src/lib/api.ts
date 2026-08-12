import { INITIAL_BIKES, INITIAL_LEADS, INITIAL_ORDERS } from '../data/initialData';
import { IBike, ILead, IOrder } from '../types';

const API_BASE = '/api';

// Client-side LocalStorage Persistence Engine (Frontend Standalone Mode)
const getLocalBikes = (): IBike[] => {
  if (typeof window === 'undefined') return INITIAL_BIKES;
  const saved = localStorage.getItem('motozone_bikes');
  if (!saved) {
    localStorage.setItem('motozone_bikes', JSON.stringify(INITIAL_BIKES));
    return INITIAL_BIKES;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return INITIAL_BIKES;
  }
};

const getLocalLeads = (): ILead[] => {
  if (typeof window === 'undefined') return INITIAL_LEADS;
  const saved = localStorage.getItem('motozone_leads');
  if (!saved) {
    localStorage.setItem('motozone_leads', JSON.stringify(INITIAL_LEADS));
    return INITIAL_LEADS;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return INITIAL_LEADS;
  }
};

const getLocalOrders = (): IOrder[] => {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  const saved = localStorage.getItem('motozone_orders');
  if (!saved) {
    localStorage.setItem('motozone_orders', JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return INITIAL_ORDERS;
  }
};

export const getAuthToken = () => {
  return typeof window !== 'undefined' ? localStorage.getItem('motozone_token') : null;
};

export const api = {
  async get(endpoint: string) {
    const token = getAuthToken();
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Backend not running or offline: seamless frontend standalone fallback
    }

    // Frontend Standalone Fallbacks
    if (endpoint.startsWith('/bikes')) {
      const bikes = getLocalBikes();
      return { success: true, data: bikes, total: bikes.length };
    }

    if (endpoint.startsWith('/leads')) {
      const leads = getLocalLeads();
      return { success: true, data: leads, total: leads.length };
    }

    if (endpoint.startsWith('/orders')) {
      const orders = getLocalOrders();
      return { success: true, data: orders, total: orders.length };
    }

    if (endpoint.startsWith('/stats')) {
      const leads = getLocalLeads();
      const orders = getLocalOrders();
      const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
      return {
        success: true,
        data: {
          totalLeads: leads.length,
          newLeads: leads.filter(l => l.status === 'new').length,
          testDriveScheduled: leads.filter(l => l.status === 'qualified' || l.interest === 'test_ride').length,
          totalOrders: orders.length,
          totalRevenue
        }
      };
    }

    return { success: true, data: [] };
  },

  async post(endpoint: string, body: any) {
    const token = getAuthToken();
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Backend offline fallback
    }

    // Standalone Local Lead Handler
    if (endpoint === '/leads') {
      const leads = getLocalLeads();
      const now = new Date().toISOString();
      const newLead: ILead = {
        _id: `lead-${Date.now()}`,
        name: body.name || 'Anonymous Rider',
        phone: body.phone || 'N/A',
        email: body.email || 'N/A',
        interest: body.interest || 'general',
        bikeInterested: body.bikeInterested || body.notes || 'General Inquiry',
        message: body.notes || body.message || '',
        source: body.source || 'modal',
        status: 'new',
        createdAt: now,
        updatedAt: now
      };
      const updated = [newLead, ...leads];
      localStorage.setItem('motozone_leads', JSON.stringify(updated));
      return { success: true, data: newLead };
    }

    // Standalone Local Order Handler
    if (endpoint === '/orders') {
      const orders = getLocalOrders();
      const subtotal = body.items.reduce((s: number, i: any) => s + (i.price * i.quantity), 0);
      const tax = Math.round(subtotal * 0.18);
      const total = subtotal + tax;
      const count = orders.length + 1;
      const orderId = `ORD-2026-${String(count).padStart(5, '0')}`;
      const now = new Date().toISOString();

      const newOrder: IOrder = {
        _id: `ord-${Date.now()}`,
        orderId,
        customer: body.customer,
        items: body.items,
        subtotal,
        tax,
        total,
        paymentMethod: body.paymentMethod || 'card',
        paymentStatus: 'paid',
        orderStatus: 'confirmed',
        createdAt: now,
        updatedAt: now
      };

      const updated = [newOrder, ...orders];
      localStorage.setItem('motozone_orders', JSON.stringify(updated));
      return { success: true, data: { orderId } };
    }

    if (endpoint === '/auth/login') {
      return {
        success: true,
        token: 'frontend_standalone_jwt_token',
        user: { email: body.email, role: 'admin', name: 'Showroom Admin' }
      };
    }

    return { success: true, data: body };
  },

  async patch(endpoint: string, body: any) {
    const token = getAuthToken();
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Backend offline fallback
    }

    // Lead Patch Standalone
    if (endpoint.startsWith('/leads/')) {
      const id = endpoint.split('/')[2];
      const leads = getLocalLeads();
      const idx = leads.findIndex(l => l._id === id);
      if (idx !== -1) {
        leads[idx] = { ...leads[idx], ...body, updatedAt: new Date().toISOString() };
        localStorage.setItem('motozone_leads', JSON.stringify(leads));
        return { success: true, data: leads[idx] };
      }
    }

    // Order Patch Standalone
    if (endpoint.startsWith('/orders/')) {
      const id = endpoint.split('/')[2];
      const orders = getLocalOrders();
      const idx = orders.findIndex(o => o._id === id);
      if (idx !== -1) {
        orders[idx] = { ...orders[idx], ...body, updatedAt: new Date().toISOString() };
        localStorage.setItem('motozone_orders', JSON.stringify(orders));
        return { success: true, data: orders[idx] };
      }
    }

    return { success: true, data: body };
  }
};

export default api;
