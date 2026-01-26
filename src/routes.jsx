import { lazy } from 'react';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GuestRoute from './components/auth/GuestRoute';
import RoleGuard from './components/auth/RoleGuard';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Features = lazy(() => import('./pages/Features'));
const Status = lazy(() => import('./pages/Status'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Search = lazy(() => import('./pages/Search'));

// Auth Pages
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));
const Verify = lazy(() => import('./pages/Auth/Verify'));

// Dashboard Pages
const DashboardOverview = lazy(() => import('./pages/Dashboard/Overview'));
const DashboardVideos = lazy(() => import('./pages/Dashboard/Videos'));
const DashboardDownloads = lazy(() => import('./pages/Dashboard/Downloads'));
const DashboardMusic = lazy(() => import('./pages/Dashboard/Music'));
const DashboardHistory = lazy(() => import('./pages/Dashboard/History'));
const DashboardFavorites = lazy(() => import('./pages/Dashboard/Favorites'));
const DashboardPlaylists = lazy(() => import('./pages/Dashboard/Playlists'));
const DashboardLibrary = lazy(() => import('./pages/Dashboard/Library'));

// Player Pages
const VideoPlayerPage = lazy(() => import('./pages/Player/VideoPlayer'));
const MusicPlayerPage = lazy(() => import('./pages/Player/MusicPlayer'));
const LiveStream = lazy(() => import('./pages/Player/LiveStream'));

// Profile Pages
const ProfileOverview = lazy(() => import('./pages/Profile/Overview'));
const ProfileSettings = lazy(() => import('./pages/Profile/Settings'));
const ProfileSecurity = lazy(() => import('./pages/Profile/Security'));
const ProfilePreferences = lazy(() => import('./pages/Profile/Preferences'));
const ProfileNotifications = lazy(() => import('./pages/Profile/Notifications'));
const ProfileDevices = lazy(() => import('./pages/Profile/Devices'));

// Subscription Pages
const SubscriptionPlans = lazy(() => import('./pages/Subscription/Plans'));
const SubscriptionCheckout = lazy(() => import('./pages/Subscription/Checkout'));
const SubscriptionBilling = lazy(() => import('./pages/Subscription/Billing'));
const SubscriptionSuccess = lazy(() => import('./pages/Subscription/Success'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminUsers = lazy(() => import('./pages/Admin/Users'));
const AdminContent = lazy(() => import('./pages/Admin/Content'));
const AdminAnalytics = lazy(() => import('./pages/Admin/Analytics'));
const AdminSettings = lazy(() => import('./pages/Admin/Settings'));
const AdminLogs = lazy(() => import('./pages/Admin/Logs'));
const AdminReports = lazy(() => import('./pages/Admin/Reports'));

// Developer Pages
const DevsAPI = lazy(() => import('./pages/Devs/API'));
const DevsDocumentation = lazy(() => import('./pages/Devs/Documentation'));
const DevsSandbox = lazy(() => import('./pages/Devs/Sandbox'));
const DevsChangelog = lazy(() => import('./pages/Devs/Changelog'));
const DevsSDKs = lazy(() => import('./pages/Devs/SDKs'));

// Collaboration Pages
const CollaborationRooms = lazy(() => import('./pages/Collaboration/Rooms'));
const WatchParty = lazy(() => import('./pages/Collaboration/WatchParty'));
const SharedPlaylists = lazy(() => import('./pages/Collaboration/SharedPlaylists'));

// Music Pages
const MusicLibrary = lazy(() => import('./pages/Music/Library'));
const MusicAlbums = lazy(() => import('./pages/Music/Albums'));
const MusicArtists = lazy(() => import('./pages/Music/Artists'));
const MusicRadio = lazy(() => import('./pages/Music/Radio'));
const MusicDiscover = lazy(() => import('./pages/Music/Discover'));

// Download Page
const Download = lazy(() => import('./pages/Download'));

// Legal Pages
const Terms = lazy(() => import('./pages/Legal/Terms'));
const Privacy = lazy(() => import('./pages/Legal/Privacy'));
const DMCA = lazy(() => import('./pages/Legal/DMCA'));

// Error Pages
const NotFound = lazy(() => import('./pages/NotFound'));
const ErrorPage = lazy(() => import('./pages/Error'));

const routes = [
  // Public Routes
  { path: '/', component: Home, layout: 'main' },
  { path: '/features', component: Features, layout: 'main' },
  { path: '/status', component: Status, layout: 'main' },
  { path: '/about', component: About, layout: 'main' },
  { path: '/contact', component: Contact, layout: 'main' },
  { path: '/search', component: Search, layout: 'main' },
  { path: '/download', component: Download, layout: 'main' },
  
  // Auth Routes
  { path: '/login', component: Login, layout: 'auth', guard: 'guest' },
  { path: '/register', component: Register, layout: 'auth', guard: 'guest' },
  { path: '/forgot-password', component: ForgotPassword, layout: 'auth', guard: 'guest' },
  { path: '/reset-password/:token', component: ResetPassword, layout: 'auth', guard: 'guest' },
  { path: '/verify/:token', component: Verify, layout: 'auth' },
  
  // Dashboard Routes (Protected)
  { path: '/dashboard', component: DashboardOverview, layout: 'dashboard', guard: 'auth' },
  { path: '/dashboard/videos', component: DashboardVideos, layout: 'dashboard', guard: 'auth' },
  { path: '/dashboard/downloads', component: DashboardDownloads, layout: 'dashboard', guard: 'auth' },
  { path: '/dashboard/music', component: DashboardMusic, layout: 'dashboard', guard: 'auth' },
  { path: '/dashboard/history', component: DashboardHistory, layout: 'dashboard', guard: 'auth' },
  { path: '/dashboard/favorites', component: DashboardFavorites, layout: 'dashboard', guard: 'auth' },
  { path: '/dashboard/playlists', component: DashboardPlaylists, layout: 'dashboard', guard: 'auth' },
  { path: '/dashboard/library', component: DashboardLibrary, layout: 'dashboard', guard: 'auth' },
  
  // Player Routes
  { path: '/player/video/:id', component: VideoPlayerPage, layout: 'player' },
  { path: '/player/music/:id', component: MusicPlayerPage, layout: 'player' },
  { path: '/player/live/:id', component: LiveStream, layout: 'player' },
  
  // Profile Routes (Protected)
  { path: '/profile', component: ProfileOverview, layout: 'dashboard', guard: 'auth' },
  { path: '/profile/settings', component: ProfileSettings, layout: 'dashboard', guard: 'auth' },
  { path: '/profile/security', component: ProfileSecurity, layout: 'dashboard', guard: 'auth' },
  { path: '/profile/preferences', component: ProfilePreferences, layout: 'dashboard', guard: 'auth' },
  { path: '/profile/notifications', component: ProfileNotifications, layout: 'dashboard', guard: 'auth' },
  { path: '/profile/devices', component: ProfileDevices, layout: 'dashboard', guard: 'auth' },
  
  // Subscription Routes
  { path: '/subscription/plans', component: SubscriptionPlans, layout: 'main' },
  { path: '/subscription/checkout/:planId', component: SubscriptionCheckout, layout: 'main', guard: 'auth' },
  { path: '/subscription/billing', component: SubscriptionBilling, layout: 'dashboard', guard: 'auth' },
  { path: '/subscription/success', component: SubscriptionSuccess, layout: 'main', guard: 'auth' },
  
  // Admin Routes (Protected + Role)
  { path: '/admin', component: AdminDashboard, layout: 'admin', guard: 'auth', role: ['admin', 'superadmin'] },
  { path: '/admin/users', component: AdminUsers, layout: 'admin', guard: 'auth', role: ['admin', 'superadmin'] },
  { path: '/admin/content', component: AdminContent, layout: 'admin', guard: 'auth', role: ['admin', 'superadmin'] },
  { path: '/admin/analytics', component: AdminAnalytics, layout: 'admin', guard: 'auth', role: ['admin', 'superadmin'] },
  { path: '/admin/settings', component: AdminSettings, layout: 'admin', guard: 'auth', role: ['superadmin'] },
  { path: '/admin/logs', component: AdminLogs, layout: 'admin', guard: 'auth', role: ['admin', 'superadmin'] },
  { path: '/admin/reports', component: AdminReports, layout: 'admin', guard: 'auth', role: ['admin', 'superadmin'] },
  
  // Developer Routes
  { path: '/developers', component: DevsDocumentation, layout: 'main' },
  { path: '/developers/api', component: DevsAPI, layout: 'main' },
  { path: '/developers/sandbox', component: DevsSandbox, layout: 'main', guard: 'auth' },
  { path: '/developers/changelog', component: DevsChangelog, layout: 'main' },
  { path: '/developers/sdks', component: DevsSDKs, layout: 'main' },
  
  // Collaboration Routes (Protected)
  { path: '/collaboration/rooms', component: CollaborationRooms, layout: 'dashboard', guard: 'auth' },
  { path: '/collaboration/watch-party/:roomId', component: WatchParty, layout: 'player', guard: 'auth' },
  { path: '/collaboration/shared-playlists', component: SharedPlaylists, layout: 'dashboard', guard: 'auth' },
  
  // Music Routes
  { path: '/music', component: MusicLibrary, layout: 'dashboard' },
  { path: '/music/albums', component: MusicAlbums, layout: 'dashboard' },
  { path: '/music/artists', component: MusicArtists, layout: 'dashboard' },
  { path: '/music/radio', component: MusicRadio, layout: 'dashboard' },
  { path: '/music/discover', component: MusicDiscover, layout: 'dashboard' },
  
  // Legal Routes
  { path: '/terms', component: Terms, layout: 'main' },
  { path: '/privacy', component: Privacy, layout: 'main' },
  { path: '/dmca', component: DMCA, layout: 'main' },
  
  // Error Routes
  { path: '/error', component: ErrorPage, layout: 'none' },
  { path: '*', component: NotFound, layout: 'none' },
];

export default routes;