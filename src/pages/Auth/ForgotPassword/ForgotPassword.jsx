import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import Button from '@components/common/Button';
import '../Auth.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="auth-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="auth-form">
          <div className="auth-header">
            <h1>Check Your Email</h1>
            <p>
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
          </div>
          <Link to="/auth/login">
            <Button variant="outline" icon={<FiArrowLeft />}>
              Back to Login
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="auth-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="auth-form">
        <div className="auth-header">
          <h1>Forgot Password?</h1>
          <p>No worries! Enter your email and we'll send reset instructions.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form-fields">
          <div className="input-group">
            <FiMail />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" variant="primary" size="large" loading={loading}>
            Send Reset Link
          </Button>
        </form>

        <p className="auth-footer">
          Remember your password? <Link to="/auth/login">Sign in</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
