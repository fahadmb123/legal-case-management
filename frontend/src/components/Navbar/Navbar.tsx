import "./Navbar.css"


function Navbar(){
    return (
        <>
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
        </>
    )
}
export default Navbar