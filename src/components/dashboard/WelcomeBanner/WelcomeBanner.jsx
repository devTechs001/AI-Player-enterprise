import { motion } from 'framer-motion';
import { FiZap } from 'react-icons/fi';
import './WelcomeBanner.scss';

const WelcomeBanner = ({ user, subscription }) => {
  return (
    <motion.div
      className="welcome-banner"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="welcome-content">
        <div className="welcome-text">
          <h1 className="welcome-title">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="welcome-subtitle">
            {subscription?.plan ? (
              <>
                <FiZap className="plan-icon" />
                Your {subscription.plan} plan gives you access to all premium features.
              </>
            ) : (
              'Upgrade to Pro for unlimited downloads and 4K quality.'
            )}
          </p>
        </div>
        {subscription?.plan === 'free' && (
          <a href="/subscription/plans" className="upgrade-button">
            Upgrade Now
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;
