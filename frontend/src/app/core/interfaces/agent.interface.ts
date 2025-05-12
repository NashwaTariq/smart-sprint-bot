export interface Agent {
  id: string;
  name: string;
  description: string;
  config: AgentConfig;
  status: AgentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentConfig {
  capabilities: string[];
  parameters: Record<string, any>;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

export type AgentStatus = 'active' | 'inactive' | 'error';

export interface AgentResponse {
  success: boolean;
  data?: Agent;
  error?: string;
}

export interface AgentListResponse {
  success: boolean;
  data?: Agent[];
  error?: string;
  total: number;
  page: number;
  limit: number;
}

export interface MessageRequest {
  query: string;
}

export interface MessageResponse {
  status: string;
  response: string;
}

export interface JiraDailyUpdate {
  success: boolean;
  data?: {
    updates: Array<{
      issueKey: string;
      summary: string;
      status: string;
      assignee: string;
      updatedAt: Date;
    }>;
    lastUpdated: Date;
  };
  error?: string;
}


export interface LogsResponse {
  created_at: string;
  id: string;
  messages:
  [{ timestamp: string; user: string; bot: string }]
  title: string;
}

export interface JiraQueryRequest {
  query: string;
}

export interface JiraQueryResponse {
  status: 'success' | 'error';
  data?: {
    issues: Array<{
      key: string;
      summary: string;
      status: string;
      assignee: string;
      priority: string;
      created: string;
      updated: string;
    }>;
    total: number;
  };
  error?: string;
} 