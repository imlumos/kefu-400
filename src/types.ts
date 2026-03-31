export interface BotConfig {
  id: string;
  name: string;
  model: string;
  systemPrompt: string;
  transferStrategy: {
    missCount: number;
    emotionThreshold: number;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  similarQuestions: string[];
  answer: string;
  category: string;
  updateTime: string;
}

export interface SessionMessage {
  role: 'user' | 'assistant' | 'agent';
  text: string;
  timestamp: string; // "14:20:05"
  duration: number; // seconds
  asrConfidence?: number;
  audioUrl?: string;
  responseProcess?: {
    intent?: string;
    confidence?: number;
    knowledgeBaseHit?: string;
    llmThinking?: string;
    tokens?: number;
  };
}

export interface SessionRecord {
  id: string;
  botType: 'B' | 'C';
  uid: string;
  userName: string;
  phoneNumber: string;
  startTime: string;
  callId: string;
  botDuration: number;
  botRounds: number;
  botQuality: '优' | '良' | '中' | '差';
  isTransferred: boolean;
  transferSuccess?: boolean;
  transferMethod?: string;
  agentName?: string;
  agentGroup?: string;
  agentDuration?: number;
  botAudioUrl: string;
  agentAudioUrl?: string;
  messages: SessionMessage[];
  botSummary: string;
  agentSummary?: string;
}

export interface DashboardStats {
  inboundCalls: number;
  aiPickupRate: number;
  resolutionRate: number;
  transferRate: number;
  hotTopics: { topic: string; count: number }[];
  badCases: { category: string; count: number }[];
}
