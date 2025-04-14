'use client'

import React from 'react';
import { Send } from 'lucide-react';
const TelegramFloat = () => {
  return (
    <a
      href="https://t.me/+-RpDnUlLBIthZGE1" // <-- Replace with your Telegram link
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#0088cc',
        color: 'white',
        borderRadius: '50%',
        padding: '15px',
        zIndex: 1000,
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        transition: 'transform 0.3s ease-in-out',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
    >
      <Send size={24} />

    </a>
  );
};

export default TelegramFloat;
