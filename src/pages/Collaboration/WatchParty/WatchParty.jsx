import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUsers,
  FiMessageSquare,
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiShare2,
  FiSettings,
  FiLogOut,
  FiSend,
  FiSmile,
  FiThumbsUp,
  FiHeart,
  FiZap,
} from 'react-icons/fi';
import { useCollaboration } from '@hooks/useCollaboration';
import { useAuth } from '@hooks/useAuth';
import VideoPlayer from '@components/player/VideoPlayer';
import Avatar from '@components/common/Avatar';
import Button from '@components/common/Button';
import styles from './WatchParty.module.scss';

const reactions = [
  { id: 'like', emoji: '👍', icon: FiThumbsUp },
  { id: 'love', emoji: '❤️', icon: FiHeart },
  { id: 'laugh', emoji: '😂', icon: null },
  { id: 'wow', emoji: '😮', icon: null },
  { id: 'sad', emoji: '😢', icon: null },
  { id: 'fire', emoji: '🔥', icon: FiZap },
];

const WatchParty = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const chatEndRef = useRef(null);

  const [message, setMessage] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState([]);

  const {
    room,
    participants,
    messages,
    isHost,
    isSynced,
    joinRoom,
    leaveRoom,
    sendMessage,
    sendReaction,
    syncPlayback,
    toggleSync,
  } = useCollaboration();

  useEffect(() => {
    joinRoom(roomId);
    return () => leaveRoom();
  }, [roomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleReaction = (reaction) => {
    sendReaction(reaction);
    
    // Show floating reaction
    const newReaction = {
      id: Date.now(),
      emoji: reaction.emoji,
      x: Math.random() * 80 + 10,
    };
    setFloatingReactions((prev) => [...prev, newReaction]);
    
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 3000);
  };

  const handleLeave = () => {
    leaveRoom();
    navigate('/collaboration/rooms');
  };

  if (!room) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Joining watch party...</p>
      </div>
    );
  }

  return (
    <div className={styles.watchParty}>
      {/* Video Section */}
      <div className={styles.videoSection}>
        {/* Floating Reactions */}
        <AnimatePresence>
          {floatingReactions.map((reaction) => (
            <motion.div
              key={reaction.id}
              className={styles.floatingReaction}
              style={{ left: `${reaction.x}%` }}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -200 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3 }}
            >
              {reaction.emoji}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Player */}
        <VideoPlayer
          media={room.currentMedia}
          onTimeUpdate={isHost ? syncPlayback : undefined}
          syncedTime={!isHost && isSynced ? room.currentTime : undefined}
        />

        {/* Sync Indicator */}
        <div className={`${styles.syncIndicator} ${isSynced ? styles.synced : ''}`}>
          {isSynced ? 'Synced' : 'Out of Sync'}
          <button onClick={toggleSync}>
            {isSynced ? 'Unsync' : 'Sync Now'}
          </button>
        </div>

        {/* Reactions Bar */}
        <div className={styles.reactionsBar}>
          {reactions.map((reaction) => (
            <button
              key={reaction.id}
              className={styles.reactionBtn}
              onClick={() => handleReaction(reaction)}
            >
              {reaction.emoji}
            </button>
          ))}
        </div>

        {/* Bottom Controls */}
        <div className={styles.bottomControls}>
          <div className={styles.leftControls}>
            <button
              className={`${styles.controlBtn} ${isMicOn ? styles.active : ''}`}
              onClick={() => setIsMicOn(!isMicOn)}
            >
              {isMicOn ? <FiMic /> : <FiMicOff />}
            </button>
            <button
              className={`${styles.controlBtn} ${isCamOn ? styles.active : ''}`}
              onClick={() => setIsCamOn(!isCamOn)}
            >
              {isCamOn ? <FiVideo /> : <FiVideoOff />}
            </button>
          </div>

          <div className={styles.centerInfo}>
            <span className={styles.roomName}>{room.name}</span>
            <span className={styles.viewerCount}>
              <FiUsers /> {participants.length} watching
            </span>
          </div>

          <div className={styles.rightControls}>
            <button
              className={styles.controlBtn}
              onClick={() => setShowParticipants(!showParticipants)}
            >
              <FiUsers />
            </button>
            <button
              className={styles.controlBtn}
              onClick={() => setShowChat(!showChat)}
            >
              <FiMessageSquare />
            </button>
            <button className={styles.controlBtn}>
              <FiShare2 />
            </button>
            <button className={`${styles.controlBtn} ${styles.leave}`} onClick={handleLeave}>
              <FiLogOut />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(showChat || showParticipants) && (
          <motion.div
            className={styles.sidebar}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 350, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
          >
            {/* Sidebar Tabs */}
            <div className={styles.sidebarTabs}>
              <button
                className={showChat ? styles.active : ''}
                onClick={() => {
                  setShowChat(true);
                  setShowParticipants(false);
                }}
              >
                <FiMessageSquare />
                Chat
              </button>
              <button
                className={showParticipants ? styles.active : ''}
                onClick={() => {
                  setShowParticipants(true);
                  setShowChat(false);
                }}
              >
                <FiUsers />
                Participants ({participants.length})
              </button>
            </div>

            {/* Chat Section */}
            {showChat && (
              <div className={styles.chatSection}>
                <div className={styles.messages}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`${styles.message} ${
                        msg.userId === user.id ? styles.own : ''
                      }`}
                    >
                      <Avatar
                        src={msg.userAvatar}
                        name={msg.userName}
                        size="sm"
                      />
                      <div className={styles.messageContent}>
                        <span className={styles.messageName}>{msg.userName}</span>
                        <p>{msg.content}</p>
                        <span className={styles.messageTime}>
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <form className={styles.chatInput} onSubmit={handleSendMessage}>
                  <button type="button" className={styles.emojiBtn}>
                    <FiSmile />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button type="submit" disabled={!message.trim()}>
                    <FiSend />
                  </button>
                </form>
              </div>
            )}

            {/* Participants Section */}
            {showParticipants && (
              <div className={styles.participantsSection}>
                <div className={styles.participantsList}>
                  {participants.map((participant) => (
                    <div key={participant.id} className={styles.participant}>
                      <Avatar
                        src={participant.avatar}
                        name={participant.name}
                        size="md"
                      />
                      <div className={styles.participantInfo}>
                        <span className={styles.participantName}>
                          {participant.name}
                          {participant.id === room.hostId && (
                            <span className={styles.hostBadge}>Host</span>
                          )}
                        </span>
                        <span className={styles.participantStatus}>
                          {participant.isMuted ? (
                            <FiMicOff className={styles.muted} />
                          ) : (
                            <FiMic />
                          )}
                          {participant.hasCamera ? (
                            <FiVideo />
                          ) : (
                            <FiVideoOff className={styles.muted} />
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Invite Button */}
                <div className={styles.inviteSection}>
                  <Button variant="secondary" fullWidth icon={<FiShare2 />}>
                    Invite Friends
                  </Button>
                  <p className={styles.inviteCode}>
                    Room Code: <strong>{room.code}</strong>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WatchParty;