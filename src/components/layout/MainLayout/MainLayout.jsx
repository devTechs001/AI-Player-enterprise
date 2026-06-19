import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MobileNav from '../MobileNav/MobileNav';
import DownloadBanner from '../DownloadBanner/DownloadBanner';
import './MainLayout.scss';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        {children !== undefined ? children : <Outlet />}
      </main>
      <Footer />
      <MobileNav />
      <DownloadBanner />
    </div>
  );
};

export default MainLayout;
