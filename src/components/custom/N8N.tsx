'use client'
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { COACHING_NAME } from '@/constants/CoachingCenterDetails';
import { N8N_WEBHOOK_URL_FOR_CHAT } from '@/constants/URLs';
import { createChat } from '@n8n/chat';

export const N8N = () => {
  useEffect(() => {
    // Create a style element with custom CSS variables
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      :root {
        --chat--color-primary: #4f46e5; /* Brand purple */
        --chat--color-secondary: #10b981; /* Brand green */
        --chat--color-white: #ffffff;
        --chat--color-light: #f9fafb;
        --chat--color-dark: #111827;
        
        --chat--border-radius: 12px;
        --chat--spacing: 1rem;
        
        --chat--window--width: 400px;
        --chat--window--height: 600px;
        
        /* Message bubbles */
        --chat--message--user--background: var(--chat--color-primary);
        --chat--message--bot--background: var(--chat--color-light);
        --chat--message--border-radius: var(--chat--border-radius);
      }
      
      /* Additional custom styles */
      .n8n-chat-header {
        background: linear-gradient(135deg, var(--chat--color-primary) 0%, #7c3aed 100%) !important;
        border-radius: 12px 12px 0 0 !important;
      }
      
      .n8n-chat-input-container {
        border-top: 1px solid #e5e7eb !important;
      }
    `;
    document.head.appendChild(styleElement);

    createChat({
      // your chat configuration
      webhookUrl: N8N_WEBHOOK_URL_FOR_CHAT,
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      metadata: {},
      showWelcomeScreen: true,
      defaultLanguage: 'en',
      initialMessages: [],
      i18n: {
        en: {
          title: `Welcome to ${COACHING_NAME}`,
          subtitle: "How can we help you today? Our team is available 24/7.",
          footer: 'Powered by AI Assistant',
          getStarted: 'Start New Chat',
          inputPlaceholder: 'Type your question here...',
          closeButtonTooltip: 'Minimize chat',
          welcomeMessage: `Hi there! 👋 Welcome to ${COACHING_NAME}. I'm your virtual assistant. Ask me anything about our courses, admissions, or learning support!`,
        //   welcomeSuggestions: [
        //     "What courses do you offer?",
        //     "How do I enroll in a program?",
        //     "What are your class schedules?",
        //     "Tell me about your faculty"
        //   ]
        },
      },
      theme: {
        primaryColor: '#4f46e5',
        secondaryColor: '#f9fafb',
        textColor: '#111827',
        bubbleUserBackground: '#4f46e5',
        bubbleUserTextColor: '#ffffff',
        bubbleBotBackground: '#ffffff',
        bubbleBotTextColor: '#111827',
        inputBackground: '#f9fafb',
        inputTextColor: '#111827',
      },
    //   behavior: {
    //     autoFocus: true,
    //     showTimestamp: true,
    //     animateMessages: true,
    //     messageDelay: 300,
    //   }
    });

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  return <div id="n8n-chat"></div>;
};