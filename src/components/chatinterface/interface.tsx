// components/ChatInterface.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload, X, Bot, User } from 'lucide-react';
import { Message } from '@/types';

interface ChatInterfaceProps {
  message: string;
  setMessage: (message: string) => void;
  messages: Message[];
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  message,
  setMessage,
  messages: propMessages
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Start chat when user types or uploads a file
  useEffect(() => {
    if (message.trim() || selectedFile) {
      setChatStarted(true);
    }
  }, [message, selectedFile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setChatStarted(true);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setChatStarted(true);
    }
  };

  const getAIResponse = (userMessage: string) => {
    const responses = [
      "I understand your question. Let me help you with that step by step.",
      "That's an interesting topic! Here's what you need to know...",
      "Great question! Here's how we can approach this...",
      "Let me explain this concept in detail...",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!message.trim() && !selectedFile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message || `Uploaded file: ${selectedFile?.name}`,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setSelectedFile(null);
    setIsTyping(true);

    // Add initial AI greeting if this is the first message
    if (messages.length === 0) {
      setTimeout(() => {
        const greeting: Message = {
          id: 'greeting',
          content: "Hi! I'm Professor AI. How can I help you with your studies today?",
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, greeting]);
        setIsTyping(true);
      }, 500);
    }

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(userMessage.content),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden max-w-2xl mx-auto"
    >
      {/* Chat Messages Area */}
      <div className="h-[300px] p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {!chatStarted ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                w-full
                max-w-[500px]
                min-h-[80px]
                flex
                items-center
                justify-center
                ${dragActive 
                  ? 'bg-blue-400/10' 
                  : 'hover:bg-gray-800/50'
                }
              `}
            >
              <div 
                className={`
                  w-[90%]
                  py-6
                  px-8
                  flex
                  flex-col
                  items-center
                  justify-center
                  border
                  border-dashed
                  rounded-lg
                  transition-all
                  duration-200
                  ${dragActive 
                    ? 'border-blue-400' 
                    : 'border-gray-700/50 hover:border-blue-400/50'
                  }
                `}
              >
                <Upload className="w-5 h-5 text-gray-400 mb-2" />
                <div className="flex flex-wrap items-center justify-center text-center">
                  <span className="text-sm text-gray-400">
                    Drag and drop your files here or{' '}
                  </span>
                  <label className="text-sm text-[#8BB4F6] hover:text-[#A78BF6] cursor-pointer transition-colors ml-1">
                    browse
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileInput}
                      accept=".pdf,.doc,.docx,.txt"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, DOC, TXT files
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              or start a conversation
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start space-x-2 ${
                  msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.sender === 'ai' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                }`}>
                  {msg.sender === 'ai' ? (
                    <Bot className="w-5 h-5 text-blue-400" />
                  ) : (
                    <User className="w-5 h-5 text-purple-400" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className="max-w-[80%]">
                  <div className={`rounded-lg px-4 py-2 ${
                    msg.sender === 'ai' 
                      ? 'bg-gray-800 text-gray-200' 
                      : 'bg-blue-500/20 text-gray-200'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
                <div className="bg-gray-800 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-700/50 p-3 space-y-2">
        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-gray-700/30 rounded-lg px-3 py-1.5"
          >
            <span className="text-sm text-gray-300 truncate">
              {selectedFile.name}
            </span>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        <div className="relative flex items-center">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask your question..."
            rows={1}
            className="w-full bg-gray-900/50 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8BB4F6] border border-gray-700/50 resize-none"
          />
          <motion.button 
            onClick={handleSendMessage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 p-1.5 text-[#8BB4F6] hover:text-[#A78BF6] transition-colors disabled:opacity-50"
            disabled={!message.trim() && !selectedFile}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatInterface;