import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, X, Info, CheckCircle2, Loader2, Circle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';
import { BrandKit } from './BrandKit';

export const Minimap: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { agents, setActiveAgentId } = useAppStore();

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
                <Map size={18} className="text-indigo-400" />
                <span>Agent Workflow</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close minimap"
                className="p-1 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Minimap Grid */}
            <div className="grid grid-cols-4 gap-1 mb-6 p-2 bg-white/5 rounded-xl border border-white/5">
              {agents.map((agent) => (
                <button
                  type="button"
                  key={agent.id}
                  onClick={() => setActiveAgentId(agent.id)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500 hover:scale-125 hover:z-10 focus-visible:ring-1 focus-visible:ring-indigo-400 outline-none",
                    agent.status === 'idle' ? "bg-white/10" :
                    agent.status === 'working' ? "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" :
                    agent.status === 'completed' ? "bg-green-400" : "bg-red-400"
                  )}
                  title={agent.name}
                  aria-label={`${agent.name} status: ${agent.status}`}
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
                  <Info size={12} className="shrink-0 mt-0.5 text-indigo-400" />
                  <span>Click any module in the Bento Grid to simulate agent completion.</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            type="button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 font-medium focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black outline-none"
          >
            <Map size={20} />
            <span>Show Map</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
