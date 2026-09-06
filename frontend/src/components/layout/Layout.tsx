import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        (()=>{
            setIsMobileNavOpen(false);
        })()
    }, [location.pathname]);

 
    useEffect(() => {
        if (isMobileNavOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileNavOpen]);

    return (
        <div className={`app-shell ${isMobileNavOpen ? "mobile-nav-open" : ""}`}>
            <div
                className={`mobile-drawer-backdrop ${isMobileNavOpen ? "visible" : ""}`}
                onClick={() => setIsMobileNavOpen(false)}
                aria-hidden={!isMobileNavOpen}
                aria-label="Close menu backdrop"
            />

            <Sidebar
                isOpen={isMobileNavOpen}
                onClose={() => setIsMobileNavOpen(false)}
            />

            <div className="app-main">
                <Navbar
                    onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
                />
                <main className="app-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;