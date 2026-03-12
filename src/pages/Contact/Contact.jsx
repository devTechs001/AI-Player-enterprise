import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMessageSquare, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import './Contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  const contactMethods = [
    { icon: FiMail, title: 'Email', value: 'support@aivideo.com', href: 'mailto:support@aivideo.com' },
    { icon: FiPhone, title: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: FiMapPin, title: 'Address', value: 'San Francisco, CA', href: '#' },
  ];

  return (
    <div className="contact-page">
      <div className="contact-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Get in Touch</h1>
          <p>Have questions? We'd love to hear from you.</p>
        </motion.div>
      </div>

      <div className="contact-content">
        <motion.div
          className="contact-form-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <Input
                label="Name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <Input
              label="Subject"
              type="text"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
            <div className="form-group">
              <label>Message</label>
              <textarea
                placeholder="Tell us more..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <Button type="submit" variant="primary" size="large" icon={<FiSend />}>
              Send Message
            </Button>
          </form>
        </motion.div>

        <motion.div
          className="contact-methods"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Contact Information</h2>
          <p>Reach out to us through any of these channels</p>
          <div className="methods-grid">
            {contactMethods.map((method, index) => (
              <a key={method.title} href={method.href} className="method-card">
                <div className="method-icon">
                  <method.icon />
                </div>
                <span className="method-title">{method.title}</span>
                <span className="method-value">{method.value}</span>
              </a>
            ))}
          </div>

          <div className="contact-faq">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-list">
              <div className="faq-item">
                <h4>What's your response time?</h4>
                <p>We typically respond within 24 hours on business days.</p>
              </div>
              <div className="faq-item">
                <h4>Do you offer phone support?</h4>
                <p>Phone support is available for Pro and Enterprise plans.</p>
              </div>
              <div className="faq-item">
                <h4>Can I request a demo?</h4>
                <p>Yes! Contact us to schedule a personalized demo.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
