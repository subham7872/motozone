import { IBike, ILead, IOrder } from '../types.js';
import { INITIAL_BIKES, INITIAL_LEADS, INITIAL_ORDERS } from '../data/initialData.js';

export { INITIAL_BIKES, INITIAL_LEADS, INITIAL_ORDERS };

// In-Memory Database store with full CRUD capabilities
class MemoryDatabase {
  private bikes: IBike[] = [...INITIAL_BIKES];
  private leads: ILead[] = [...INITIAL_LEADS];
  private orders: IOrder[] = [...INITIAL_ORDERS];

  // Bikes
  getBikes(filter?: { category?: string; brand?: string; minPrice?: number; maxPrice?: number; inStock?: boolean; featured?: boolean }) {
    let result = [...this.bikes];
    if (filter) {
      if (filter.category) result = result.filter(b => b.category === filter.category);
      if (filter.brand) result = result.filter(b => b.brand.toLowerCase().includes(filter.brand!.toLowerCase()));
      if (filter.inStock) result = result.filter(b => b.inStock);
      if (filter.featured) result = result.filter(b => b.isFeatured);
      if (filter.minPrice) result = result.filter(b => b.price >= filter.minPrice!);
      if (filter.maxPrice) result = result.filter(b => b.price <= filter.maxPrice!);
    }
    return result;
  }

  getBikeById(id: string) {
    return this.bikes.find(b => b._id === id);
  }

  createBike(bikeData: Omit<IBike, '_id'>) {
    const newBike: IBike = {
      ...bikeData,
      _id: `bike-${Date.now()}`
    };
    this.bikes.unshift(newBike);
    return newBike;
  }

  updateBike(id: string, updates: Partial<IBike>) {
    const idx = this.bikes.findIndex(b => b._id === id);
    if (idx !== -1) {
      this.bikes[idx] = { ...this.bikes[idx], ...updates };
      return this.bikes[idx];
    }
    return null;
  }

  // Leads
  getLeads(filter?: { status?: string; source?: string }) {
    let result = [...this.leads];
    if (filter) {
      if (filter.status) result = result.filter(l => l.status === filter.status);
      if (filter.source) result = result.filter(l => l.source === filter.source);
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createLead(leadData: Omit<ILead, '_id' | 'createdAt' | 'updatedAt' | 'status'>) {
    const now = new Date().toISOString();
    const newLead: ILead = {
      ...leadData,
      _id: `lead-${Date.now()}`,
      status: 'new',
      createdAt: now,
      updatedAt: now
    };
    this.leads.unshift(newLead);
    return newLead;
  }

  updateLeadStatus(id: string, status: ILead['status'], notes?: string) {
    const lead = this.leads.find(l => l._id === id);
    if (lead) {
      lead.status = status;
      if (notes !== undefined) lead.notes = notes;
      lead.updatedAt = new Date().toISOString();
      return lead;
    }
    return null;
  }

  // Orders
  getOrders(filter?: { status?: string; paymentStatus?: string }) {
    let result = [...this.orders];
    if (filter) {
      if (filter.status) result = result.filter(o => o.orderStatus === filter.status);
      if (filter.paymentStatus) result = result.filter(o => o.paymentStatus === filter.paymentStatus);
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getOrderById(id: string) {
    return this.orders.find(o => o._id === id || o.orderId === id);
  }

  createOrder(orderData: Omit<IOrder, '_id' | 'orderId' | 'createdAt' | 'updatedAt' | 'orderStatus' | 'paymentStatus'>) {
    const now = new Date().toISOString();
    const count = this.orders.length + 1;
    const orderId = `ORD-${new Date().getFullYear()}-${String(count).padStart(5, '0')}`;
    const newOrder: IOrder = {
      ...orderData,
      _id: `ord-${Date.now()}`,
      orderId,
      orderStatus: 'pending',
      paymentStatus: 'pending',
      createdAt: now,
      updatedAt: now
    };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  updateOrderStatus(id: string, orderStatus?: IOrder['orderStatus'], paymentStatus?: IOrder['paymentStatus']) {
    const order = this.orders.find(o => o._id === id || o.orderId === id);
    if (order) {
      if (orderStatus) order.orderStatus = orderStatus;
      if (paymentStatus) order.paymentStatus = paymentStatus;
      order.updatedAt = new Date().toISOString();
      return order;
    }
    return null;
  }
}

export const memoryDb = new MemoryDatabase();
