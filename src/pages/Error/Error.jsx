import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';
import Button from '@components/common/Button';
import './Error.scss';

const Error = () => {
  return (
    <div className="error-page">
      <motion.div
        className="error-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="error-icon">
          <FiAlertTriangle />
        </div>
        <h1>Something Went Wrong</h1>
        <p>
          We encountered an error while processing your request.
          Please try again later.
        </p>
        <Link to="/">
          <Button variant="primary" icon={<FiHome />}>
            Go Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Error;
