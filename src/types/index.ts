export type ProductType = 'short' | 'long-form' | 'ad' | 'tutorial';

export type AgentStatus = 'idle' | 'working' | 'completed' | 'error';

export interface AgentModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: AgentStatus;
  gridSpan: string; // e.g., 'col-span-2 row-span-1'
}

export interface AppState {
  productType: ProductType | null;
  setProductType: (type: ProductType | null) => void;
  agents: AgentModule[];
  updateAgentStatus: (id: string, status: AgentStatus) => void;
}
