import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './MainLayout.scss';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;