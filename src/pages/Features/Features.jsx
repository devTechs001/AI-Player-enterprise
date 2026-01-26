import React from 'react';
import './Features.scss';

const Features = () => {
  return (
    <div className="features-page">
      <div className="container">
        <h1>Our Features</h1>
        <p>Discover the powerful features of our AI Video Player</p>
        
        <div className="features-list">
          <div className="feature-item">
            <h2>Advanced Video Player</h2>
            <p>Support for multiple formats, quality selection, and advanced controls</p>
          </div>
          
          <div className="feature-item">
            <h2>AI Recommendations</h2>
            <p>Personalized content suggestions powered by artificial intelligence</p>
          </div>
          
          <div className="feature-item">
            <h2>Collaborative Watching</h2>
            <p>Watch videos together with friends in synchronized sessions</p>
          </div>
          
          <div className="feature-item">
            <h2>Smart Subtitles</h2>
            <p>Auto-generated and translatable subtitles for any video</p>
          </div>
          
          <div className="feature-item">
            <h2>Download Manager</h2>
            <p>Download videos for offline viewing with our integrated manager</p>
          </div>
          
          <div className="feature-item">
            <h2>Cross-Platform Sync</h2>
            <p>Continue watching where you left off on any device</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;