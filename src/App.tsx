import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Video, 
  FileText, 
  Ticket, 
  LayoutDashboard, 
  Bell, 
  Search, 
  User,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import LiveScores from './components/sports/LiveScores';
import HighlightsFeed from './components/video/HighlightsFeed';
import ArticlesList from './components/editorial/ArticlesList';
import EventList from './components/ticketing/EventList';

type Module = 'M1' | 'M2' | 'M3' | 'M4' | 'PROFILE';

export default function App() {
  const [activeModule, setActiveModule] = useState<Module>('M1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'M1', label: 'Sports Hub', icon: Trophy, color: 'text-blue-500' },
    { id: 'M2', label: 'Highlights', icon: Video, color: 'text-purple-500' },
    { id: 'M3', label: 'Editorial', icon: FileText, color: 'text-emerald-500' },
    { id: 'M4', label: 'Ticketing', icon: Ticket, color: 'text-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            className="w-72 border-r border-white/10 bg-[#0a0a0a] flex flex-col z-50 absolute lg:relative h-full"
          >
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl skew-x-12">
                  <span className="-skew-x-12">P</span>
                </div>
                <h1 className="text-xl font-bold tracking-tighter uppercase">Passage</h1>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id as Module)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                    activeModule === item.id 
                      ? "bg-white/5 text-white" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {activeModule === item.id && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                    />
                  )}
                  <item.icon size={20} className={cn(activeModule === item.id ? item.color : "text-gray-500 group-hover:text-white")} />
                  <span className="font-medium tracking-tight">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="p-6 border-t border-white/5">
              <button
                onClick={() => setActiveModule('PROFILE')}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                  AB
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold truncate uppercase tracking-wide">Andrew B.</p>
                  <p className="text-xs text-gray-500 truncate">Editor</p>
                </div>
                <Settings size={16} className="text-gray-500 group-hover:rotate-45 transition-transform" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl flex items-center justify-between px-8 z-40 sticky top-0">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <Menu size={24} />
              </button>
            )}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search matches, results, news..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-6 text-sm w-80 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors group">
              <Bell size={20} className="text-gray-400 group-hover:text-white" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#050505]"></span>
            </button>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex items-center gap-3">
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest hidden md:block">
                {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold border border-white/10">
                LIV
              </div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.05),transparent_50%)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 max-w-7xl mx-auto w-full"
            >
              {activeModule === 'M1' && <LiveScores />}
              {activeModule === 'M2' && <HighlightsFeed />}
              {activeModule === 'M3' && <ArticlesList />}
              {activeModule === 'M4' && <EventList />}
              {activeModule === 'PROFILE' && (
                <div className="flex items-center justify-center h-[60vh] text-gray-500 italic">
                  Profile & Settings under construction
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
