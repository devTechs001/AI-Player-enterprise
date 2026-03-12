import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import './Blog.scss';

const posts = [
  {
    title: 'Introducing AI-Powered Video Enhancement',
    excerpt: 'Our new AI technology automatically enhances video quality up to 8K resolution with stunning clarity.',
    date: 'March 10, 2026',
    readTime: '5 min read',
    category: 'Product',
  },
  {
    title: 'How We Built Universal Video Download',
    excerpt: 'A deep dive into the technical challenges of supporting 50+ video formats and 1000+ platforms.',
    date: 'March 5, 2026',
    readTime: '8 min read',
    category: 'Engineering',
  },
  {
    title: 'Watch Together: Building Real-Time Sync',
    excerpt: 'Learn how we achieved sub-100ms synchronization for watch parties across different networks.',
    date: 'February 28, 2026',
    readTime: '6 min read',
    category: 'Engineering',
  },
  {
    title: 'The Future of AI in Video Streaming',
    excerpt: 'Exploring upcoming features like auto-generated chapters, smart summaries, and voice search.',
    date: 'February 20, 2026',
    readTime: '4 min read',
    category: 'Product',
  },
];

const Blog = () => {
  return (
    <div className="blog-page">
      {/* Hero */}
      <section className="blog-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Blog
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Latest news, updates, and technical deep dives
          </motion.p>
        </div>
      </section>

      {/* Posts */}
      <section className="blog-posts section">
        <div className="container">
          <div className="posts-grid">
            {posts.map((post, index) => (
              <motion.article
                key={post.title}
                className="post-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="post-category">{post.category}</div>
                <h2>{post.title}</h2>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-meta">
                  <span><FiCalendar /> {post.date}</span>
                  <span><FiClock /> {post.readTime}</span>
                </div>
                <Link to="#" className="read-more">
                  Read Article <FiArrowRight />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="blog-newsletter section">
        <div className="container">
          <div className="newsletter-card">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest updates delivered to your inbox</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
