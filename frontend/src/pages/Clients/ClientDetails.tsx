import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ClientDetails.css";

interface AssignedCase {
  id: string;
  caseNo: string;
  cnr: string;
  hearingStatusText: string;
  hearingUrgency: "today" | "upcoming" | "neutral";
  classification: string;
  courtAndBench: string;
  oppositeParty: string;
  stageBadgeText: string;
  stageBadgeVariant: "warning" | "info" | "success" | "neutral";
}

const INITIAL_ASSIGNED_CASES: AssignedCase[] = [
  {
    id: "case-1",
    caseNo: "WP(C) 14022/2023",
    cnr: "CNR: DLHC01-008291-2023",
    hearingStatusText: "TODAY 10:30 AM",
    hearingUrgency: "today",
    classification: "Civil Writ Petition (Tender Dispute)",
    courtAndBench: "Delhi High Court • Courtroom 14 (Item #8)",
    oppositeParty: "Union of India & Ors. (Ministry of Finance)",
    stageBadgeText: "Stay Petition Pending",
    stageBadgeVariant: "warning"
  },
  {
    id: "case-2",
    caseNo: "CS(COMM) 188/2024",
    cnr: "CNR: DLHC01-010415-2024",
    hearingStatusText: "24 Sep 2026",
    hearingUrgency: "upcoming",
    classification: "Commercial Recovery Suit (₹4.2 Cr)",
    courtAndBench: "Delhi High Court • Commercial Division",
    oppositeParty: "Global Infra Developers Pvt. Ltd.",
    stageBadgeText: "Admission & Pleadings",
    stageBadgeVariant: "info"
  },
  {
    id: "case-3",
    caseNo: "ARB.P. 331/2025",
    cnr: "CNR: DLHC01-002194-2025",
    hearingStatusText: "12 Oct 2026",
    hearingUrgency: "neutral",
    classification: "Arbitration Clause Invocation (Sec 11)",
    courtAndBench: "Delhi International Arbitration Centre (DIAC)",
    oppositeParty: "Northwest Steel Consortium",
    stageBadgeText: "Arbitrator Appointed",
    stageBadgeVariant: "success"
  }
];

function ClientDetails() {
  const { clientId } = useParams();

  // Client Profile State
  const [clientName, setClientName] = useState("Vikramaditya Enterprises Ltd.");
  const [phone, setPhone] = useState("+91 98112 34500");
  const [email, setEmail] = useState("legal@vikramaditya.in");
  const chamberId = clientId || "CLT-2023-0089";
  const [officeLocation, setOfficeLocation] = useState("Suite 408, Barakhamba Tower, CP, New Delhi");
  const [representative, setRepresentative] = useState("Mr. Anil Kapoor");
  const retainerSince = "October 2023";

  // Cases List
  const [cases, setCases] = useState<AssignedCase[]>(INITIAL_ASSIGNED_CASES);

  // Modals state
  const [isEditClientOpen, setIsEditClientOpen] = useState(false);
  const [isAddCaseOpen, setIsAddCaseOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit Client Form State
  const [editName, setEditName] = useState(clientName);
  const [editPhone, setEditPhone] = useState(phone);
  const [editEmail, setEditEmail] = useState(email);
  const [editLocation, setEditLocation] = useState(officeLocation);
  const [editRepresentative, setEditRepresentative] = useState(representative);

  // Add Case Form State
  const [newCaseNo, setNewCaseNo] = useState("");
  const [newCnr, setNewCnr] = useState("");
  const [newClassification, setNewClassification] = useState("Civil Writ Petition");
  const [newCourt, setNewCourt] = useState("Delhi High Court");
  const [newOppositeParty, setNewOppositeParty] = useState("");
  const [newStage, setNewStage] = useState("Notice Issued");
  const [newHearing, setNewHearing] = useState("Listing Pending");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClientName(editName);
    setPhone(editPhone);
    setEmail(editEmail);
    setOfficeLocation(editLocation);
    setRepresentative(editRepresentative);
    setIsEditClientOpen(false);
    showToast("Client profile details updated successfully");
  };

  const handleAddCaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseNo.trim()) return;

    const generatedCnr = newCnr.trim() || `CNR: DLHC01-${Math.floor(100000 + Math.random() * 900000)}-2026`;

    const newCaseItem: AssignedCase = {
      id: "case-" + Date.now(),
      caseNo: newCaseNo.trim(),
      cnr: generatedCnr,
      hearingStatusText: newHearing.trim() || "Upcoming Listing",
      hearingUrgency: "upcoming",
      classification: newClassification,
      courtAndBench: `${newCourt} • Regular Bench`,
      oppositeParty: newOppositeParty.trim() || "Opposite Party",
      stageBadgeText: newStage,
      stageBadgeVariant: "info"
    };

    setCases((prev) => [newCaseItem, ...prev]);
    setIsAddCaseOpen(false);
    showToast(`Case "${newCaseItem.caseNo}" attached to client docket`);

    // Reset Form
    setNewCaseNo("");
    setNewCnr("");
    setNewOppositeParty("");
  };

  return (
    <div className="client-profile-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="client-profile-toast" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back Link to Clients Directory */}
      <div className="client-back-bar">
        <Link to="/clients" className="client-back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Client Directory
        </Link>
      </div>

      {/* Client Profile Hero Card */}
      <div className="client-profile-hero">
        <div className="profile-hero-top">
          <div className="profile-main-meta">
            <div className="client-hero-avatar">VE</div>
            <div className="profile-title-stack">
              <div className="profile-title-badges">
                <h1 className="profile-client-name">{clientName}</h1>
                <span className="badge badge-success">
                  <span className="badge-dot"></span> Active Client
                </span>
                <span className="badge badge-neutral">Corporate Group</span>
              </div>
              <p className="profile-meta-sub">
                Represented by Director: {representative} &bull; Retainer Since {retainerSince}
              </p>
            </div>
          </div>

          <div className="profile-actions-stack">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditName(clientName);
                setEditPhone(phone);
                setEditEmail(email);
                setEditLocation(officeLocation);
                setEditRepresentative(representative);
                setIsEditClientOpen(true);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              Edit Client
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsAddCaseOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Case
            </button>
          </div>
        </div>

        {/* Structured Meta Data Grid */}
        <div className="client-details-grid">
          <div className="client-data-point">
            <span className="data-point-label">Phone Contact</span>
            <span className="data-point-value font-mono">{phone}</span>
          </div>
          <div className="client-data-point">
            <span className="data-point-label">Official Email</span>
            <span className="data-point-value">{email}</span>
          </div>
          <div className="client-data-point">
            <span className="data-point-label">Chamber Client ID</span>
            <span className="data-point-value font-mono">{chamberId}</span>
          </div>
          <div className="client-data-point">
            <span className="data-point-label">Office Location</span>
            <span className="data-point-value">{officeLocation}</span>
          </div>
        </div>
      </div>

      {/* Section: Client Cases */}
      <div className="client-matters-section">
        <div className="matters-header-row">
          <div>
            <h2 className="matters-section-title">Assigned Legal Matters</h2>
            <p className="matters-section-subtitle">
              All active and pending cases filed or contested on behalf of this client.
            </p>
          </div>
          <span className="badge badge-neutral">
            {cases.length} {cases.length === 1 ? "Matter Total" : "Matters Total"}
          </span>
        </div>

        <div className="case-card-grid">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="client-case-card">
              <div className="case-card-header">
                <div>
                  <Link
                    to={`/cases/${encodeURIComponent(caseItem.caseNo)}`}
                    className="font-mono font-semibold text-primary case-card-link"
                  >
                    {caseItem.caseNo}
                  </Link>
                  <div className="text-muted case-cnr-sub">{caseItem.cnr}</div>
                </div>
                {caseItem.hearingUrgency === "today" && (
                  <span className="badge badge-danger">
                    <span className="badge-dot"></span> {caseItem.hearingStatusText}
                  </span>
                )}
                {caseItem.hearingUrgency === "upcoming" && (
                  <span className="badge badge-warning">
                    {caseItem.hearingStatusText}
                  </span>
                )}
                {caseItem.hearingUrgency === "neutral" && (
                  <span className="badge badge-neutral">
                    {caseItem.hearingStatusText}
                  </span>
                )}
              </div>

              <div className="case-card-body">
                <div>
                  <span className="data-point-label">Case Classification</span>
                  <div className="case-data-value">{caseItem.classification}</div>
                </div>
                <div>
                  <span className="data-point-label">Court & Bench</span>
                  <div className="case-data-value text-secondary">{caseItem.courtAndBench}</div>
                </div>
                <div>
                  <span className="data-point-label">Opposite Party</span>
                  <div className="case-data-value text-secondary">{caseItem.oppositeParty}</div>
                </div>
              </div>

              <div className="case-card-footer">
                <span className={`badge badge-${caseItem.stageBadgeVariant}`}>
                  {caseItem.stageBadgeText}
                </span>
                <Link
                  to={`/cases/${encodeURIComponent(caseItem.caseNo)}`}
                  className={`btn ${caseItem.hearingUrgency === "today" ? "btn-primary" : "btn-secondary"} btn-sm`}
                >
                  View Case &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================
           MODAL 1: EDIT CLIENT PROFILE
           ==================================================================== */}
      {isEditClientOpen && (
        <div className="profile-modal-backdrop" onClick={() => setIsEditClientOpen(false)}>
          <div className="profile-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="profile-modal-header">
              <h3>Edit Client Information</h3>
              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setIsEditClientOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="profile-modal-body">
                <div className="form-group">
                  <label className="form-label">Client / Entity Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Phone Contact *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Official Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Authorised Representative</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editRepresentative}
                    onChange={(e) => setEditRepresentative(e.target.value)}
                    placeholder="e.g. Mr. Anil Kapoor"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Registered Office Address</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="Suite, Building, Area, City"
                  />
                </div>
              </div>
              <div className="profile-modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditClientOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
           MODAL 2: ADD NEW CASE FOR CLIENT
           ==================================================================== */}
      {isAddCaseOpen && (
        <div className="profile-modal-backdrop" onClick={() => setIsAddCaseOpen(false)}>
          <div className="profile-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="profile-modal-header">
              <h3>Attach New Case Matter</h3>
              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setIsAddCaseOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddCaseSubmit}>
              <div className="profile-modal-body">
                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Case Filing No. *</label>
                    <input
                      type="text"
                      className="form-input font-mono"
                      placeholder="e.g. WP(C) 15200/2026"
                      value={newCaseNo}
                      onChange={(e) => setNewCaseNo(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CNR Number</label>
                    <input
                      type="text"
                      className="form-input font-mono"
                      placeholder="e.g. DLHC01-012940-2026"
                      value={newCnr}
                      onChange={(e) => setNewCnr(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Case Classification *</label>
                    <select
                      className="form-select"
                      value={newClassification}
                      onChange={(e) => setNewClassification(e.target.value)}
                    >
                      <option>Civil Writ Petition (Tender Dispute)</option>
                      <option>Commercial Recovery Suit</option>
                      <option>Criminal Appeal</option>
                      <option>Arbitration Clause Invocation (Sec 11)</option>
                      <option>Company Appeal (NCLT)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Jurisdiction Court *</label>
                    <select
                      className="form-select"
                      value={newCourt}
                      onChange={(e) => setNewCourt(e.target.value)}
                    >
                      <option>Delhi High Court</option>
                      <option>Saket District Court</option>
                      <option>Supreme Court of India</option>
                      <option>Delhi International Arbitration Centre (DIAC)</option>
                      <option>NCLT Principal Bench</option>
                      <option>Patiala House Court</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Opposite Party *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Union of India / Private Corp."
                    value={newOppositeParty}
                    onChange={(e) => setNewOppositeParty(e.target.value)}
                    required
                  />
                </div>

                <div className="form-grid-2col">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Proceedings Stage</label>
                    <select
                      className="form-select"
                      value={newStage}
                      onChange={(e) => setNewStage(e.target.value)}
                    >
                      <option>Stay Petition Pending</option>
                      <option>Admission & Pleadings</option>
                      <option>Framing of Issues</option>
                      <option>Cross Examination</option>
                      <option>Final Arguments</option>
                      <option>Arbitrator Appointed</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Next Listing Status</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Tomorrow 11:00 AM or 15 Oct 2026"
                      value={newHearing}
                      onChange={(e) => setNewHearing(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="profile-modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsAddCaseOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Attach Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientDetails;
