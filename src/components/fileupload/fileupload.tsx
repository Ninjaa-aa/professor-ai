// components/FileUploader.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

export const FileUploader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-8 px-4 sm:px-0"
    >
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="border-2 border-dashed border-gray-700 rounded-xl p-4 sm:p-8 text-center hover:border-blue-400 transition-colors duration-300"
      >
        <div className="flex flex-col items-center">
          <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-4" />
          <p className="text-gray-300 text-sm sm:text-base">
            Drag and drop your files here or{' '}
            <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
              browse
            </span>
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Support for PDF, DOC, TXT files
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FileUploader;