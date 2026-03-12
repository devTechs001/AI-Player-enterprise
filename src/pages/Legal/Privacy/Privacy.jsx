import { motion } from 'framer-motion';
import '../Legal.scss';

const Privacy = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us, including your name, email address, and payment information.',
    },
    {
      title: '2. How We Use Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, and to communicate with you.',
    },
    {
      title: '3. Information Sharing',
      content: 'We do not sell your personal information. We may share information with service providers who perform services on our behalf.',
    },
    {
      title: '4. Data Security',
      content: 'We implement appropriate technical and organizational measures to protect your personal information.',
    },
    {
      title: '5. Your Rights',
      content: 'You have the right to access, correct, or delete your personal information. You may also object to processing of your data.',
    },
    {
      title: '6. Cookies',
      content: 'We use cookies and similar tracking technologies to collect information about your browsing activities.',
    },
    {
      title: '7. Children\'s Privacy',
      content: 'Our services are not intended for children under 13. We do not knowingly collect information from children under 13.',
    },
    {
      title: '8. Changes to Privacy Policy',
      content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy.',
    },
  ];

  return (
    <div className="legal-page">
      <div className="legal-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Privacy Policy</h1>
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

export default Privacy;
