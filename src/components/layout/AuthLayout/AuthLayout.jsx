import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiZap, FiGlobe } from 'react-icons/fi';
import Logo from '@components/common/Logo';
import './AuthLayout.scss';

const features = [
  { icon: FiZap, text: 'AI-Powered Experience' },
  { icon: FiShield, text: 'Secure & Private' },
  { icon: FiGlobe, text: 'Universal Platform' },
];

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      {/* Left Side - Form */}
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <Link to="/" className="auth-logo">
            <Logo size="large" />
          </Link>
          <Outlet />
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="auth-brand-container">
        <div className="auth-brand-content">
          <motion.div
            className="auth-brand-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>The Ultimate AI Video Player</h1>
            <p>
              Experience next-generation video streaming with AI enhancements,
              universal downloads, and seamless collaboration.
            </p>
          </motion.div>

          <motion.div
            className="auth-features"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                className="auth-feature"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div className="auth-feature-icon">
                  <feature.icon />
                </div>
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="auth-brand-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p>Join millions of users enjoying the best video experience</p>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="auth-brand-bg">
          <div className="gradient-orb gradient-orb-1" />
          <div className="gradient-orb gradient-orb-2" />
          <div className="gradient-orb gradient-orb-3" />
          <div className="grid-overlay" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
