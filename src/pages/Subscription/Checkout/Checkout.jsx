import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCreditCard, FiLock } from 'react-icons/fi';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import '../Subscription.scss';

const Checkout = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const plans = {
    basic: { name: 'Basic', price: 9.99 },
    pro: { name: 'Pro', price: 19.99 },
    enterprise: { name: 'Enterprise', price: 49.99 },
  };

  const plan = plans[planId] || plans.basic;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    navigate('/subscription/success');
  };

  return (
    <div className="subscription-page checkout-page">
      <div className="checkout-header">
        <h1>Complete Your Order</h1>
        <p>You're subscribing to the {plan.name} plan</p>
      </div>

      <motion.div
        className="checkout-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>{plan.name} Plan</span>
            <span>${plan.price}/month</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${plan.price}/month</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <h2>Payment Details</h2>
          
          <div className="form-group">
            <label>Card Number</label>
            <div className="input-with-icon">
              <FiCreditCard />
              <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input type="text" placeholder="MM/YY" maxLength={5} />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input type="text" placeholder="123" maxLength={4} />
            </div>
          </div>

          <div className="form-group">
            <label>Cardholder Name</label>
            <input type="text" placeholder="John Doe" />
          </div>

          <div className="secure-notice">
            <FiLock />
            <span>Your payment information is secure and encrypted</span>
          </div>

          <Button type="submit" variant="primary" size="large" loading={loading}>
            Subscribe for ${plan.price}/month
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Checkout;
