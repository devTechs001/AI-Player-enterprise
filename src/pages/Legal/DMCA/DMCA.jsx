import { motion } from 'framer-motion';
import { FiMail, FiFileText } from 'react-icons/fi';
import Button from '@components/common/Button';
import '../Legal.scss';

const DMCA = () => {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>DMCA Policy</h1>
          <p>Digital Millennium Copyright Act Notice</p>
        </motion.div>
      </div>

      <div className="legal-content">
        <motion.section
          className="legal-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Reporting Copyright Infringement</h2>
          <p>
            If you believe that any content available through AI Video Player infringes upon your copyright,
            please submit a DMCA notice containing the following information:
          </p>
          <ul>
            <li>A physical or electronic signature of the copyright owner</li>
            <li>Identification of the copyrighted work claimed to be infringed</li>
            <li>Identification of the infringing material and its location</li>
            <li>Your contact information (address, phone, email)</li>
            <li>A statement of good faith belief that the use is not authorized</li>
            <li>A statement that the information in the notice is accurate</li>
          </ul>
        </motion.section>

        <motion.section
          className="legal-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2>Submit DMCA Notice</h2>
          <p>
            Send your DMCA notice to our designated agent:
          </p>
          <div className="contact-info">
            <FiMail />
            <span>dmca@aivideo.com</span>
          </div>
          <Button variant="primary" icon={<FiFileText />}>
            Download DMCA Template
          </Button>
        </motion.section>

        <motion.section
          className="legal-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Counter-Notice</h2>
          <p>
            If you believe your content was wrongly removed, you may submit a counter-notice
            containing the required information under the DMCA.
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default DMCA;
