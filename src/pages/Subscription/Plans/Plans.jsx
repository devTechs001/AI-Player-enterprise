import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiCheck,
  FiX,
  FiZap,
  FiStar,
  FiAward,
  FiArrowRight,
} from 'react-icons/fi';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/common/Button';
import Switch from '@components/common/Switch';
import styles from './Plans.module.scss';

const plans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for casual users',
    icon: FiStar,
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: '#71717a',
    features: [
      { name: '720p Video Quality', included: true },
      { name: '3 Downloads/day', included: true },
      { name: 'Basic AI Features', included: true },
      { name: 'Standard Formats (MP4, MP3)', included: true },
      { name: '5GB Storage', included: true },
      { name: 'Ads Supported', included: true },
      { name: '4K/8K Quality', included: false },
      { name: 'Watch Party', included: false },
      { name: 'Priority Support', included: false },
      { name: 'Advanced AI', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For power users & creators',
    icon: FiZap,
    monthlyPrice: 9.99,
    yearlyPrice: 99.99,
    popular: true,
    color: '#3b82f6',
    features: [
      { name: '4K Video Quality', included: true },
      { name: 'Unlimited Downloads', included: true },
      { name: 'Advanced AI Features', included: true },
      { name: 'All Formats (50+)', included: true },
      { name: '100GB Storage', included: true },
      { name: 'Ad-Free Experience', included: true },
      { name: '8K Quality', included: false },
      { name: 'Watch Party (5 users)', included: true },
      { name: 'Email Support', included: true },
      { name: 'Batch Downloads', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For teams & businesses',
    icon: FiAward,
    monthlyPrice: 29.99,
    yearlyPrice: 299.99,
    color: '#8b5cf6',
    features: [
      { name: '8K Video Quality', included: true },
      { name: 'Unlimited Everything', included: true },
      { name: 'Full AI Suite', included: true },
      { name: 'All Formats + Custom', included: true },
      { name: 'Unlimited Storage', included: true },
      { name: 'Ad-Free + White Label', included: true },
      { name: 'Watch Party (Unlimited)', included: true },
      { name: 'Priority 24/7 Support', included: true },
      { name: 'API Access', included: true },
      { name: 'Custom Integrations', included: true },
    ],
  },
];

const Plans = () => {
  const [isYearly, setIsYearly] = useState(true);
  const { isAuthenticated, subscription } = useAuth();
  const navigate = useNavigate();

  const handleSelectPlan = (planId) => {
    if (!isAuthenticated) {
      navigate('/register', { state: { selectedPlan: planId } });
      return;
    }

    if (planId === 'free') {
      // Handle downgrade or stay on free
      return;
    }

    navigate(`/subscription/checkout/${planId}?billing=${isYearly ? 'yearly' : 'monthly'}`);
  };

  const getButtonText = (plan) => {
    if (!isAuthenticated) return 'Get Started';
    if (subscription?.plan === plan.id) return 'Current Plan';
    if (plan.id === 'free') return 'Downgrade';
    return 'Upgrade';
  };

  const isCurrentPlan = (planId) => subscription?.plan === planId;

  return (
    <div className={styles.plans}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Choose Your Plan</h1>
        <p>
          Select the perfect plan for your needs. Upgrade or downgrade anytime.
        </p>

        {/* Billing Toggle */}
        <div className={styles.billingToggle}>
          <span className={!isYearly ? styles.active : ''}>Monthly</span>
          <Switch
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
          />
          <span className={isYearly ? styles.active : ''}>
            Yearly
            <span className={styles.saveBadge}>Save 20%</span>
          </span>
        </div>
      </motion.div>

      {/* Plans Grid */}
      <div className={styles.plansGrid}>
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            className={`${styles.planCard} ${plan.popular ? styles.popular : ''} ${
              isCurrentPlan(plan.id) ? styles.current : ''
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ '--plan-color': plan.color }}
          >
            {plan.popular && (
              <div className={styles.popularBadge}>Most Popular</div>
            )}

            {isCurrentPlan(plan.id) && (
              <div className={styles.currentBadge}>Current Plan</div>
            )}

            <div className={styles.planHeader}>
              <div className={styles.planIcon}>
                <plan.icon />
              </div>
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
            </div>

            <div className={styles.pricing}>
              <span className={styles.currency}>$</span>
              <span className={styles.amount}>
                {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              {plan.monthlyPrice > 0 && (
                <span className={styles.period}>
                  /{isYearly ? 'year' : 'month'}
                </span>
              )}
            </div>

            {isYearly && plan.monthlyPrice > 0 && (
              <p className={styles.monthlyCost}>
                That's ${(plan.yearlyPrice / 12).toFixed(2)}/month
              </p>
            )}

            <Button
              variant={plan.popular ? 'primary' : 'secondary'}
              size="large"
              fullWidth
              disabled={isCurrentPlan(plan.id)}
              onClick={() => handleSelectPlan(plan.id)}
              icon={!isCurrentPlan(plan.id) && <FiArrowRight />}
            >
              {getButtonText(plan)}
            </Button>

            <div className={styles.features}>
              {plan.features.map((feature) => (
                <div
                  key={feature.name}
                  className={`${styles.feature} ${
                    !feature.included ? styles.notIncluded : ''
                  }`}
                >
                  {feature.included ? (
                    <FiCheck className={styles.checkIcon} />
                  ) : (
                    <FiX className={styles.xIcon} />
                  )}
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <motion.section
        className={styles.faq}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2>Frequently Asked Questions</h2>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h3>Can I switch plans anytime?</h3>
            <p>
              Yes! You can upgrade or downgrade your plan at any time. 
              Changes take effect immediately, and we'll prorate any charges.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>Is there a free trial?</h3>
            <p>
              Yes, Pro and Enterprise plans come with a 7-day free trial. 
              No credit card required to start.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>What payment methods do you accept?</h3>
            <p>
              We accept all major credit cards, PayPal, and cryptocurrency. 
              Enterprise customers can also pay via invoice.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3>Can I cancel anytime?</h3>
            <p>
              Absolutely! Cancel anytime with no questions asked. 
              You'll continue to have access until the end of your billing period.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Enterprise CTA */}
      <motion.section
        className={styles.enterpriseCta}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className={styles.ctaContent}>
          <h2>Need a Custom Solution?</h2>
          <p>
            Contact our sales team for custom enterprise solutions, 
            volume discounts, and dedicated support.
          </p>
        </div>
        <Link to="/contact">
          <Button variant="outline" size="large">
            Contact Sales
          </Button>
        </Link>
      </motion.section>
    </div>
  );
};

export default Plans;