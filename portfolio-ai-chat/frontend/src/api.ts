import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ChatMessage {
  userMessage: string;
  aiResponse: string;
  timestamp: string;
  sessionId: string;
}

export interface Portfolio {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  summary: string;
  resumeContent: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  github: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface Skills {
  frontend: string[];
  backend: string[];
  databases: string[];
  devops: string[];
  ai_ml: string[];
  tools: string[];
}

// Chat API
export const chatAPI = {
  sendMessage: async (message: string, sessionId: string): Promise<ChatMessage> => {
    const response = await api.post('/chat', { message, sessionId });
    return response.data;
  },
  
  getHistory: async (sessionId: string): Promise<ChatMessage[]> => {
    const response = await api.get('/chat/history', { params: { sessionId } });
    return response.data;
  },
  
  clearHistory: async (sessionId: string): Promise<void> => {
    await api.post('/chat/clear', { sessionId });
  },
};

// Portfolio API
export const portfolioAPI = {
  getPortfolio: async (): Promise<Portfolio> => {
    const response = await api.get('/portfolio');
    return response.data;
  },
  
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
  },
  
  getSkills: async (): Promise<Skills> => {
    const response = await api.get('/skills');
    return response.data;
  },
  
  getExperience: async (): Promise<Experience[]> => {
    const response = await api.get('/experience');
    return response.data;
  },
};

export default api;
