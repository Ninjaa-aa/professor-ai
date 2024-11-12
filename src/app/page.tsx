// app/page.tsx or pages/index.tsx (continued)
'use client';
import ChatBot from '@/components/chatbot/chatbot';
import Hero from '@/components/chatbothero/hero';
import FileUploader from '@/components/fileupload/fileupload';
import Navbar from '@/components/navbar/navbar';
import SubjectPicker from '@/components/subjectselect/select';
import React, { useState } from 'react';

const ProfessorAI = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Hero />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <SubjectPicker 
          selectedSubject={selectedSubject} 
          setSelectedSubject={setSelectedSubject} 
        />
        <FileUploader />
        <ChatBot 
          message={message}
          setMessage={setMessage}
          messages={messages}
        />
      </div>
    </div>
  );
};

export default ProfessorAI;