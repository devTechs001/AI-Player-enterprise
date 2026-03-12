import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiArrowLeft } from 'react-icons/fi';
import Button from '@components/common/Button';
import './Unauthorized.scss';

const Unauthorized = () => {
  return (
    <div className="unauthorized-page">
      <motion.div
        className="content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="icon">
          <FiLock />
        </div>
        <h1>Access Denied</h1>
        <p>
          You don't have permission to access this page.
          Please contact your administrator if you believe this is an error.
        </p>
        <div className="actions">
          <Link to="/dashboard">
            <Button variant="primary" icon={<FiArrowLeft />}>
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
