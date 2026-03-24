import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUsers, FiMessageSquare, FiHeart, FiShare2,
  FiMic, FiMicOff, FiCamera, FiCameraOff, FiSend,
  FiMoreVertical, FiInfo, FiActivity, FiVideo
} from 'react-icons/fi';
import Button from '@components/common/Button';
import styles from './LiveStream.module.scss';

const LiveStream = () => {
  const { id } = useParams();
  const [viewers, setViewers] = useState(1234);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'AlexCloud', text: 'This stream is amazing! 🔥', color: '#6366f1' },
    { id: 2, user: 'SarahTech', text: 'How do you setup the AI enhancement?', color: '#ec4899' },
    { id: 3, user: 'MikeDev', text: 'Love the new player UI.', color: '#10b981' },
    { id: 4, user: 'Streamer', text: 'Welcome everyone! Glad you are here.', color: 'var(--color-primary)', isStreamer: true },
  ]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: 'You',
      text: message,
      color: '#f43f5e'
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage('');
  };

  return (
    <div className={styles.liveStreamPage}>
      <main className={styles.mainContent}>
        <div className={styles.videoSection}>
          <div className={styles.badges}>
            <div className={styles.liveBadge}>
              <span className={styles.dot} />
              Live
            </div>
            <div className={styles.viewerBadge}>
              <FiUsers /> {viewers.toLocaleString()}
            </div>
          </div>
          
          <div className={styles.videoPlaceholder}>
            <FiVideo className={styles.icon} />
            <p className="text-xl font-bold">Enterprise Live Stream</p>
            <p className="text-sm opacity-60">ID: {id}</p>
          </div>
        </div>

        <section className={styles.streamInfo}>
          <div className={styles.header}>
            <div className={styles.streamer}>
              <img 
                src="https://i.pravatar.cc/150?u=streamer" 
                alt="Streamer" 
                className={styles.avatar}
              />
              <div className={styles.details}>
                <h1>AI Architecture & Future of Video</h1>
                <p>StreamerPro • Following</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" icon={<FiHeart />}>Follow</Button>
              <Button variant="secondary" icon={<FiShare2 />}>Share</Button>
              <Button variant="secondary" icon={<FiMoreVertical />} />
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <label><FiActivity className="inline mr-1" /> Bitrate</label>
              <span>6500 Kbps</span>
            </div>
            <div className={styles.statItem}>
              <label><FiInfo className="inline mr-1" /> Resolution</label>
              <span>4K • 60fps</span>
            </div>
            <div className={styles.statItem}>
              <label><FiUsers className="inline mr-1" /> Peak Viewers</label>
              <span>4,521</span>
            </div>
          </div>
        </section>
      </main>

      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3><FiMessageSquare /> Live Chat</h3>
        </div>

        <div className={styles.chatList}>
          {chatMessages.map((msg) => (
            <div key={msg.id} className={styles.chatMessage}>
              <span 
                className={`${styles.username} ${msg.isStreamer ? styles.streamer : ''}`}
                style={{ color: msg.color }}
              >
                {msg.user}:
              </span>
              <span className={styles.text}>{msg.text}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form className={styles.chatInput} onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder="Send a message..." 
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

export default LiveStream;
