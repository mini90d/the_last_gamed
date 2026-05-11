import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { AgentModule } from '../types';
import * as Icons from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

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
  const { updateAgentStatus } = useAppStore();

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
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0f0f0f] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-6 top-6 p-2 rounded-xl hover:bg-white/5 transition-colors text-white/40 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="rounded-2xl bg-indigo-500/20 p-4 text-indigo-400">
            {IconComponent && <IconComponent size={32} />}
          </div>
          <div>
            <h2 className="text-3xl font-bold">{agent.name}</h2>
            <p className="text-white/50">{agent.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white/5 p-6 border border-white/5">
            <h3 className="text-indigo-400 font-semibold mb-4 flex items-center gap-2">
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
                    <div className="h-1 w-1 rounded-full bg-indigo-500" />
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
                className="flex-1 py-4 rounded-2xl bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition-colors"
              >
                Approve & Continue
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors border border-white/5"
            >
              Dismiss
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
