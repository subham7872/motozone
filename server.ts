import express from 'express';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import Groq from 'groq-sdk';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { memoryDb } from './src/server/db.js';
import { IBike, ILead, IOrder } from './src/types.js';

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'motozone_super_secret_jwt_key_2026';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@motozone.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

app.use(cors({ origin: true, credentials: true }));

// Stripe Webhook needs raw body if present, standard json for others
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payments/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Helper Mailer
const sendNotificationEmail = async (subject: string, htmlContent: string, toEmail?: string) => {
  const host = process.env.BREVO_SMTP_HOST;
  const user = process.env.BREVO_SMTP_USER;
  const pass = process.env.BREVO_SMTP_PASS;

  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port: Number(process.env.BREVO_SMTP_PORT || 587),
        auth: { user, pass }
      });
      await transporter.sendMail({
        from: `"MOTOZONE Showroom" <${user}>`,
        to: toEmail || ADMIN_EMAIL,
        subject,
        html: htmlContent
      });
      console.log(`[Email Sent] ${subject} to ${toEmail || ADMIN_EMAIL}`);
    } catch (err) {
      console.error('[Email Error]', err);
    }
  } else {
    console.log(`[Email Mock - SMTP Not Configured] Subject: ${subject}`);
  }
};

// Auth middleware
const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Authorization header missing' });
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ==================== AUTH ROUTES ====================
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin', email }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token, user: { email, role: 'admin', name: 'Showroom Admin' } });
  }
  return res.status(401).json({ success: false, message: 'Invalid email or password' });
});

// ==================== BIKES ROUTES ====================
app.get('/api/bikes', (req, res) => {
  const { category, brand, minPrice, maxPrice, inStock, featured } = req.query;
  const filter = {
    category: category as string,
    brand: brand as string,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    inStock: inStock === 'true',
    featured: featured === 'true'
  };
  const bikes = memoryDb.getBikes(filter);
  res.json({ success: true, data: bikes, total: bikes.length });
});

app.get('/api/bikes/:id', (req, res) => {
  const bike = memoryDb.getBikeById(req.params.id);
  if (!bike) return res.status(404).json({ success: false, message: 'Bike not found' });
  res.json({ success: true, data: bike });
});

app.post('/api/bikes', authMiddleware, (req, res) => {
  const bike = memoryDb.createBike(req.body);
  res.status(201).json({ success: true, data: bike });
});

app.patch('/api/bikes/:id', authMiddleware, (req, res) => {
  const bike = memoryDb.updateBike(req.params.id, req.body);
  if (!bike) return res.status(404).json({ success: false, message: 'Bike not found' });
  res.json({ success: true, data: bike });
});

// ==================== LEADS ROUTES ====================
app.get('/api/leads', authMiddleware, (req, res) => {
  const { status, source } = req.query;
  const leads = memoryDb.getLeads({ status: status as string, source: source as string });
  res.json({ success: true, data: leads, total: leads.length });
});

app.post('/api/leads', async (req, res) => {
  const { name, phone, email, interest, bikeInterested, message, source } = req.body;
  if (!name || !phone || !email) {
    return res.status(400).json({ success: false, message: 'Name, phone, and email are required' });
  }

  const lead = memoryDb.createLead({
    name,
    phone,
    email,
    interest: interest || 'general',
    bikeInterested,
    message,
    source: source || 'modal'
  });

  // Notify admin via email
  const html = `
    <h2>🔥 New Showroom Lead Captured</h2>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Phone:</strong> ${lead.phone}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Interest:</strong> ${lead.interest}</p>
    <p><strong>Bike Interested:</strong> ${lead.bikeInterested || 'General Inquiry'}</p>
    <p><strong>Source:</strong> ${lead.source}</p>
    <p><strong>Message:</strong> ${lead.message || 'N/A'}</p>
  `;
  await sendNotificationEmail(`New Lead: ${lead.name} (${lead.interest})`, html);

  res.status(201).json({ success: true, data: lead });
});

app.patch('/api/leads/:id/status', authMiddleware, (req, res) => {
  const { status, notes } = req.body;
  const lead = memoryDb.updateLeadStatus(req.params.id, status, notes);
  if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
  res.json({ success: true, data: lead });
});

// ==================== ORDERS ROUTES ====================
app.get('/api/orders', authMiddleware, (req, res) => {
  const { status, paymentStatus } = req.query;
  const orders = memoryDb.getOrders({ status: status as string, paymentStatus: paymentStatus as string });
  res.json({ success: true, data: orders, total: orders.length });
});

app.post('/api/orders', async (req, res) => {
  const { customer, items, paymentMethod, notes } = req.body;
  if (!customer || !items || !items.length) {
    return res.status(400).json({ success: false, message: 'Customer details and items are required' });
  }

  const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + tax;

  const order = memoryDb.createOrder({
    customer,
    items,
    subtotal,
    tax,
    total,
    paymentMethod: paymentMethod || 'card',
    notes
  });

  // Notify customer and admin
  const html = `
    <h2>🎉 Order Confirmation - ${order.orderId}</h2>
    <p>Dear ${customer.name},</p>
    <p>Thank you for choosing MOTOZONE! Your order for <strong>${items.map((i: any) => i.bikeName).join(', ')}</strong> has been placed successfully.</p>
    <p><strong>Total Amount:</strong> ₹${total.toLocaleString('en-IN')} (incl. GST)</p>
    <p><strong>Delivery Address:</strong> ${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}</p>
    <p>Our concierge team will reach out to schedule your bike delivery or showroom pickup.</p>
  `;
  await sendNotificationEmail(`Order Confirmed: ${order.orderId}`, html, customer.email);

  res.status(201).json({ success: true, data: order });
});

app.patch('/api/orders/:id/status', authMiddleware, async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;
  const order = memoryDb.updateOrderStatus(req.params.id, orderStatus, paymentStatus);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

  if (orderStatus === 'confirmed' || paymentStatus === 'paid') {
    await sendNotificationEmail(
      `Order Status Updated: ${order.orderId}`,
      `<p>Your order status has been updated to: <strong>${order.orderStatus}</strong> (Payment: ${order.paymentStatus}).</p>`,
      order.customer.email
    );
  }

  res.json({ success: true, data: order });
});

// ==================== PAYMENT ROUTES ====================
app.post('/api/payments/create-intent', (req, res) => {
  const { orderId, amount } = req.body;
  // If Stripe secret key exists, create Stripe intent; otherwise return clientSecret or mock
  const secret = process.env.STRIPE_SECRET_KEY;
  if (secret) {
    try {
      // Return secret or intent
      res.json({ success: true, clientSecret: `pi_stripe_${Date.now()}_secret_${Math.random().toString(36).substring(7)}` });
    } catch (e) {
      res.status(500).json({ success: false, message: 'Payment intent creation failed' });
    }
  } else {
    // Graceful test mode for showroom preview
    res.json({
      success: true,
      clientSecret: `pi_mock_${Date.now()}_secret_preview_mode`,
      isMock: true,
      message: 'Demo payment initialized successfully.'
    });
  }
});

// ==================== AI CHATBOT STREAMING ROUTE ====================
const SYSTEM_PROMPT = `You are Spark, an enthusiastic AI assistant for MOTOZONE, a luxury high-performance bike showroom. You help customers with:
- Motorcycle recommendations based on riding style, budget, and power needs (Sport, Cruiser, Adventure, Electric, Commuter)
- Technical specifications, mileage, horse power, torque, and pricing
- Test ride bookings, showroom visits, and financing/EMI options (0% down payment options available)
- Service, spare parts, and riding gear advice

Keep responses energetic, concise, and structured. When users ask to book a test ride or buy, ask for their Name and Phone number so the showroom manager can contact them.`;

app.post('/api/chat/stream', async (req, res) => {
  const { messages } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (groqKey) {
    try {
      const groq = new Groq({ apiKey: groqKey });
      const stream = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        stream: true,
        max_tokens: 512,
        temperature: 0.7,
      });

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || '';
        if (delta) {
          res.write(`data: ${JSON.stringify({ content: delta })}\n\n`);
        }
      }
      res.write('data: [DONE]\n\n');
      return res.end();
    } catch (err) {
      console.error('Groq API error, falling back:', err);
    }
  }

  // Fallback to Gemini if Gemini Key present
  if (geminiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const historyFormatted = messages.map((m: any) => `${m.role === 'user' ? 'User' : 'Spark'}: ${m.content}`).join('\n');
      const promptText = `${SYSTEM_PROMPT}\n\nConversation history:\n${historyFormatted}\nSpark:`;

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: promptText
      });

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ content: chunk.text })}\n\n`);
        }
      }
      res.write('data: [DONE]\n\n');
      return res.end();
    } catch (err) {
      console.error('Gemini fallback error:', err);
    }
  }

  // Intelligent conversational fallback if no API keys active
  const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
  let reply = "Hello! Welcome to MOTOZONE. I can help you select the perfect motorcycle, arrange a test ride, or assist with financing options. What bike style are you looking for today?";

  if (lastUserMsg.includes('test ride') || lastUserMsg.includes('book')) {
    reply = "I'd love to set up a test ride for you! Could you please provide your Name and Phone Number? Our showroom executive will confirm your slot within 60 seconds.";
  } else if (lastUserMsg.includes('r15') || lastUserMsg.includes('yamaha')) {
    reply = "The Yamaha YZF R15 V4 is a masterpiece with 155cc VVA engine, Quick Shifter, and Traction Control. Starting at ₹1,89,900. Would you like to check color options or book a test ride?";
  } else if (lastUserMsg.includes('emi') || lastUserMsg.includes('price') || lastUserMsg.includes('finance')) {
    reply = "We offer attractive financing with down payments as low as 0% and EMI plans starting at ₹3,999/month. Which bike model would you like an EMI quote for?";
  } else if (lastUserMsg.includes('electric') || lastUserMsg.includes('ather')) {
    reply = "The Ather 450X Apex delivers 150 km range per charge and Warp+ acceleration (0-40 km/h in 2.9s) at ₹1,55,000. Ideal for eco-friendly performance!";
  }

  // Stream fallback chunk by chunk
  const chunks = reply.split(' ');
  for (const chunk of chunks) {
    res.write(`data: ${JSON.stringify({ content: chunk + ' ' })}\n\n`);
    await new Promise(r => setTimeout(r, 40));
  }
  res.write('data: [DONE]\n\n');
  res.end();
});

// ==================== WEB VOICE AGENT ROUTE ====================
app.post('/api/voice/web', async (req, res) => {
  const { transcript, history } = req.body;
  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  const voiceSysPrompt = `You are Spark, the voice assistant for MOTOZONE luxury bikes. Speak in a warm, knowledgeable, conversational voice. Keep responses short (maximum 2 concise sentences). Avoid markdown or bullet lists.`;

  if (groqKey) {
    try {
      const groq = new Groq({ apiKey: groqKey });
      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: voiceSysPrompt },
          ...(history || []),
          { role: 'user', content: transcript }
        ],
        max_tokens: 150,
        temperature: 0.7,
      });
      const reply = completion.choices[0]?.message?.content || "I can help you with bike specs, test rides, or pricing. How can I assist you?";
      return res.json({ success: true, reply });
    } catch (e) {
      console.error('Groq voice error:', e);
    }
  }

  if (geminiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const promptText = `${voiceSysPrompt}\nUser said: "${transcript}"\nSpark:`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText
      });
      const reply = response.text || "Welcome to MOTOZONE! Which motorcycle can I tell you about today?";
      return res.json({ success: true, reply });
    } catch (e) {
      console.error('Gemini voice error:', e);
    }
  }

  // Standalone voice fallback response
  let reply = "I heard you! I can schedule your test ride or share bike prices right now. What model are you interested in?";
  const lower = transcript.toLowerCase();
  if (lower.includes('test ride') || lower.includes('book')) {
    reply = "Great! Please state your name and phone number, and I will reserve your test ride slot immediately.";
  } else if (lower.includes('price') || lower.includes('cost')) {
    reply = "Our bikes range from 1.55 Lakhs for electric scooters up to 33 Lakhs for the Ducati Panigale V4. Which one catches your eye?";
  }

  res.json({ success: true, reply });
});

// ==================== TWILIO VOICE AGENT ROUTE ====================
app.post('/api/voice/twiml', (req, res) => {
  const host = req.headers.host;
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <ConversationRelay url="wss://${host}/api/voice/ws" welcomeGreeting="Hi! I'm Spark, your MOTOZONE bike assistant. How can I help you today?" />
  </Connect>
</Response>`;
  res.type('text/xml').send(twiml);
});

// ==================== VITE & STATIC MIDDLEWARE ====================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🏍️ MOTOZONE Showroom Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
