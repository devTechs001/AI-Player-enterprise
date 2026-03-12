import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBriefcase, FiUsers, FiZap, FiGlobe } from 'react-icons/fi';
import Button from '@components/common/Button';
import './Careers.scss';

const positions = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    icon: FiZap,
  },
  {
    title: 'Backend Engineer (Video Streaming)',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    icon: FiGlobe,
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    icon: FiUsers,
  },
  {
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    icon: FiBriefcase,
  },
];

const Careers = () => {
  return (
    <div className="careers-page">
      {/* Hero */}
      <section className="careers-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Join Our Team
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Help us build the future of AI-powered video streaming
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <section className="careers-benefits section">
        <div className="container">
          <h2>Why Work With Us</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <FiGlobe />
              <h3>Remote First</h3>
              <p>Work from anywhere in the world with flexible hours</p>
            </div>
            <div className="benefit-card">
              <FiZap />
              <h3>Cutting Edge Tech</h3>
              <p>Work with AI, video streaming, and modern web technologies</p>
            </div>
            <div className="benefit-card">
              <FiUsers />
              <h3>Great Team</h3>
              <p>Collaborate with talented engineers and designers</p>
            </div>
            <div className="benefit-card">
              <FiBriefcase />
              <h3>Competitive Pay</h3>
              <p>Top salary, equity, and comprehensive benefits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="careers-positions section">
        <div className="container">
          <h2>Open Positions</h2>
          <div className="positions-list">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                className="position-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="position-icon">
                  <position.icon />
                </div>
                <div className="position-info">
                  <h3>{position.title}</h3>
                  <div className="position-meta">
                    <span>{position.department}</span>
                    <span>•</span>
                    <span>{position.location}</span>
                    <span>•</span>
                    <span>{position.type}</span>
                  </div>
                </div>
                <Button variant="outline">Apply Now</Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="careers-cta section">
        <div className="container">
          <h2>Don't See Your Role?</h2>
          <p>We're always looking for talented people. Send us your resume!</p>
          <Link to="/contact">
            <Button variant="primary">Get in Touch</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Careers;
