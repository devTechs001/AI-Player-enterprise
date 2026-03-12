import { motion } from 'framer-motion';
import { FiCreditCard, FiFileText, FiDownload } from 'react-icons/fi';
import Button from '@components/common/Button';
import Badge from '@components/common/Badge';
import '../Subscription.scss';

const Billing = () => {
  const invoices = [
    { id: 'INV-001', date: 'Jan 1, 2024', amount: '$19.99', status: 'paid' },
    { id: 'INV-002', date: 'Dec 1, 2023', amount: '$19.99', status: 'paid' },
    { id: 'INV-003', date: 'Nov 1, 2023', amount: '$19.99', status: 'paid' },
  ];

  return (
    <div className="subscription-page billing-page">
      <div className="page-header">
        <h1>Billing & Invoices</h1>
        <p>Manage your billing information and view invoices</p>
      </div>

      <div className="billing-content">
        <motion.div
          className="billing-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Current Subscription</h2>
          <div className="subscription-status">
            <div className="status-info">
              <span className="plan-name">Pro Plan</span>
              <Badge variant="success">Active</Badge>
            </div>
            <span className="renewal-date">Next billing: Feb 1, 2024</span>
          </div>
          <div className="billing-actions">
            <Button variant="outline">Change Plan</Button>
            <Button variant="danger">Cancel Subscription</Button>
          </div>
        </motion.div>

        <motion.div
          className="billing-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2>Payment Method</h2>
          <div className="payment-method">
            <FiCreditCard />
            <div>
              <span>Visa ending in 4242</span>
              <span>Expires 12/25</span>
            </div>
            <Button variant="ghost" size="small">Edit</Button>
          </div>
        </motion.div>

        <motion.div
          className="billing-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Invoices</h2>
          <div className="invoices-list">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="invoice-item">
                <div className="invoice-info">
                  <FiFileText />
                  <div>
                    <span className="invoice-id">{invoice.id}</span>
                    <span className="invoice-date">{invoice.date}</span>
                  </div>
                </div>
                <span className="invoice-amount">{invoice.amount}</span>
                <Button variant="ghost" size="small" icon={<FiDownload />} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Billing;
