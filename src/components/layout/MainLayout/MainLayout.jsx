import React from 'react';
import PropTypes from 'prop-types';
import Header from '../layout/Header/Header';
import Sidebar from '../layout/Sidebar/Sidebar';
import Footer from '../layout/Footer/Footer';
import './MainLayout.scss';

const MainLayout = ({ children, showSidebar = true, showHeader = true, showFooter = true }) => {
  return (
    <div className="main-layout">
      {showHeader && <Header />}
      
      <div className="main-layout-content">
        {showSidebar && <Sidebar />}
        
        <main className="main-content">
          {children}
        </main>
      </div>
      
      {showFooter && <Footer />}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  showSidebar: PropTypes.bool,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
};

export default MainLayout;