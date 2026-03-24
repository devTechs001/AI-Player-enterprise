import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@components/layout/MainLayout/MainLayout';
import AuthLayout from '@components/layout/AuthLayout/AuthLayout';
import DashboardLayout from '@components/layout/DashboardLayout/DashboardLayout';
import AdminLayout from '@components/layout/AdminLayout/AdminLayout';
import PlayerLayout from '@components/layout/PlayerLayout/PlayerLayout';
import ProtectedRoute from '@components/auth/ProtectedRoute/ProtectedRoute';
import GuestRoute from '@components/auth/GuestRoute/GuestRoute';
import RoleGuard from '@components/auth/RoleGuard/RoleGuard';

// Lazy load pages
const Home = lazy(() => import('@pages/Home/Home'));
const Features = lazy(() => import('@pages/Features/Features'));
const Status = lazy(() => import('@pages/Status/Status'));
const About = lazy(() => import('@pages/About/About'));
const Contact = lazy(() => import('@pages/Contact/Contact'));
const Search = lazy(() => import('@pages/Search/Search'));
const Download = lazy(() => import('@pages/Download/Download'));
const NotFound = lazy(() => import('@pages/NotFound/NotFound'));

// Auth pages
const Login = lazy(() => import('@pages/Auth/Login/Login'));
const Register = lazy(() => import('@pages/Auth/Register/Register'));
const ForgotPassword = lazy(() => import('@pages/Auth/ForgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('@pages/Auth/ResetPassword/ResetPassword'));
const Verify = lazy(() => import('@pages/Auth/Verify/Verify'));

// Dashboard pages
const DashboardOverview = lazy(() => import('@pages/Dashboard/Overview/Overview'));
const DashboardVideos = lazy(() => import('@pages/Dashboard/Videos/Videos'));
const DashboardDownloads = lazy(() => import('@pages/Dashboard/Downloads/Downloads'));
const DashboardHistory = lazy(() => import('@pages/Dashboard/History/History'));
const DashboardFavorites = lazy(() => import('@pages/Dashboard/Favorites/Favorites'));
const DashboardPlaylists = lazy(() => import('@pages/Dashboard/Playlists/Playlists'));
const DashboardAnalytics = lazy(() => import('@pages/Dashboard/Analytics/Analytics'));

// Player pages
const VideoPlayerPage = lazy(() => import('@pages/Player/VideoPlayer/VideoPlayer'));
const MusicPlayerPage = lazy(() => import('@pages/Player/MusicPlayer/MusicPlayer'));
const LiveStreamPage = lazy(() => import('@pages/Player/LiveStream/LiveStream'));

// Profile pages
const ProfileOverview = lazy(() => import('@pages/Profile/Overview/Overview'));
const ProfileSettings = lazy(() => import('@pages/Profile/Settings/Settings'));
const ProfileSecurity = lazy(() => import('@pages/Profile/Security/Security'));
const ProfilePreferences = lazy(() => import('@pages/Profile/Preferences/Preferences'));

// Subscription pages
const Plans = lazy(() => import('@pages/Subscription/Plans/Plans'));
const Checkout = lazy(() => import('@pages/Subscription/Checkout/Checkout'));
const Billing = lazy(() => import('@pages/Subscription/Billing/Billing'));

// Admin pages
const AdminDashboard = lazy(() => import('@pages/Admin/Dashboard/Dashboard'));
const AdminUsers = lazy(() => import('@pages/Admin/Users/Users'));
const AdminContent = lazy(() => import('@pages/Admin/Content/Content'));
const AdminAnalytics = lazy(() => import('@pages/Admin/Analytics/Analytics'));
const AdminSettings = lazy(() => import('@pages/Admin/Settings/Settings'));
const AdminLogs = lazy(() => import('@pages/Admin/Logs/Logs'));

// Collaboration pages
const CollabRooms = lazy(() => import('@pages/Collaboration/Rooms/Rooms'));
const WatchParty = lazy(() => import('@pages/Collaboration/WatchParty/WatchParty'));

// Music pages
const MusicLibrary = lazy(() => import('@pages/Music/Library/Library'));
const MusicDiscover = lazy(() => import('@pages/Music/Discover/Discover'));

// Dev pages
const DevAPI = lazy(() => import('@pages/Devs/API/API'));
const DevDocs = lazy(() => import('@pages/Devs/Documentation/Documentation'));
const DevSandbox = lazy(() => import('@pages/Devs/Sandbox/Sandbox'));

// Legal
const Terms = lazy(() => import('@pages/Legal/Terms/Terms'));
const Privacy = lazy(() => import('@pages/Legal/Privacy/Privacy'));
const DMCA = lazy(() => import('@pages/Legal/DMCA/DMCA'));

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/status" element={<Status />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/download" element={<Download />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/dmca" element={<DMCA />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify/:token" element={<Verify />} />
        </Route>
      </Route>

      {/* Player Routes */}
      <Route element={<PlayerLayout />}>
        <Route path="/watch/:id" element={<VideoPlayerPage />} />
        <Route path="/listen/:id" element={<MusicPlayerPage />} />
        <Route path="/live/:id" element={<LiveStreamPage />} />
      </Route>

      {/* Dashboard Routes (Protected) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/dashboard/videos" element={<DashboardVideos />} />
          <Route path="/dashboard/downloads" element={<DashboardDownloads />} />
          <Route path="/dashboard/history" element={<DashboardHistory />} />
          <Route path="/dashboard/favorites" element={<DashboardFavorites />} />
          <Route path="/dashboard/playlists" element={<DashboardPlaylists />} />
          <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />

          {/* Profile */}
          <Route path="/profile" element={<ProfileOverview />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
          <Route path="/profile/security" element={<ProfileSecurity />} />
          <Route path="/profile/preferences" element={<ProfilePreferences />} />

          {/* Subscription */}
          <Route path="/subscription/checkout" element={<Checkout />} />
          <Route path="/subscription/billing" element={<Billing />} />

          {/* Collaboration */}
          <Route path="/rooms" element={<CollabRooms />} />
          <Route path="/watch-party/:roomId" element={<WatchParty />} />

          {/* Music */}
          <Route path="/music" element={<MusicLibrary />} />
          <Route path="/music/discover" element={<MusicDiscover />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleGuard roles={['admin']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/logs" element={<AdminLogs />} />
          </Route>
        </Route>
      </Route>

      {/* Dev Routes */}
      <Route element={<MainLayout />}>
        <Route path="/developers" element={<DevAPI />} />
        <Route path="/developers/docs" element={<DevDocs />} />
        <Route path="/developers/sandbox" element={<DevSandbox />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@components/layout/MainLayout/MainLayout';
import AuthLayout from '@components/layout/AuthLayout/AuthLayout';
import DashboardLayout from '@components/layout/DashboardLayout/DashboardLayout';
import AdminLayout from '@components/layout/AdminLayout/AdminLayout';
import PlayerLayout from '@components/layout/PlayerLayout/PlayerLayout';
import ProtectedRoute from '@components/auth/ProtectedRoute/ProtectedRoute';
import GuestRoute from '@components/auth/GuestRoute/GuestRoute';
import RoleGuard from '@components/auth/RoleGuard/RoleGuard';

// Lazy load pages
const Home = lazy(() => import('@pages/Home/Home'));
const Features = lazy(() => import('@pages/Features/Features'));
const Status = lazy(() => import('@pages/Status/Status'));
const About = lazy(() => import('@pages/About/About'));
const Contact = lazy(() => import('@pages/Contact/Contact'));
const Search = lazy(() => import('@pages/Search/Search'));
const Download = lazy(() => import('@pages/Download/Download'));
const NotFound = lazy(() => import('@pages/NotFound/NotFound'));

// Auth pages
const Login = lazy(() => import('@pages/Auth/Login/Login'));
const Register = lazy(() => import('@pages/Auth/Register/Register'));
const ForgotPassword = lazy(() => import('@pages/Auth/ForgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('@pages/Auth/ResetPassword/ResetPassword'));
const Verify = lazy(() => import('@pages/Auth/Verify/Verify'));

// Dashboard pages
const DashboardOverview = lazy(() => import('@pages/Dashboard/Overview/Overview'));
const DashboardVideos = lazy(() => import('@pages/Dashboard/Videos/Videos'));
const DashboardDownloads = lazy(() => import('@pages/Dashboard/Downloads/Downloads'));
const DashboardHistory = lazy(() => import('@pages/Dashboard/History/History'));
const DashboardFavorites = lazy(() => import('@pages/Dashboard/Favorites/Favorites'));
const DashboardPlaylists = lazy(() => import('@pages/Dashboard/Playlists/Playlists'));
const DashboardAnalytics = lazy(() => import('@pages/Dashboard/Analytics/Analytics'));

// Player pages
const VideoPlayerPage = lazy(() => import('@pages/Player/VideoPlayer/VideoPlayer'));
const MusicPlayerPage = lazy(() => import('@pages/Player/MusicPlayer/MusicPlayer'));
const LiveStreamPage = lazy(() => import('@pages/Player/LiveStream/LiveStream'));

// Profile pages
const ProfileOverview = lazy(() => import('@pages/Profile/Overview/Overview'));
const ProfileSettings = lazy(() => import('@pages/Profile/Settings/Settings'));
const ProfileSecurity = lazy(() => import('@pages/Profile/Security/Security'));
const ProfilePreferences = lazy(() => import('@pages/Profile/Preferences/Preferences'));

// Subscription pages
const Plans = lazy(() => import('@pages/Subscription/Plans/Plans'));
const Checkout = lazy(() => import('@pages/Subscription/Checkout/Checkout'));
const Billing = lazy(() => import('@pages/Subscription/Billing/Billing'));

// Admin pages
const AdminDashboard = lazy(() => import('@pages/Admin/Dashboard/Dashboard'));
const AdminUsers = lazy(() => import('@pages/Admin/Users/Users'));
const AdminContent = lazy(() => import('@pages/Admin/Content/Content'));
const AdminAnalytics = lazy(() => import('@pages/Admin/Analytics/Analytics'));
const AdminSettings = lazy(() => import('@pages/Admin/Settings/Settings'));
const AdminLogs = lazy(() => import('@pages/Admin/Logs/Logs'));

// Collaboration pages
const CollabRooms = lazy(() => import('@pages/Collaboration/Rooms/Rooms'));
const WatchParty = lazy(() => import('@pages/Collaboration/WatchParty/WatchParty'));

// Music pages
const MusicLibrary = lazy(() => import('@pages/Music/Library/Library'));
const MusicDiscover = lazy(() => import('@pages/Music/Discover/Discover'));

// Dev pages
const DevAPI = lazy(() => import('@pages/Devs/API/API'));
const DevDocs = lazy(() => import('@pages/Devs/Documentation/Documentation'));
const DevSandbox = lazy(() => import('@pages/Devs/Sandbox/Sandbox'));

// Legal
const Terms = lazy(() => import('@pages/Legal/Terms/Terms'));
const Privacy = lazy(() => import('@pages/Legal/Privacy/Privacy'));
const DMCA = lazy(() => import('@pages/Legal/DMCA/DMCA'));

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/status" element={<Status />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/download" element={<Download />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/dmca" element={<DMCA />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify/:token" element={<Verify />} />
        </Route>
      </Route>

      {/* Player Routes */}
      <Route element={<PlayerLayout />}>
        <Route path="/watch/:id" element={<VideoPlayerPage />} />
        <Route path="/listen/:id" element={<MusicPlayerPage />} />
        <Route path="/live/:id" element={<LiveStreamPage />} />
      </Route>

      {/* Dashboard Routes (Protected) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/dashboard/videos" element={<DashboardVideos />} />
          <Route path="/dashboard/downloads" element={<DashboardDownloads />} />
          <Route path="/dashboard/history" element={<DashboardHistory />} />
          <Route path="/dashboard/favorites" element={<DashboardFavorites />} />
          <Route path="/dashboard/playlists" element={<DashboardPlaylists />} />
          <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />

          {/* Profile */}
          <Route path="/profile" element={<ProfileOverview />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
          <Route path="/profile/security" element={<ProfileSecurity />} />
          <Route path="/profile/preferences" element={<ProfilePreferences />} />

          {/* Subscription */}
          <Route path="/subscription/checkout" element={<Checkout />} />
          <Route path="/subscription/billing" element={<Billing />} />

          {/* Collaboration */}
          <Route path="/rooms" element={<CollabRooms />} />
          <Route path="/watch-party/:roomId" element={<WatchParty />} />

          {/* Music */}
          <Route path="/music" element={<MusicLibrary />} />
          <Route path="/music/discover" element={<MusicDiscover />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleGuard roles={['admin']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/logs" element={<AdminLogs />} />
          </Route>
        </Route>
      </Route>

      {/* Dev Routes */}
      <Route element={<MainLayout />}>
        <Route path="/developers" element={<DevAPI />} />
        <Route path="/developers/docs" element={<DevDocs />} />
        <Route path="/developers/sandbox" element={<DevSandbox />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}