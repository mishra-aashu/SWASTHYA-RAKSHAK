
import React, { useState } from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import { TricolorBar } from '../constants';
import { Building2, MapPin, Bot, User, Plus } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleKendraLogin = () => {
    if (password === 'india') {
      login('kendra');
      navigate('/kendra/dashboard');
    } else {
      setError('गलत पासवर्ड | Incorrect Password');
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
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden border-t-8 border-[#0D47A1]">
          <div className="bg-[#0D47A1] p-8 text-center relative overflow-hidden">
            {/* Subtle background pattern using Plus icons instead of unicode symbols */}
            <div className="absolute -right-4 -bottom-4 opacity-5 text-white">
              <Plus className="w-32 h-32" />
            </div>
            <div className="mb-4 flex justify-center relative">
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <Building2 className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
            </div>
            <h2 className="text-white text-3xl font-bold font-heading relative">स्वास्थ्य रक्षक</h2>
            <p className="text-white/80 text-sm mt-1 font-medium relative">Swasthya Rakshak</p>
            <div className="mt-2 inline-block bg-[#FFC107] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter">
              National Health Surveillance System
            </div>
          </div>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-800">पोर्टल में प्रवेश करें | Portal Access</h3>
              <p className="text-gray-500 text-sm mt-2">Digital Health Initiative for Bihar State</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 text-xs rounded-lg text-center font-medium">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="केंद्र पासवर्ड | Kendra Password"
                  className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] focus:border-transparent transition-all"
                />
                <button 
                  onClick={handleKendraLogin}
                  className="w-full mt-2 bg-[#0D47A1] text-white p-4 rounded-lg font-bold hover:bg-opacity-90 transition-all"
                >
                  केंद्र लॉगिन | Kendra Login
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-400 font-bold uppercase tracking-widest text-[10px]">Or Use Demo</span>
                </div>
              </div>

              <button 
                onClick={handleGuestLogin}
                className="w-full bg-gray-50 border-2 border-gray-200 text-gray-600 p-4 rounded-lg font-bold text-sm hover:bg-gray-100 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" /> गेस्ट लॉगिन (डेमो) | Guest Access (Demo)
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                <MapPin className="w-6 h-6 text-blue-600 mb-1" />
                <p className="text-[10px] font-bold text-blue-800 text-center">Location Alerts</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-green-50/50 rounded-lg border border-green-100">
                <Bot className="w-6 h-6 text-green-600 mb-1" />
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
