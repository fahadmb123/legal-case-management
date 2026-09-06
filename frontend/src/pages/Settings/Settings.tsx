import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/theme.hook";
import "./Settings.css";

function Settings() {
  const { theme, toggleTheme } = useTheme();

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<"profile" | "appearance" | "security" | "account">("profile");

  // Advocate Profile Form State
  const [advocateName, setAdvocateName] = useState("Adv. Rajesh Kumar Sharma");
  const [barRoll] = useState("D/1482/2014");
  const [email, setEmail] = useState("sharma@lawchambers.org");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [address, setAddress] = useState(
    "Chamber No. 412, Lawyers Chambers Block, Delhi High Court Complex, Sher Shah Road, New Delhi 110503"
  );

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("LexisSecured2026!");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Advocate & Chamber profile credentials successfully updated");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      showToast("Please enter a new master password");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("New passwords do not match. Please verify.");
      return;
    }
    setCurrentPassword(newPassword);
    setNewPassword("");
    setConfirmPassword("");
    showToast("Master password updated successfully and session re-keyed");
  };

  const scrollToSection = (sectionId: "profile" | "appearance" | "security" | "account") => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="settings-page-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="settings-toast" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1>Chamber Configuration & Preferences</h1>
          <p>Manage your advocate credentials, appearance themes, confidentiality keys, and practice account.</p>
        </div>
      </div>

      <div className="settings-layout-grid">
        {/* Sticky Navigation List */}
        <nav className="settings-nav-card" aria-label="Settings categories">
          <ul className="settings-nav-list">
            <li>
              <button
                type="button"
                className={`settings-nav-link ${activeTab === "profile" ? "is-active" : ""}`}
                onClick={() => scrollToSection("profile")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Advocate Profile
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`settings-nav-link ${activeTab === "appearance" ? "is-active" : ""}`}
                onClick={() => scrollToSection("appearance")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                </svg>
                Appearance & Theme
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`settings-nav-link ${activeTab === "security" ? "is-active" : ""}`}
                onClick={() => scrollToSection("security")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Security & Password
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`settings-nav-link ${activeTab === "account" ? "is-active" : ""}`}
                onClick={() => scrollToSection("account")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Account & Sessions
              </button>
            </li>
          </ul>
        </nav>

        {/* Settings Sections Form Area */}
        <div className="settings-content-flow">
          {/* SECTION 1: PROFILE */}
          <section id="profile" className="settings-section-card">
            <h2 className="section-title">Advocate & Chamber Profile</h2>
            <p className="section-desc">
              Official legal identifiers displayed on judicial notices, vakalatnamas, and client representations.
            </p>

            <form onSubmit={handleProfileSubmit}>
              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">Advocate Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={advocateName}
                    onChange={(e) => setAdvocateName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Bar Council Roll / Registration</label>
                  <input
                    type="text"
                    className="form-input font-mono"
                    value={barRoll}
                    readOnly
                  />
                  <span className="form-hint text-success">&check; Verified with Bar Council of Delhi</span>
                </div>
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">Official Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Chamber Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Chamber / Law Office Address</label>
                <textarea
                  className="form-input"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-sm">
                Save Profile Changes
              </button>
            </form>
          </section>

          {/* SECTION 2: APPEARANCE */}
          <section id="appearance" className="settings-section-card">
            <h2 className="section-title">Interface Appearance</h2>
            <p className="section-desc">
              Select your preferred visual environment. Both modes adhere strictly to high-contrast judicial readability standards.
            </p>

            <div className="theme-preview-options">
              {/* Light Theme Selection Card */}
              <div
                className={`theme-card-preview ${theme === "light" ? "is-selected" : ""}`}
                onClick={() => {
                  if (theme !== "light") toggleTheme();
                  showToast("Switched to Light Mode (Executive Slate)");
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    if (theme !== "light") toggleTheme();
                  }
                }}
              >
                <div className="theme-card-header">
                  <strong style={{ fontSize: "var(--font-size-sm)" }}>Light Mode (Executive Slate)</strong>
                  {theme === "light" ? (
                    <span className="badge badge-success">Active Mode</span>
                  ) : (
                    <span className="badge badge-neutral">Select</span>
                  )}
                </div>
                <div className="theme-mini-mockup" style={{ backgroundColor: "#f8fafc", border: "1px solid #cbd5e1" }}>
                  <div className="mockup-sidebar" style={{ backgroundColor: "#0f172a" }}></div>
                  <div className="mockup-content">
                    <div className="mockup-bar" style={{ backgroundColor: "#2563eb", width: "40%" }}></div>
                    <div className="mockup-bar" style={{ backgroundColor: "#cbd5e1", width: "90%" }}></div>
                    <div className="mockup-bar" style={{ backgroundColor: "#e2e8f0", width: "75%" }}></div>
                  </div>
                </div>
                <span className="theme-card-hint">
                  Crisp parchment backgrounds with deep slate typography for daylight reading.
                </span>
              </div>

              {/* Dark Theme Selection Card */}
              <div
                className={`theme-card-preview ${theme === "dark" ? "is-selected" : ""}`}
                onClick={() => {
                  if (theme !== "dark") toggleTheme();
                  showToast("Switched to Dark Mode (Obsidian Docket)");
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    if (theme !== "dark") toggleTheme();
                  }
                }}
              >
                <div className="theme-card-header">
                  <strong style={{ fontSize: "var(--font-size-sm)" }}>Dark Mode (Obsidian Docket)</strong>
                  {theme === "dark" ? (
                    <span className="badge badge-info">Active Mode</span>
                  ) : (
                    <span className="badge badge-neutral">Select</span>
                  )}
                </div>
                <div className="theme-mini-mockup" style={{ backgroundColor: "#090d16", border: "1px solid #1e293b" }}>
                  <div className="mockup-sidebar" style={{ backgroundColor: "#0b1120", borderRight: "1px solid #1e293b" }}></div>
                  <div className="mockup-content">
                    <div className="mockup-bar" style={{ backgroundColor: "#3b82f6", width: "40%" }}></div>
                    <div className="mockup-bar" style={{ backgroundColor: "#1e293b", width: "90%" }}></div>
                    <div className="mockup-bar" style={{ backgroundColor: "#334155", width: "75%" }}></div>
                  </div>
                </div>
                <span className="theme-card-hint">
                  Low-glare dark palette optimized for late-night research and court hearings.
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 3: SECURITY */}
          <section id="security" className="settings-section-card">
            <h2 className="section-title">Security & Master Password</h2>
            <p className="section-desc">
              Protect privileged work product and court filings with biometric and encrypted password controls.
            </p>

            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label className="form-label">Current Master Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-secondary btn-sm">
                Update Password
              </button>
            </form>
          </section>

          {/* SECTION 4: ACCOUNT & SESSIONS */}
          <section id="account" className="settings-section-card">
            <h2 className="section-title">Account & Data Operations</h2>
            <p className="section-desc">
              Export complete chamber dockets or end authenticated sessions.
            </p>

            <div className="account-actions-card">
              <div>
                <div className="workstation-title">Active Chamber Workstation</div>
                <div className="workstation-meta">
                  Windows 11 &bull; Chrome Desktop &bull; IP: 103.21.144.12 &bull; Active Now
                </div>
              </div>
              <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => showToast("Exporting Chamber Docket Archive (PDF & JSON)...")}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Export Docket
                </button>
                <Link to="/login" className="btn btn-danger btn-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign Out from Chamber
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Settings;
