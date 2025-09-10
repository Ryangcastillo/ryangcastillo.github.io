export interface Project {
  id: number;
  name: string;
  description: string;
  repoUrl: string;
  techStack: string[];
  lastCommit: string;
}

export interface ChatMessageSource {
    uri: string;
    title: string;
}

export interface Preview {
    summary: string;
    contentType: 'code' | 'visualization';
    content: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    parts: string;
    sources?: ChatMessageSource[];
    preview?: Preview;
    projectId?: number;
}

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}
