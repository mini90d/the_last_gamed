import React from 'react';
import { motion } from 'framer-motion';
import { Video, Play, Tv, Share2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ProductType } from '../types';
import { useAppStore } from '../store/useAppStore';

const products: { type: ProductType; label: string; icon: LucideIcon; description: string }[] = [
  { type: 'short', label: 'YouTube Short', icon: Play, description: 'Vertical 9:16, high energy, 60s max.' },
  { type: 'long-form', label: 'Long-form Video', icon: Video, description: 'Horizontal 16:9, storytelling, 5-20 min.' },
  { type: 'ad', label: 'Social Media Ad', icon: Share2, description: 'Multi-ratio, conversion-focused.' },
  { type: 'tutorial', label: 'Video Tutorial', icon: Tv, description: 'Educational, screen-share friendly.' },
];

export const ProductSelector: React.FC = () => {
  const { productType, setProductType } = useAppStore();

  if (productType) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-6"
    >
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold mb-4"
          >
            What are we building today?
          </motion.h2>
          <p className="text-white/60 text-xl">Choose your product to customize the agent workflow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <motion.button
              type="button"
              key={p.type}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                setProductType(p.type);
                // Demo start
                setTimeout(() => {
                  useAppStore.getState().updateAgentStatus('discovery', 'working');
                  setTimeout(() => {
                    useAppStore.getState().updateAgentStatus('discovery', 'completed');
                  }, 2000);
                }, 500);
              }}
              className="group flex items-start gap-6 p-8 rounded-3xl border border-white/10 bg-white/5 text-left transition-all hover:bg-white/10 hover:border-indigo-500/50"
            >
              <div className="rounded-2xl bg-indigo-500/20 p-4 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <p.icon size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{p.label}</h3>
                <p className="text-white/50">{p.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
