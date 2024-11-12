// app/page.tsx or pages/index.tsx
'use client';
import React, { useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import Hero from '@/components/chatbothero/hero';
import SubjectPicker from '@/components/subjectselect/select';
import ChatInterface from '@/components/chatinterface/interface';

const ProfessorAI = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Hero />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <SubjectPicker 
          selectedSubject={selectedSubject} 
          setSelectedSubject={setSelectedSubject} 
        />
        <ChatInterface 
          message={message}
          setMessage={setMessage}
          messages={messages}
        />
      </div>
    </div>
  );
};

export default ProfessorAI;