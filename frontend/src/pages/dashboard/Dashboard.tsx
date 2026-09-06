import "./Dashboard.css"


function Dashboard() {
  return (
    <>
      {/* Pure CSS Theme Toggle Support */}
      <input type="checkbox" id="theme-toggle" className="theme-switch-checkbox" aria-label="Toggle dark mode" />

      <div className="auth-page-wrapper">
        <div className="auth-split-grid">
          
          {/* Left Column: Legal Brand Showcase */}
          <aside className="auth-brand-side">
            <div className="auth-brand-header">
              <div className="brand-icon-wrapper">
                {/* Scales of Justice SVG */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                  <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                  <path d="M7 21h10"/>
                  <path d="M12 3v18"/>
                  <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                </svg>
              </div>
              <div className="brand-name">
                <span>JurisDesk</span>
                <span className="brand-tag">Legal Practice Suite</span>
              </div>
            </div>

            <div className="auth-brand-content">
              <span className="auth-quote-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                Chamber Management
              </span>
              <h1 className="auth-hero-title">Precision Case Management for Modern Advocates.</h1>
              <p className="auth-hero-text">
                Streamline court schedules, client communications, hearing dates, and statutory dockets with enterprise-grade judicial workflows.
              </p>

              <ul className="auth-feature-list">
                <li className="auth-feature-item">
                  <span className="auth-feature-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <span>Automated High Court & District Court docket tracking</span>
                </li>
                <li className="auth-feature-item">
                  <span className="auth-feature-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <span>Hearing alerts with courtroom & bench assignments</span>
                </li>
                <li className="auth-feature-item">
                  <span className="auth-feature-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <span>Encrypted client repository & privilege-protected files</span>
                </li>
              </ul>
            </div>

            <div className="auth-brand-footer">
              <span>&copy; 2026 JurisDesk Systems Inc. All rights reserved.</span>
              <span>Bar Compliance Grade AES-256</span>
            </div>
          </aside>

          {/* Right Column: Login Form */}
          <main className="auth-form-side">
            {/* Floating Theme Switch Preview */}
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
              <label htmlFor="theme-toggle" className="theme-toggle-label" title="Toggle Light / Dark Mode">
                <span className="theme-toggle-icon">
                  {/* Sun Icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                  </svg>
                </span>
                <span className="theme-toggle-icon">
                  {/* Moon Icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </span>
                <span className="theme-toggle-slider"></span>
              </label>
            </div>

            <div className="auth-card">
              <div className="auth-form-header">
                <h2 className="auth-form-title">Advocate Sign In</h2>
                <p className="auth-form-subtitle">Enter your chamber credentials to access your legal cases</p>
              </div>

              {/* Info banner */}
              <div className="auth-alert-banner alert-info">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: '1px' }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <div>
                  <strong>Prototype Showcase</strong>: Use sample advocate email or click sign in to browse the dashboard.
                </div>
              </div>

              <form action="../dashboard/index.html" method="get">
                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="login-email" className="form-label">
                    Official Email Address
                    <span className="form-label-required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon-left">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </span>
                    <input
                      type="email"
                      id="login-email"
                      name="email"
                      className="form-input"
                      placeholder="advocate.sharma@delhibar.org"
                      defaultValue="advocate.sharma@delhibar.org"
                      required
                    />
                  </div>
                </div>

                {/* Password Field with Show/Hide UI */}
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <label htmlFor="login-password" className="form-label" style={{ marginBottom: 0 }}>
                      Chamber Password
                      <span className="form-label-required">*</span>
                    </label>
                    <a href="#forgot-password" style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500 }}>Forgot password?</a>
                  </div>
                  <div className="input-with-icon">
                    <span className="input-icon-left">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </span>
                    <input
                      type="password"
                      id="login-password"
                      name="password"
                      className="form-input"
                      placeholder="••••••••••••"
                      defaultValue="LexisSecured2026!"
                      required
                    />
                    {/* Pure HTML Show/Hide Password Visual UI */}
                    <span className="input-icon-right" title="Show/Hide Password indicator">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Remember Me */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
                  <label className="form-check">
                    <input type="checkbox" className="form-check-input" defaultChecked />
                    <span>Remember this workstation</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  Sign In to Chamber
                </button>
              </form>

              <div className="auth-form-footer">
                Don't have an advocate account?
                <a href="../register/index.html">Register new practice &rarr;</a>
              </div>
            </div>
          </main>

        </div>
      </div>
    </>
  );
}

export default Dashboard;