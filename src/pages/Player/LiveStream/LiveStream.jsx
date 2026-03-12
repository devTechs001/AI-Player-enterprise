import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiUsers, FiMessageSquare, FiHeart, FiShare2,
  FiMic, FiMicOff, FiCamera, FiCameraOff
} from 'react-icons/fi';
import Button from '@components/common/Button';
import '../Player.scss';

const LiveStream = () => {
  const { id } = useParams();
  const [viewers, setViewers] = useState(1234);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="live-stream-page">
      <motion.div
        className="live-stream-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="live-video-wrapper">
          <div className="live-indicator">
            <span className="live-dot" />
            LIVE
          </div>
          <div className="viewer-count">
            <FiUsers />
            <span>{viewers.toLocaleString()} watching</span>
          </div>
          <div className="video-placeholder">
            <span>📹</span>
            <p>Live Stream</p>
          </div>
        </div>

        <div className="stream-controls">
          <div className="control-group">
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
          </div>
          <div className="control-group">
            <Button variant="ghost" icon={<FiHeart />} />
            <Button variant="ghost" icon={<FiShare2 />} />
          </div>
        </div>

        <div className="chat-section">
          <div className="chat-header">
            <FiMessageSquare />
            <span>Live Chat</span>
          </div>
          <div className="chat-messages">
            <p className="chat-message">
              <span className="username">User1:</span>
              Great stream! 🔥
            </p>
            <p className="chat-message">
              <span className="username">User2:</span>
              Love this content!
            </p>
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Send a message..." />
            <Button variant="primary" size="small">Send</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveStream;
