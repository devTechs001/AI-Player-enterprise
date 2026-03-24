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

// ==================== PUBLIC PAGES (Landing) ====================
const Splash = lazy(() => import('@pages/Splash'))
const Home = lazy(() => import('@pages/Home'))
const Features = lazy(() => import('@pages/Features'))
const Pricing = lazy(() => import('@pages/Subscription/Plans'))
const About = lazy(() => import('@pages/About'))
const Contact = lazy(() => import('@pages/Contact'))
const Download = lazy(() => import('@pages/Download'))
const Search = lazy(() => import('@pages/Search'))
const Status = lazy(() => import('@pages/Status'))
const Blog = lazy(() => import('@pages/Blog'))
const Careers = lazy(() => import('@pages/Careers'))
const Help = lazy(() => import('@pages/Help'))
const Community = lazy(() => import('@pages/Community'))
const Cookies = lazy(() => import('@pages/Cookies'))
const Unauthorized = lazy(() => import('@pages/Unauthorized'))

// ==================== AUTH PAGES ====================
const Login = lazy(() => import('@pages/Auth/Login'))
const Register = lazy(() => import('@pages/Auth/Register'))
const ForgotPassword = lazy(() => import('@pages/Auth/ForgotPassword'))
const ResetPassword = lazy(() => import('@pages/Auth/ResetPassword'))
const Verify = lazy(() => import('@pages/Auth/Verify'))
const AuthCallback = lazy(() => import('@pages/Auth/Callback'))

// ==================== DASHBOARD PAGES (Protected) ====================
const DashboardOverview = lazy(() => import('@pages/Dashboard/Overview'))
const DashboardVideos = lazy(() => import('@pages/Dashboard/Videos'))
const DashboardDownloads = lazy(() => import('@pages/Dashboard/Downloads'))
const DashboardMusic = lazy(() => import('@pages/Dashboard/Music'))
const DashboardHistory = lazy(() => import('@pages/Dashboard/History'))
const DashboardFavorites = lazy(() => import('@pages/Dashboard/Favorites'))
const DashboardPlaylists = lazy(() => import('@pages/Dashboard/Playlists'))
const DashboardLibrary = lazy(() => import('@pages/Dashboard/Library'))
const DashboardAnalytics = lazy(() => import('@pages/Dashboard/Analytics'))
const DashboardDiscover = lazy(() => import('@pages/Dashboard/Discover'))

// ==================== PROFILE PAGES (Protected) ====================
const ProfileOverview = lazy(() => import('@pages/Profile/Overview'))
const ProfileSettings = lazy(() => import('@pages/Profile/Settings'))
const ProfileSecurity = lazy(() => import('@pages/Profile/Security'))
const ProfilePreferences = lazy(() => import('@pages/Profile/Preferences'))
const ProfileNotifications = lazy(() => import('@pages/Profile/Notifications'))
const ProfilePrivacy = lazy(() => import('@pages/Profile/Privacy'))
const ProfileDevices = lazy(() => import('@pages/Profile/Devices'))

// ==================== PLAYER PAGES ====================
const VideoPlayer = lazy(() => import('@pages/Player/VideoPlayer'))
const MusicPlayer = lazy(() => import('@pages/Player/MusicPlayer'))
const LiveStream = lazy(() => import('@pages/Player/LiveStream'))

// ==================== SUBSCRIPTION (Mixed) ====================
const Checkout = lazy(() => import('@pages/Subscription/Checkout'))
const Billing = lazy(() => import('@pages/Subscription/Billing'))
const SubscriptionSuccess = lazy(() => import('@pages/Subscription/Success'))

// ==================== ADMIN PAGES (Protected + Role) ====================
const AdminDashboard = lazy(() => import('@pages/Admin/Dashboard'))
const AdminUsers = lazy(() => import('@pages/Admin/Users'))
const AdminContent = lazy(() => import('@pages/Admin/Content'))
const AdminAnalytics = lazy(() => import('@pages/Admin/Analytics'))
const AdminSettings = lazy(() => import('@pages/Admin/Settings'))
const AdminLogs = lazy(() => import('@pages/Admin/Logs'))
const AdminReports = lazy(() => import('@pages/Admin/Reports'))
const AdminModeration = lazy(() => import('@pages/Admin/Moderation'))
const AdminAPI = lazy(() => import('@pages/Admin/API'))

// ==================== DEVELOPER PAGES ====================
const Devs = lazy(() => import('@pages/Devs'))
const DevsAPI = lazy(() => import('@pages/Devs/API'))
const DevsDocumentation = lazy(() => import('@pages/Devs/Documentation'))
const DevsSandbox = lazy(() => import('@pages/Devs/Sandbox'))
const DevsChangelog = lazy(() => import('@pages/Devs/Changelog'))
const DevsSDKs = lazy(() => import('@pages/Devs/SDKs'))
const DevsExamples = lazy(() => import('@pages/Devs/Examples'))

// ==================== COLLABORATION PAGES (Protected) ====================
const CollaborationRooms = lazy(() => import('@pages/Collaboration/Rooms'))
const WatchParty = lazy(() => import('@pages/Collaboration/WatchParty'))
const SharedPlaylists = lazy(() => import('@pages/Collaboration/SharedPlaylists'))
const Live = lazy(() => import('@pages/Collaboration/Live'))

// ==================== MUSIC PAGES (Protected) ====================
const MusicLibrary = lazy(() => import('@pages/Music/Library'))
const MusicAlbums = lazy(() => import('@pages/Music/Albums'))
const MusicArtists = lazy(() => import('@pages/Music/Artists'))
const MusicRadio = lazy(() => import('@pages/Music/Radio'))
const MusicPlaylists = lazy(() => import('@pages/Music/Playlists'))
const MusicDiscover = lazy(() => import('@pages/Music/Discover'))

// ==================== LEGAL PAGES ====================
const Terms = lazy(() => import('@pages/Legal/Terms'))
const Privacy = lazy(() => import('@pages/Legal/Privacy'))
const DMCA = lazy(() => import('@pages/Legal/DMCA'))

// ==================== ERROR PAGES ====================
const NotFound = lazy(() => import('@pages/NotFound'))
const Error = lazy(() => import('@pages/Error'))

// ==================== ROUTE CONFIGURATION ====================
export const routes = [
  // 1. SPLASH SCREEN (First load)
  {
    path: '/splash',
    element: <Splash />,
  },

  // 2. PUBLIC LANDING PAGES (Anyone can view)
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },                    // Landing page
      { path: 'features', element: <Features /> },           // Features showcase
      { path: 'pricing', element: <Pricing /> },             // Pricing plans
      { path: 'about', element: <About /> },                 // About us
      { path: 'contact', element: <Contact /> },             // Contact form
      { path: 'download', element: <Download /> },           // Download tool
      { path: 'search', element: <Search /> },               // Search
      { path: 'status', element: <Status /> },               // System status
      { path: 'blog', element: <Blog /> },                   // Blog
      { path: 'careers', element: <Careers /> },             // Careers
      { path: 'help', element: <Help /> },                   // Help Center
      { path: 'community', element: <Community /> },         // Community
      { path: 'cookies', element: <Cookies /> },             // Cookie policy
      { path: 'terms', element: <Terms /> },                 // Terms of service
      { path: 'privacy', element: <Privacy /> },             // Privacy policy
      { path: 'dmca', element: <DMCA /> },                   // DMCA
    ],
  },

  // 2b. ERROR/ACCESS PAGES
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },

  // 3. AUTH PAGES (Guest only - redirects to dashboard if logged in)
  {
    path: '/login',
    element: <GuestRoute><AuthLayout /></GuestRoute>,
    children: [
      { index: true, element: <Login /> },
    ],
  },
  {
    path: '/register',
    element: <GuestRoute><AuthLayout /></GuestRoute>,
    children: [
      { index: true, element: <Register /> },
    ],
  },
  {
    path: '/forgot-password',
    element: <GuestRoute><AuthLayout /></GuestRoute>,
    children: [
      { index: true, element: <ForgotPassword /> },
    ],
  },
  {
    path: '/reset-password/:token',
    element: <GuestRoute><AuthLayout /></GuestRoute>,
    children: [
      { index: true, element: <ResetPassword /> },
    ],
  },
  {
    path: '/verify/:token',
    element: <GuestRoute><AuthLayout /></GuestRoute>,
    children: [
      { index: true, element: <Verify /> },
    ],
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />,
  },

  // 4. DASHBOARD (Protected - requires login)
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
      { path: 'discover', element: <DashboardDiscover /> },
    ],
  },

  // 5. PROFILE (Protected - requires login)
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

  // 6. SUBSCRIPTION (Checkout & Billing - Protected)
  {
    path: '/subscription',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { path: 'checkout/:planId', element: <Checkout /> },
      { path: 'billing', element: <Billing /> },
      { path: 'success', element: <SubscriptionSuccess /> },
    ],
  },

  // 7. PLAYER (Video/Music playback)
  {
    path: '/player',
    element: <PlayerLayout />,
    children: [
      { path: 'video/:id', element: <VideoPlayer /> },
      { path: 'music/:id', element: <MusicPlayer /> },
      { path: 'live/:id', element: <LiveStream /> },
    ],
  },

  // 8. COLLABORATION (Protected - Watch parties, etc.)
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

  // 9. MUSIC LIBRARY (Protected)
  {
    path: '/music',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <MusicLibrary /> },
      { path: 'albums', element: <MusicAlbums /> },
      { path: 'artists', element: <MusicArtists /> },
      { path: 'radio', element: <MusicRadio /> },
      { path: 'playlists', element: <MusicPlaylists /> },
      { path: 'discover', element: <MusicDiscover /> },
    ],
  },

  // 10. DEVELOPER DOCS (Public)
  {
    path: '/devs',
    element: <MainLayout />,
    children: [
      { index: true, element: <Devs /> },
      { path: 'api', element: <DevsAPI /> },
      { path: 'docs', element: <DevsDocumentation /> },
      { path: 'sandbox', element: <DevsSandbox /> },
      { path: 'changelog', element: <DevsChangelog /> },
      { path: 'sdks', element: <DevsSDKs /> },
      { path: 'examples', element: <DevsExamples /> },
    ],
  },

  // 11. ADMIN PANEL (Protected + Admin Role)
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

  // 12. ERROR PAGES
  { path: '/error', element: <Error /> },
  { path: '*', element: <NotFound /> },
]

export default routes
