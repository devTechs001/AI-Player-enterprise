import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

// Layouts
import MainLayout from '@components/layout/MainLayout'
import DashboardLayout from '@components/layout/DashboardLayout'
import AuthLayout from '@components/layout/AuthLayout'
import AdminLayout from '@components/layout/AdminLayout'
import PlayerLayout from '@components/layout/PlayerLayout'

// Route Guards
import ProtectedRoute from '@components/auth/ProtectedRoute'
import GuestRoute from '@components/auth/GuestRoute'
import RoleGuard from '@components/auth/RoleGuard'

// Pages - Lazy loaded
const Splash = lazy(() => import('@pages/Splash'))
const Home = lazy(() => import('@pages/Home'))
const Features = lazy(() => import('@pages/Features'))
const Status = lazy(() => import('@pages/Status'))
const About = lazy(() => import('@pages/About'))
const Contact = lazy(() => import('@pages/Contact'))
const Download = lazy(() => import('@pages/Download'))
const Search = lazy(() => import('@pages/Search'))

// Auth Pages
const Login = lazy(() => import('@pages/Auth/Login'))
const Register = lazy(() => import('@pages/Auth/Register'))
const ForgotPassword = lazy(() => import('@pages/Auth/ForgotPassword'))
const ResetPassword = lazy(() => import('@pages/Auth/ResetPassword'))
const Verify = lazy(() => import('@pages/Auth/Verify'))

// Dashboard Pages
const DashboardOverview = lazy(() => import('@pages/Dashboard/Overview'))
const DashboardVideos = lazy(() => import('@pages/Dashboard/Videos'))
const DashboardDownloads = lazy(() => import('@pages/Dashboard/Downloads'))
const DashboardMusic = lazy(() => import('@pages/Dashboard/Music'))
const DashboardHistory = lazy(() => import('@pages/Dashboard/History'))
const DashboardFavorites = lazy(() => import('@pages/Dashboard/Favorites'))
const DashboardPlaylists = lazy(() => import('@pages/Dashboard/Playlists'))
const DashboardLibrary = lazy(() => import('@pages/Dashboard/Library'))
const DashboardAnalytics = lazy(() => import('@pages/Dashboard/Analytics'))

// Player Pages
const VideoPlayer = lazy(() => import('@pages/Player/VideoPlayer'))
const MusicPlayer = lazy(() => import('@pages/Player/MusicPlayer'))
const LiveStream = lazy(() => import('@pages/Player/LiveStream'))

// Profile Pages
const ProfileOverview = lazy(() => import('@pages/Profile/Overview'))
const ProfileSettings = lazy(() => import('@pages/Profile/Settings'))
const ProfileSecurity = lazy(() => import('@pages/Profile/Security'))
const ProfilePreferences = lazy(() => import('@pages/Profile/Preferences'))
const ProfileNotifications = lazy(() => import('@pages/Profile/Notifications'))
const ProfilePrivacy = lazy(() => import('@pages/Profile/Privacy'))
const ProfileDevices = lazy(() => import('@pages/Profile/Devices'))

// Subscription Pages
const Plans = lazy(() => import('@pages/Subscription/Plans'))
const Checkout = lazy(() => import('@pages/Subscription/Checkout'))
const Billing = lazy(() => import('@pages/Subscription/Billing'))
const SubscriptionSuccess = lazy(() => import('@pages/Subscription/Success'))

// Admin Pages
const AdminDashboard = lazy(() => import('@pages/Admin/Dashboard'))
const AdminUsers = lazy(() => import('@pages/Admin/Users'))
const AdminContent = lazy(() => import('@pages/Admin/Content'))
const AdminAnalytics = lazy(() => import('@pages/Admin/Analytics'))
const AdminSettings = lazy(() => import('@pages/Admin/Settings'))
const AdminLogs = lazy(() => import('@pages/Admin/Logs'))
const AdminReports = lazy(() => import('@pages/Admin/Reports'))
const AdminModeration = lazy(() => import('@pages/Admin/Moderation'))
const AdminAPI = lazy(() => import('@pages/Admin/API'))

// Developer Pages
const DevsAPI = lazy(() => import('@pages/Devs/API'))
const DevsDocumentation = lazy(() => import('@pages/Devs/Documentation'))
const DevsSandbox = lazy(() => import('@pages/Devs/Sandbox'))
const DevsChangelog = lazy(() => import('@pages/Devs/Changelog'))
const DevsSDKs = lazy(() => import('@pages/Devs/SDKs'))
const DevsExamples = lazy(() => import('@pages/Devs/Examples'))

// Collaboration Pages
const CollaborationRooms = lazy(() => import('@pages/Collaboration/Rooms'))
const WatchParty = lazy(() => import('@pages/Collaboration/WatchParty'))
const SharedPlaylists = lazy(() => import('@pages/Collaboration/SharedPlaylists'))
const Live = lazy(() => import('@pages/Collaboration/Live'))

// Music Pages
const MusicLibrary = lazy(() => import('@pages/Music/Library'))
const MusicAlbums = lazy(() => import('@pages/Music/Albums'))
const MusicArtists = lazy(() => import('@pages/Music/Artists'))
const MusicRadio = lazy(() => import('@pages/Music/Radio'))
const MusicPlaylists = lazy(() => import('@pages/Music/Playlists'))
const MusicDiscover = lazy(() => import('@pages/Music/Discover'))

// Legal Pages
const Terms = lazy(() => import('@pages/Legal/Terms'))
const Privacy = lazy(() => import('@pages/Legal/Privacy'))
const DMCA = lazy(() => import('@pages/Legal/DMCA'))

// Error Pages
const NotFound = lazy(() => import('@pages/NotFound'))
const Error = lazy(() => import('@pages/Error'))

export const routes = [
  // Splash
  {
    path: '/splash',
    element: <Splash />,
  },

  // Main Layout Routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'features', element: <Features /> },
      { path: 'status', element: <Status /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'download', element: <Download /> },
      { path: 'search', element: <Search /> },
      { path: 'plans', element: <Plans /> },
      { path: 'terms', element: <Terms /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'dmca', element: <DMCA /> },
    ],
  },

  // Auth Layout Routes
  {
    path: '/auth',
    element: <GuestRoute><AuthLayout /></GuestRoute>,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password/:token', element: <ResetPassword /> },
      { path: 'verify/:token', element: <Verify /> },
    ],
  },

  // Dashboard Layout Routes
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: 'videos', element: <DashboardVideos /> },
      { path: 'downloads', element: <DashboardDownloads /> },
      { path: 'music', element: <DashboardMusic /> },
      { path: 'history', element: <DashboardHistory /> },
      { path: 'favorites', element: <DashboardFavorites /> },
      { path: 'playlists', element: <DashboardPlaylists /> },
      { path: 'library', element: <DashboardLibrary /> },
      { path: 'analytics', element: <DashboardAnalytics /> },
    ],
  },

  // Profile Routes
  {
    path: '/profile',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <ProfileOverview /> },
      { path: 'settings', element: <ProfileSettings /> },
      { path: 'security', element: <ProfileSecurity /> },
      { path: 'preferences', element: <ProfilePreferences /> },
      { path: 'notifications', element: <ProfileNotifications /> },
      { path: 'privacy', element: <ProfilePrivacy /> },
      { path: 'devices', element: <ProfileDevices /> },
    ],
  },

  // Subscription Routes
  {
    path: '/subscription',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { path: 'checkout/:planId', element: <Checkout /> },
      { path: 'billing', element: <Billing /> },
      { path: 'success', element: <SubscriptionSuccess /> },
    ],
  },

  // Player Layout Routes
  {
    path: '/player',
    element: <PlayerLayout />,
    children: [
      { path: 'video/:id', element: <VideoPlayer /> },
      { path: 'music/:id', element: <MusicPlayer /> },
      { path: 'live/:id', element: <LiveStream /> },
    ],
  },

  // Collaboration Routes
  {
    path: '/collab',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { path: 'rooms', element: <CollaborationRooms /> },
      { path: 'party/:roomId', element: <WatchParty /> },
      { path: 'playlists', element: <SharedPlaylists /> },
      { path: 'live/:streamId', element: <Live /> },
    ],
  },

  // Music Routes
  {
    path: '/music',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <MusicLibrary /> },
      { path: 'albums', element: <MusicAlbums /> },
      { path: 'artists', element: <MusicArtists /> },
      { path: 'radio', element: <MusicRadio /> },
      { path: 'playlists', element: <MusicPlaylists /> },
      { path: 'discover', element: <MusicDiscover /> },
    ],
  },

  // Developer Routes
  {
    path: '/devs',
    element: <MainLayout />,
    children: [
      { index: true, element: <DevsAPI /> },
      { path: 'docs', element: <DevsDocumentation /> },
      { path: 'sandbox', element: <DevsSandbox /> },
      { path: 'changelog', element: <DevsChangelog /> },
      { path: 'sdks', element: <DevsSDKs /> },
      { path: 'examples', element: <DevsExamples /> },
    ],
  },

  // Admin Layout Routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <RoleGuard roles={['admin', 'super_admin']}>
          <AdminLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'content', element: <AdminContent /> },
      { path: 'analytics', element: <AdminAnalytics /> },
      { path: 'settings', element: <AdminSettings /> },
      { path: 'logs', element: <AdminLogs /> },
      { path: 'reports', element: <AdminReports /> },
      { path: 'moderation', element: <AdminModeration /> },
      { path: 'api', element: <AdminAPI /> },
    ],
  },

  // Error Routes
  { path: '/error', element: <Error /> },
  { path: '*', element: <NotFound /> },
]

export default routes
