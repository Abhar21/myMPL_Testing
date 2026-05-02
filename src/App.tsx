import React, { useState, useEffect } from 'react';
import './App.css';
import './Responsive.css';

function App() {
  const [phone, setPhone] = useState('');
  const [showTopBar, setShowTopBar] = useState(() => {
    return localStorage.getItem('hideTopBar') !== 'true';
  });

  // Login Modal States
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginStep, setLoginStep] = useState<'mobile' | 'otp' | 'password'>('mobile');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  // Forgot Password Flow States
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1);
  const [forgotPhone, setForgotPhone] = useState('');
  const [forgotOtp, setForgotOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotTimer, setForgotTimer] = useState(30);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Countdown to May 30 deadline
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const deadline = new Date('2026-05-30T23:59:59').getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, deadline - now);
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60)
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (loginStep === 'otp' && resendTimer > 0) {
      const timerId = setInterval(() => setResendTimer(prev => prev - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [loginStep, resendTimer]);

  useEffect(() => {
    if (isForgotPasswordOpen && forgotStep === 2 && forgotTimer > 0) {
      const timerId = setInterval(() => setForgotTimer(prev => prev - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [isForgotPasswordOpen, forgotStep, forgotTimer]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const isValidPhone = phone.length === 10;

  return (
    <div className="landing-wrapper">
      {showTopBar && (
        <div className="announcement-strap" style={{
          width: '100%',
          background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
          color: '#ffffff',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.2px',
          position: 'relative',
          gap: '8px'
        }}>
          <span style={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>🚀 ₹0 onboarding for early partners</span>
            <span>•</span>
            <span>12-month money-back guarantee</span>
            <span>•</span>
            <span>Low commission</span>
          </span>
          <button
            onClick={() => {
              setShowTopBar(false);
              localStorage.setItem('hideTopBar', 'true');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              lineHeight: 1,
              opacity: 0.85,
              transition: 'opacity 0.2s ease',
              outline: 'none',
              position: 'absolute',
              right: '16px'
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
      {/* 1. HEADER / NAVBAR */}
      <header className="site-header">
        <div className="header-logo-container">
          <div className="brand-logo-text">myMooment</div>
          <div className="brand-subtitle">Partner Access</div>
        </div>

        <div className="header-actions">
          <button className="btn-header-login" onClick={() => {
            setIsLoginOpen(true);
            setLoginStep('mobile');
            setLoginPhone('');
            setLoginPassword('');
            setResendTimer(30);
          }}>Login</button>
        </div>
      </header>


      {/* 3. MAIN GRID LAYOUT */}
      <main className="main-grid-container">
        {/* Left Column Sections */}
        <div className="main-text-group">
          <div className="platform-pill">
            India's #1 Direct Booking Event Platform
          </div>

          <h1 className="page-title">
            Get booked instantly<br />
            No calls, <span className="page-title-highlight">Direct Bookings</span>
          </h1>

          <p className="page-description">
            Customers discover your services and book instantly through the platform.
          </p>
        </div>

        <div className="documents-features-group">
          {/* Get Started Documents Card */}
          <div style={{
            background: 'rgba(124, 58, 237, 0.04)',
            border: '1.5px solid rgba(124, 58, 237, 0.15)',
            borderRadius: '16px',
            padding: '20px 24px',
            marginTop: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Shining ₹0 Badge */}
            <div className="shine-badge">
              <span>₹0 Onboarding Charges</span>
            </div>

            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 4px 0', paddingRight: '160px' }}>
              Quick setup, Just 5 minutes.
            </h3>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px 0', fontWeight: 500 }}>
              Please keep these details and documents while onboarding.
            </p>

            <div className="documents-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
              {/* Item 1 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2 }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>PAN card</span>
              </div>

              {/* Item 2 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2 }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>GST number, if applicable</span>
              </div>

              {/* Item 3 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2 }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>FSSAI license, if applicable</span>
              </div>

              {/* Item 4 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2 }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>Profile food image</span>
              </div>

              {/* Item 5 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2 }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>Bank account details</span>
              </div>
            </div>
          </div>

          {/* Icon Features Grid */}
          <div className="features-mini-grid">
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
              <div className="feature-text-block">
                <h3 className="feature-label-title">More bookings</h3>
                <p className="feature-label-desc">Get direct booking</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div className="feature-text-block">
                <h3 className="feature-label-title">Secure advance</h3>
                <p className="feature-label-desc">Receive before the event</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper pink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <div className="feature-text-block">
                <h3 className="feature-label-title">Full pricing control</h3>
                <p className="feature-label-desc">Set your prices</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. RIGHT COLUMN - MOBILE LOGIN/REGISTER CARD (2ND IMAGE UI) */}
        <section className="onboarding-right">
          <div className="login-card" style={{
            background: '#ffffff',
            border: '1.5px solid rgba(0, 0, 0, 0.05)',
            borderRadius: '24px',
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: '460px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div className="card-top-content" style={{ padding: '32px 32px 24px 32px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
              {/* Partners joining badge */}
              <div className="normal-badge">
                <span>Partners joining Everyday</span>
              </div>

              <div className="card-heading-section" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <h2 className="card-main-title" style={{ fontSize: '30px', fontWeight: 800, color: '#111827', margin: 0 }}>Get Started</h2>
                <p className="card-supporting-text" style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Ceate an account using your mobile number</p>
              </div>

              {/* Free Onboarding Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #1f1440 0%, #3a227b 100%)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                margin: '8px 0 4px 0',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', zIndex: 2 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <h4 className="banner-heading" style={{ color: '#ffffff', margin: 0, fontSize: '18px', fontWeight: 700, letterSpacing: '-0.1px' }}>₹0 Onboarding Charges!</h4>

                    {/* Time limited sub badge */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '20px',
                      padding: '4px 10px',
                      marginTop: '6px',
                      width: 'fit-content'
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#d1c4e9" strokeWidth="2" style={{ width: 11, height: 11 }}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="ends-may-text" style={{ color: '#d1c4e9', fontSize: '11px', fontWeight: 600 }}>Ends May 30 —&nbsp;</span>
                      <span className="countdown-text" style={{ color: '#ffffff', fontSize: '11px', fontWeight: 800, letterSpacing: '0.2px' }}>
                        {String(countdown.days).padStart(2, '0')}d &nbsp;{String(countdown.hours).padStart(2, '0')}h &nbsp;{String(countdown.mins).padStart(2, '0')}m &nbsp;{String(countdown.secs).padStart(2, '0')}s
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dotted separator line */}
                <div style={{
                  height: '48px',
                  borderLeft: '1.5px dashed rgba(255, 255, 255, 0.25)',
                  margin: '0 12px',
                  zIndex: 2
                }} />

                {/* Gift SVG Asset */}
                <div style={{ position: 'relative', height: '60px', width: '60px', zIndex: 2 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                    <path d="M20 12v10H4V12"></path>
                    <path d="M2 7h20v5H2z"></path>
                    <path d="M12 22V7"></path>
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                  </svg>
                  <span style={{
                    position: 'absolute',
                    bottom: -2,
                    right: -2,
                    backgroundColor: '#f59e0b',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 800,
                    borderRadius: '6px',
                    padding: '3px 6px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                    letterSpacing: '-0.2px'
                  }}>₹0</span>
                </div>
              </div>

              {/* Mobile Input Area with Floating Top Border Label */}
              <div style={{
                position: 'relative',
                border: '1.5px solid #e5e7eb',
                borderRadius: '12px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ffffff',
                transition: 'border-color 0.3s ease',
                marginTop: '8px'
              }} className="phone-input-container">

                {/* Country Code Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', paddingRight: '8px', borderRight: '1.5px solid #f3f4f6' }}>
                  <img src="https://flagcdn.com/w40/in.png" style={{ width: '24px', height: '16px', borderRadius: '2px' }} alt="IN" />
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#111827' }}>+91</span>
                </div>

                {/* Input element */}
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#111827',
                    width: '100%',
                    padding: '4px 2px',
                    background: 'transparent'
                  }}
                />
              </div>

              {/* Continue Submit */}
              <button
                className={`btn-continue-submit ${isValidPhone ? 'active' : ''}`}
                disabled={!isValidPhone}
                style={{
                  backgroundColor: isValidPhone ? '#7c3aed' : '#9ca3af',
                  color: '#ffffff',
                  width: '100%',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: 'none',
                  cursor: isValidPhone ? 'pointer' : 'default',
                  transition: 'background-color 0.3s ease',
                  boxShadow: isValidPhone ? '0 4px 14px rgba(124, 58, 237, 0.3)' : 'none',
                  marginTop: '4px'
                }}
              >
                <span>Continue</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              {/* Security Onboarding Footer Text */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: '#6b7280',
                fontSize: '13px',
                fontWeight: 500,
                marginTop: '4px',
                marginBottom: '4px'
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <polyline points="9 11 11 13 15 9"></polyline>
                </svg>
                <span>Secure, fast & easy onboarding</span>
              </div>
            </div>

            {/* Redesigned Bottom Green Guarantee Section */}
            <div style={{ backgroundColor: '#f4fbf7', borderTop: '1px solid #e2f4ea', padding: '24px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 8px',
                    borderRadius: '6px',
                    letterSpacing: '0.5px'
                  }}>GUARANTEE</span>
                </div>

                <span style={{ fontSize: '11px', fontWeight: 600, color: '#15803d' }}>*T&C Apply</span>
              </div>

              <div className="offer-body-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h4 className="offer-promo-title" style={{ color: '#111827', margin: 0, fontSize: '16px', fontWeight: 700 }}>No bookings? Get your money back</h4>
                <p className="offer-promo-desc" style={{ color: '#4b5563', margin: 0, fontSize: '13px', fontWeight: 500, lineHeight: '1.4' }}>If you don't receive any confirmed bookings in 12 months.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 4. WHY EVENT PARTNERS CHOOSE SECTION */}
      <section className="why-choose-section" style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#111827', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>Why Event Partners choose myMooment</h2>
          <p style={{ fontSize: '16px', color: '#4b5563', margin: 0, fontWeight: 500 }}>Built for Event Partners who want direct bookings, not leads</p>
        </div>

        <div className="why-choose-grid">
          {/* Item 1 */}
          <div className="why-choose-card">
            <div className="why-choose-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <h3 className="why-choose-card-title">Direct bookings</h3>
            <p className="why-choose-card-desc">No calls, no follow-ups</p>
          </div>

          {/* Item 2 */}
          <div className="why-choose-card">
            <div className="why-choose-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <h3 className="why-choose-card-title">Advance payouts</h3>
            <p className="why-choose-card-desc">Get paid before the event</p>
          </div>

          {/* Item 3 */}
          <div className="why-choose-card">
            <div className="why-choose-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
            </div>
            <h3 className="why-choose-card-title">Full pricing control</h3>
            <p className="why-choose-card-desc">Set your own prices</p>
          </div>

          {/* Item 4 */}
          <div className="why-choose-card">
            <div className="why-choose-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 11 11 13 15 9"></polyline>
              </svg>
            </div>
            <h3 className="why-choose-card-title">Zero risk</h3>
            <p className="why-choose-card-desc">Money-back guarantee</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: '#0a0514',
        color: '#ffffff',
        padding: '64px 20px 32px 20px',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
          marginBottom: '64px'
        }}>
          {/* COLUMN 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.3px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              myMooment
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#9ca3af',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '280px'
            }}>
              Direct booking platform for event Partners. No calls. Just bookings.
            </p>
            <a href="mailto:support@mymooment.com" style={{
              fontSize: '14px',
              color: '#a78bfa',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              support@mymooment.com
            </a>
          </div>

          {/* COLUMN 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>Company</h4>
            <a href="#about" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>About Us</a>
            <a href="#contact" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Contact Us</a>
          </div>

          {/* COLUMN 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>For Event Partners</h4>
            <a href="#partner" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Become a Partner</a>
          </div>

          {/* COLUMN 4 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>Legal</h4>
            <a href="#privacy" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Privacy Policy</a>
            <a href="#terms" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Terms & Conditions</a>
            <a href="#refund" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Refund & Cancellation Policy</a>
            <a href="#vendor-agreement" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Vendor Agreement</a>
            <a href="#payment-policy" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Payment & Settlement Policy</a>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13.5px',
          color: '#6b7280'
        }}>
          <span>© 2026 myMooment. All rights reserved.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Made in India 🇮🇳
          </span>
        </div>
      </footer>

      {/* 4. PREMIUM LOGIN MODAL POPUP */}
      {isLoginOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            padding: '36px 32px',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            border: '1px solid #f3f4f6'
          }}>
            {/* Close modal button */}
            <button
              onClick={() => setIsLoginOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f3f4f6',
                border: 'none',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                fontSize: '18px',
                outline: 'none',
                transition: 'background 0.2s ease, color 0.2s ease'
              }}
              aria-label="Close Login Modal"
            >
              ×
            </button>

            {/* Single Login Step with Mobile + Password */}
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 8px 0', letterSpacing: '-0.3px' }}>
                Login to myMooment
              </h3>
              <p style={{ fontSize: '13.5px', color: '#6b7280', margin: 0 }}>
                Enter your details to continue
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', color: '#4b5563', fontWeight: 600 }}>Mobile Number, Email ID or Vendor ID</label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '4px 12px',
                  gap: '12px',
                  background: '#fafafa'
                }}>
                  <input
                    type="text"
                    placeholder="Enter"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '12px 4px',
                      border: 'none',
                      background: 'none',
                      fontSize: '14.5px',
                      color: '#111827',
                      outline: 'none',
                      fontWeight: 500
                    }}
                    autoFocus
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '13px', color: '#4b5563', fontWeight: 600 }}>Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoginOpen(false);
                      setIsForgotPasswordOpen(true);
                      setForgotStep(1);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#7c3aed',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '12px 48px 12px 16px',
                      border: '1.5px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '14.5px',
                      color: '#111827',
                      background: '#fafafa',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      fontWeight: 500
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#6b7280',
                      cursor: 'pointer',
                      outline: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0
                    }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A10.38 10.38 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                        <path d="M12 12a3 3 0 1 0-3-3"></path>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  if (loginPhone.trim() && loginPassword.trim()) {
                    alert('Login successful!');
                    setIsLoginOpen(false);
                  }
                }}
                disabled={!loginPhone.trim() || !loginPassword.trim()}
                style={{
                  background: loginPhone.trim() && loginPassword.trim() ? '#7c3aed' : '#d8b4fe',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px 20px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: loginPhone.trim() && loginPassword.trim() ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s ease, transform 0.2s ease',
                  outline: 'none',
                  boxShadow: loginPhone.trim() && loginPassword.trim() ? '0 8px 16px -4px rgba(124, 58, 237, 0.35)' : 'none'
                }}
              >
                Login
              </button>

              <div style={{ textAlign: 'center', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '13.5px', color: '#4b5563', fontWeight: 500 }}>
                  New to myMooment?{' '}
                  <button
                    onClick={() => {
                      alert('Account creation is coming soon!');
                      setIsLoginOpen(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#7c3aed',
                      fontWeight: 700,
                      cursor: 'pointer',
                      outline: 'none',
                      padding: 0,
                      fontSize: '13.5px'
                    }}
                  >
                    Create Account
                  </button>
                </span>
                <span style={{ fontSize: '13px', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#ecfdf5', padding: '6px 12px', borderRadius: '8px', alignSelf: 'center' }}>
                  ₹0 Onboarding charges
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. FORGOT PASSWORD MODAL FLOW */}
      {isForgotPasswordOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            padding: '36px 32px',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            border: '1px solid #f3f4f6'
          }}>
            {/* Close modal button */}
            <button
              onClick={() => setIsForgotPasswordOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f3f4f6',
                border: 'none',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                fontSize: '18px',
                outline: 'none',
                transition: 'background 0.2s ease, color 0.2s ease'
              }}
              aria-label="Close Modal"
            >
              ×
            </button>

            {/* STEP 1: ENTER MOBILE */}
            {forgotStep === 1 && (
              <>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 8px 0', letterSpacing: '-0.3px' }}>
                    Reset your password
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#6b7280', margin: 0 }}>
                    Enter your mobile number to receive an OTP
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', color: '#4b5563', fontWeight: 600 }}>Mobile Number</label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1.5px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '4px 12px',
                      gap: '12px',
                      background: '#fafafa'
                    }}>
                      <span style={{ fontSize: '14.5px', color: '#4b5563', fontWeight: 600 }}>+91</span>
                      <span style={{ width: '1px', height: '24px', background: '#e5e7eb' }}></span>
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        value={forgotPhone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 10) setForgotPhone(val);
                        }}
                        style={{
                          flex: 1,
                          padding: '12px 0',
                          border: 'none',
                          background: 'none',
                          fontSize: '14.5px',
                          color: '#111827',
                          outline: 'none',
                          fontWeight: 500
                        }}
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (forgotPhone.length === 10) {
                        setForgotStep(2);
                        setForgotTimer(30);
                      }
                    }}
                    disabled={forgotPhone.length !== 10}
                    style={{
                      background: forgotPhone.length === 10 ? '#7c3aed' : '#d8b4fe',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px 20px',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: forgotPhone.length === 10 ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s ease, transform 0.2s ease',
                      outline: 'none',
                      boxShadow: forgotPhone.length === 10 ? '0 8px 16px -4px rgba(124, 58, 237, 0.35)' : 'none'
                    }}
                  >
                    Send OTP
                  </button>
                </div>
              </>
            )}

            {/* STEP 2: VERIFY OTP */}
            {forgotStep === 2 && (
              <>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 8px 0', letterSpacing: '-0.3px' }}>
                    Verify OTP
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#6b7280', margin: 0 }}>
                    Enter the 4-digit code sent to +91 {forgotPhone}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                      {forgotOtp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`forgot-otp-${idx}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val) {
                              const nextOtp = [...forgotOtp];
                              nextOtp[idx] = val.substring(0, 1);
                              setForgotOtp(nextOtp);
                              if (idx < 3) {
                                document.getElementById(`forgot-otp-${idx + 1}`)?.focus();
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace') {
                              if (!forgotOtp[idx] && idx > 0) {
                                document.getElementById(`forgot-otp-${idx - 1}`)?.focus();
                              } else {
                                const nextOtp = [...forgotOtp];
                                nextOtp[idx] = '';
                                setForgotOtp(nextOtp);
                              }
                            }
                          }}
                          style={{
                            width: '48px',
                            height: '52px',
                            textAlign: 'center',
                            fontSize: '20px',
                            fontWeight: 700,
                            borderRadius: '12px',
                            border: digit ? '2px solid #7c3aed' : '1.5px solid #e5e7eb',
                            background: '#fafafa',
                            color: '#111827',
                            outline: 'none',
                            transition: 'border-color 0.15s ease'
                          }}
                          autoFocus={idx === 0}
                        />
                      ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '4px' }}>
                      {forgotTimer > 0 ? (
                        <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>
                          Resend OTP in <span style={{ color: '#111827', fontWeight: 600 }}>{forgotTimer}s</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setForgotTimer(30);
                            alert('OTP resent successfully!');
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#7c3aed',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            outline: 'none',
                            padding: 0
                          }}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (forgotOtp.every(d => d !== '')) {
                        setForgotStep(3);
                      }
                    }}
                    disabled={!forgotOtp.every(d => d !== '')}
                    style={{
                      background: forgotOtp.every(d => d !== '') ? '#7c3aed' : '#d8b4fe',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px 20px',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: forgotOtp.every(d => d !== '') ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s ease, transform 0.2s ease',
                      outline: 'none',
                      boxShadow: forgotOtp.every(d => d !== '') ? '0 8px 16px -4px rgba(124, 58, 237, 0.35)' : 'none'
                    }}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* STEP 3: NEW PASSWORD & SUCCESS */}
            {forgotStep === 3 && (
              <>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 8px 0', letterSpacing: '-0.3px' }}>
                    Create new password
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#6b7280', margin: 0 }}>
                    Enter a secure password for your account
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* New Password field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '13px', color: '#4b5563', fontWeight: 600 }}>New Password</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '12px 48px 12px 16px',
                            border: '1.5px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '14.5px',
                            color: '#111827',
                            background: '#fafafa',
                            outline: 'none',
                            fontWeight: 500
                          }}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          style={{
                            position: 'absolute',
                            right: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: '#6b7280',
                            cursor: 'pointer',
                            outline: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0
                          }}
                        >
                          {showNewPassword ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A10.38 10.38 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
                              <line x1="1" y1="1" x2="23" y2="23"></line>
                              <path d="M12 12a3 3 0 1 0-3-3"></path>
                            </svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '13px', color: '#4b5563', fontWeight: 600 }}>Confirm Password</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '12px 48px 12px 16px',
                            border: '1.5px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '14.5px',
                            color: '#111827',
                            background: '#fafafa',
                            outline: 'none',
                            fontWeight: 500
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          style={{
                            position: 'absolute',
                            right: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: '#6b7280',
                            cursor: 'pointer',
                            outline: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0
                          }}
                        >
                          {showConfirmPassword ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A10.38 10.38 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
                              <line x1="1" y1="1" x2="23" y2="23"></line>
                              <path d="M12 12a3 3 0 1 0-3-3"></path>
                            </svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {newPassword && confirmPassword && newPassword !== confirmPassword && (
                    <p style={{ margin: 0, color: '#ef4444', fontSize: '13px', fontWeight: 500 }}>
                      Passwords do not match
                    </p>
                  )}

                  <button
                    onClick={() => {
                      if (newPassword && newPassword === confirmPassword) {
                        alert('Password updated successfully');
                        setIsForgotPasswordOpen(false);
                        // Clear fields
                        setForgotPhone('');
                        setForgotOtp(['', '', '', '']);
                        setNewPassword('');
                        setConfirmPassword('');
                      }
                    }}
                    disabled={!newPassword || newPassword !== confirmPassword}
                    style={{
                      background: newPassword && newPassword === confirmPassword ? '#7c3aed' : '#d8b4fe',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px 20px',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: newPassword && newPassword === confirmPassword ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s ease, transform 0.2s ease',
                      outline: 'none',
                      boxShadow: newPassword && newPassword === confirmPassword ? '0 8px 16px -4px rgba(124, 58, 237, 0.35)' : 'none'
                    }}
                  >
                    Update password
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


