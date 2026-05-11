import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { AgentModule } from '../types';
import { cn } from '../lib/utils';
import { FlowIndicator } from './FlowIndicator';
import { useAppStore } from '../store/useAppStore';

interface BentoTileProps {
  agent: AgentModule;
}

export const BentoTile: React.FC<BentoTileProps> = ({ agent }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[agent.icon];

  const handleClick = () => {
    if (agent.status === 'working') {
      useAppStore.getState().updateAgentStatus(agent.id, 'completed');
    } else if (agent.status === 'idle' || agent.status === 'completed') {
      useAppStore.getState().updateAgentStatus(agent.id, 'working');
    }
  };

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Agent ${agent.name}: ${agent.status}. ${agent.description}`}
      className={cn(
        "relative overflow-hidden cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10 text-left outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
        agent.gridSpan,
        agent.status === 'working' && "border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
      )}
    >
      <div className="flex h-full flex-col justify-between space-y-4">
        <div className="flex items-start justify-between">
          <div className="rounded-2xl bg-indigo-500/20 p-3 text-indigo-400">
            {IconComponent && <IconComponent size={24} />}
          </div>
          <div className={cn(
            "h-2 w-2 rounded-full",
            agent.status === 'idle' ? "bg-white/20" :
            agent.status === 'working' ? "animate-pulse bg-yellow-400" :
            agent.status === 'completed' ? "bg-green-400" : "bg-red-400"
          )} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
          <p className="text-sm text-white/50">{agent.description}</p>
        </div>
      </div>

      {/* Visual Indicator of Work Flow (Palette's touch) */}
      {(agent.status === 'working' || agent.status === 'completed') && (
        <FlowIndicator status={agent.status} />
      )}
    </motion.button>
  );
};
