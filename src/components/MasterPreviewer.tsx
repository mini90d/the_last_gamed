import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, Maximize2, Loader2, Sparkles } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';

export const MasterPreviewer: React.FC = () => {
  const { agents, theme } = useAppStore();

  const scriptAgent = agents.find(a => a.id === 'scripting');
  const audioAgent = agents.find(a => a.id === 'audio');
  const isProduction = agents.find(a => a.id === 'production')?.status === 'working';
  const isComplete = agents.find(a => a.id === 'distribution')?.status === 'completed';

  const themeText = {
    indigo: 'text-indigo-400',
    orange: 'text-orange-400',
    emerald: 'text-emerald-400',
    rose: 'text-rose-400',
  }[theme.primary as 'indigo' | 'orange' | 'emerald' | 'rose'] || 'text-indigo-400';

  const themeBg = {
    indigo: 'bg-indigo-500',
    orange: 'bg-orange-500',
    emerald: 'bg-emerald-500',
    rose: 'bg-rose-500',
  }[theme.primary as 'indigo' | 'orange' | 'emerald' | 'rose'] || 'bg-indigo-500';

  const themeHoverText = useMemo(() => ({
    indigo: 'hover:text-indigo-400',
    orange: 'hover:text-orange-400',
    emerald: 'hover:text-emerald-400',
    rose: 'hover:text-rose-400',
  }[theme.primary as 'indigo' | 'orange' | 'emerald' | 'rose'] || 'hover:text-indigo-400'), [theme.primary]);

  const themeRing = useMemo(() => ({
    indigo: 'focus-visible:ring-indigo-500',
    orange: 'focus-visible:ring-orange-500',
    emerald: 'focus-visible:ring-emerald-500',
    rose: 'focus-visible:ring-rose-500',
  }[theme.primary as 'indigo' | 'orange' | 'emerald' | 'rose'] || 'focus-visible:ring-indigo-500'), [theme.primary]);

  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden bg-black border border-white/10 group">
      {/* Video Preview Area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isProduction ? (
             <motion.div
               key="assembling"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="flex flex-col items-center gap-4"
             >
               <Loader2 className={cn("h-12 w-12 animate-spin", themeText)} />
               <p className="text-white/60 font-medium animate-pulse text-sm">Assembling final frames...</p>
             </motion.div>
          ) : isComplete ? (
            <motion.div
              key="complete"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full h-full"
            >
              <img
                src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover opacity-50"
                alt="AI Generated Preview"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className={cn("p-6 rounded-full text-white shadow-2xl", themeBg)}>
                    <Play size={48} fill="white" />
                 </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className={cn("h-full", themeBg)}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8"
            >
              <Sparkles className="h-12 w-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/30 text-sm max-w-[200px]">Asset preview will appear here as agents generate content.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic Overlays */}
      <div className="absolute top-4 left-4 flex gap-2">
        {scriptAgent?.status === 'completed' && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/80"
          >
            Script Ready
          </motion.div>
        )}
        {audioAgent?.status === 'completed' && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1"
          >
            <Volume2 size={10} />
            Audio Synced
          </motion.div>
        )}
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between">
           <div className="flex gap-1">
              <button
                type="button"
                aria-label="Play video"
                className={cn(
                  "p-2 rounded-lg text-white transition-colors outline-none focus-visible:ring-1",
                  themeHoverText,
                  themeRing
                )}
              >
                <Play size={18} fill="currentColor" />
              </button>
              <button
                type="button"
                aria-label="Toggle mute"
                className={cn(
                  "p-2 rounded-lg text-white transition-colors outline-none focus-visible:ring-1",
                  themeHoverText,
                  themeRing
                )}
              >
                <Volume2 size={18} />
              </button>
           </div>
           <button
             type="button"
             aria-label="Maximize"
             className={cn(
               "p-2 rounded-lg text-white transition-colors outline-none focus-visible:ring-1",
               themeHoverText,
               themeRing
             )}
           >
             <Maximize2 size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};
