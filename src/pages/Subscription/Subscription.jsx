import { motion } from 'framer-motion';
import { FiPackage, FiCreditCard, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '@components/common/Button';
import './Subscription.scss';

const Subscription = () => {
  return (
    <div className="subscription-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Subscription</h1>
        <p>Manage your subscription and billing</p>
      </motion.div>

      <motion.div
        className="checkout-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1>Choose Your Plan</h1>
        <p>Select the perfect plan for your needs</p>
      </motion.div>

      <div className="plans-grid">
        {/* Free Plan */}
        <div className="plan-card">
          <div className="plan-icon">
            <FiPackage />
          </div>
          <h3>Free</h3>
          <p className="plan-price">$0<span>/forever</span></p>
          <p className="plan-description">Perfect for trying out the platform</p>
          <ul className="plan-features">
            <li><FiCheck /> Up to 3 downloads/day</li>
            <li><FiCheck /> 720p video quality</li>
            <li><FiCheck /> Basic player features</li>
          </ul>
          <Link to="/register">
            <Button variant="outline" size="large">Get Started</Button>
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="plan-card featured">
          <div className="popular-badge">Most Popular</div>
          <div className="plan-icon">
            <FiCreditCard />
          </div>
          <h3>Pro</h3>
          <p className="plan-price">$19.99<span>/month</span></p>
          <p className="plan-description">Best for power users</p>
          <ul className="plan-features">
            <li><FiCheck /> Unlimited downloads</li>
            <li><FiCheck /> 4K Ultra HD quality</li>
            <li><FiCheck /> Advanced AI features</li>
            <li><FiCheck /> Priority support</li>
          </ul>
          <Link to="/register">
            <Button variant="primary" size="large">Start Free Trial</Button>
          </Link>
        </div>

        {/* Enterprise Plan */}
        <div className="plan-card">
          <div className="plan-icon">
            <FiCreditCard />
          </div>
          <h3>Enterprise</h3>
          <p className="plan-price">$49.99<span>/month</span></p>
          <p className="plan-description">For teams and businesses</p>
          <ul className="plan-features">
            <li><FiCheck /> Everything in Pro</li>
            <li><FiCheck /> API access</li>
            <li><FiCheck /> Custom integrations</li>
            <li><FiCheck /> Dedicated support</li>
          </ul>
          <Link to="/contact">
            <Button variant="outline" size="large">Contact Sales</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
