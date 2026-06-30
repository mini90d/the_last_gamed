import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, RefreshCcw, CheckCircle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';

export const GrandFinale: React.FC = () => {
  const { agents, productType, theme } = useAppStore();
  const isComplete = agents.find(a => a.id === 'distribution')?.status === 'completed';

  const themeBg = {
    indigo: 'bg-indigo-500',
    orange: 'bg-orange-500',
    emerald: 'bg-emerald-500',
    rose: 'bg-rose-500',
  }[theme.primary as 'indigo' | 'orange' | 'emerald' | 'rose'] || 'bg-indigo-500';

  if (!isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-2xl p-6"
      >
        <motion.div
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="max-w-2xl w-full rounded-[40px] bg-[#0f0f0f] border border-white/10 p-12 text-center shadow-[0_0_100px_rgba(99,102,241,0.2)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className={cn("mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full text-white", themeBg)}
          >
            <CheckCircle size={48} />
          </motion.div>

          <h2 className="mb-4 text-5xl font-bold tracking-tight">Your {productType?.replace('-', ' ')} is Ready!</h2>
          <p className="mb-12 text-white/50 text-lg">Agents have completed the workflow. Your digital asset is optimized and packaged for delivery.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              className={cn(
                "flex items-center justify-center gap-3 py-5 rounded-2xl text-white font-bold text-lg hover:scale-[1.02] transition-transform cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white",
                themeBg
              )}
            >
              <Download size={24} />
              Download MP4
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Share2 size={24} />
              Push to YouTube
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.reload(); // Simple reset for demo
            }}
            className="mt-12 flex items-center justify-center gap-2 mx-auto text-white/40 hover:text-white transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-2"
          >
            <RefreshCcw size={18} />
            Run another project
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
