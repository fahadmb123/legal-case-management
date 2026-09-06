import { useState } from "react";
import { Link } from "react-router-dom";
import "./CaseDetails.css";

interface HearingRecord {
  id: string;
  date: string;
  isToday: boolean;
  courtroom: string;
  itemNo: string;
  purpose: string;
  statusBadgeText: string;
  statusBadgeVariant: "danger" | "warning" | "success" | "neutral";
  coram: string;
  proceedings?: string;
}

const INITIAL_HEARINGS: HearingRecord[] = [
  {
    id: "h-1",
    date: "TODAY • 06 Sep 2026",
    isToday: true,
    courtroom: "Courtroom 14",
    itemNo: "Item #8 (10:30 AM)",
    purpose: "Final arguments on CM APPL. 4102/2026 for grant of ad-interim injunction restraining respondent from opening financial bids.",
    statusBadgeText: "Scheduled Listing",
    statusBadgeVariant: "warning",
    coram: "Hon'ble Mr. Justice Sanjeev Sachdeva & Hon'ble Mr. Justice Manoj Jain"
  },
  {
    id: "h-2",
    date: "18 Aug 2026",
    isToday: false,
    courtroom: "Courtroom 14",
    itemNo: "Item #19",
    purpose: "Notice on stay application. Rejoinder affidavit filed by petitioner taken on record.",
    statusBadgeText: "Order Passed",
    statusBadgeVariant: "success",
    coram: "Division Bench II • Next Purpose: Final arguments on stay application.",
    proceedings: "Counter affidavit filed on behalf of Respondent #1 and #2. Rejoinder affidavit filed by petitioner taken on record. Notice issued on stay application."
  },
  {
    id: "h-3",
    date: "12 May 2026",
    isToday: false,
    courtroom: "Courtroom 14",
    itemNo: "Item #3",
    purpose: "Writ petition admitted. Court called for relevant tender appraisal records from the Ministry.",
    statusBadgeText: "Notice Issued",
    statusBadgeVariant: "neutral",
    coram: "Division Bench II",
    proceedings: "Writ petition admitted. Court called for relevant tender appraisal records from the Ministry."
  }
];

function CaseDetails() {
  const [hearings, setHearings] = useState<HearingRecord[]>(INITIAL_HEARINGS);
  const [currentStageStatus, setCurrentStageStatus] = useState("Stay Granted • Compliance Pending");
  const [statusOrderSummary, setStatusOrderSummary] = useState(
    "Hon'ble Court pleased to direct status quo on the tender allotment till next date of hearing. Counter affidavit to be filed within 3 weeks."
  );

  // Modals state
  const [isAddHearingOpen, setIsAddHearingOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [isEditCaseOpen, setIsEditCaseOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Hearing Form State
  const [hearingDate, setHearingDate] = useState("2026-09-22T10:30");
  const [courtroom, setCourtroom] = useState("Courtroom 14");
  const [itemNo, setItemNo] = useState("Item #12");
  const [hearingPurpose, setHearingPurpose] = useState("Final Arguments on Stay Application");
  const [coram, setCoram] = useState("Hon'ble Chief Justice Bench");

  // Update Status Form State
  const [tempStatus, setTempStatus] = useState(currentStageStatus);
  const [tempSummary, setTempSummary] = useState(statusOrderSummary);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddHearingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedDate = new Date(hearingDate);
    const dateFormatted = !isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : "Upcoming Listing";

    const newHearing: HearingRecord = {
      id: "h-" + Date.now(),
      date: dateFormatted,
      isToday: false,
      courtroom: courtroom || "Courtroom 14",
      itemNo: itemNo || "Item #1",
      purpose: hearingPurpose,
      statusBadgeText: "Scheduled Listing",
      statusBadgeVariant: "warning",
      coram: coram || "Hon'ble Bench"
    };

    setHearings((prev) => [newHearing, ...prev]);
    setIsAddHearingOpen(false);
    showToast(`New hearing listing recorded for ${dateFormatted}`);
  };

  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStageStatus(tempStatus);
    setStatusOrderSummary(tempSummary);
    setIsUpdateStatusOpen(false);
    showToast("Case proceeding status successfully updated");
  };

  return (
    <div className="case-details-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="case-toast" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Case Overview Hero */}
      <div className="case-header-hero">
        <div className="hero-top-row">
          <div className="hero-title-area">
            <div className="case-cnr-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              CNR: DLHC01-008291-2023
            </div>
            <h1 className="case-main-heading">
              Writ Petition (Civil) No. 14022 of 2023
            </h1>
            <p className="case-submeta">
              High Court of Delhi at New Delhi &bull; Division Bench (Courtroom 14)
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="hero-actions-row">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsEditCaseOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              Edit Case
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setTempStatus(currentStageStatus);
                setTempSummary(statusOrderSummary);
                setIsUpdateStatusOpen(true);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Update Status
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsAddHearingOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Hearing
            </button>
          </div>
        </div>

        {/* Structured Overview Meta */}
        <div className="client-details-grid hero-details-grid">
          <div className="client-data-point">
            <span className="data-point-label">Case Classification</span>
            <span className="data-point-value">Writ Petition (Civil) &bull; Tender Dispute</span>
          </div>
          <div className="client-data-point">
            <span className="data-point-label">Filing Date</span>
            <span className="data-point-value">12 November 2023 (Age: 2y 10m)</span>
          </div>
          <div className="client-data-point">
            <span className="data-point-label">Judicial Stage</span>
            <span className="data-point-value">
              <span className="badge badge-warning">
                <span className="badge-dot"></span> {currentStageStatus}
              </span>
            </span>
          </div>
          <div className="client-data-point">
            <span className="data-point-label">Next Listing</span>
            <span className="data-point-value">
              <span className="badge badge-danger">TODAY &bull; Item #8 (10:30 AM)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Parties Information */}
      <div className="case-parties-grid">
        {/* Petitioner Party Card */}
        <div className="party-card">
          <div className="party-card-header">
            <span className="party-type-badge badge-info">Petitioner / Plaintiff (Our Client)</span>
            <Link to="/clients/CLT-2023-089" className="party-client-link">
              View Client Profile &rarr;
            </Link>
          </div>
          <h3 className="party-title">Vikramaditya Enterprises Ltd.</h3>
          <div className="party-subinfo text-muted">
            Through Authorized Representative Mr. Anil Kapoor
          </div>
          <div className="party-contact-box">
            <div><strong>Lead Counsel:</strong> Adv. Rajesh Kumar Sharma (D/1482/2014)</div>
            <div><strong>Contact:</strong> legal@vikramaditya.in | +91 98112 34500</div>
          </div>
        </div>

        {/* Respondent Party Card */}
        <div className="party-card">
          <div className="party-card-header">
            <span className="party-type-badge badge-neutral">Respondent / Defendant</span>
            <span className="text-muted" style={{ fontSize: "var(--font-size-2xs)" }}>State Entity</span>
          </div>
          <h3 className="party-title">Union of India & Ministry of Heavy Industries</h3>
          <div className="party-subinfo text-muted">
            Through Secretary, Department of Heavy Industries, Udyog Bhawan
          </div>
          <div className="party-contact-box">
            <div><strong>Opposing Counsel:</strong> Additional Solicitor General of India</div>
            <div><strong>Government Standing Counsel:</strong> Adv. M. K. Aggarwal</div>
          </div>
        </div>
      </div>

      {/* Section 3: Hearing History & Next Hearing */}
      <div className="card case-section-card">
        <div className="card-header timeline-card-header">
          <h2 className="card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Hearing Proceedings Timeline
          </h2>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setIsAddHearingOpen(true)}
          >
            + Add Hearing Record
          </button>
        </div>

        <div className="card-body">
          <div className="timeline-feed">
            {hearings.map((h) => {
              return (
                <div key={h.id} className="timeline-item">
                  <div className={`timeline-dot ${h.isToday ? "dot-urgent" : "dot-past"}`}></div>
                  <div
                    className="timeline-content"
                    style={h.isToday ? { borderLeft: "3px solid var(--color-danger)" } : undefined}
                  >
                    <div className="timeline-item-header">
                      <div>
                        {h.isToday ? (
                          <span className="badge badge-danger font-semibold">{h.date}</span>
                        ) : (
                          <span className="badge badge-neutral">{h.date}</span>
                        )}
                        <strong style={{ marginLeft: "var(--space-2)" }}>
                          {h.courtroom} &bull; {h.itemNo}
                        </strong>
                      </div>
                      <span className={`badge badge-${h.statusBadgeVariant}`}>{h.statusBadgeText}</span>
                    </div>

                    <p className="timeline-purpose-text">
                      <strong>Purpose:</strong> {h.purpose}
                    </p>

                    {h.proceedings && (
                      <p className="timeline-proceedings-text">
                        <strong>Proceedings:</strong> {h.proceedings}
                      </p>
                    )}

                    <div className="timeline-coram-text">
                      Bench: {h.coram}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 4: Privileged Chamber Notes */}
      <div className="card case-section-card">
        <div className="card-header">
          <h2 className="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Confidential Case Synopsis & Judicial Notes
          </h2>
          <span className="badge badge-neutral">Privileged Work Product</span>
        </div>
        <div className="card-body">
          <div className="notes-stack">
            <div>
              <h4 className="notes-subtitle">
                Key Legal Arguments & Precedents
              </h4>
              <p className="notes-body">
                1. The cancellation of petitioner’s bid suffers from patent arbitrariness and violation of natural justice, as no show-cause notice was issued prior to disqualification.<br />
                2. <em>Tata Cellular v. Union of India (1994) 6 SCC 651</em>: Judicial review of tender process is mandatory when procedural fairness is compromised.<br />
                3. <em>Afcons Infrastructure Ltd. v. Nagpur Metro Rail Corp. (2016) 16 SCC 818</em>: Authority cannot alter the eligibility criteria retrospectively after bid submission.
              </p>
            </div>

            <div className="notes-footer-box">
              <h4 className="notes-subtitle">
                Clerk Action Items
              </h4>
              <p className="notes-body text-muted" style={{ marginBottom: 0 }}>
                Ensure 2 sets of convenience compilation are handed to the Court Master in Courtroom 14 before 10:15 AM today.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
           MODAL 1: SCHEDULE NEW COURT HEARING
           ==================================================================== */}
      {isAddHearingOpen && (
        <div className="case-modal-backdrop" onClick={() => setIsAddHearingOpen(false)}>
          <div className="case-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="case-modal-header">
              <h3>Schedule New Court Hearing</h3>
              <button
                type="button"
                className="case-modal-close"
                onClick={() => setIsAddHearingOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddHearingSubmit}>
              <div className="case-modal-body">
                <div className="form-group">
                  <label className="form-label">Hearing Date & Time *</label>
                  <input
                    type="datetime-local"
                    className="form-input"
                    value={hearingDate}
                    onChange={(e) => setHearingDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Courtroom No.</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Courtroom 14"
                      value={courtroom}
                      onChange={(e) => setCourtroom(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Item / Cause List No.</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Item #12"
                      value={itemNo}
                      onChange={(e) => setItemNo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Hearing Stage / Purpose *</label>
                  <select
                    className="form-select"
                    value={hearingPurpose}
                    onChange={(e) => setHearingPurpose(e.target.value)}
                  >
                    <option>Final Arguments on Stay Application</option>
                    <option>Admission & Notice</option>
                    <option>Framing of Issues</option>
                    <option>Cross Examination of Witness</option>
                    <option>Pronouncement of Judgment</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Bench / Judicial Coram</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Hon'ble Justice..."
                    value={coram}
                    onChange={(e) => setCoram(e.target.value)}
                  />
                </div>
              </div>
              <div className="case-modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsAddHearingOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Record Hearing Date
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
           MODAL 2: UPDATE CASE STATUS
           ==================================================================== */}
      {isUpdateStatusOpen && (
        <div className="case-modal-backdrop" onClick={() => setIsUpdateStatusOpen(false)}>
          <div className="case-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="case-modal-header">
              <h3>Update Case Proceeding Status</h3>
              <button
                type="button"
                className="case-modal-close"
                onClick={() => setIsUpdateStatusOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleUpdateStatusSubmit}>
              <div className="case-modal-body">
                <div className="form-group">
                  <label className="form-label">Current Stage Status</label>
                  <select
                    className="form-select"
                    value={tempStatus}
                    onChange={(e) => setTempStatus(e.target.value)}
                  >
                    <option>Stay Granted • Compliance Pending</option>
                    <option>Active • Under Regular Arguments</option>
                    <option>Adjourned for Counter-Affidavit</option>
                    <option>Judgment Reserved</option>
                    <option>Disposed • Writ Allowed</option>
                    <option>Dismissed / Withdrawn</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Judicial Order Summary</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    placeholder="Enter operative part of the interim order passed by the Hon'ble Court..."
                    value={tempSummary}
                    onChange={(e) => setTempSummary(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="case-modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsUpdateStatusOpen(false)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Status Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
           MODAL 3: EDIT CASE DETAILS
           ==================================================================== */}
      {isEditCaseOpen && (
        <div className="case-modal-backdrop" onClick={() => setIsEditCaseOpen(false)}>
          <div className="case-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="case-modal-header">
              <h3>Edit Case Information</h3>
              <button
                type="button"
                className="case-modal-close"
                onClick={() => setIsEditCaseOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsEditCaseOpen(false);
              showToast("Case details updated successfully");
            }}>
              <div className="case-modal-body">
                <div className="form-group">
                  <label className="form-label">Case Title</label>
                  <input
                    type="text"
                    className="form-input"
                    defaultValue="Writ Petition (Civil) No. 14022 of 2023"
                  />
                </div>
                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">CNR Number</label>
                    <input
                      type="text"
                      className="form-input font-mono"
                      defaultValue="DLHC01-008291-2023"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Court & Bench</label>
                    <input
                      type="text"
                      className="form-input"
                      defaultValue="High Court of Delhi • Courtroom 14"
                    />
                  </div>
                </div>
              </div>
              <div className="case-modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditCaseOpen(false)}
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
    </div>
  );
}

export default CaseDetails;
