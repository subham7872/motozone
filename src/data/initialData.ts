import { IBike, ILead, IOrder } from '../types';

export const INITIAL_BIKES: IBike[] = [
  {
    _id: 'bike-1',
    name: 'Yamaha YZF R15 V4',
    brand: 'Yamaha',
    model: 'R15 V4 Racing Blue',
    year: 2026,
    price: 189900,
    discountPrice: 182000,
    category: 'sport',
    engine: '155 cc SOHC VVA Liquid Cooled',
    mileage: '45 kmpl',
    color: ['Racing Blue', 'Intensity White', 'Dark Knight'],
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Quick Shifter (Up)', 'Traction Control System', 'Assist & Slipper Clutch', 'Y-Connect Bluetooth App', 'USD Front Forks'],
    specs: {
      power: '18.4 PS @ 10,000 RPM',
      torque: '14.2 Nm @ 7,500 RPM',
      fuelCapacity: '11 Litres',
      weight: '142 kg',
      seatHeight: '815 mm'
    },
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 124
  },
  {
    _id: 'bike-2',
    name: 'Royal Enfield Meteor 350',
    brand: 'Royal Enfield',
    model: 'Supernova Red',
    year: 2026,
    price: 212000,
    category: 'cruiser',
    engine: '349 cc Air-Oil Cooled Single Cylinder',
    mileage: '38 kmpl',
    color: ['Supernova Red', 'Stellar Blue', 'Fireball Yellow'],
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Tripper Navigation Pod', 'Classic Cruiser Ergonomics', 'Dual Channel ABS', 'USB Charging Port', 'Retro Windscreen'],
    specs: {
      power: '20.2 BHP @ 6,100 RPM',
      torque: '27 Nm @ 4,000 RPM',
      fuelCapacity: '15 Litres',
      weight: '191 kg',
      seatHeight: '765 mm'
    },
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 98
  },
  {
    _id: 'bike-3',
    name: 'KTM Duke 390 Gen 3',
    brand: 'KTM',
    model: 'Duke 390 Electronic Orange',
    year: 2026,
    price: 310000,
    discountPrice: 298000,
    category: 'adventure',
    engine: '399 cc Liquid Cooled DOHC Single',
    mileage: '28 kmpl',
    color: ['Electronic Orange', 'Atlantic Blue'],
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['5-inch TFT Display', 'Cornering ABS & Supermoto Mode', 'Launch Control', 'Ride-by-Wire with 3 Modes', 'WP APEX Adjustable Suspension'],
    specs: {
      power: '46 PS @ 8,500 RPM',
      torque: '39 Nm @ 6,500 RPM',
      fuelCapacity: '15 Litres',
      weight: '168 kg',
      seatHeight: '820 mm'
    },
    inStock: true,
    stockCount: 5,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 156
  },
  {
    _id: 'bike-4',
    name: 'Ather 450X Apex',
    brand: 'Ather',
    model: '450X Gen 3.1 Indium Blue',
    year: 2026,
    price: 155000,
    category: 'electric',
    engine: '6.4 kW PMSM Electric Motor',
    mileage: '150 km per charge',
    color: ['Indium Blue', 'Space Grey', 'Salt Green'],
    images: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Warp+ Mode (0-40km/h in 2.9s)', 'Magic Twist Regenerative Braking', '7-inch Touchscreen Navigation', 'AutoHold Hill Assist', 'OTA Smart Updates'],
    specs: {
      power: '7.0 kW Peak Output',
      torque: '26 Nm Instant Torque',
      fuelCapacity: '3.7 kWh Li-ion Pack',
      weight: '111 kg',
      seatHeight: '780 mm'
    },
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 210
  },
  {
    _id: 'bike-5',
    name: 'Honda CBR 650R',
    brand: 'Honda',
    model: 'Grand Prix Red E-Clutch',
    year: 2026,
    price: 865000,
    category: 'sport',
    engine: '649 cc Inline 4-Cylinder DOHC',
    mileage: '20 kmpl',
    color: ['Grand Prix Red', 'Mat Gunpowder Black'],
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Honda E-Clutch Technology', 'HSTC Traction Control', '5-inch Full Color TFT', 'Showa 41mm SFF-BP USD Forks', 'Slipper Clutch & Radial Calipers'],
    specs: {
      power: '95 PS @ 12,000 RPM',
      torque: '63 Nm @ 9,500 RPM',
      fuelCapacity: '15.4 Litres',
      weight: '211 kg',
      seatHeight: '810 mm'
    },
    inStock: true,
    stockCount: 3,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 64
  },
  {
    _id: 'bike-6',
    name: 'BMW S 1000 RR',
    brand: 'BMW Motorrad',
    model: 'M Package Motorsport',
    year: 2026,
    price: 2250000,
    category: 'sport',
    engine: '999 cc Inline 4-Cylinder ShiftCam',
    mileage: '15 kmpl',
    color: ['Light White M Motorsport', 'Black Storm Metallic'],
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['BMW ShiftCam Technology', 'Dynamic Damping Control DDC', 'Carbon Fiber M Wheels', 'Pro Riding Modes & Slide Control', 'Launch Control & Pit Lane Limiter'],
    specs: {
      power: '210 HP @ 13,750 RPM',
      torque: '113 Nm @ 11,000 RPM',
      fuelCapacity: '16.5 Litres',
      weight: '197 kg',
      seatHeight: '824 mm'
    },
    inStock: true,
    stockCount: 2,
    isFeatured: false,
    rating: 5.0,
    reviewCount: 42
  },
  {
    _id: 'bike-7',
    name: 'Kawasaki Z900',
    brand: 'Kawasaki',
    model: 'Candy Lime Green',
    year: 2026,
    price: 930000,
    discountPrice: 899000,
    category: 'commuter',
    engine: '948 cc Liquid-Cooled Inline 4',
    mileage: '18 kmpl',
    color: ['Candy Lime Green', 'Metallic Spark Black'],
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Sugomi Design Philosophy', 'Integrated Riding Modes', 'Power Mode Selection', 'TFT Color Instrumentation with Rideology', 'KTRC Traction Control'],
    specs: {
      power: '125 PS @ 9,500 RPM',
      torque: '98.6 Nm @ 7,700 RPM',
      fuelCapacity: '17 Litres',
      weight: '212 kg',
      seatHeight: '820 mm'
    },
    inStock: true,
    stockCount: 6,
    isFeatured: false,
    rating: 4.8,
    reviewCount: 88
  },
  {
    _id: 'bike-8',
    name: 'Ducati Panigale V4 S',
    brand: 'Ducati',
    model: 'Ducati Red Carbon',
    year: 2026,
    price: 3300000,
    category: 'sport',
    engine: '1103 cc Desmosedici Stradale V4',
    mileage: '12 kmpl',
    color: ['Ducati Red'],
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Öhlins NPX/TTX Electronic Suspension', 'Marchesini Forged Aluminum Wheels', 'Ducati Traction Control EVO 3', 'Biplane Aero Wings (37kg downforce)', 'Full Titanium Akrapovič Exhaust Ready'],
    specs: {
      power: '215.5 HP @ 13,000 RPM',
      torque: '123.6 Nm @ 9,500 RPM',
      fuelCapacity: '17 Litres',
      weight: '174 kg dry',
      seatHeight: '835 mm'
    },
    inStock: true,
    stockCount: 1,
    isFeatured: false,
    rating: 5.0,
    reviewCount: 35
  }
];

export const INITIAL_LEADS: ILead[] = [
  {
    _id: 'lead-101',
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@gmail.com',
    interest: 'test_ride',
    bikeInterested: 'Yamaha YZF R15 V4',
    message: 'Looking to schedule a test ride on Saturday morning.',
    source: 'modal',
    status: 'new',
    notes: 'Customer interested in Racing Blue color.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    _id: 'lead-102',
    name: 'Priya Verma',
    phone: '+91 98123 45678',
    email: 'priya.v@outlook.com',
    interest: 'purchase',
    bikeInterested: 'Ather 450X Apex',
    message: 'Inquiring about subsidy and EMI plans for Ather 450X.',
    source: 'chatbot',
    status: 'qualified',
    notes: 'Approved for 0% down payment scheme.',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    _id: 'lead-103',
    name: 'Rohan Mehta',
    phone: '+91 99887 76655',
    email: 'rohan.m@techcorp.com',
    interest: 'test_ride',
    bikeInterested: 'KTM Duke 390 Gen 3',
    message: 'Spoke via voice assistant regarding Duke 390 trade-in offer.',
    source: 'voice',
    status: 'contacted',
    notes: 'Called back and confirmed test ride date.',
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    _id: 'lead-104',
    name: 'Vikramaditya Roy',
    phone: '+91 97654 32109',
    email: 'vikram.roy@yahoo.in',
    interest: 'purchase',
    bikeInterested: 'Honda CBR 650R',
    message: 'Enquired via contact page form about E-Clutch variant availability.',
    source: 'contact_form',
    status: 'converted',
    notes: 'Booking confirmed with order ORD-2026-00001.',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

export const INITIAL_ORDERS: IOrder[] = [
  {
    _id: 'ord-db-1',
    orderId: 'ORD-2026-00001',
    customer: {
      name: 'Vikramaditya Roy',
      email: 'vikram.roy@yahoo.in',
      phone: '+91 97654 32109',
      address: '74 Ring Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    items: [
      {
        bikeId: 'bike-5',
        bikeName: 'Honda CBR 650R',
        price: 865000,
        quantity: 1,
        color: 'Grand Prix Red',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    subtotal: 865000,
    tax: 155700,
    total: 1020700,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'confirmed',
    notes: 'Home delivery scheduled for Friday.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    _id: 'ord-db-2',
    orderId: 'ORD-2026-00002',
    customer: {
      name: 'Siddharth Patel',
      email: 'siddharth.p@gmail.com',
      phone: '+91 91234 56789',
      address: '12 Park Avenue, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    items: [
      {
        bikeId: 'bike-1',
        bikeName: 'Yamaha YZF R15 V4',
        price: 189900,
        quantity: 1,
        color: 'Racing Blue',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    subtotal: 189900,
    tax: 34182,
    total: 224082,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    notes: 'RTO Registration in progress.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];
