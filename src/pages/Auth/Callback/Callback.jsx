import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiLoader } from 'react-icons/fi';
import { authService } from '@services/auth.service';
import toast from 'react-hot-toast';
import './Callback.scss';

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const errorParam = searchParams.get('error');

      // Check for OAuth error
      if (errorParam) {
        setStatus('error');
        setError(errorParam);
        toast.error('Authentication failed');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      // Handle OAuth success (from popup message)
      if (window.opener) {
        // We're in a popup window
        try {
          const stateData = state ? JSON.parse(atob(state)) : { provider: 'unknown' };
          
          // Send success message to opener
          window.opener.postMessage({
            type: 'oauth-success',
            provider: stateData.provider,
          }, window.location.origin);
          
          setStatus('success');
          setTimeout(() => window.close(), 1000);
          return;
        } catch (err) {
          console.error('Error sending message to opener:', err);
        }
      }

      // Direct callback (not from popup)
      if (code) {
        try {
          const stateData = state ? JSON.parse(atob(state)) : { provider: 'unknown' };
          
          // Exchange code for tokens
          const result = await authService.socialLoginWithCode(stateData.provider, code);
          
          if (result.success) {
            setStatus('success');
            toast.success('Successfully signed in!');
            setTimeout(() => navigate('/dashboard'), 2000);
          } else {
            throw new Error('Login failed');
          }
        } catch (err) {
          console.error('Social login error:', err);
          setStatus('error');
          setError(err.message);
          toast.error('Authentication failed');
          setTimeout(() => navigate('/login'), 3000);
        }
      } else {
        // No code, redirect to login
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="callback-page">
      <motion.div
        className="callback-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {status === 'processing' && (
          <>
            <div className="callback-icon processing">
              <FiLoader className="spin" />
            </div>
            <h2>Completing sign in...</h2>
            <p>Please wait while we complete your authentication</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="callback-icon success">
              <FiCheck />
            </div>
            <h2>Successfully signed in!</h2>
            <p>Redirecting you to your dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="callback-icon error">
              <FiX />
            </div>
            <h2>Authentication failed</h2>
            <p>{error || 'Something went wrong'}</p>
            <p className="redirect-note">Redirecting to login...</p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Callback;
