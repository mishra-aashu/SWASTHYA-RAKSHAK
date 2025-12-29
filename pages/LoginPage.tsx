
import React, { useState } from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import { TricolorBar } from '../constants';
import { signInWithGoogle } from '../lib/supabase';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const { error: authError } = await signInWithGoogle();
      if (authError) {
        throw authError;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Auth service unavailable. Using Guest/Demo Mode.');
      // Auto-fallback for hackathon convenience
      setTimeout(() => {
        handleGuestLogin();
      }, 1500);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGuestLogin = () => {
    login('user');
    navigate('/select-role');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <TricolorBar />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden border-t-8 border-[#003366]">
          <div className="bg-[#003366] p-8 text-center relative overflow-hidden">
            {/* Ashoka Chakra background decor */}
            <div className="absolute -right-8 -bottom-8 opacity-10 text-white text-9xl">☸</div>
            <div className="mb-4 flex justify-center relative">
              <span className="text-6xl drop-shadow-lg">🏥</span>
            </div>
            <h2 className="text-white text-3xl font-bold font-heading relative">स्वास्थ्य रक्षक</h2>
            <p className="text-white/80 text-sm mt-1 font-medium relative">Swasthya Rakshak</p>
            <div className="mt-2 inline-block bg-[#FF9933] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter">
              National Health Surveillance System
            </div>
          </div>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-800">पोर्टल में प्रवेश करें | Portal Access</h3>
              <p className="text-gray-500 text-sm mt-2">Digital Health Initiative for Bihar State</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 text-orange-700 text-xs rounded-lg animate-pulse text-center font-medium">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <button 
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className={`w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-[#003366] p-4 rounded-lg transition-all transform hover:-translate-y-1 active:scale-95 group shadow-sm ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoggingIn ? (
                  <div className="w-6 h-6 border-2 border-[#003366] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                <span className="font-bold text-gray-700">Google लॉगिन | Sign in</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-400 font-bold uppercase">Or Use Demo</span>
                </div>
              </div>

              <button 
                onClick={handleGuestLogin}
                className="w-full bg-gray-50 border-2 border-gray-200 text-gray-600 p-4 rounded-lg font-bold text-sm hover:bg-gray-100 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
              >
                <span>👤</span> गेस्ट लॉगिन (डेमो) | Guest Access (Demo)
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                <span className="text-xl mb-1">📍</span>
                <p className="text-[10px] font-bold text-blue-800 text-center">Location Alerts</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-green-50/50 rounded-lg border border-green-100">
                <span className="text-xl mb-1">🤖</span>
                <p className="text-[10px] font-bold text-green-800 text-center">AI Predictions</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 border-t border-gray-100 text-center flex items-center justify-center gap-2">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Digital India | डिजिटल इंडिया</span>
            <div className="h-4 w-[1px] bg-gray-300"></div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Bihar Health</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
