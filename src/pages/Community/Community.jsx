import { motion } from 'framer-motion';
import { FiUsers, FiMessageSquare, FiHeart, FiZap } from 'react-icons/fi';
import './Community.scss';

const Community = () => {
  return (
    <div className="community-page">
      {/* Hero */}
      <section className="community-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Community
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Connect with other users, share tips, and get help
          </motion.p>
          <motion.div
            className="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat">
              <FiUsers />
              <span>50K+</span>
              <p>Members</p>
            </div>
            <div className="stat">
              <FiMessageSquare />
              <span>10K+</span>
              <p>Discussions</p>
            </div>
            <div className="stat">
              <FiHeart />
              <span>100K+</span>
              <p>Solutions</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="community-features section">
        <div className="container">
          <h2>What You Can Do</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FiMessageSquare />
              <h3>Discussions</h3>
              <p>Join conversations about features, tips, and best practices</p>
            </div>
            <div className="feature-card">
              <FiUsers />
              <h3>Groups</h3>
              <p>Find users with similar interests and use cases</p>
            </div>
            <div className="feature-card">
              <FiZap />
              <h3>Events</h3>
              <p>Participate in webinars, AMAs, and community meetups</p>
            </div>
            <div className="feature-card">
              <FiHeart />
              <h3>Support</h3>
              <p>Get help from experienced community members</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="community-cta section">
        <div className="container">
          <div className="cta-card">
            <h2>Join Our Discord</h2>
            <p>Real-time chat with the community and our team</p>
            <a href="#" className="discord-btn">
              Join Discord Server
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
