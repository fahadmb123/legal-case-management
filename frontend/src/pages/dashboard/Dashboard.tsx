function Dashboard() {
    return (
        <>
            <input type="checkbox" id="theme-toggle" className="theme-switch-checkbox" aria-label="Toggle dark mode" />
            
            <input type="checkbox" id="mobile-nav-toggle" className="mobile-nav-checkbox" aria-label="Toggle mobile menu" />
            <label htmlFor="mobile-nav-toggle" className="mobile-drawer-backdrop"></label>

            <div className="app-shell">
                <aside className="app-sidebar">
                <div className="sidebar-brand">
                    <div className="brand-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="M7 21h10"/>
                        <path d="M12 3v18"/>
                        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                    </svg>
                    </div>
                    <div className="brand-name">
                    <span>JurisDesk</span>
                    <span className="brand-tag">Chamber Edition</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section-label">Main Docket</div>

                    <a href="../dashboard/index.html" className="nav-item is-active" aria-current="page">
                    <svg viewBox="0 0 24 24"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                    <span>Dashboard</span>
                    </a>

                    <a href="../clients/index.html" className="nav-item">
                    <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span>Clients</span>
                    <span className="nav-badge">142</span>
                    </a>

                    <a href="../cases/index.html" className="nav-item">
                    <svg viewBox="0 0 24 24"><path d="M20 7h-7a2 2 0 0 1-2-2V3a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 2v4a2 2 0 0 0 2 2h4"/></svg>
                    <span>Legal Cases</span>
                    <span className="nav-badge">84</span>
                    </a>

                    <a href="../hearings/index.html" className="nav-item">
                    <svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
                    <span>Upcoming Hearings</span>
                    <span className="nav-badge" style={{ backgroundColor: 'var(--color-danger)', color: '#fff' }}>4</span>
                    </a>

                    <div className="nav-section-label" style={{ marginTop: 'var(--space-4)' }}>Quick Intake</div>

                    <a href="../add-client/index.html" className="nav-item">
                    <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                    <span>Add New Client</span>
                    </a>

                    <div className="nav-section-label" style={{ marginTop: 'var(--space-4)' }}>System</div>

                    <a href="../settings/index.html" className="nav-item">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                    <span>Chamber Settings</span>
                    </a>
                </nav>

                <div className="sidebar-footer">
                    <div className="advocate-profile-card">
                    <div className="advocate-avatar">RK</div>
                    <div className="advocate-info">
                        <div className="advocate-name">Adv. Rajesh Sharma</div>
                        <div className="advocate-role">Chamber #412, High Court</div>
                    </div>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                    <a href="../settings/index.html" className="btn btn-secondary btn-sm" style={{ flex: 1, padding: 4, justifyContent: 'center', fontSize: 11 }}>
                        Settings
                    </a>
                    <a href="../login/index.html" className="btn btn-secondary btn-sm" style={{ flex: 1, padding: 4, justifyContent: 'center', fontSize: 11, color: '#f87171' }}>
                        Logout
                    </a>
                    </div>
                </div>
                </aside>

                <div className="app-main">
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

                    <button className="topbar-icon-btn" title="View 4 unread court notifications" aria-label="Notifications">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                        </svg>
                        <span className="notification-dot"></span>
                    </button>

                    <a href="../settings/index.html" className="topbar-user" title="Advocate Profile">
                        <div className="topbar-avatar">RS</div>
                        <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)' }}>
                        Adv. Rajesh
                        </span>
                    </a>
                    </div>
                </header>

                <main className="app-content">
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

                    <div className="stats-overview-grid">
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

                    <div className="dashboard-sections-split">
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