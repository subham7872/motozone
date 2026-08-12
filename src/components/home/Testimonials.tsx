import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Dr. Karan Malhotra',
      location: 'Bengaluru',
      bike: 'BMW S 1000 RR',
      comment: 'The MOTOZONE team arranged a doorstep test ride of the S1000RR within 2 hours. Delivery was smooth, registration took only 2 days, and the ceramic coating finish was flawless!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Ananya Deshmukh',
      location: 'Mumbai',
      bike: 'Ather 450X Apex',
      comment: 'I booked my Ather 450X through their AI Chatbot! Received immediate confirmation, 0% EMI approval, and picked up the scooter the very next afternoon. Super impressive service!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Rishi Kapoor',
      location: 'Hyderabad',
      bike: 'Kawasaki Z900',
      comment: 'Best superbike showroom experience in South India. Transparency on on-road pricing, official Akrapovič exhaust options, and personalized riding gear consultation.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    }
  ];

  return (
    <section className="py-20 bg-[#0a0a0c] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold">Rider Chronicles</p>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
            Loved By <span className="font-semibold text-amber-500">Superbike Owners</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real stories from riders who found their dream motorcycle at MOTOZONE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#16161a] border border-white/5 rounded-3xl p-6 flex flex-col justify-between space-y-6 relative hover:border-amber-500/30 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-amber-500/20 absolute top-6 right-6" />

              <div className="space-y-3">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                  <p className="text-[10px] text-amber-500 font-semibold uppercase">
                    Owner of {rev.bike} • {rev.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
