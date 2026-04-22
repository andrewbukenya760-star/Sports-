import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Brain, 
  Sparkles, 
  Trophy, 
  TrendingUp, 
  Activity,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../../lib/utils';

interface PredictionModalProps {
  match: {
    homeTeam: string;
    awayTeam: string;
    competition: string;
  };
  onClose: () => void;
}

export default function PredictionModal({ match, onClose }: PredictionModalProps) {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getPrediction() {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
        
        // Mocking some internal stats for the prompt
        const prompt = `
          As a professional sports analyst, predict the result of the upcoming match:
          Match: ${match.homeTeam} vs ${match.awayTeam} (${match.competition})
          
          Context stats:
          - ${match.homeTeam}: 4 wins, 1 draw in last 5 games. High home ground advantage.
          - ${match.awayTeam}: 3 wins, 2 losses in last 5 games. Defensive solid but low goal conversion.
          - Previous head-to-head: ${match.homeTeam} won 2-1 last year.

          Provide:
          1. Predicted Score
          2. Confidence Level (%)
          3. Key tactical insight (1-2 sentences)
          4. "AI Predictor Verdict" (Winner or Draw)

          Format the response in a clean, professional way.
        `;

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
        });

        setPrediction(response.text || "Could not generate prediction.");
      } catch (err) {
        console.error("AI Error:", err);
        setError("AI engine is currently warming up. Please try again in a moment.");
      } finally {
        setLoading(false);
      }
    }

    getPrediction();
  }, [match]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70] flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#0f0f0f] border border-white/10 rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl relative"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-x"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-10 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500">
              <Brain size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">AI Result Predictor</h2>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Powered by Gemini Pro</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center font-bold border border-white/10 mb-2">
                  {match.homeTeam.substring(0, 3).toUpperCase()}
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{match.homeTeam}</p>
              </div>
              <div className="text-gray-700 font-mono text-xl">VS</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center font-bold border border-white/10 mb-2">
                  {match.awayTeam.substring(0, 3).toUpperCase()}
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{match.awayTeam}</p>
              </div>
            </div>
          </div>

          <div className="min-h-[200px] flex flex-col gap-4">
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 py-10">
                <Loader2 className="text-blue-500 animate-spin" size={40} />
                <p className="text-gray-500 text-sm italic animate-pulse">Analyzing tactical data & previous encounters...</p>
              </div>
            ) : error ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 py-10 text-center">
                <AlertCircle className="text-red-500" size={40} />
                <p className="text-gray-400 text-sm">{error}</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {prediction}
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                  <Sparkles size={20} className="text-blue-500 shrink-0" />
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wide">
                    Disclaimer: Predictions are based on probabilistic analysis and should not be used for gambling.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {!loading && !error && (
            <button 
              onClick={onClose}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
            >
              Close Insights <TrendingUp size={20} />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
