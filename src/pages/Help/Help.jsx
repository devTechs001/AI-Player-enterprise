import { useState } from 'react';
import { FiSearch, FiMessageSquare, FiBook, FiMail } from 'react-icons/fi';
import './Help.scss';

const faqs = [
  {
    question: 'How do I download videos?',
    answer: 'Simply paste the video URL in the search bar on the homepage or go to the Download page. Our AI will process the video and give you multiple quality and format options.',
  },
  {
    question: 'What video platforms are supported?',
    answer: 'We support 1000+ platforms including YouTube, Vimeo, Dailymotion, Twitch, and many more. If a platform isn\'t working, contact support.',
  },
  {
    question: 'What is the maximum quality available?',
    answer: 'Pro and Enterprise users can download videos up to 8K resolution. Free users are limited to 720p, and Basic users to 1080p.',
  },
  {
    question: 'How does Watch Together work?',
    answer: 'Create a room from the Collaboration section, share the link with friends, and everyone can sync playback in real-time with chat functionality.',
  },
  {
    question: 'Can I use this commercially?',
    answer: 'Enterprise plans include commercial licensing. Please review our Terms of Service for detailed usage rights.',
  },
];

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="help-page">
      {/* Hero */}
      <section className="help-hero">
        <div className="container">
          <h1>How can we help you?</h1>
          <div className="help-search">
            <FiSearch />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="help-categories section">
        <div className="container">
          <div className="categories-grid">
            <div className="category-card">
              <FiBook />
              <h3>Documentation</h3>
              <p>Guides and tutorials</p>
            </div>
            <div className="category-card">
              <FiMessageSquare />
              <h3>Community</h3>
              <p>Ask other users</p>
            </div>
            <div className="category-card">
              <FiMail />
              <h3>Contact Support</h3>
              <p>We're here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="help-faqs section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faqs-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <span>{openFaq === index ? '−' : '+'}</span>
                </div>
                {openFaq === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
