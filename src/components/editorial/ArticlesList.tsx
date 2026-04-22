import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Newspaper, Star, TrendingUp, ChevronRight, PenTool, Calendar, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import ReactMarkdown from 'react-markdown';

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  content: string;
  playerRatings?: { name: string; rating: number; comment: string }[];
}

const ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Tactical Masterclass: How Arteta is evolving the false nine role',
    category: 'ANALYSIS',
    author: 'Sam Wallace',
    date: '22 APR 2026',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=1200',
    content: `Arsenal's tactical evolution under Mikel Arteta continues to surprise...`,
    playerRatings: [
      { name: 'Odegaard', rating: 9, comment: 'Controlled the tempo brilliantly.' },
      { name: 'Saka', rating: 8, comment: 'Constant threat on the wing.' },
      { name: 'Havertz', rating: 8.5, comment: 'Exceptional movement and link-up play.' }
    ]
  },
  {
    id: 'a2',
    title: 'The Great African Talent Drain: What next for local leagues?',
    category: 'EDITORIAL',
    author: 'Andrew B.',
    date: '20 APR 2026',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d445bcc97a?auto=format&fit=crop&q=80&w=1200',
    content: `Local football leagues across Africa are facing a critical juncture...`
  }
];

export default function ArticlesList() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="text-gray-500 hover:text-white flex items-center gap-2 group transition-colors"
        >
          <ChevronRight size={20} className="rotate-180" /> Back to Feed
        </button>

        <div className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10">
          <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10">
            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded mb-4 inline-block">
              {selectedArticle.category}
            </span>
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-4">{selectedArticle.title}</h1>
            <div className="flex items-center gap-6 text-gray-300 text-sm font-medium">
              <span className="flex items-center gap-2"><User size={16} /> {selectedArticle.author}</span>
              <span className="flex items-center gap-2"><Calendar size={16} /> {selectedArticle.date}</span>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg">
          <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
        </div>

        {selectedArticle.playerRatings && (
          <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <Star className="text-yellow-500" fill="currentColor" />
              <h3 className="text-xl font-bold uppercase tracking-tight">Player Ratings</h3>
            </div>
            <div className="divide-y divide-white/5">
              {selectedArticle.playerRatings.map((rating, idx) => (
                <div key={idx} className="p-6 flex items-center justify-between group hover:bg-white/5 transition-colors">
                  <div className="flex gap-6 items-center">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-xl font-black border border-white/10 text-blue-500 group-hover:scale-110 transition-transform">
                      {rating.rating}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{rating.name}</h4>
                      <p className="text-sm text-gray-500">{rating.comment}</p>
                    </div>
                  </div>
                  <TrendingUp size={20} className="text-green-500 opacity-50" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight uppercase italic flex items-center gap-3">
            <Newspaper className="text-emerald-500" />
            Editorial Room
          </h2>
          <p className="text-gray-500 text-sm mt-1">Daily analysis and exclusive reports</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/20">
          <PenTool size={18} /> New Article
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {ARTICLES.map((article) => (
          <motion.div 
            key={article.id}
            whileHover={{ y: -10 }}
            onClick={() => setSelectedArticle(article)}
            className="group cursor-pointer space-y-6"
          >
            <div className="relative h-[340px] rounded-3xl overflow-hidden border border-white/10">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black uppercase tracking-tighter leading-[0.9] group-hover:text-emerald-500 transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <span>{article.author}</span>
                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                <span>{article.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
