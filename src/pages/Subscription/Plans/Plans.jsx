import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiCheck, FiX, FiZap, FiShield, FiGlobe, FiHeart,
  FiStar, FiAward, FiArrowRight
} from 'react-icons/fi';
import Button from '@components/common/Button';
import './Plans.scss';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for trying out the platform',
    icon: FiZap,
    color: '#64748b',
    features: [
      { text: 'Up to 3 downloads/day', included: true },
      { text: '720p video quality', included: true },
      { text: 'Basic player features', included: true },
      { text: 'Limited AI features', included: true },
      { text: 'Ads supported', included: false },
      { text: '1080p quality', included: false },
      { text: 'Offline downloads', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    period: 'month',
    description: 'Great for casual users',
    icon: FiShield,
    color: '#3b82f6',
    features: [
      { text: 'Unlimited downloads', included: true },
      { text: '1080p video quality', included: true },
      { text: 'Ad-free experience', included: true },
      { text: 'Basic AI features', included: true },
      { text: 'Offline mode', included: true },
      { text: '4K quality', included: false },
      { text: 'Advanced AI tools', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    period: 'month',
    description: 'Best for power users',
    icon: FiStar,
    color: '#8b5cf6',
    features: [
      { text: 'Everything in Basic', included: true },
      { text: '4K Ultra HD quality', included: true },
      { text: 'Advanced AI features', included: true },
      { text: 'Auto-subtitles', included: true },
      { text: 'Video enhancement', included: true },
      { text: 'Batch downloads', included: true },
      { text: 'Priority support', included: true },
      { text: 'API access', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49.99,
    period: 'month',
    description: 'For teams and businesses',
    icon: FiAward,
    color: '#f59e0b',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: '8K quality support', included: true },
      { text: 'Full API access', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Team management', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'SLA guarantee', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const Plans = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  return (
    <div className="plans-page">
      <div className="plans-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Choose Your Plan</h1>
          <p>Select the perfect plan for your needs</p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          className="billing-toggle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className={billingPeriod === 'monthly' ? 'active' : ''}>Monthly</span>
          <button
            className="toggle-switch"
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
          >
            <span className="toggle-ball" />
          </button>
          <span className={billingPeriod === 'yearly' ? 'active' : ''}>
            Yearly <span className="save-badge">Save 20%</span>
          </span>
        </motion.div>
      </div>

      {/* Plans Grid */}
      <div className="plans-grid">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            className={`plan-card ${plan.popular ? 'popular' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {plan.popular && (
              <div className="popular-badge">
                <FiStar />
                <span>Most Popular</span>
              </div>
            )}

            <div className="plan-header">
              <div className="plan-icon" style={{ background: `rgba(${hexToRgb(plan.color)}, 0.2)`, color: plan.color }}>
                <plan.icon />
              </div>
              <h2>{plan.name}</h2>
              <p className="plan-description">{plan.description}</p>
            </div>

            <div className="plan-pricing">
              <span className="currency">$</span>
              <span className="price">{billingPeriod === 'yearly' ? (plan.price * 0.8).toFixed(2) : plan.price}</span>
              <span className="period">/{plan.period}</span>
            </div>

            {billingPeriod === 'yearly' && plan.price > 0 && (
              <div className="yearly-savings">
                Save ${(plan.price * 12 * 0.2).toFixed(2)}/year
              </div>
            )}

            <ul className="plan-features">
              {plan.features.map((feature, idx) => (
                <li key={idx} className={feature.included ? 'included' : 'not-included'}>
                  {feature.included ? <FiCheck /> : <FiX />}
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            <Link to={plan.price === 0 ? '/register' : `/subscription/checkout/${plan.id}`}>
              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                size="large"
                icon={<FiArrowRight />}
                className="plan-cta"
              >
                {plan.cta}
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <motion.section
        className="plans-faq"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>Can I cancel anytime?</h3>
            <p>Yes, you can cancel your subscription at any time. Your account will remain active until the end of your billing period.</p>
          </div>
          <div className="faq-item">
            <h3>Is there a free trial?</h3>
            <p>Yes! All paid plans come with a 14-day free trial. No credit card required to start.</p>
          </div>
          <div className="faq-item">
            <h3>Can I upgrade or downgrade?</h3>
            <p>Absolutely! You can change your plan at any time from your account settings.</p>
          </div>
          <div className="faq-item">
            <h3>What payment methods do you accept?</h3>
            <p>We accept all major credit cards, PayPal, and cryptocurrency payments.</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

// Helper function
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '100, 100, 100';
}

export default Plans;
