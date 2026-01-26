import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaApple } from 'react-icons/fa';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Logo from '@components/common/Logo';
import styles from './Login.module.scss';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { login, socialLogin, startGuestSession } = useAuth();

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    const result = await login(data);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');

    // In real implementation, this would open OAuth popup
    const result = await socialLogin(provider, 'mock-token');

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const handleGuestMode = () => {
    startGuestSession();
    navigate('/');
  };

  return (
    <div className={styles.login}>
      {/* Left Side - Form */}
      <motion.div
        className={styles.formSection}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.formContainer}>
          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>

          <div className={styles.header}>
            <h1>Welcome Back</h1>
            <p>Sign in to continue to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className={styles.error}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FiAlertCircle />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Social Login */}
          <div className={styles.socialLogin}>
            <button
              type="button"
              className={styles.socialBtn}
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
            >
              <FcGoogle />
              <span>Google</span>
            </button>
            <button
              type="button"
              className={styles.socialBtn}
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading}
            >
              <FaGithub />
              <span>GitHub</span>
            </button>
            <button
              type="button"
              className={styles.socialBtn}
              onClick={() => handleSocialLogin('apple')}
              disabled={isLoading}
            >
              <FaApple />
              <span>Apple</span>
            </button>
          </div>

          <div className={styles.divider}>
            <span>or continue with email</span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputWrapper}>
                <FiMail className={styles.inputIcon} />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className={errors.email ? styles.inputError : ''}
                />
              </div>
              {errors.email && (
                <span className={styles.errorText}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className={styles.forgotLink}>
                  Forgot password?
                </Link>
              </div>
              <div className={styles.inputWrapper}>
                <FiLock className={styles.inputIcon} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password')}
                  className={errors.password ? styles.inputError : ''}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <span className={styles.errorText}>{errors.password.message}</span>
              )}
            </div>

            <div className={styles.rememberRow}>
              <label className={styles.checkbox}>
                <input type="checkbox" {...register('remember')} />
                <span className={styles.checkmark} />
                <span>Remember me</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              isLoading={isLoading}
              icon={<FiArrowRight />}
            >
              Sign In
            </Button>
          </form>

          <div className={styles.footer}>
            <p>
              Don't have an account?{' '}
              <Link to="/register">Sign up for free</Link>
            </p>
            <button
              type="button"
              className={styles.guestLink}
              onClick={handleGuestMode}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Visual */}
      <motion.div
        className={styles.visualSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className={styles.visualContent}>
          <div className={styles.gradientBg} />
          <div className={styles.floatingCards}>
            <motion.div
              className={styles.floatingCard}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <img src="/assets/images/feature-ai.png" alt="AI Features" />
            </motion.div>
            <motion.div
              className={`${styles.floatingCard} ${styles.card2}`}
              animate={{
                y: [0, 20, 0],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            >
              <img src="/assets/images/feature-download.png" alt="Downloads" />
            </motion.div>
          </div>

          <div className={styles.textContent}>
            <h2>Stream & Download with AI Power</h2>
            <p>
              Join millions of users enjoying the most advanced video player
              with AI-powered features and universal downloads.
            </p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.check}>✓</span>
                <span>AI Video Enhancement</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.check}>✓</span>
                <span>50+ Download Formats</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.check}>✓</span>
                <span>Watch Together</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;