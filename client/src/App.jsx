import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import TestList from './pages/TestList';
import TakeTest from './pages/TakeTest';
import TestResult from './pages/TestResult';
import AIDoubtSolver from './components/AIDoubtSolver';
import WhatsAppFloat from './components/WhatsAppFloat';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/tests" element={<ProtectedRoute><TestList /></ProtectedRoute>} />
        <Route path="/test/:id" element={<ProtectedRoute><TakeTest /></ProtectedRoute>} />
        <Route path="/result/:id" element={<ProtectedRoute><TestResult /></ProtectedRoute>} />
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
