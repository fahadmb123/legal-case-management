import "./Sidebar.css";
import { NavLink, Link } from "react-router-dom";

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    const handleNavClick = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <aside className={`app-sidebar ${isOpen ? "mobile-open" : ""}`}>
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
                {/* Mobile Drawer Close Button */}
                <button
                    type="button"
                    className="sidebar-close-btn"
                    onClick={onClose}
                    aria-label="Close sidebar"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section-label">Main Docket</div>

                <NavLink to="/" end onClick={handleNavClick} className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
                    <svg viewBox="0 0 24 24"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/clients" onClick={handleNavClick} className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
                    <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span>Clients</span>
                    <span className="nav-badge">142</span>
                </NavLink>

                <NavLink to="/cases" onClick={handleNavClick} className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
                    <svg viewBox="0 0 24 24"><path d="M20 7h-7a2 2 0 0 1-2-2V3a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 2v4a2 2 0 0 0 2 2h4"/></svg>
                    <span>Legal Cases</span>
                    <span className="nav-badge">84</span>
                </NavLink>

                <NavLink to="/hearings" onClick={handleNavClick} className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
                    <svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
                    <span>Upcoming Hearings</span>
                    <span className="nav-badge" style={{ backgroundColor: 'var(--color-danger)', color: '#fff' }}>4</span>
                </NavLink>

                <div className="nav-section-label" style={{ marginTop: 'var(--space-4)' }}>Quick Intake</div>

                <NavLink to="/clients/add" onClick={handleNavClick} className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
                    <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                    <span>Add New Client</span>
                </NavLink>

                <div className="nav-section-label" style={{ marginTop: 'var(--space-4)' }}>System</div>

                <NavLink to="/settings" onClick={handleNavClick} className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                    <span>Chamber Settings</span>
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <div className="advocate-profile-card">
                    <div className="advocate-avatar">RK</div>
                    <div className="advocate-info">
                        <div className="advocate-name">Adv. Rajesh Sharma</div>
                        <div className="advocate-role">Chamber #412, High Court</div>
                    </div>
                </div>
                <div className="sidebar-footer-actions">
                    <Link to="/settings" onClick={handleNavClick} className="sidebar-footer-btn">
                        Settings
                    </Link>
                    <Link to="/login" onClick={handleNavClick} className="sidebar-footer-btn btn-logout">
                        Logout
                    </Link>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;