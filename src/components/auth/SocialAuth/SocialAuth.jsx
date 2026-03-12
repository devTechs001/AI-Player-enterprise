import { FiGithub, FiGlobe } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import './SocialAuth.scss';

const SocialAuth = () => {
  return (
    <div className="social-auth">
      <button className="social-btn google">
        <FaGoogle />
        <span>Continue with Google</span>
      </button>
      <button className="social-btn github">
        <FiGithub />
        <span>Continue with GitHub</span>
      </button>
    </div>
  );
};

export default SocialAuth;
