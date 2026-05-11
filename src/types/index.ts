export type ProductType = 'short' | 'long-form' | 'ad' | 'tutorial';

export type AgentStatus = 'idle' | 'working' | 'completed' | 'error';

export interface AgentModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: AgentStatus;
  gridSpan: string; // e.g., 'col-span-2 row-span-1'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  output?: any;
}

export interface AppState {
  productType: ProductType | null;
  setProductType: (type: ProductType | null) => void;
  agents: AgentModule[];
  updateAgentStatus: (id: string, status: AgentStatus) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateAgentOutput: (id: string, output: any) => void;
  activeAgentId: string | null;
  setActiveAgentId: (id: string | null) => void;
}
