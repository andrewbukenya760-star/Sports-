import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Ticket, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Search
} from 'lucide-react';
import { cn } from '../../lib/utils';

// ... (interface Event and const EVENTS remain the same)
// I'll include the full module code to ensure no broken imports

interface Event {
  id: string;
  title: string;
  venue: string;
  date: string;
  price: number;
  image: string;
  category: 'Sports' | 'Music' | 'Festival';
  matchId?: string;
}

const EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Arsenal vs Man City',
    venue: 'Emirates Stadium, London',
    date: '22 MAY 2026',
    price: 85,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200',
    category: 'Sports',
    matchId: 'm1'
  },
  {
    id: 'e2',
    title: 'NBA Global Tour: London',
    venue: 'O2 Arena, London',
    date: '15 JUN 2026',
    price: 120,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1200',
    category: 'Sports'
  }
];

export default function EventList() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment' | 'success'>('details');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCheckout = () => {
    if (checkoutStep === 'details') setCheckoutStep('payment');
    else if (checkoutStep === 'payment') {
      setTimeout(() => setCheckoutStep('success'), 1500);
    }
  };

  const filteredEvents = EVENTS.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    event.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight uppercase italic flex items-center gap-3">
            <Ticket className="text-orange-500" />
            PASSAGE Ticketing
          </h2>
          <p className="text-gray-500 text-sm mt-1">Official ticketing partner for global sports events</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by team or stadium..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-6 text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400">
            <ShieldCheck size={14} className="text-emerald-500" /> Secure Checkout Active
          </div>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <motion.div
              layout
              key={event.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setSelectedEvent(event);
                setCheckoutStep('details');
              }}
              className="group cursor-pointer bg-[#0f0f0f] border border-white/5 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all flex flex-col md:flex-row h-full"
            >
              <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{event.category}</span>
                    <span className="text-lg font-black text-white">£{event.price}</span>
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-orange-500 transition-colors mb-4">{event.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                      <MapPin size={14} /> {event.venue}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                      <Calendar size={14} /> {event.date}
                    </div>
                  </div>
                </div>
                <button className="mt-6 w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest group-hover:bg-orange-600 group-hover:border-orange-500 transition-all">
                  Get Tickets
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl">
          <p className="text-gray-500 italic">No events found matching "{searchQuery}"</p>
        </div>
      )}

      {/* Checkout Modal Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111111] border border-white/10 rounded-[32px] w-full max-w-xl overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors"
              >
                <Smartphone size={20} className="rotate-45" />
              </button>

              <div className="p-10">
                {checkoutStep === 'details' && (
                  <div className="space-y-8">
                    <div className="flex gap-6 items-start">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                        <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-2">{selectedEvent.category}</span>
                        <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">{selectedEvent.title}</h2>
                        <p className="text-sm text-gray-500 flex items-center gap-2"><MapPin size={14} /> {selectedEvent.venue}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Price per Ticket</p>
                          <p className="text-2xl font-black italic tracking-tighter">£{selectedEvent.price}.00</p>
                        </div>
                        <div className="flex items-center gap-4 bg-black p-2 rounded-xl border border-white/10">
                          <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-500">-</button>
                          <span className="font-bold">1</span>
                          <button className="w-8 h-8 flex items-center justify-center font-bold text-white">+</button>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-400 text-xs leading-relaxed">
                        <Info size={20} className="shrink-0" />
                        Tickets are non-refundable but can be resold on the PASSAGE fan marketplace. 100% authenticity guaranteed.
                      </div>
                    </div>

                    <button 
                      onClick={handleCheckout}
                      className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-orange-900/20 transition-all"
                    >
                      Checkout <ArrowRight size={20} />
                    </button>
                  </div>
                )}

                {checkoutStep === 'payment' && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-center italic">Select Payment</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex flex-col items-center gap-4 p-8 bg-white/5 border border-blue-500 rounded-3xl group hover:bg-white/10 transition-all">
                        <Smartphone size={32} className="text-blue-500" />
                        <span className="font-bold text-sm uppercase tracking-wide">MoMo Pay</span>
                      </button>
                      <button className="flex flex-col items-center gap-4 p-8 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all">
                        <CreditCard size={32} className="text-gray-500 group-hover:text-white" />
                        <span className="font-bold text-sm uppercase tracking-wide">Card Pay</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Phone Number (256...)" 
                          className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                        />
                        <Zap size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-orange-500" />
                      </div>
                    </div>

                    <button 
                      onClick={handleCheckout}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-900/20 transition-all"
                    >
                      Process Payment (£{selectedEvent.price}.00)
                    </button>
                  </div>
                )}

                {checkoutStep === 'success' && (
                  <div className="space-y-8 text-center flex flex-col items-center py-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white"
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                    <div>
                      <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-2">Booking Confirmed!</h2>
                      <p className="text-gray-500">Your e-ticket has been sent to your email and is waiting in your profile.</p>
                    </div>
                    <div className="w-full p-8 bg-[#1a1a1a] border border-white/5 rounded-3xl flex flex-col items-center gap-4">
                      <div className="w-32 h-32 bg-white rounded-xl p-2">
                        <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PASSAGE-TKT-123456')] bg-cover"></div>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">TICKET ID</p>
                        <p className="font-mono text-sm font-bold">PS-AFX-2026-9901</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedEvent(null)}
                      className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      Close & Return
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
