import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, X, Info, CheckCircle2, Loader2, Circle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';
import { BrandKit } from './BrandKit';

export const Minimap: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { agents, setActiveAgentId, theme } = useAppStore();

  const themeColors = {
    indigo: { text: 'text-indigo-400', bg: 'bg-indigo-500', shadow: 'shadow-indigo-500/20', ring: 'focus-visible:ring-indigo-500' },
    orange: { text: 'text-orange-400', bg: 'bg-orange-500', shadow: 'shadow-orange-500/20', ring: 'focus-visible:ring-orange-500' },
    emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500', shadow: 'shadow-emerald-500/20', ring: 'focus-visible:ring-emerald-500' },
    rose: { text: 'text-rose-400', bg: 'bg-rose-500', shadow: 'shadow-rose-500/20', ring: 'focus-visible:ring-rose-500' },
  }[theme.primary as 'indigo' | 'orange' | 'emerald' | 'rose'] || { text: 'text-indigo-400', bg: 'bg-indigo-500', shadow: 'shadow-indigo-500/20', ring: 'focus-visible:ring-indigo-500' };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="w-64 rounded-3xl border border-white/10 bg-[#0f0f0f]/90 p-5 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white/80 font-medium">
                <Map size={18} className={themeColors.text} />
                <span>Agent Workflow</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close minimap"
                className={cn(
                  "p-1 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors outline-none focus-visible:ring-2",
                  themeColors.ring
                )}
              >
                <X size={16} />
              </button>
            </div>

            {/* Minimap Grid */}
            <div className="grid grid-cols-4 gap-1 mb-6 p-2 bg-white/5 rounded-xl border border-white/5">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgentId(agent.id)}
                  aria-label={`Go to ${agent.name} details`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500 hover:scale-125 hover:z-10 outline-none focus-visible:ring-2",
                    themeColors.ring,
                    agent.status === 'idle' ? "bg-white/10" :
                    agent.status === 'working' ? "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" :
                    agent.status === 'completed' ? "bg-green-400" : "bg-red-400"
                  )}
                  title={agent.name}
                />
              ))}
            </div>

            {/* Brand Kit */}
            <div className="mb-6">
              <BrandKit />
            </div>

            {/* Legend */}
            <div className="space-y-3">
              <div className="text-[10px] uppercase tracking-wider text-white/30 font-bold">Legend</div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Circle size={14} className="text-white/20" />
                <span>Idle / Queued</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Loader2 size={14} className="text-yellow-400 animate-spin" />
                <span>Agent Processing</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <CheckCircle2 size={14} className="text-green-400" />
                <span>Output Ready</span>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-start gap-2 text-xs text-white/40 leading-relaxed">
                  <Info size={12} className={cn("shrink-0 mt-0.5", themeColors.text)} />
                  <span>Click any module in the Bento Grid to simulate agent completion.</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-2xl text-white shadow-lg font-medium outline-none focus-visible:ring-2 ring-offset-2 ring-offset-black",
              themeColors.bg,
              themeColors.shadow,
              themeColors.ring
            )}
          >
            <Map size={20} />
            <span>Show Map</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
