import { create } from 'zustand';
import type { AppState, ProductType, AgentStatus, AgentModule, BrandTheme } from '../types';

const initialAgents: AgentModule[] = [
  { id: 'preview', name: 'Master Preview', icon: 'Play', description: 'Real-time asset assembly', status: 'idle', gridSpan: 'md:col-span-2 md:row-span-2' },
  { id: 'discovery', name: 'Discovery', icon: 'Search', description: 'Viral trends & ideas', status: 'idle', gridSpan: 'md:col-span-2 md:row-span-1' },
  { id: 'scripting', name: 'Scripting', icon: 'FileText', description: 'Storyboards & scripts', status: 'idle', gridSpan: 'md:col-span-1 md:row-span-2' },
  { id: 'consistency', name: 'Consistency', icon: 'UserCheck', description: 'Character & style sync', status: 'idle', gridSpan: 'md:col-span-1 md:row-span-1' },
  { id: 'visuals', name: 'Visuals', icon: 'Image', description: 'AI Image & Video gen', status: 'idle', gridSpan: 'md:col-span-2 md:row-span-2' },
  { id: 'audio', name: 'Audio', icon: 'Mic2', description: 'Voiceover & Music', status: 'idle', gridSpan: 'md:col-span-1 md:row-span-1' },
  { id: 'maps', name: 'Map Animations', icon: 'MapPin', description: 'AI-generated geo paths', status: 'idle', gridSpan: 'md:col-span-1 md:row-span-1' },
  { id: 'captions', name: 'Dynamic Captions', icon: 'Type', description: 'Viral dynamic subtitles', status: 'idle', gridSpan: 'md:col-span-1 md:row-span-1' },
  { id: 'production', name: 'Production', icon: 'Film', description: 'Assembly & Editing', status: 'idle', gridSpan: 'md:col-span-1 md:row-span-2' },
  { id: 'human-review', name: 'Human Review', icon: 'User', description: 'Final approval gate', status: 'idle', gridSpan: 'md:col-span-1 md:row-span-1' },
  { id: 'seo', name: 'Marketing & SEO', icon: 'BarChart3', description: 'Thumbnails & Tags', status: 'idle', gridSpan: 'md:col-span-1 md:row-span-1' },
  { id: 'copyright', name: 'Policy Check', icon: 'ShieldCheck', description: 'Copyright & Safety', status: 'idle', gridSpan: 'md:col-span-1 md:row-span-1' },
  { id: 'global', name: 'Global', icon: 'Languages', description: 'Translation & Dubbing', status: 'idle', gridSpan: 'md:col-span-1 md:row-span-1' },
  { id: 'distribution', name: 'Distribution', icon: 'Share2', description: 'Posting & Scheduling', status: 'idle', gridSpan: 'md:col-span-2 md:row-span-1' },
];

export const useAppStore = create<AppState>((set) => ({
  productType: null,
  setProductType: (type: ProductType | null) => set({ productType: type }),
  agents: initialAgents,
  activeAgentId: null,
  setActiveAgentId: (id: string | null) => set({ activeAgentId: id }),
  theme: { name: 'Cyberpunk', primary: 'indigo' },
  setTheme: (theme: BrandTheme) => set({ theme }),
  updateAgentStatus: (id: string, status: AgentStatus) =>
    set((state) => {
      const updatedAgents = state.agents.map((agent) =>
        agent.id === id ? { ...agent, status } : agent
      );

      // Auto-trigger next agent for demo purposes if one completes
      if (status === 'completed') {
        const currentIndex = state.agents.findIndex(a => a.id === id);
        const nextAgent = state.agents[currentIndex + 1];
        if (nextAgent) {
          // If the next agent is "Human Review", don't auto-complete it
          const isAutomated = !['human-review'].includes(nextAgent.id);

          setTimeout(() => {
            useAppStore.getState().updateAgentStatus(nextAgent.id, 'working');

            if (isAutomated) {
               setTimeout(() => {
                 useAppStore.getState().updateAgentStatus(nextAgent.id, 'completed');
               }, 3000);
            }
          }, 1500);
        }
      }

      return { agents: updatedAgents };
    }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateAgentOutput: (id: string, output: any) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id ? { ...agent, output } : agent
      ),
    })),
}));
