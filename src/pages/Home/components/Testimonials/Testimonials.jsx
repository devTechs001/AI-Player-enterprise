import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>Trusted by millions of users worldwide</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Best video player I've ever used. The AI features are incredible!"</p>
            <div className="testimonial-author">
              <span className="author-name">Sarah Johnson</span>
              <span className="author-role">Content Creator</span>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"The download quality is unmatched. Highly recommended!"</p>
            <div className="testimonial-author">
              <span className="author-name">Mike Chen</span>
              <span className="author-role">Video Editor</span>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"Watch parties with friends have never been easier. Love it!"</p>
            <div className="testimonial-author">
              <span className="author-name">Emily Davis</span>
              <span className="author-role">Student</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
