import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUsers, 
  FiMessageSquare, 
  FiSend, 
  FiSettings, 
  FiShare2, 
  FiVolume2,
  FiPlay,
  FiPause
} from 'react-icons/fi';
import Button from '@components/common/Button';
import styles from './WatchParty.module.scss';

const WatchParty = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'System', text: 'Welcome to the watch party!', type: 'system' },
    { id: 2, sender: 'Alice', text: 'Hey everyone! Ready for the movie?', type: 'user' },
    { id: 3, sender: 'Bob', text: 'Cant wait for this one.', type: 'user' },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text: message,
      type: 'user'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className={styles.watchPartyPage}>
      <div className={styles.playerSection}>
        <div className={styles.videoWrapper}>
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <FiPlay className="text-6xl text-white opacity-50" />
          </div>
          {/* Synchronized Player Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg">
            <div className="flex items-center gap-4">
              <FiPlay className="text-white cursor-pointer" />
              <div className="w-48 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-primary" />
              </div>
              <span className="text-xs text-white">12:45 / 45:00</span>
            </div>
            <div className="flex items-center gap-4">
              <FiVolume2 className="text-white" />
              <FiSettings className="text-white" />
            </div>
          </div>
        </div>

        <div className={styles.roomInfo}>
          <div className="flex justify-between items-start">
            <div>
              <h1>Interstellar: Community Rewatch</h1>
              <div className={styles.meta}>
                <span><FiUsers /> 124 watching</span>
                <span>Hosted by <strong>Alice</strong></span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" icon={<FiShare2 />}>Share</Button>
              <Button variant="secondary" size="sm" icon={<FiSettings />} />
            </div>
          </div>
        </div>
      </div>

      <aside className={styles.chatSection}>
        <div className={styles.chatHeader}>
          <h3><FiMessageSquare /> Live Chat</h3>
          <div className="text-xs text-secondary">
            124 Online
          </div>
        </div>

        <div className={styles.messagesList}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`${styles.message} ${msg.type === 'system' ? styles.system : ''}`}
            >
              {msg.type !== 'system' && <span className={styles.sender}>{msg.sender}</span>}
              <span className={styles.text}>{msg.text}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.chatInput} onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder="Say something..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="primary" 
            size="sm" 
            icon={<FiSend />}
          />
        </form>
      </aside>
    </div>
  );
};

export default WatchParty;
