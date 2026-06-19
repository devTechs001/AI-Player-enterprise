import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MobileNav from '../MobileNav/MobileNav';
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
    </div>
  );
};

export default MainLayout;
