import React from 'react';
import './Sidebar.scss';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li><a href="/"><i className="icon-home"></i> Home</a></li>
          <li><a href="/dashboard"><i className="icon-dashboard"></i> Dashboard</a></li>
          <li><a href="/player"><i className="icon-player"></i> Player</a></li>
          <li><a href="/library"><i className="icon-library"></i> Library</a></li>
          <li><a href="/downloads"><i className="icon-download"></i> Downloads</a></li>
          <li><a href="/settings"><i className="icon-settings"></i> Settings</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;