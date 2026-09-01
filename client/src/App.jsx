import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Dashboard from './pages/Dashboard';
import TestList from './pages/TestList';
import TakeTest from './pages/TakeTest';
import TestResult from './pages/TestResult';
import LiveClasses from './pages/LiveClasses';
import Library from './pages/Library';
import PricingPage from './pages/PricingPage';
import CareerPortalPage from './pages/CareerPortalPage';
import NCLEXPreparationPage from './pages/NCLEXPreparationPage';
import IndiaPreparationPage from './pages/IndiaPreparationPage';
import AIDoubtSolver from './components/AIDoubtSolver';
import WhatsAppFloat from './components/WhatsAppFloat';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import StudentProfile from './pages/admin/StudentProfile';
import AdminEnrollments from './pages/admin/AdminEnrollments';
import AdminCourses from './pages/admin/AdminCourses';
import CreateCourse from './pages/admin/CreateCourse';
import AdminTestSeries from './pages/admin/AdminTestSeries';
import CreateTestSeries from './pages/admin/CreateTestSeries';
import AdminMockTests from './pages/admin/AdminMockTests';
import CreateMockTest from './pages/admin/CreateMockTest';
import AdminLiveClasses from './pages/admin/AdminLiveClasses';
import CreateLiveClass from './pages/admin/CreateLiveClass';
import AdminCertificates from './pages/admin/AdminCertificates';
import CreateCertificate from './pages/admin/CreateCertificate';
import AdminDownloads from './pages/admin/AdminDownloads';
import AdminBookmarks from './pages/admin/AdminBookmarks';
import AdminNotes from './pages/admin/AdminNotes';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import CreateAnnouncement from './pages/admin/CreateAnnouncement';
import AdminMessages from './pages/admin/AdminMessages';
import CreateMessage from './pages/admin/CreateMessage';
import AdminAIInsights from './pages/admin/AdminAIInsights';
import AdminReviews from './pages/admin/AdminReviews';
import AdminReports from './pages/admin/AdminReports';

import AdminLayout from './components/admin/AdminLayout';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.role === 'admin' ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <Navigate to="/admin/login" />
  );
};

function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();
  const hideNav = location.pathname.startsWith('/admin');
  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" /> : <ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={user ? <Navigate to="/dashboard" /> : <ResetPasswordPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/tests" element={<ProtectedRoute><TestList /></ProtectedRoute>} />
        <Route path="/test/:id" element={<ProtectedRoute><TakeTest /></ProtectedRoute>} />
        <Route path="/result/:id" element={<ProtectedRoute><TestResult /></ProtectedRoute>} />
        <Route path="/live-classes" element={<ProtectedRoute><LiveClasses /></ProtectedRoute>} />
        <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/career" element={<CareerPortalPage />} />
        <Route path="/nclex-preparation" element={<NCLEXPreparationPage />} />
        <Route path="/india-preparation" element={<IndiaPreparationPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={user && user.role === 'admin' ? <Navigate to="/admin" /> : <AdminLoginPage />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/admin/student/:id" element={<AdminRoute><StudentProfile /></AdminRoute>} />
        <Route path="/admin/enrollments" element={<AdminRoute><AdminEnrollments /></AdminRoute>} />
        <Route path="/admin/courses" element={<AdminRoute><AdminCourses /></AdminRoute>} />
        <Route path="/admin/courses/new" element={<AdminRoute><CreateCourse /></AdminRoute>} />
        <Route path="/admin/tests" element={<AdminRoute><AdminTestSeries /></AdminRoute>} />
        <Route path="/admin/tests/new" element={<AdminRoute><CreateTestSeries /></AdminRoute>} />
        <Route path="/admin/mock-tests" element={<AdminRoute><AdminMockTests /></AdminRoute>} />
        <Route path="/admin/mock-tests/new" element={<AdminRoute><CreateMockTest /></AdminRoute>} />
        <Route path="/admin/live-classes" element={<AdminRoute><AdminLiveClasses /></AdminRoute>} />
        <Route path="/admin/live-classes/new" element={<AdminRoute><CreateLiveClass /></AdminRoute>} />
        <Route path="/admin/certificates" element={<AdminRoute><AdminCertificates /></AdminRoute>} />
        <Route path="/admin/certificates/new" element={<AdminRoute><CreateCertificate /></AdminRoute>} />
        <Route path="/admin/downloads" element={<AdminRoute><AdminDownloads /></AdminRoute>} />
        <Route path="/admin/bookmarks" element={<AdminRoute><AdminBookmarks /></AdminRoute>} />
        <Route path="/admin/notes" element={<AdminRoute><AdminNotes /></AdminRoute>} />
        <Route path="/admin/announcements" element={<AdminRoute><AdminAnnouncements /></AdminRoute>} />
        <Route path="/admin/announcements/new" element={<AdminRoute><CreateAnnouncement /></AdminRoute>} />
        <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />
        <Route path="/admin/messages/new" element={<AdminRoute><CreateMessage /></AdminRoute>} />
        <Route path="/admin/ai-insights" element={<AdminRoute><AdminAIInsights /></AdminRoute>} />
        <Route path="/admin/reviews" element={<AdminRoute><AdminReviews /></AdminRoute>} />
        <Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />
      </Routes>
      {user && <AIDoubtSolver />}
      <WhatsAppFloat />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
