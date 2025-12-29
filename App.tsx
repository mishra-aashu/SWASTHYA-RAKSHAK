
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { Role, UserProfile } from './types';
import LoginPage from './pages/LoginPage';
import SelectRolePage from './pages/SelectRolePage';
import UserHome from './pages/UserHome';
import KendraDashboard from './pages/KendraDashboard';
import { TricolorBar, GovLogo, COLORS } from './constants';
import { supabase } from './lib/supabase';

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
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/select-role" />;
  return <>{children}</>;
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <TricolorBar />
      <header className="bg-[#003366] px-4 md:px-8 py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <GovLogo />
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-white text-sm font-bold">{user.full_name}</p>
                  <p className="text-[#FF9933] text-[10px] uppercase font-bold">{user.role}</p>
                </div>
                <button 
                  onClick={() => { logout(); navigate('/login'); }}
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-xs transition-colors border border-white/20"
                >
                  लॉगआउट | Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-[#003366] text-white py-8 border-t-4 border-[#FF9933]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm opacity-80 mb-2">© 2025 स्वास्थ्य रक्षक | Swasthya Rakshak</p>
          <p className="text-[10px] opacity-60">National Health Surveillance System - Bihar Initiative</p>
          <div className="mt-4 flex justify-center gap-4 text-[10px] opacity-60 uppercase tracking-widest">
            <a href="#" className="hover:text-[#FF9933]">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-[#FF9933]">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-[#FF9933]">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata.full_name || 'User',
          avatar_url: session.user.user_metadata.avatar_url || '',
          role: 'user', // Default role
          district: 'Patna'
        });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata.full_name || 'User',
          avatar_url: session.user.user_metadata.avatar_url || '',
          role: 'user',
          district: 'Patna'
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (role: Role) => {
    // For demo/hackathon, we still allow manual role setting
    setUser(prev => prev ? { ...prev, role } : {
      id: 'mock-id-123',
      email: 'user@bihar.gov.in',
      full_name: 'Rahul Kumar',
      avatar_url: 'https://picsum.photos/100/100',
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
          <Route path="/" element={<Navigate to={user?.role === 'kendra' ? "/kendra/dashboard" : "/user/home"} />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
