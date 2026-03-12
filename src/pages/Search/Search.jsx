import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import './Search.scss';

const Search = () => {
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search</h1>
        <div className="search-bar-large">
          <FiSearch />
          <input
            type="text"
            placeholder="Search videos, music, playlists..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="search-results">
        <div className="results-header">
          <p>No results found for "{query || 'your search'}"</p>
          <div className="results-actions">
            <Button variant="ghost" size="small" icon={<FiFilter />}>
              Filters
            </Button>
            <div className="view-toggle">
              <button
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
              >
                <FiGrid />
              </button>
              <button
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        <motion.div
          className="empty-state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="empty-icon">
            <FiSearch />
          </div>
          <h2>No results found</h2>
          <p>Try adjusting your search terms or browse our categories</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Search;
