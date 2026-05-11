import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { AgentModule } from '../types';
import { cn } from '../lib/utils';
import { FlowIndicator } from './FlowIndicator';
import { useAppStore } from '../store/useAppStore';
import { MasterPreviewer } from './MasterPreviewer';

interface BentoTileProps {
  agent: AgentModule;
}

export const BentoTile: React.FC<BentoTileProps> = ({ agent }) => {
  const { theme } = useAppStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[agent.icon];

  const handleClick = () => {
    useAppStore.getState().setActiveAgentId(agent.id);
  };

  const themeColors = {
    indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/50', shadow: 'shadow-[0_0_20px_rgba(99,102,241,0.2)]', ring: 'focus-visible:ring-indigo-500' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50', shadow: 'shadow-[0_0_20px_rgba(249,115,22,0.2)]', ring: 'focus-visible:ring-orange-500' },
    emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/50', shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]', ring: 'focus-visible:ring-emerald-500' },
    rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/50', shadow: 'shadow-[0_0_20px_rgba(244,63,94,0.2)]', ring: 'focus-visible:ring-rose-500' },
  }[theme.primary as 'indigo' | 'orange' | 'emerald' | 'rose'] || { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/50', shadow: 'shadow-[0_0_20px_rgba(99,102,241,0.2)]', ring: 'focus-visible:ring-indigo-500' };

  if (agent.id === 'preview') {
    return (
      <div className={cn("relative", agent.gridSpan)}>
        <MasterPreviewer />
      </div>
    );
  }

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
        "relative overflow-hidden cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10 text-left outline-none focus-visible:ring-2",
        themeColors.ring,
        agent.gridSpan,
        agent.status === 'working' && cn(themeColors.border, themeColors.shadow)
      )}
    >
      <div className="flex h-full flex-col justify-between space-y-4">
        <div className="flex items-start justify-between">
          <div className={cn("rounded-2xl p-3", themeColors.bg, themeColors.text)}>
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
