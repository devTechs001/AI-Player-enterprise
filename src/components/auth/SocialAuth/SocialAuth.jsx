import { FiGithub, FiGlobe, FiMail } from 'react-icons/fi';
import { FaGoogle, FaFacebookF, FaTwitter, FaDiscord } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '@services/auth.service';
import './SocialAuth.scss';

const SOCIAL_PROVIDERS = {
  google: {
    name: 'Google',
    icon: FaGoogle,
    color: '#DB4437',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: 'openid email profile',
  },
  github: {
    name: 'GitHub',
    icon: FiGithub,
    color: '#333',
    authUrl: 'https://github.com/login/oauth/authorize',
    scope: 'user:email',
  },
  facebook: {
    name: 'Facebook',
    icon: FaFacebookF,
    color: '#4267B2',
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    scope: 'email,public_profile',
  },
  twitter: {
    name: 'Twitter',
    icon: FaTwitter,
    color: '#1DA1F2',
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    scope: 'tweet.read users.read',
  },
  discord: {
    name: 'Discord',
    icon: FaDiscord,
    color: '#5865F2',
    authUrl: 'https://discord.com/api/oauth2/authorize',
    scope: 'identify email',
  },
};

const SocialAuth = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSocialLogin = async (provider) => {
    const config = SOCIAL_PROVIDERS[provider];
    if (!config) return;

    try {
      toast.loading(`Connecting to ${config.name}...`, { id: `social-${provider}` });
      
      // Use demo social login (replace with real OAuth in production)
      await new Promise(resolve => setTimeout(resolve, 1000));
      const result = await authService.demoSocialLogin(provider);
      
      if (result.success) {
        toast.success(`Welcome back, ${result.user.name}!`, { id: `social-${provider}` });
        
        if (onLogin) {
          onLogin(result.user);
        } else {
          navigate('/dashboard');
        }
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      toast.error(`Failed to sign in with ${config.name}`, { id: `social-${provider}` });
      console.error('Social login error:', error);
    }
  };

  // Open OAuth popup for production implementation
  const openOAuthPopup = (provider) => {
    const config = SOCIAL_PROVIDERS[provider];
    const clientId = import.meta.env.VITE_${provider.toUpperCase()}_CLIENT_ID;
    
    if (!clientId) {
      // Fall back to demo mode
      handleSocialLogin(provider);
      return;
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: window.location.origin + '/auth/callback',
      response_type: 'code',
      scope: config.scope,
      state: btoa(JSON.stringify({ provider, timestamp: Date.now() })),
    });

    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      `${config.authUrl}?${params.toString()}`,
      `${provider}-oauth`,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Listen for popup message
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'oauth-success') {
        window.removeEventListener('message', handleMessage);
        handleSocialLogin(provider);
      } else if (event.data.type === 'oauth-error') {
        window.removeEventListener('message', handleMessage);
        toast.error(`Authentication failed: ${event.data.error}`);
      }
    };

    window.addEventListener('message', handleMessage);

    // Check if popup was closed
    const checkClosed = setInterval(() => {
      if (popup && popup.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', handleMessage);
      }
    }, 500);
  };

  return (
    <div className="social-auth">
      <div className="social-divider">
        <span>Or continue with</span>
      </div>
      
      <div className="social-buttons">
        <button 
          className="social-btn google" 
          onClick={() => openOAuthPopup('google')}
          type="button"
        >
          <FaGoogle />
          <span>Google</span>
        </button>
        
        <button 
          className="social-btn github" 
          onClick={() => openOAuthPopup('github')}
          type="button"
        >
          <FiGithub />
          <span>GitHub</span>
        </button>
      </div>

      <div className="social-buttons-secondary">
        <button 
          className="social-btn facebook" 
          onClick={() => openOAuthPopup('facebook')}
          type="button"
          aria-label="Continue with Facebook"
        >
          <FaFacebookF />
        </button>
        
        <button 
          className="social-btn twitter" 
          onClick={() => openOAuthPopup('twitter')}
          type="button"
          aria-label="Continue with Twitter"
        >
          <FaTwitter />
        </button>
        
        <button 
          className="social-btn discord" 
          onClick={() => openOAuthPopup('discord')}
          type="button"
          aria-label="Continue with Discord"
        >
          <FaDiscord />
        </button>
      </div>

      <p className="social-disclaimer">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default SocialAuth;
