
// components/ChatInterface.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

interface ChatInterfaceProps {
  message: string;
  setMessage: (message: string) => void;
  messages: any[];
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ message, setMessage, messages }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800 rounded-xl p-4 border-2 border-gray-700"
    >
      <div className="h-96 mb-4 overflow-y-auto space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Start a conversation with Professor AI
          </div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="message"
            >
              {/* Message content would go here */}
            </motion.div>
          ))
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your question..."
          className="w-full bg-gray-900 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
        />
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};