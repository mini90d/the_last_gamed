import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { BentoTile } from './BentoTile';

export const Dashboard: React.FC = () => {
  const { agents, productType, setProductType } = useAppStore();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">BentoVideo <span className="text-indigo-500">AI</span></h1>
          <p className="mt-2 text-white/60">Your AI agent bento box for digital asset creation.</p>
        </div>
        {productType && (
          <button
            onClick={() => setProductType(null)}
            className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm"
          >
            Change Product: <span className="text-indigo-400 capitalize">{productType.replace('-', ' ')}</span>
          </button>
        )}
      </header>

      <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-4">
        {agents.map((agent) => (
          <BentoTile key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};
