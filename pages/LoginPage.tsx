
import React, { useState } from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import { TricolorBar } from '../constants';
import { Building2, User, KeyRound, ArrowRight } from 'lucide-react';
import styles from './Login.module.css'; // Import the CSS module

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleKendraLogin = () => {
    if (password === 'india') {
      login('kendra');
      navigate('/select-role');
    } else {
      setError('गलत पासवर्ड | Incorrect Password');
    }
  };

  const handleGuestLogin = () => {
    login('user');
    navigate('/user/home');
  };

  return (
    <div className={styles.loginContainer}>
      <TricolorBar />
      <div className={styles.loginContent}>
        <div className={styles.loginCard}>
          
          {/* Left side with branding and image */}
          <div className={styles.brandingSection}>
            <div className={styles.brandingBackgroundGradient}></div>
            <div className={styles.brandingCircleTop}></div>
            <div className={styles.brandingCircleBottom}></div>
            
            <div className={styles.brandingContent}>
              <div>
                <div className={styles.brandingHeader}>
                  <Building2 className={styles.brandingIcon} />
                  <h1 className={styles.brandingTitle}>स्वास्थ्य रक्षक</h1>
                </div>
                <p className={styles.brandingText}>
                  A National Health Surveillance System to monitor and predict disease outbreaks, ensuring a healthier tomorrow for all.
                </p>
              </div>
              <div className={styles.brandingFooter}>
                <p className={styles.brandingFooterTitle}>Powered by Digital India</p>
                <p className={styles.brandingFooterText}>in collaboration with Bihar Health Department.</p>
              </div>
            </div>
          </div>

          {/* Right side with form */}
          <div className={styles.formSection}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Portal Access</h2>
              <p className={styles.formSubtitle}>Enter your credentials or continue as a guest.</p>
            </div>

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <div className={styles.formFields}>
              <div className={styles.inputWrapper}>
                <KeyRound className={styles.inputIcon} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kendra Access Code"
                  className={styles.inputField}
                />
              </div>
              <button 
                onClick={handleKendraLogin}
                className={styles.kendraLoginButton}
              >
                <span>Kendra Login</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className={styles.separator}>
                <div className={styles.separatorLine}>
                  <div className={styles.separatorLineDiv}></div>
                </div>
                <div className={styles.separatorTextWrapper}>
                  <span className={styles.separatorText}>OR</span>
                </div>
              </div>

              <button 
                onClick={handleGuestLogin}
                className={styles.guestLoginButton}
              >
                <User className="w-5 h-5" />
                <span>Continue as Guest</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
