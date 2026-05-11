import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlowIndicatorProps {
  status: 'working' | 'completed';
}

export const FlowIndicator: React.FC<FlowIndicatorProps> = ({ status }) => {
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
              className="absolute inset-0 border-2 border-indigo-500 rounded-3xl"
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
                className="absolute h-1 w-8 bg-gradient-to-r from-transparent via-indigo-400 to-transparent blur-sm"
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
