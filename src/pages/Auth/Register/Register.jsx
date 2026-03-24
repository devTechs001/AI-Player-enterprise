import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
  FiCheck,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaApple } from 'react-icons/fa';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Logo from '@components/common/Logo';
import styles from './Register.module.scss';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { register: registerUser, socialLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    const result = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      navigate('/dashboard');
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
      navigate('/dashboard');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: 'Very Weak', color: 'var(--color-error)' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: 'Very Weak', color: 'var(--color-error)' },
      { strength: 1, label: 'Weak', color: 'var(--color-error)' },
      { strength: 2, label: 'Fair', color: 'var(--color-warning)' },
      { strength: 3, label: 'Good', color: 'var(--color-warning)' },
      { strength: 4, label: 'Strong', color: 'var(--color-success)' },
      { strength: 5, label: 'Very Strong', color: 'var(--color-success)' },
      { strength: 6, label: 'Excellent', color: 'var(--color-success)' },
    ];

    return levels[Math.min(strength, 5)];
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className={styles.register}>
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
            <h1>Create Account</h1>
            <p>Join millions of users enjoying the ultimate video experience</p>
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

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <div className={styles.inputWrapper}>
                <FiUser className={styles.inputIcon} />
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  {...register('name')}
                  className={errors.name ? styles.inputError : ''}
                />
              </div>
              {errors.name && (
                <span className={styles.errorText}>{errors.name.message}</span>
              )}
            </div>

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
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <FiLock className={styles.inputIcon} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
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
              
              {/* Password Strength Indicator */}
              {password && (
                <div className={styles.passwordStrength}>
                  <div className={styles.strengthBar}>
                    <div 
                      className={styles.strengthFill}
                      style={{ 
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                        backgroundColor: passwordStrength.color 
                      }}
                    />
                  </div>
                  <span className={styles.strengthText} style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={styles.inputWrapper}>
                <FiLock className={styles.inputIcon} />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  {...register('confirmPassword')}
                  className={errors.confirmPassword ? styles.inputError : ''}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className={styles.errorText}>{errors.confirmPassword.message}</span>
              )}
            </div>

            <div className={styles.termsRow}>
              <label className={styles.checkbox}>
                <input type="checkbox" {...register('agreeToTerms')} />
                <span className={styles.checkmark} />
                <span>
                  I agree to the{' '}
                  <Link to="/legal/terms" className={styles.termsLink}>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/legal/privacy" className={styles.termsLink}>
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>
            {errors.agreeToTerms && (
              <span className={styles.errorText}>{errors.agreeToTerms.message}</span>
            )}

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              isLoading={isLoading}
              icon={<FiArrowRight />}
            >
              Create Account
            </Button>
          </form>

          <div className={styles.footer}>
            <p>
              Already have an account?{' '}
              <Link to="/login">Sign in</Link>
            </p>
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
              <img src="/assets/images/feature-collaboration.png" alt="Collaboration" />
            </motion.div>
          </div>

          <div className={styles.textContent}>
            <h2>Start Your Video Journey</h2>
            <p>
              Create your free account and unlock AI-powered features, 
              unlimited downloads, and seamless collaboration.
            </p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.check}>✓</span>
                <span>Free Forever Plan</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.check}>✓</span>
                <span>No Credit Card Required</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.check}>✓</span>
                <span>Instant Access</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.check}>✓</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
