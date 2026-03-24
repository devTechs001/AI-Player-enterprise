import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiPlus, FiLock, FiGlobe, FiPlayCircle } from 'react-icons/fi';
import Button from '@components/common/Button';
import styles from './Rooms.module.scss';

const Rooms = () => {
  const activeRooms = [
    {
      id: 'room-1',
      title: 'Global Movie Night: Interstellar',
      host: 'Alice',
      hostAvatar: 'https://i.pravatar.cc/150?u=alice',
      participants: 124,
      isPrivate: false,
      status: 'Live',
      thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'room-2',
      title: 'Anime Weekly Catch-up',
      host: 'Bob',
      hostAvatar: 'https://i.pravatar.cc/150?u=bob',
      participants: 45,
      isPrivate: true,
      status: 'Waiting',
      thumbnail: 'https://images.unsplash.com/photo-1578632738980-43318b5c9476?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'room-3',
      title: 'Tech Documentary Marathon',
      host: 'Charlie',
      hostAvatar: 'https://i.pravatar.cc/150?u=charlie',
      participants: 89,
      isPrivate: false,
      status: 'Live',
      thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className={styles.roomsPage}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Collaboration Rooms
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Watch videos together with friends and community in real-time.
          </motion.p>
        </div>
        <Button variant="primary" icon={<FiPlus />}>
          Create Room
        </Button>
      </header>

      <div className={styles.roomsGrid}>
        {activeRooms.map((room, index) => (
          <motion.div
            key={room.id}
            className={styles.roomCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={styles.thumbnail}>
              <img src={room.thumbnail} alt={room.title} />
              <div className={styles.statusBadge}>
                {room.status === 'Live' && <span className={styles.pulse} />}
                {room.status}
              </div>
              <div className={styles.participantCount}>
                <FiUsers /> {room.participants}
              </div>
            </div>
            <div className={styles.content}>
              <h3>{room.title}</h3>
              <div className={styles.hostInfo}>
                <img src={room.hostAvatar} alt={room.host} />
                <span>Hosted by <strong>{room.host}</strong></span>
              </div>
              <div className={styles.footer}>
                <div className="flex items-center gap-2 text-sm text-secondary">
                  {room.isPrivate ? <FiLock /> : <FiGlobe />}
                  {room.isPrivate ? 'Private' : 'Public'}
                </div>
                <Button variant="secondary" size="sm" icon={<FiPlayCircle />}>
                  Join Room
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {activeRooms.length === 0 && (
        <motion.div
          className="flex flex-col items-center justify-center py-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mb-6 text-primary text-4xl">
            <FiUsers />
          </div>
          <h2 className="text-2xl font-bold mb-2">No active rooms</h2>
          <p className="text-secondary mb-8">Create a room to start watching with friends!</p>
          <Button variant="primary" size="lg" icon={<FiPlus />}>
            Create New Room
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Rooms;
