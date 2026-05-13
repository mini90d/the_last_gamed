import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { AgentModule } from '../types';
import * as Icons from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';

interface AgentDetailOverlayProps {
  agent: AgentModule;
  onClose: () => void;
}

const getSimulatedContent = (id: string) => {
  switch (id) {
    case 'discovery':
      return {
        title: "Trending Topics Found",
        items: ["AI Productivity Hacks (1.2M views/day)", "Future of Robotics in 2025", "Bento Grid UI Design Trends"]
      };
    case 'scripting':
      return {
        title: "Generated Script",
        body: "[Scene 1]: Close up of a robot arm... [Host]: 'Welcome to the future...'",
        meta: "Estimated duration: 58 seconds"
      };
    case 'visuals':
      return {
        title: "Media Assets",
        items: ["scene_01_hq.mp4", "robotic_hand_close.png", "future_city_drone.mp4"]
      };
    case 'maps':
      return {
        title: "Animated Route",
        body: "Path generated from San Francisco to Tokyo. Smooth zoom at waypoint 3.",
      };
    default:
      return { title: "Agent Processing", body: "Simulated output pending..." };
  }
};

export const AgentDetailOverlay: React.FC<AgentDetailOverlayProps> = ({ agent, onClose }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[agent.icon];
  const content = getSimulatedContent(agent.id);
  const { updateAgentStatus, theme } = useAppStore();

  const themeColors = {
    indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', ring: 'focus-visible:ring-indigo-500', dot: 'bg-indigo-500', primaryBg: 'bg-indigo-500', hoverBg: 'hover:bg-indigo-400' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', ring: 'focus-visible:ring-orange-500', dot: 'bg-orange-500', primaryBg: 'bg-orange-500', hoverBg: 'hover:bg-orange-400' },
    emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', ring: 'focus-visible:ring-emerald-500', dot: 'bg-emerald-500', primaryBg: 'bg-emerald-500', hoverBg: 'hover:bg-emerald-400' },
    rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', ring: 'focus-visible:ring-rose-500', dot: 'bg-rose-500', primaryBg: 'bg-rose-500', hoverBg: 'hover:bg-rose-400' },
  }[theme.primary as 'indigo' | 'orange' | 'emerald' | 'rose'] || { bg: 'bg-indigo-500/20', text: 'text-indigo-400', ring: 'focus-visible:ring-indigo-500', dot: 'bg-indigo-500', primaryBg: 'bg-indigo-500', hoverBg: 'hover:bg-indigo-400' };

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0f0f0f] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close details"
          className={cn(
            "absolute right-6 top-6 p-2 rounded-xl hover:bg-white/5 transition-colors text-white/40 hover:text-white outline-none focus-visible:ring-2",
            themeColors.ring
          )}
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className={cn("rounded-2xl p-4", themeColors.bg, themeColors.text)}>
            {IconComponent && <IconComponent size={32} />}
          </div>
          <div>
            <h2 id="modal-title" className="text-3xl font-bold">{agent.name}</h2>
            <p className="text-white/50">{agent.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white/5 p-6 border border-white/5">
            <h3 className={cn("font-semibold mb-4 flex items-center gap-2", themeColors.text)}>
              {agent.status === 'completed' ? <CheckCircle2 size={18} /> :
               agent.status === 'working' ? <Loader2 size={18} className="animate-spin" /> :
               <AlertCircle size={18} />}
              {content.title}
            </h3>

            {content.body && (
              <p className="text-white/80 leading-relaxed font-mono text-sm bg-black/30 p-4 rounded-xl border border-white/5">
                {content.body}
              </p>
            )}

            {content.items && (
              <ul className="space-y-2">
                {content.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className={cn("h-1 w-1 rounded-full", themeColors.dot)} />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex gap-4">
            {agent.status === 'working' && (
              <button
                onClick={() => {
                  updateAgentStatus(agent.id, 'completed');
                  onClose();
                }}
                className={cn(
                  "flex-1 py-4 rounded-2xl text-white font-bold transition-colors outline-none focus-visible:ring-2",
                  themeColors.primaryBg,
                  themeColors.hoverBg,
                  themeColors.ring
                )}
              >
                Approve & Continue
              </button>
            )}
            <button
              onClick={onClose}
              className={cn(
                "flex-1 py-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors border border-white/5 outline-none focus-visible:ring-2",
                themeColors.ring
              )}
            >
              Dismiss
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
