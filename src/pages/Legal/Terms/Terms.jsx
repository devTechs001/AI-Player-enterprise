import { motion } from 'framer-motion';
import '../Legal.scss';

const Terms = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using AI Video Player, you accept and agree to be bound by the terms and provision of this agreement.',
    },
    {
      title: '2. License',
      content: 'AI Video Player grants you a revocable, non-exclusive, non-transferable, limited license to download, install, and use the application.',
    },
    {
      title: '3. User Conduct',
      content: 'You agree not to use the application for any illegal purpose or to violate any laws in your jurisdiction.',
    },
    {
      title: '4. Content',
      content: 'You are responsible for ensuring you have the right to download and use any content through our service.',
    },
    {
      title: '5. Privacy',
      content: 'Your use of the application is also governed by our Privacy Policy.',
    },
    {
      title: '6. Termination',
      content: 'We may terminate or suspend your account and access to the service immediately, without prior notice.',
    },
    {
      title: '7. Limitation of Liability',
      content: 'AI Video Player shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
    },
    {
      title: '8. Changes to Terms',
      content: 'We reserve the right to modify these terms at any time. Continued use constitutes acceptance of modified terms.',
    },
  ];

  return (
    <div className="legal-page">
      <div className="legal-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Terms of Service</h1>
          <p>Last updated: January 1, 2024</p>
        </motion.div>
      </div>

      <div className="legal-content">
        {sections.map((section, index) => (
          <motion.section
            key={section.title}
            className="legal-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default Terms;
