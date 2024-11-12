
// Updated pages/index.tsx or app/page.tsx
'use client';
import React, { useState } from 'react';
import { HeroSection } from '@/components/chatbothero/hero';
import { SubjectSelection } from '@/components/subjectselect/select';
import { FileUpload } from '@/components/fileupload/fileupload';
import { ChatInterface } from '@/components/chatinterface/interface';
import { DecorativeElements } from '@/components/decoratriveelements/elements';

const ProfessorAI = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <HeroSection />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <SubjectSelection 
          selectedSubject={selectedSubject} 
          setSelectedSubject={setSelectedSubject} 
        />
        <FileUpload />
        <ChatInterface 
          message={message}
          setMessage={setMessage}
          messages={messages}
        />
      </div>
      <DecorativeElements />
    </div>
  );
};

export default ProfessorAI;