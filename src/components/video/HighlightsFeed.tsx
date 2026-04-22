import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Flame, TrendingUp, History, Share2, PlusCircle, Maximize2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Highlight {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  category: 'highlights' | 'goals' | 'analysis';
  match: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    id: 'v1',
    title: 'Man City vs Liverpool (4-1) | Extended Highlights',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    duration: '10:24',
    views: '1.2M',
    category: 'highlights',
    match: 'MCI vs LIV'
  },
  {
    id: 'v2',
    title: 'Hazard Solo Goal vs West Ham | Goal of the Season?',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
    duration: '0:45',
    views: '850K',
    category: 'goals',
    match: 'CHE vs WHU'
  },
  {
    id: 'v3',
    title: 'Tactical Analysis: How Tuchel stopped Real Madrid',
    thumbnail: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800',
    duration: '15:10',
    views: '420K',
    category: 'analysis',
    match: 'CHE vs RMA'
  }
];

export default function HighlightsFeed() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'highlights' | 'goals' | 'analysis'>('all');

  return (
    <div className="space-y-12">
      {/* Hero Video */}
      <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1600" 
          alt="Hero Highlight" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/50"
          >
            <Play fill="white" size={32} />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 p-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded">FEATURED</span>
            <span className="text-gray-300 text-sm font-medium">UCL FINAL REVIEW</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase mb-4 leading-[0.9]">
            The Road to <span className="text-blue-500">Istanbul</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6 font-medium">
            Witness every magic moment from the spectacular final that settled the European crown.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all">Watch Now</button>
            <button className="p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all border border-white/10">
              <PlusCircle size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          {[
            { id: 'all', label: 'All Videos', icon: TrendingUp },
            { id: 'highlights', label: 'Match Highlights', icon: History },
            { id: 'goals', label: 'Goal Feed', icon: Flame },
            { id: 'analysis', label: 'Deep Analysis', icon: History }
          ].map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all border",
                activeFilter === cat.id 
                  ? "bg-blue-600 border-blue-500 text-white" 
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
              )}
            >
              <cat.icon size={16} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {HIGHLIGHTS.filter(h => activeFilter === 'all' || h.category === activeFilter).map((video) => (
          <motion.div 
            layout
            key={video.id}
            className="group cursor-pointer"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-white/10">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play size={40} className="text-white" fill="white" />
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 backdrop-blur-md rounded text-[10px] font-mono font-bold">
                {video.duration}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{video.match}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Share2 size={14} className="text-gray-500 hover:text-white" />
                  <Maximize2 size={14} className="text-gray-500 hover:text-white" />
                </div>
              </div>
              <h3 className="font-bold text-lg leading-tight group-hover:text-blue-500 transition-colors">{video.title}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">{video.views} Views • 2 Hours Ago</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
