import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiVideo, FiMic, FiMicOff, FiCamera, FiCameraOff, FiMessageSquare,
  FiUsers, FiShare2, FiSettings, FiMonitor, FiMaximize, FiMinimize
} from 'react-icons/fi';
import Button from '@components/common/Button';
import './Live.scss';

const Live = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alice', text: 'This is amazing! 🔥', time: '2:34' },
    { id: 2, user: 'Bob', text: 'Great stream!', time: '2:35' },
    { id: 3, user: 'Charlie', text: 'Can you turn up the volume?', time: '2:36' },
    { id: 4, user: 'Diana', text: 'Love this content ❤️', time: '2:37' },
  ]);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'You', avatar: 'Y', isHost: true },
    { id: 2, name: 'Alice', avatar: 'A', isSpeaking: true },
    { id: 3, name: 'Bob', avatar: 'B' },
    { id: 4, name: 'Charlie', avatar: 'C' },
    { id: 5, name: 'Diana', avatar: 'D' },
  ]);

  const videoRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        user: 'You',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setMessage('');
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <div className="live-page">
      <div className="live-container">
        {/* Main Video Area */}
        <div className="live-main">
          <div className="video-container" ref={videoRef}>
            <div className="video-player">
              <div className="video-placeholder">
                <FiVideo />
                <span>Live Stream</span>
                <span className="live-indicator">LIVE</span>
              </div>
              
              {/* Video Controls Overlay */}
              <div className="video-overlay">
                <div className="overlay-top">
                  <div className="stream-info">
                    <h2>Live Collaboration Session</h2>
                    <div className="viewer-count">
                      <FiUsers />
                      <span>{participants.length} participants</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="small"
                    icon={showChat ? <FiMinimize /> : <FiMaximize />}
                    onClick={() => setShowChat(!showChat)}
                  />
                </div>

                <div className="overlay-bottom">
                  <div className="controls">
                    <Button
                      variant={isMuted ? 'danger' : 'secondary'}
                      size="small"
                      icon={isMuted ? <FiMicOff /> : <FiMic />}
                      onClick={() => setIsMuted(!isMuted)}
                    />
                    <Button
                      variant={isVideoOff ? 'danger' : 'secondary'}
                      size="small"
                      icon={isVideoOff ? <FiCameraOff /> : <FiCamera />}
                      onClick={() => setIsVideoOff(!isVideoOff)}
                    />
                    <Button
                      variant="secondary"
                      size="small"
                      icon={<FiShare2 />}
                    >
                      Invite
                    </Button>
                    <Button
                      variant="secondary"
                      size="small"
                      icon={<FiSettings />}
                    />
                    <Button
                      variant="primary"
                      size="small"
                      icon={isFullScreen ? <FiMinimize /> : <FiMaximize />}
                      onClick={toggleFullScreen}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Participants Grid */}
          <div className="participants-section">
            <h3>Participants</h3>
            <div className="participants-grid">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className={`participant-card ${participant.isSpeaking ? 'speaking' : ''} ${participant.isHost ? 'host' : ''}`}
                >
                  <div className="participant-avatar">
                    {participant.avatar}
                  </div>
                  <span className="participant-name">{participant.name}</span>
                  {participant.isHost && <span className="host-badge">Host</span>}
                  {participant.isSpeaking && <span className="speaking-indicator">Speaking</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <motion.aside
            className="live-chat"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
          >
            <div className="chat-header">
              <h3>Live Chat</h3>
              <span className="chat-count">{messages.length} messages</span>
            </div>

            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className="chat-message">
                  <span className="message-author">{msg.user}</span>
                  <span className="message-time">{msg.time}</span>
                  <p className="message-text">{msg.text}</p>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form className="chat-input" onSubmit={sendMessage}>
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" variant="primary" size="small">
                <FiMessageSquare />
              </Button>
            </form>
          </motion.aside>
        )}
      </div>
    </div>
  );
};

export default Live;
