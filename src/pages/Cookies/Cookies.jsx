import { Link } from 'react-router-dom';
import './Cookies.scss';

const Cookies = () => {
  return (
    <div className="cookies-page">
      <div className="container">
        <h1>Cookie Policy</h1>
        <p className="last-updated">Last updated: March 12, 2026</p>

        <div className="content">
          <section>
            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit our website.
              They help us provide you with a better experience by remembering your preferences and
              understanding how you use our service.
            </p>
          </section>

          <section>
            <h2>2. How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul>
              <li><strong>Essential:</strong> Required for the service to function (authentication, security)</li>
              <li><strong>Functional:</strong> Remember your preferences and settings</li>
              <li><strong>Analytics:</strong> Understand how users interact with our service</li>
              <li><strong>Marketing:</strong> Show relevant advertisements (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2>3. Types of Cookies We Use</h2>
            <div className="cookie-types">
              <div className="cookie-type">
                <h4>Session Cookies</h4>
                <p>Temporary cookies that are deleted when you close your browser.</p>
              </div>
              <div className="cookie-type">
                <h4>Persistent Cookies</h4>
                <p>Remain on your device for a set period or until you delete them.</p>
              </div>
              <div className="cookie-type">
                <h4>First-Party Cookies</h4>
                <p>Set directly by AI Video Player.</p>
              </div>
              <div className="cookie-type">
                <h4>Third-Party Cookies</h4>
                <p>Set by our service providers (analytics, advertising).</p>
              </div>
            </div>
          </section>

          <section>
            <h2>4. Managing Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings. Most browsers
              allow you to:
            </p>
            <ul>
              <li>See what cookies are stored and delete them</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block all cookies</li>
              <li>Clear all cookies when you close the browser</li>
            </ul>
          </section>

          <section>
            <h2>5. Contact Us</h2>
            <p>
              If you have questions about our cookie policy, please{' '}
              <Link to="/contact">contact us</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
