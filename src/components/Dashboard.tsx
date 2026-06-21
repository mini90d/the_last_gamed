import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { BentoTile } from './BentoTile';
import { AgentDetailOverlay } from './AgentDetailOverlay';
import { AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { agents, productType, setProductType, activeAgentId, setActiveAgentId } = useAppStore();

  const activeAgent = agents.find(a => a.id === activeAgentId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">BentoVideo <span className="text-indigo-500">AI</span></h1>
          <p className="mt-2 text-white/60">Your AI agent bento box for digital asset creation.</p>
        </div>
        {productType && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              aria-label="Reset application"
              className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Icons.RotateCcw size={14} />
              Reset
            </button>
            <button
              type="button"
              onClick={() => setProductType(null)}
              aria-label={`Change current product: ${productType}`}
              className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Change Product: <span className="text-indigo-400 capitalize">{productType.replace('-', ' ')}</span>
            </button>
          </div>
        )}
      </header>

      <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-4">
        {agents.map((agent) => (
          <BentoTile key={agent.id} agent={agent} />
        ))}
      </div>

      <AnimatePresence>
        {activeAgent && (
          <AgentDetailOverlay
            agent={activeAgent}
            onClose={() => setActiveAgentId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
