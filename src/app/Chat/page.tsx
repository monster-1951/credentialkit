'use client'
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

import { N8N_WEBHOOK_URL_FOR_CHAT } from '@/constants/URLs';
import { COACHING_NAME } from '@/constants/CoachingCenterDetails';

const page = () => {
  useEffect(() => {
          createChat({
              webhookUrl : N8N_WEBHOOK_URL_FOR_CHAT,
              webhookConfig: {
                  method: 'POST',
                  headers: {}
              },
              target: '#n8n-chat',
              mode: 'fullscreen',
              chatInputKey: 'chatInput',
              chatSessionKey: 'sessionId',
              metadata: {},
              showWelcomeScreen: false,
              defaultLanguage: 'en',
              initialMessages: [
                  
              ],
              i18n: {
                  en: {
                      title: `Welcome to ${COACHING_NAME}`,
                      subtitle: "Start a chat. We're here to help you 24/7.",
                      footer: '',
                      getStarted: 'New Conversation',
                      inputPlaceholder: 'Type your question..',
                      closeButtonTooltip: 'Close chat'
                  },
              },
          });
    }, []);
  
    return (<div id="n8n-chat" className='sm:w-[800px] mx-auto h-[90vh] sm:mt-[5vh]'></div>);
}

export default page