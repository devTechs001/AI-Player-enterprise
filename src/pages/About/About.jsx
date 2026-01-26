import React from 'react';
import './About.scss';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>About AI Video Player</h1>
        <p>We're revolutionizing the way people consume video content with cutting-edge AI technology.</p>
        
        <div className="about-content">
          <section className="mission">
            <h2>Our Mission</h2>
            <p>To provide the most intelligent and intuitive video playback experience, leveraging AI to enhance every aspect of video consumption.</p>
          </section>
          
          <section className="values">
            <h2>Our Values</h2>
            <ul>
              <li>Innovation through artificial intelligence</li>
              <li>User-centric design</li>
              <li>Seamless cross-platform experiences</li>
              <li>Privacy and security first</li>
            </ul>
          </section>
          
          <section className="team">
            <h2>Our Team</h2>
            <p>A passionate group of engineers, designers, and AI researchers working together to transform video experiences.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;