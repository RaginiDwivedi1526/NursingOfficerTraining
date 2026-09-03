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
import RecordedClasses from './pages/RecordedClasses';
import AILearning from './pages/AILearning';
import StudyMaterial from './pages/StudyMaterial';
import Notes from './pages/Notes';
import TestSeries from './pages/TestSeries';
import PYQPractice from './pages/PYQPractice';
import QuestionBank from './pages/QuestionBank';
import Performance from './pages/Performance';
import MyMistakes from './pages/MyMistakes';
import AIInsights from './pages/AIInsights';
import MyPlan from './pages/MyPlan';
import Bookmarks from './pages/Bookmarks';
import Downloads from './pages/Downloads';
import Certificates from './pages/Certificates';
import FreeTests from './pages/FreeTests';
import SkillLab from './pages/SkillLab';
import ClinicalCases from './pages/ClinicalCases';
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
import StudentLayout from './components/dashboard/StudentLayout';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <StudentLayout>{children}</StudentLayout> : <Navigate to="/login" />;
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
  const hideNav = location.pathname.startsWith('/admin') || 
                  ['/dashboard', '/tests', '/test/', '/result/', '/live-classes', '/recorded', '/ai-learning', '/study-material', '/notes', '/test-series', '/pyq-practice', '/question-bank', '/performance', '/mistakes', '/insights', '/my-plan', '/bookmarks', '/downloads', '/certificates', '/free-tests', '/skill-lab', '/clinical-cases', '/library'].some(p => location.pathname.startsWith(p));
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
        <Route path="/recorded" element={<ProtectedRoute><RecordedClasses /></ProtectedRoute>} />
        <Route path="/ai-learning" element={<ProtectedRoute><AILearning /></ProtectedRoute>} />
        <Route path="/study-material" element={<ProtectedRoute><StudyMaterial /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path="/test-series" element={<ProtectedRoute><TestSeries /></ProtectedRoute>} />
        <Route path="/pyq-practice" element={<ProtectedRoute><PYQPractice /></ProtectedRoute>} />
        <Route path="/question-bank" element={<ProtectedRoute><QuestionBank /></ProtectedRoute>} />
        <Route path="/performance" element={<ProtectedRoute><Performance /></ProtectedRoute>} />
        <Route path="/mistakes" element={<ProtectedRoute><MyMistakes /></ProtectedRoute>} />
        <Route path="/insights" element={<ProtectedRoute><AIInsights /></ProtectedRoute>} />
        <Route path="/my-plan" element={<ProtectedRoute><MyPlan /></ProtectedRoute>} />
        <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
        <Route path="/downloads" element={<ProtectedRoute><Downloads /></ProtectedRoute>} />
        <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
        <Route path="/free-tests" element={<ProtectedRoute><FreeTests /></ProtectedRoute>} />
        <Route path="/skill-lab" element={<ProtectedRoute><SkillLab /></ProtectedRoute>} />
        <Route path="/clinical-cases" element={<ProtectedRoute><ClinicalCases /></ProtectedRoute>} />
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
