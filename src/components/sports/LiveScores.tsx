import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Clock, ChevronRight, BarChart3, Users, Zap, Ticket, Brain } from 'lucide-react';
import { cn } from '../../lib/utils';
import PredictionModal from './PredictionModal';

// ... (Match interface and INITIAL_MATCHES remain the same)

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'live' | 'scheduled' | 'finished';
  competition: string;
  minute?: number;
  homeLogo: string;
  awayLogo: string;
}

const INITIAL_MATCHES: Match[] = [
  {
    id: 'm1',
    homeTeam: 'Arsenal',
    awayTeam: 'Man City',
    homeScore: 1,
    awayScore: 1,
    status: 'live',
    competition: 'Premier League',
    minute: 64,
    homeLogo: 'ARS',
    awayLogo: 'MCI'
  },
  {
    id: 'm2',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeScore: 0,
    awayScore: 0,
    status: 'live',
    competition: 'La Liga',
    minute: 12,
    homeLogo: 'RMA',
    awayLogo: 'BAR'
  },
  {
    id: 'm3',
    homeTeam: 'AC Milan',
    awayTeam: 'Inter Milan',
    homeScore: 2,
    awayScore: 1,
    status: 'scheduled',
    competition: 'Serie A',
    homeLogo: 'ACM',
    awayLogo: 'INT'
  }
];

export default function LiveScores() {
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [predictingMatch, setPredictingMatch] = useState<Match | null>(null);

  useEffect(() => {
    // Determine the socket URL based on the current environment
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socketUrl = `${protocol}//${window.location.host}`;
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => console.log('Connected to score stream');
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'SCORE_UPDATE') {
          setMatches(prev => prev.map(match => {
            const update = data.updates.find((u: any) => u.matchId === match.id);
            if (update) {
              return { ...match, homeScore: update.homeScore, awayScore: update.awayScore, status: 'live' };
            }
            return match;
          }));
          setLastUpdate(new Date());
        }
      } catch (err) {
        console.error('Failed to parse score update', err);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight uppercase italic flex items-center gap-3">
            <Activity className="text-blue-500 animate-pulse" />
            Live Center
          </h2>
          <p className="text-gray-500 text-sm mt-1">Updates every 30 seconds • Last updated: {lastUpdate.toLocaleTimeString()}</p>
        </div>
        <div className="flex gap-2">
          {['All', 'Live', 'Finished', 'Fixtures'].map(tab => (
            <button key={tab} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all">
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {matches.map((match) => (
            <motion.div
              layout
              key={match.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all group cursor-pointer overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-4">
                {match.status === 'live' ? (
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1 h-1 bg-red-500 rounded-full animate-ping"></span>
                    {match.minute}'
                  </div>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPredictingMatch(match);
                    }}
                    className="p-2 bg-blue-600/10 text-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border border-blue-500/20"
                  >
                    <Brain size={14} /> AI Predict
                  </button>
                )}
              </div>

              <div className="text-[10px] uppercase font-bold text-gray-500 mb-4 tracking-widest">{match.competition}</div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col items-center gap-3 flex-1">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center font-bold text-xl border border-white/10 group-hover:scale-110 transition-transform">
                    {match.homeLogo}
                  </div>
                  <span className="text-sm font-bold text-center">{match.homeTeam}</span>
                </div>

                <div className="px-6 flex flex-col items-center">
                  <div className="text-4xl font-black font-mono tracking-tighter flex gap-2">
                    <span className={cn(match.status === 'live' ? "text-white" : "text-gray-500")}>{match.homeScore}</span>
                    <span className="text-gray-700">-</span>
                    <span className={cn(match.status === 'live' ? "text-white" : "text-gray-500")}>{match.awayScore}</span>
                  </div>
                  {match.status === 'scheduled' && (
                    <div className="text-[10px] font-mono text-blue-500 mt-2 font-bold uppercase tracking-tighter">
                      COMING UP
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-3 flex-1">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center font-bold text-xl border border-white/10 group-hover:scale-110 transition-transform">
                    {match.awayLogo}
                  </div>
                  <span className="text-sm font-bold text-center">{match.awayTeam}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex gap-4">
                  <BarChart3 size={16} className="text-gray-600 hover:text-blue-500 transition-colors" />
                  <Users size={16} className="text-gray-600 hover:text-blue-500 transition-colors" />
                  <Activity size={16} className="text-gray-600 hover:text-blue-500 transition-colors" />
                </div>
                <button className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 text-blue-500 hover:text-blue-400 transition-colors">
                  Details <ChevronRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {predictingMatch && (
          <PredictionModal 
            match={predictingMatch} 
            onClose={() => setPredictingMatch(null)} 
          />
        )}
      </AnimatePresence>

      {/* Ads Integration (M5) */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl p-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-blue-500">
            <Ticket size={40} />
          </div>
          <div>
            <span className="text-[10px] font-black bg-blue-500 text-white px-2 py-0.5 rounded uppercase tracking-widest mb-2 inline-block">PROMOTED EVENT</span>
            <h3 className="text-xl font-bold">FA Cup Quarter Finals Tickets</h3>
            <p className="text-gray-400 text-sm">Don't miss the biggest matches of the season. Limited availability.</p>
          </div>
        </div>
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20">
          Book Now
        </button>
      </div>
    </div>
  );
}
