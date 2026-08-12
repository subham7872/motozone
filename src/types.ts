export interface IBike {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  discountPrice?: number;
  category: 'sport' | 'cruiser' | 'adventure' | 'commuter' | 'electric';
  engine: string;
  mileage: string;
  color: string[];
  images: string[];
  features: string[];
  specs: {
    power: string;
    torque: string;
    fuelCapacity: string;
    weight: string;
    seatHeight: string;
  };
  inStock: boolean;
  stockCount: number;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
}

export interface ILead {
  _id: string;
  name: string;
  phone: string;
  email: string;
  interest: 'test_ride' | 'purchase' | 'service' | 'general';
  bikeInterested?: string;
  message?: string;
  source: 'modal' | 'contact_form' | 'chatbot' | 'voice';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderItem {
  bikeId: string;
  bikeName: string;
  price: number;
  quantity: number;
  color: string;
  image?: string;
}

export interface ICustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface IOrder {
  _id: string;
  orderId: string;
  customer: ICustomerInfo;
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'card' | 'upi' | 'emi' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  stripePaymentIntentId?: string;
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICartItem {
  bikeId: string;
  bikeName: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
}
