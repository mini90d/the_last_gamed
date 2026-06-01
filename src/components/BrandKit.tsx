import React from 'react';
import { useAppStore } from '../store/useAppStore';
import type { BrandTheme } from '../types';
import { cn } from '../lib/utils';

const themes: BrandTheme[] = [
  { name: 'Cyberpunk', primary: 'indigo' },
  { name: 'Sunset', primary: 'orange' },
  { name: 'Emerald', primary: 'emerald' },
  { name: 'Rose', primary: 'rose' },
];

export const BrandKit: React.FC = () => {
  const { theme, setTheme } = useAppStore();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-[10px] uppercase tracking-wider text-white/30 font-bold mb-3">Brand Theme</div>
      <div className="flex gap-2">
        {themes.map((t) => (
          <button
            type="button"
            key={t.name}
            onClick={() => setTheme(t)}
            title={t.name}
            className={cn(
              "h-6 w-6 rounded-full border-2 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black outline-none",
              theme.name === t.name ? "border-white scale-110" : "border-transparent",
              t.primary === 'indigo' && "bg-indigo-500",
              t.primary === 'orange' && "bg-orange-500",
              t.primary === 'emerald' && "bg-emerald-500",
              t.primary === 'rose' && "bg-rose-500",
            )}
            aria-label={`Switch to ${t.name} theme`}
          />
        ))}
      </div>
    </div>
  );
};
