import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      {/* Pure CSS Theme Toggle Support */}
      <input type="checkbox" id="theme-toggle" className="theme-switch-checkbox" aria-label="Toggle dark mode" />
      {/* Pure CSS Mobile Navigation Toggle */}
      <input type="checkbox" id="mobile-nav-toggle" className="mobile-nav-checkbox" aria-label="Toggle mobile menu" />
      <label htmlFor="mobile-nav-toggle" className="mobile-drawer-backdrop"></label>

      <div className="app-shell">
        
        {/* ====================================================================
             SHARED APPLICATION SIDEBAR
             ==================================================================== */}
        {/** The Side bar was here*/}

        {/* ====================================================================
             MAIN CONTENT WRAPPER
             ==================================================================== */}
        <div className="app-main">
          
          {/* Shared Top Navigation Bar */}
          <header className="app-topbar">
            <div className="topbar-left">
              <label htmlFor="mobile-nav-toggle" className="mobile-menu-trigger" aria-label="Open mobile menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </label>

              <div className="breadcrumbs">
                <span>JurisDesk</span>
                <span className="breadcrumbs-separator">/</span>
                <span className="breadcrumbs-current">Practice Dashboard</span>
              </div>
            </div>

            <div className="topbar-right">
              {/* Pure CSS Light/Dark Theme Switcher */}
              <label htmlFor="theme-toggle" className="theme-toggle-label" title="Switch Theme (Light / Dark)">
                <span className="theme-toggle-icon">
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </span>
                <span className="theme-toggle-slider"></span>
              </label>

              {/* Notifications Button */}
              <button className="topbar-icon-btn" title="View 4 unread court notifications" aria-label="Notifications">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
                <span className="notification-dot"></span>
              </button>

              {/* User Profile Icon Indicator */}
              <a href="../settings/index.html" className="topbar-user" title="Advocate Profile">
                <div className="topbar-avatar">RS</div>
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)' }}>
                  Adv. Rajesh
                </span>
              </a>
            </div>
          </header>

          {/* Dashboard Main Page Body */}
          <main className="app-content">
            
            {/* Header & Quick Intakes */}
            <div className="page-header">
              <div className="page-header-text">
                <h1>Chamber Overview</h1>
                <p>Welcome back, Advocate Sharma. Here is your daily court docket, active proceedings, and client summary.</p>
              </div>
              <div className="page-header-actions">
                <a href="../add-client/index.html" className="btn btn-primary">
                  <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Add Client
                </a>
                <a href="../cases/index.html" className="btn btn-secondary">
                  <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                  New Case
                </a>
              </div>
            </div>

            {/* 4 Top Summary Cards */}
            <div className="stats-overview-grid">
              
              {/* Card 1: Total Clients */}
              <div className="stat-card">
                <div>
                  <div className="stat-label">Total Clients</div>
                  <div className="stat-value">142</div>
                  <div className="stat-meta">
                    <span className="text-success font-semibold">&uarr; +8</span>
                    <span>new onboarded this month</span>
                  </div>
                </div>
                <div className="stat-icon stat-icon-blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  </svg>
                </div>
              </div>

              {/* Card 2: Active Cases */}
              <div className="stat-card">
                <div>
                  <div className="stat-label">Active Cases</div>
                  <div className="stat-value">84</div>
                  <div className="stat-meta">
                    <span className="text-success font-semibold">&bull; 62</span>
                    <span>in arguments & evidence</span>
                  </div>
                </div>
                <div className="stat-icon stat-icon-green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 7h-7a2 2 0 0 1-2-2V3a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                  </svg>
                </div>
              </div>

              {/* Card 3: Pending Cases */}
              <div className="stat-card">
                <div>
                  <div className="stat-label">Pending Filings</div>
                  <div className="stat-value">36</div>
                  <div className="stat-meta">
                    <span className="text-warning font-semibold">12</span>
                    <span>scrutiny / registry objections</span>
                  </div>
                </div>
                <div className="stat-icon stat-icon-amber">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
              </div>

              {/* Card 4: Upcoming Hearings */}
              <div className="stat-card">
                <div>
                  <div className="stat-label">Hearings (Next 7 Days)</div>
                  <div className="stat-value text-primary">18</div>
                  <div className="stat-meta">
                    <span className="text-danger font-semibold">4 listed today</span>
                    <span>in High Court</span>
                  </div>
                </div>
                <div className="stat-icon stat-icon-purple">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
              </div>

            </div>

            {/* Section: Upcoming Hearings (Primary Priority) */}
            <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
              <div className="card-header">
                <h2 className="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Upcoming Priority Hearings
                </h2>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <a href="../hearings/index.html" className="btn btn-secondary btn-sm">
                    View Full Hearing Docket &rarr;
                  </a>
                </div>
              </div>

              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Case Number</th>
                      <th>Client / Petitioner</th>
                      <th>Court & Bench</th>
                      <th>Hearing Date & Time</th>
                      <th>Purpose / Stage</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hearing-urgency-today">
                      <td>
                        <a href="../case-details/index.html" className="font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                          WP(C) 14022/2023
                        </a>
                        <div className="text-muted" style={{ fontSize: 'var(--font-size-2xs)' }}>CNR: DLHC01-008291-2023</div>
                      </td>
                      <td>
                        <strong>Vikramaditya Enterprises Ltd.</strong>
                        <div className="text-muted" style={{ fontSize: 'var(--font-size-xs)' }}>vs. Union of India & Ors.</div>
                      </td>
                      <td>
                        <div className="court-badge">
                          <strong>Delhi High Court</strong>
                        </div>
                        <div className="text-muted" style={{ fontSize: 'var(--font-size-2xs)' }}>Courtroom 14 &bull; Item #8</div>
                      </td>
                      <td>
                        <span className="badge badge-danger">
                          <span className="badge-dot"></span> TODAY &bull; 10:30 AM
                        </span>
                      </td>
                      <td>Final Arguments</td>
                      <td>
                        <span className="badge badge-warning">Stay Pending</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <a href="../case-details/index.html" className="btn btn-secondary btn-sm">Brief</a>
                      </td>
                    </tr>

                    <tr className="hearing-urgency-today">
                      <td>
                        <a href="../case-details/index.html" className="font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                          CRL.A. 419/2022
                        </a>
                        <div className="text-muted" style={{ fontSize: 'var(--font-size-2xs)' }}>CNR: DLSK02-004112-2022</div>
                      </td>
                      <td>
                        <strong>Suresh Chand Mathur</strong>
                        <div className="text-muted" style={{ fontSize: 'var(--font-size-xs)' }}>vs. State (NCT of Delhi)</div>
                      </td>
                      <td>
                        <div className="court-badge">
                          <strong>Saket District Court</strong>
                        </div>
                        <div className="text-muted" style={{ fontSize: 'var(--font-size-2xs)' }}>Courtroom 302 &bull; Item #14</div>
                      </td>
                      <td>
                        <span className="badge badge-danger">
                          <span className="badge-dot"></span> TODAY &bull; 02:15 PM
                        </span>
                      </td>
                      <td>Cross Examination of PW-3</td>
                      <td>
                        <span className="badge badge-success">Active</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <a href="../case-details/index.html" className="btn btn-secondary btn-sm">Brief</a>
                      </td>
                    </tr>

                    <tr className="hearing-urgency-tomorrow">
                      <td>
                        <a href="../case-details/index.html" className="font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                          CS(COMM) 298/2024
                        </a>
                        <div className="text-muted" style={{ fontSize: 'var(--font-size-2xs)' }}>CNR: DLHC01-011299-2024</div>
                      </td>
                      <td>
                        <strong>AeroTech Dynamics Corp.</strong>
                        <div className="text-muted" style={{ fontSize: 'var(--font-size-xs)' }}>vs. Horizon Logistics Ltd.</div>
                      </td>
                      <td>
                        <div className="court-badge">
                          <strong>Delhi High Court</strong>
                        </div>
                        <div className="text-muted" style={{ fontSize: 'var(--font-size-2xs)' }}>Commercial Bench &bull; Item #22</div>
                      </td>
                      <td>
                        <span className="badge badge-warning">
                          <span className="badge-dot"></span> TOMORROW &bull; 11:00 AM
                        </span>
                      </td>
                      <td>Framing of Issues & Interim Injunction</td>
                      <td>
                        <span className="badge badge-info">Admission</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <a href="../case-details/index.html" className="btn btn-secondary btn-sm">Brief</a>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <a href="../case-details/index.html" className="font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                          ARB.P. 512/2023
                        </a>
                        <div className="text-muted" style={{ fontSize: 'var(--font-size-2xs)' }}>CNR: DLHC01-007812-2023</div>
                      </td>
                      <td>
                        <strong>Pooja Singhania</strong>
                        <div className="text-muted" style={{ fontSize: 'var(--font-size-xs)' }}>vs. Apex Buildcon Pvt. Ltd.</div>
                      </td>
                      <td>
                        <div className="court-badge">
                          <strong>Arbitration Tribunal</strong>
                        </div>
                        <div className="text-muted" style={{ fontSize: 'var(--font-size-2xs)' }}>DAC Chamber 3 &bull; Session 1</div>
                      </td>
                      <td>
                        <span className="badge badge-neutral">
                          14 Sep 2026 &bull; 04:00 PM
                        </span>
                      </td>
                      <td>Section 11 Appointment Hearing</td>
                      <td>
                        <span className="badge badge-success">Active</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <a href="../case-details/index.html" className="btn btn-secondary btn-sm">Brief</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Split Grid: Recent Clients & Recent Cases */}
            <div className="dashboard-sections-split">
              
              {/* Column 1: Recent Clients */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title" style={{ fontSize: 'var(--font-size-md)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    </svg>
                    Recent Clients
                  </h3>
                  <a href="../clients/index.html" className="text-primary" style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600 }}>View all &rarr;</a>
                </div>

                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Contact</th>
                        <th>Matters</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a href="../client-details/index.html" style={{ fontWeight: 600 }}>Vikramaditya Ent.</a>
                          <div className="text-muted" style={{ fontSize: 'var(--font-size-2xs)' }}>Corporate Entity</div>
                        </td>
                        <td>+91 98112 34500</td>
                        <td><span className="badge badge-neutral">3 Cases</span></td>
                        <td><span className="badge badge-success">Active</span></td>
                      </tr>
                      <tr>
                        <td>
                          <a href="../client-details/index.html" style={{ fontWeight: 600 }}>Suresh Chand Mathur</a>
                          <div className="text-muted" style={{ fontSize: 'var(--font-size-2xs)' }}>Individual</div>
                        </td>
                        <td>+91 98710 99211</td>
                        <td><span className="badge badge-neutral">1 Case</span></td>
                        <td><span className="badge badge-success">Active</span></td>
                      </tr>
                      <tr>
                        <td>
                          <a href="../client-details/index.html" style={{ fontWeight: 600 }}>AeroTech Dynamics</a>
                          <div className="text-muted" style={{ fontSize: 'var(--font-size-2xs)' }}>Corporate Entity</div>
                        </td>
                        <td>+91 11 4455 6600</td>
                        <td><span className="badge badge-neutral">2 Cases</span></td>
                        <td><span className="badge badge-success">Active</span></td>
                      </tr>
                      <tr>
                        <td>
                          <a href="../client-details/index.html" style={{ fontWeight: 600 }}>Pooja Singhania</a>
                          <div className="text-muted" style={{ fontSize: 'var(--font-size-2xs)' }}>Individual</div>
                        </td>
                        <td>+91 99990 12345</td>
                        <td><span className="badge badge-neutral">1 Case</span></td>
                        <td><span className="badge badge-warning">Consultation</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Column 2: Recent Cases */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title" style={{ fontSize: 'var(--font-size-md)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M20 7h-7a2 2 0 0 1-2-2V3a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                    </svg>
                    Recent Cases
                  </h3>
                  <a href="../cases/index.html" className="text-primary" style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600 }}>View all &rarr;</a>
                </div>

                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Case Number</th>
                        <th>Type</th>
                        <th>Court</th>
                        <th>Stage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a href="../case-details/index.html" className="font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                            WP(C) 14022/23
                          </a>
                        </td>
                        <td>Writ Petition</td>
                        <td>Delhi High Court</td>
                        <td><span className="badge badge-warning">Final Arg</span></td>
                      </tr>
                      <tr>
                        <td>
                          <a href="../case-details/index.html" className="font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                            CS(COMM) 298/24
                          </a>
                        </td>
                        <td>Commercial Suit</td>
                        <td>Delhi High Court</td>
                        <td><span className="badge badge-info">Issues</span></td>
                      </tr>
                      <tr>
                        <td>
                          <a href="../case-details/index.html" className="font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                            CRL.A. 419/22
                          </a>
                        </td>
                        <td>Criminal Appeal</td>
                        <td>Saket Dist. Court</td>
                        <td><span className="badge badge-success">Evidence</span></td>
                      </tr>
                      <tr>
                        <td>
                          <a href="../case-details/index.html" className="font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                            ARB.P. 512/23
                          </a>
                        </td>
                        <td>Arbitration Pet.</td>
                        <td>Delhi Arb. Centre</td>
                        <td><span className="badge badge-neutral">Sec 11</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </main>
        </div>

      </div>
    </>
  );
}

export default Dashboard;