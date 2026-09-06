import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle/ThemeToggle";

interface NavbarProps {
    onToggleMobileNav?: () => void;
}

function Navbar({ onToggleMobileNav }: NavbarProps) {
    const location = useLocation();

    const getBreadcrumbTitle = () => {
        const path = location.pathname;
        if (path.startsWith("/clients")) return "Client Directory";
        if (path.startsWith("/cases")) return "Legal Cases";
        if (path.startsWith("/hearings")) return "Court Hearings Docket";
        if (path.startsWith("/settings")) return "Settings";
        return "Practice Dashboard";
    };

    return (
        <header className="app-topbar">
            <div className="topbar-left">
              <button
                type="button"
                className="mobile-menu-trigger"
                onClick={onToggleMobileNav}
                aria-label="Open navigation menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>

              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <Link to="/" className="breadcrumb-parent">JurisDesk</Link>
                <span className="breadcrumbs-separator" aria-hidden="true">/</span>
                {location.pathname.startsWith("/cases") ? (
                  <>
                    <Link to="/cases" className="breadcrumb-parent">Cases</Link>
                    <span className="breadcrumbs-separator" aria-hidden="true">/</span>
                    <span className="breadcrumbs-current font-mono" aria-current="page">WP(C) 14022/2023</span>
                  </>
                ) : location.pathname.startsWith("/clients/") || location.pathname.startsWith("/client-details") ? (
                  <>
                    <Link to="/clients" className="breadcrumb-parent">Clients</Link>
                    <span className="breadcrumbs-separator" aria-hidden="true">/</span>
                    <span className="breadcrumbs-current" aria-current="page">Vikramaditya Enterprises Ltd.</span>
                  </>
                ) : (
                  <span className="breadcrumbs-current" aria-current="page">{getBreadcrumbTitle()}</span>
                )}
              </nav>
            </div>

            <div className="topbar-right">
              {/* Interactive Light/Dark Theme Switcher */}
              <ThemeToggle />

              {/* Notifications Button */}
              <button className="topbar-icon-btn" title="View 4 unread court notifications" aria-label="Notifications">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
                <span className="notification-dot"></span>
              </button>

              {/* User Profile Quick Link */}
              <Link to="/settings" className="topbar-user" title="Advocate Profile">
                <div className="topbar-avatar">RS</div>
                <span className="topbar-user-name">
                  Adv. Rajesh
                </span>
              </Link>
            </div>
        </header>
    );
}

export default Navbar;