import Home from '../pages/Home';
import Features from '../pages/Features';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

export const routes = [
  {
    path: '/',
    component: Home,
    title: 'Home',
  },
  {
    path: '/features',
    component: Features,
    title: 'Features',
  },
  {
    path: '/about',
    component: About,
    title: 'About',
  },
  {
    path: '/contact',
    component: Contact,
    title: 'Contact',
  },
  {
    path: '/login',
    component: Login,
    title: 'Login',
  },
  {
    path: '/register',
    component: Register,
    title: 'Register',
  },
];