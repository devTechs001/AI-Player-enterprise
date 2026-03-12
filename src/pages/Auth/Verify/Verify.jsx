import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiCheck } from 'react-icons/fi';
import Button from '@components/common/Button';
import '../Auth.scss';

const Verify = () => {
  return (
    <motion.div
      className="auth-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="auth-form">
        <div className="auth-header">
          <div className="verify-icon">
            <FiMail />
          </div>
          <h1>Verify Your Email</h1>
          <p>
            We've sent a verification link to your email address.
            Please click the link to verify your account.
          </p>
        </div>

        <div className="verify-info">
          <div className="info-item">
            <FiCheck />
            <span>Check your inbox and spam folder</span>
          </div>
          <div className="info-item">
            <FiCheck />
            <span>Click the verification link</span>
          </div>
          <div className="info-item">
            <FiCheck />
            <span>Start enjoying AI Video Player!</span>
          </div>
        </div>

        <Button variant="primary" size="large">
          Resend Verification Email
        </Button>

        <p className="auth-footer">
          Already verified? <Link to="/auth/login">Sign in</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Verify;
