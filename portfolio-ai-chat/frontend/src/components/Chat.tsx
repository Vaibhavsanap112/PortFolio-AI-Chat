import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, X, Minimize2, Maximize2, Trash2 } from 'lucide-react';
import { chatAPI } from '../api';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(Math.random().toString(36).substr(2, 9));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '0',
        type: 'ai',
        content: "👋 Hello! I'm J.A.R.V.I.S., the AI assistant. Feel free to ask me about experience, projects, skills, or how we can work together. What would you like to know?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage(input, sessionId.current);
      const aiMessage: Message = {
        id: Math.random().toString(),
        type: 'ai',
        content: response.aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get response:', error);
      const errorMessage: Message = {
        id: Math.random().toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    await chatAPI.clearHistory(sessionId.current);
    setMessages([
      {
        id: '0',
        type: 'ai',
        content: "👋 Hello! I'm J.A.R.V.I.S., the AI assistant. Feel free to ask me about experience, projects, skills, or how we can work together. What would you like to know?",
        timestamp: new Date(),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 100 }}
        className="fixed bottom-4 right-4 z-40 max-w-md w-full"
      >
        <motion.div
          className="glass rounded-xl shadow-2xl flex flex-col"
          style={{ height: isMinimized ? 'auto' : '600px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700 rounded-t-xl">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
              <span className="font-bold text-lg">J.A.R.V.I.S.</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-slate-700/50 rounded transition"
                title={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1 hover:bg-slate-700/50 rounded transition"
              >
                <X size={18} />
              </motion.button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Container */}
              <motion.div
                layout
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-slate-700 text-slate-100 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                        <span className="text-xs opacity-60 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-700 rounded-lg rounded-bl-none px-4 py-2">
                      <div className="flex gap-2">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </motion.div>

              {/* Input Area */}
              <div className="p-4 border-t border-slate-700 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && !e.shiftKey && handleSendMessage()
                    }
                    placeholder="Ask me anything..."
                    className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={loading || !input.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg transition"
                  >
                    <Send size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClearChat}
                    className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg transition"
                    title="Clear chat history"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>
                <p className="text-xs text-slate-400">
                  Powered by OpenRouter AI • Press Enter to send
                </p>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Chat;
