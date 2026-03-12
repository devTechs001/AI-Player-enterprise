import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiHome } from 'react-icons/fi';
import Button from '@components/common/Button';
import '../Subscription.scss';

const Success = () => {
  return (
    <div className="subscription-page success-page">
      <motion.div
        className="success-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="success-icon">
          <FiCheck />
        </div>
        <h1>Subscription Successful!</h1>
        <p>
          Thank you for subscribing. Your premium features are now active.
        </p>
        <div className="success-actions">
          <Link to="/dashboard">
            <Button variant="primary" icon={<FiHome />}>
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/subscription/billing">
            <Button variant="outline">View Billing</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;
