import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

interface FlowIndicatorProps {
  status: 'working' | 'completed';
}

export const FlowIndicator: React.FC<FlowIndicatorProps> = ({ status }) => {
  const { theme } = useAppStore();

  const themeColors = {
    indigo: { ring: 'border-indigo-500', particle: 'via-indigo-400' },
    orange: { ring: 'border-orange-500', particle: 'via-orange-400' },
    emerald: { ring: 'border-emerald-500', particle: 'via-emerald-400' },
    rose: { ring: 'border-rose-500', particle: 'via-rose-400' },
  }[theme.primary as 'indigo' | 'orange' | 'emerald' | 'rose'] || { ring: 'border-indigo-500', particle: 'via-indigo-400' };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {status === 'working' && (
          <>
            {/* Pulsing rings */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: [0, 0.2, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute inset-0 border-2 ${themeColors.ring} rounded-3xl`}
            />
            {/* Flowing particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, y: `${(i + 1) * 20}%`, opacity: 0 }}
                animate={{ x: '120%', opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "linear"
                }}
                className={`absolute h-1 w-8 bg-gradient-to-r from-transparent ${themeColors.particle} to-transparent blur-sm`}
              />
            ))}
          </>
        )}
        {status === 'completed' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-green-500/20 mix-blend-overlay"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
