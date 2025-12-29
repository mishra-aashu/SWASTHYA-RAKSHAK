
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { Role, UserProfile } from './types';
import LoginPage from './pages/LoginPage';
import SelectRolePage from './pages/SelectRolePage';
import UserHome from './pages/UserHome';
import KendraDashboard from './pages/KendraDashboard';
import { TricolorBar, GovLogo } from './constants';
import { supabase } from './lib/supabase';
import './App.css'; // Import App.css

interface AuthContextType {
  user: UserProfile | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const ProtectedRoute = ({ children, allowedRoles }: { children?: React.ReactNode, allowedRoles?: Role[] }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/select-role" replace />;
  return <>{children}</>;
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="layoutContainer">
      <TricolorBar />
      <header className="header">
        <div className="headerContent">
          <Link to="/" className="logoLink">
            <GovLogo />
          </Link>
          <div className="userSection">
            {user && (
              <div className="userInfo">
                <div className="userNameRole">
                  <p className="userName">{user.full_name}</p>
                  <p className="userRole">{user.role}</p>
                </div>
                <button 
                  onClick={() => { logout(); navigate('/login'); }}
                  className="logoutButton"
                >
                  लॉगआउट | Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="mainContent">
        {children}
      </main>
      <footer className="footer">
        <div className="footerContent">
          <p className="footerText">© 2025 स्वास्थ्य रक्षक | Swasthya Rakshak</p>
          <p className="footerSubText">National Health Surveillance System</p>
          <div className="footerLinks">
            <a href="#" className="footerLink">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="footerLink">Terms of Service</a>
            <span>|</span>
            <a href="#" className="footerLink">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, full_name, avatar_url')
          .eq('id', session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: profile?.full_name || session.user.user_metadata.full_name || 'User',
          avatar_url: profile?.avatar_url || session.user.user_metadata.avatar_url || '',
          role: profile?.role as Role || 'user',
          district: 'Patna'
        });
      }
    };
    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, full_name, avatar_url')
          .eq('id', session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: profile?.full_name || session.user.user_metadata.full_name || 'User',
          avatar_url: profile?.avatar_url || session.user.user_metadata.avatar_url || '',
          role: profile?.role as Role || 'user',
          district: 'Patna'
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (role: Role) => {
    setUser({
      id: 'demo-user-id',
      email: 'user@bihar.gov.in',
      full_name: '', // Removed "Rahul Kumar"
      avatar_url: '',
      role: role,
      district: 'Patna',
      block: 'Patna Sadar'
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/select-role" element={<ProtectedRoute><SelectRolePage /></ProtectedRoute>} />
          <Route path="/user/home" element={
            <ProtectedRoute allowedRoles={['user']}>
              <Layout><UserHome /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/kendra/dashboard" element={
            <ProtectedRoute allowedRoles={['kendra']}>
              <Layout><KendraDashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to={user?.role === 'kendra' ? "/kendra/dashboard" : "/user/home"} replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
