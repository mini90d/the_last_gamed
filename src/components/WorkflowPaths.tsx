import React from 'react';
import { motion } from 'framer-motion';

export const WorkflowPaths: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      <svg className="h-full w-full">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Simplified conceptual wiring paths */}
        <motion.path
          d="M 100 200 Q 300 100 500 200 T 900 200"
          fill="none"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: [0, 0.5, 0],
            strokeDasharray: ["0 100", "100 0"]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.path
          d="M 200 400 Q 400 500 600 400 T 1000 400"
          fill="none"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: [0, 0.3, 0],
            strokeDasharray: ["0 100", "100 0"]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
        />

        <motion.circle
          r="4"
          fill="#6366f1"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: "path('M 100 200 Q 300 100 500 200 T 900 200')" }}
        />
      </svg>
    </div>
  );
};
