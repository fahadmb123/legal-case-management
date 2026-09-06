import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddClient.css";

function AddClient() {
  const navigate = useNavigate();

  // Form State initialized with default template data
  const [clientName, setClientName] = useState("Vikramaditya Enterprises Ltd.");
  const [clientType, setClientType] = useState("corporate");
  const [phone, setPhone] = useState("+91 98112 34500");
  const [email, setEmail] = useState("legal@vikramaditya.in");
  const [address, setAddress] = useState("Suite 408, Barakhamba Tower, Connaught Place, New Delhi 110001");

  // Case State
  const [caseNumber, setCaseNumber] = useState("WP(C) 14022/2023");
  const [caseType, setCaseType] = useState("Writ Petition (Civil)");
  const [court, setCourt] = useState("Delhi High Court");
  const [oppositeParty, setOppositeParty] = useState("Union of India & Ministry of Finance");
  const [status, setStatus] = useState("active");
  const [filingDate, setFilingDate] = useState("2026-08-15");
  const [hearingDate, setHearingDate] = useState("2026-09-10");

  // Chamber Notes
  const [notes, setNotes] = useState(
    "Challenge under Article 226 against arbitrary cancellation of tender bid #8812. Interim prayer seeking stay of re-tendering pending disposal. Need senior counsel briefing by 9th September."
  );

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute Initials for Avatar
  const avatarInitials = useMemo(() => {
    if (!clientName.trim()) return "CL";
    const words = clientName.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }, [clientName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !phone.trim() || !caseNumber.trim() || !oppositeParty.trim()) {
      setToastMessage("Please fulfill all required fields marked with an asterisk.");
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }

    setIsSubmitting(true);
    setToastMessage("Enrolling client and initializing court docket...");

    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage("Client enrolled successfully! Opening court docket...");
      setTimeout(() => {
        navigate("/clients");
      }, 1000);
    }, 800);
  };

  return (
    <div className="add-client-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="intake-toast" role="alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="add-client-header">
        <div className="page-header-text">
          <h1>New Client Intake & Case Enrollment</h1>
          <p>Enter client biographical details and initialize the primary legal case or dispute representation.</p>
        </div>

        {/* Live Preview Badge */}
        <div className="add-client-preview-badge" title="Live Preview: Client Record Initials">
          <div className="preview-avatar">{avatarInitials}</div>
          <div className="preview-details">
            <span className="preview-title">{clientName || "New Litigant"}</span>
            <span className="preview-id">Docket Ref: CLT-2026-094</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate={false}>
        {/* SECTION 1: PERSONAL INFORMATION */}
        <div className="form-card-section">
          <div className="form-section-title">
            <span className="section-icon-badge">1</span>
            Personal / Organization Information
          </div>
          <div className="form-section-desc">
            Primary identification details of the litigant or corporate representative.
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label htmlFor="client-name" className="form-label">
                Client / Entity Full Name
                <span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                id="client-name"
                name="clientName"
                className="form-input"
                placeholder="e.g. Vikramaditya Enterprises Ltd. / Anil Kapoor"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="client-type" className="form-label">Client Category</label>
              <select
                id="client-type"
                name="clientType"
                className="form-select"
                value={clientType}
                onChange={(e) => setClientType(e.target.value)}
              >
                <option value="corporate">Corporate Entity / Private Limited</option>
                <option value="individual">Individual Citizen</option>
                <option value="trust">Trust / Society / NGO</option>
                <option value="government">Government Body / PSU</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label htmlFor="client-phone" className="form-label">
                Phone Number
                <span className="form-label-required">*</span>
              </label>
              <div className="input-with-icon">
                <span className="input-icon-left">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <input
                  type="tel"
                  id="client-phone"
                  name="phone"
                  className="form-input"
                  placeholder="+91 98112 34500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="client-email" className="form-label">Email Address</label>
              <div className="input-with-icon">
                <span className="input-icon-left">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </span>
                <input
                  type="email"
                  id="client-email"
                  name="email"
                  className="form-input"
                  placeholder="legal@vikramaditya.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="client-address" className="form-label">Registered Address / Location</label>
            <textarea
              id="client-address"
              name="address"
              className="form-textarea"
              rows={2}
              placeholder="Complete postal address for summons and official correspondence..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        {/* SECTION 2: CASE INFORMATION */}
        <div className="form-card-section">
          <div className="form-section-title">
            <span className="section-icon-badge">2</span>
            Primary Case & Dispute Information
          </div>
          <div className="form-section-desc">
            Judicial filing identification, jurisdiction, opposing party, and listing status.
          </div>

          <div className="form-grid-3col">
            <div className="form-group">
              <label htmlFor="case-number" className="form-label">
                Case Number / Diary No.
                <span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                id="case-number"
                name="caseNumber"
                className="form-input font-mono"
                placeholder="WP(C) 14022/2023"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="case-type" className="form-label">
                Case Classification
                <span className="form-label-required">*</span>
              </label>
              <select
                id="case-type"
                name="caseType"
                className="form-select"
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
                required
              >
                <option value="Writ Petition (Civil)">Writ Petition (Civil)</option>
                <option value="Commercial Suit">Commercial Suit</option>
                <option value="Criminal Appeal">Criminal Appeal</option>
                <option value="Arbitration Petition">Arbitration Petition</option>
                <option value="Special Leave Petition">Special Leave Petition</option>
                <option value="Bail Application">Bail Application</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="case-court" className="form-label">
                Court / Tribunal
                <span className="form-label-required">*</span>
              </label>
              <select
                id="case-court"
                name="court"
                className="form-select"
                value={court}
                onChange={(e) => setCourt(e.target.value)}
                required
              >
                <option value="Delhi High Court">Delhi High Court</option>
                <option value="Supreme Court of India">Supreme Court of India</option>
                <option value="Saket District Court">Saket District Court</option>
                <option value="Patiala House Court">Patiala House Court</option>
                <option value="Tis Hazari Court">Tis Hazari Court</option>
                <option value="National Company Law Tribunal">National Company Law Tribunal</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label htmlFor="opposite-party" className="form-label">
                Opposite Party (Respondent / Defendant)
                <span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                id="opposite-party"
                name="oppositeParty"
                className="form-input"
                placeholder="e.g. Union of India & Ors."
                value={oppositeParty}
                onChange={(e) => setOppositeParty(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="case-status" className="form-label">Initial Status</label>
              <select
                id="case-status"
                name="status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Active • Stay Petition Pending</option>
                <option value="pre-filing">Pre-Filing Drafting</option>
                <option value="registry-scrutiny">Registry Scrutiny</option>
                <option value="admitted">Admitted for Regular Hearing</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="filing-date" className="form-label">Filing Date</label>
              <input
                type="date"
                id="filing-date"
                name="filingDate"
                className="form-input"
                value={filingDate}
                onChange={(e) => setFilingDate(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="hearing-date" className="form-label">Next Hearing Date</label>
              <input
                type="date"
                id="hearing-date"
                name="hearingDate"
                className="form-input"
                value={hearingDate}
                onChange={(e) => setHearingDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: ADDITIONAL INFORMATION */}
        <div className="form-card-section">
          <div className="form-section-title">
            <span className="section-icon-badge">3</span>
            Chamber Notes & Statutory Synopsis
          </div>
          <div className="form-section-desc">
            Privileged notes, preliminary legal points, relevant statutes, and clerk instructions.
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="case-notes" className="form-label">Internal Briefing Notes</label>
            <textarea
              id="case-notes"
              name="notes"
              className="form-textarea"
              rows={4}
              placeholder="Add confidential notes on precedents, interim relief sought, or documentation required from the client..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="form-actions-bar">
          <Link to="/clients" className="btn btn-secondary">
            Cancel & Discard
          </Link>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="btn-spinner" aria-hidden="true" />
                <span>Enrolling Client...</span>
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                <span>Save Client & Open Docket</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddClient;
