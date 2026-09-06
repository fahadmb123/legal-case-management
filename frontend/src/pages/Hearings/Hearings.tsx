import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Hearings.css";

export interface CauseListItem {
  id: string;
  time: string;
  courtroom: string;
  itemNo: string;
  caseNo: string;
  clientName: string;
  oppositeParty: string;
  disputeSnippet: string;
  court: string;
  bench: string;
  stage: string;
  stageBadgeVariant: "warning" | "success" | "info" | "neutral" | "danger";
  dateGroup: "today" | "tomorrow" | "this_week" | "later";
  dateFormatted: string;
  dateLabel: string;
  priorityOrder: number;
}

const INITIAL_CAUSE_LIST: CauseListItem[] = [
  {
    id: "cause-1",
    time: "10:30 AM",
    courtroom: "Courtroom 14",
    itemNo: "Item #8",
    caseNo: "WP(C) 14022/2023",
    clientName: "Vikramaditya Enterprises Ltd.",
    oppositeParty: "Union of India",
    disputeSnippet: "Tender Dispute • Cancellation of Bid",
    court: "High Court of Delhi",
    bench: "DB: Justice Sachdeva & Jain",
    stage: "Final Arguments (Stay)",
    stageBadgeVariant: "warning",
    dateGroup: "today",
    dateFormatted: "2026-09-06",
    dateLabel: "Sunday, 06 September 2026",
    priorityOrder: 1
  },
  {
    id: "cause-2",
    time: "02:15 PM",
    courtroom: "Courtroom 302",
    itemNo: "Item #14",
    caseNo: "CRL.A. 419/2022",
    clientName: "Suresh Chand Mathur",
    oppositeParty: "State (NCT of Delhi)",
    disputeSnippet: "Section 138 NI Act Appeal",
    court: "Saket District Court",
    bench: "Additional Sessions Judge 02",
    stage: "Cross-Exam PW-3",
    stageBadgeVariant: "success",
    dateGroup: "today",
    dateFormatted: "2026-09-06",
    dateLabel: "Sunday, 06 September 2026",
    priorityOrder: 2
  },
  {
    id: "cause-3",
    time: "03:30 PM",
    courtroom: "Courtroom 6",
    itemNo: "Item #19",
    caseNo: "W.P.(C) 9140/2024",
    clientName: "Dr. Rajeshwar Sen",
    oppositeParty: "Govt. of NCT of Delhi",
    disputeSnippet: "Superannuation Pension Relief",
    court: "High Court of Delhi",
    bench: "Single Bench: Hon'ble Justice Gupta",
    stage: "Admission & Notice",
    stageBadgeVariant: "info",
    dateGroup: "today",
    dateFormatted: "2026-09-06",
    dateLabel: "Sunday, 06 September 2026",
    priorityOrder: 3
  },
  {
    id: "cause-4",
    time: "04:30 PM",
    courtroom: "Courtroom 10",
    itemNo: "Item #31",
    caseNo: "CS(OS) 104/2023",
    clientName: "Arvind Kejriwal & Associates LLP",
    oppositeParty: "TechSol Infotech Ltd.",
    disputeSnippet: "Commercial Non-Compete Injunction",
    court: "Patiala House Court",
    bench: "District Judge (Commercial-01)",
    stage: "Interim Relief / Stay",
    stageBadgeVariant: "warning",
    dateGroup: "today",
    dateFormatted: "2026-09-06",
    dateLabel: "Sunday, 06 September 2026",
    priorityOrder: 4
  },
  {
    id: "cause-5",
    time: "11:00 AM",
    courtroom: "Commercial Bench",
    itemNo: "Item #22",
    caseNo: "CS(COMM) 298/2024",
    clientName: "AeroTech Dynamics Corp.",
    oppositeParty: "Horizon Logistics Ltd.",
    disputeSnippet: "Procurement Agreement Breach",
    court: "High Court of Delhi",
    bench: "Single Bench (Commercial)",
    stage: "Framing of Issues",
    stageBadgeVariant: "info",
    dateGroup: "tomorrow",
    dateFormatted: "2026-09-07",
    dateLabel: "Monday, 07 September 2026",
    priorityOrder: 5
  },
  {
    id: "cause-6",
    time: "02:45 PM",
    courtroom: "Courtroom 204",
    itemNo: "Item #9",
    caseNo: "COMP.APP 64/2024",
    clientName: "Bharat Renewable Energy Corp.",
    oppositeParty: "Official Liquidator & Creditors",
    disputeSnippet: "Merger Scheme Objections",
    court: "NCLT Principal Bench",
    bench: "Judicial Member Bench IV",
    stage: "Final Arguments",
    stageBadgeVariant: "warning",
    dateGroup: "tomorrow",
    dateFormatted: "2026-09-07",
    dateLabel: "Monday, 07 September 2026",
    priorityOrder: 6
  },
  {
    id: "cause-7",
    time: "04:00 PM",
    courtroom: "DIAC Chamber 3",
    itemNo: "Session 1",
    caseNo: "ARB.P. 512/2023",
    clientName: "Pooja Singhania",
    oppositeParty: "Apex Buildcon Pvt. Ltd.",
    disputeSnippet: "Commercial Partnership Dissolution",
    court: "Delhi Arb. Centre",
    bench: "Sole Arbitrator Session",
    stage: "Sec 11 Proceedings",
    stageBadgeVariant: "neutral",
    dateGroup: "this_week",
    dateFormatted: "2026-09-14",
    dateLabel: "Monday, 14 September 2026",
    priorityOrder: 7
  },
  {
    id: "cause-8",
    time: "10:30 AM",
    courtroom: "Courtroom 1",
    itemNo: "Item #5",
    caseNo: "ARB.O.P. 882/2023",
    clientName: "Hindustan Infra Logistics Ltd.",
    oppositeParty: "National Highways Authority of India",
    disputeSnippet: "Concessionaire Arbitration Appeal",
    court: "Supreme Court",
    bench: "Hon'ble Chief Justice Bench",
    stage: "Admission & Notice",
    stageBadgeVariant: "danger",
    dateGroup: "this_week",
    dateFormatted: "2026-09-18",
    dateLabel: "Friday, 18 September 2026",
    priorityOrder: 8
  }
];

function Hearings() {
  const [hearings, setHearings] = useState<CauseListItem[]>(INITIAL_CAUSE_LIST);
  const [selectedDateFilter, setSelectedDateFilter] = useState("all");
  const [selectedCourt, setSelectedCourt] = useState("all");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedSort, setSelectedSort] = useState("priority");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Hearing Form State
  const [newCaseNo, setNewCaseNo] = useState("WP(C) 14022/2023");
  const [newClientName, setNewClientName] = useState("Vikramaditya Enterprises Ltd.");
  const [newCourt, setNewCourt] = useState("High Court of Delhi");
  const [newDate, setNewDate] = useState("2026-09-22T10:30");
  const [newCourtroom, setNewCourtroom] = useState("Courtroom 14");
  const [newItemNo, setNewItemNo] = useState("Item #12");
  const [newStage, setNewStage] = useState("Final Arguments");
  const [newBench, setNewBench] = useState("Hon'ble Chief Justice Bench");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filtered List
  const filteredHearings = useMemo(() => {
    return hearings.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.caseNo.toLowerCase().includes(q) ||
        item.clientName.toLowerCase().includes(q) ||
        item.court.toLowerCase().includes(q) ||
        item.oppositeParty.toLowerCase().includes(q) ||
        item.stage.toLowerCase().includes(q);

      const matchesDate =
        selectedDateFilter === "all" ||
        (selectedDateFilter === "today" && item.dateGroup === "today") ||
        (selectedDateFilter === "tomorrow" && item.dateGroup === "tomorrow") ||
        (selectedDateFilter === "this_week" && (item.dateGroup === "today" || item.dateGroup === "tomorrow" || item.dateGroup === "this_week"));

      const matchesCourt =
        selectedCourt === "all" || item.court === selectedCourt;

      const matchesStage =
        selectedStage === "all" || item.stage.toLowerCase().includes(selectedStage.toLowerCase());

      return matchesSearch && matchesDate && matchesCourt && matchesStage;
    }).sort((a, b) => {
      if (selectedSort === "priority") {
        return a.priorityOrder - b.priorityOrder;
      }
      return a.time.localeCompare(b.time);
    });
  }, [hearings, searchQuery, selectedDateFilter, selectedCourt, selectedStage, selectedSort]);

  // Group by Date
  const todayHearings = useMemo(() => filteredHearings.filter(h => h.dateGroup === "today"), [filteredHearings]);
  const tomorrowHearings = useMemo(() => filteredHearings.filter(h => h.dateGroup === "tomorrow"), [filteredHearings]);
  const thisWeekHearings = useMemo(() => filteredHearings.filter(h => h.dateGroup === "this_week"), [filteredHearings]);

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedDate = new Date(newDate);
    const dateStr = !isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })
      : "Upcoming Hearing";

    const newEntry: CauseListItem = {
      id: "cause-" + Date.now(),
      time: !isNaN(parsedDate.getTime())
        ? parsedDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
        : "10:30 AM",
      courtroom: newCourtroom || "Courtroom 1",
      itemNo: newItemNo || "Item #1",
      caseNo: newCaseNo.trim() || "WP(C) 14022/2023",
      clientName: newClientName.trim() || "Chamber Client",
      oppositeParty: "Opposite Party",
      disputeSnippet: "Commercial Dispute Hearing",
      court: newCourt,
      bench: newBench || "Division Bench",
      stage: newStage,
      stageBadgeVariant: newStage.toLowerCase().includes("final") ? "warning" : "info",
      dateGroup: "this_week",
      dateFormatted: newDate.split("T")[0],
      dateLabel: dateStr,
      priorityOrder: 10
    };

    setHearings((prev) => [newEntry, ...prev]);
    setIsScheduleModalOpen(false);
    showToast(`New hearing scheduled for ${newEntry.caseNo} on ${dateStr}`);
  };

  return (
    <div className="hearings-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="hearings-toast" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-text">
          <div className="page-title-row">
            <h1>Chamber Hearing Cause List</h1>
            <span className="badge badge-danger font-semibold">
              {hearings.filter(h => h.dateGroup === "today").length} Listed Today
            </span>
          </div>
          <p>
            Organized daily judicial listings, item sequence numbers, coram benches, and stage of argument.
          </p>
        </div>
        <div className="page-header-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsScheduleModalOpen(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Schedule New Hearing
          </button>
        </div>
      </div>

      {/* Quick Summary Metrics Cards */}
      <div className="hearings-summary-cards">
        <div className="summary-stat-card card-urgent">
          <div className="stat-label">Hearings Today</div>
          <div className="stat-value text-danger">{todayHearings.length}</div>
          <div className="stat-meta">Courtroom 14, 302, 6 & 10</div>
        </div>
        <div className="summary-stat-card card-warning">
          <div className="stat-label">Tomorrow's Listings</div>
          <div className="stat-value text-warning">{tomorrowHearings.length}</div>
          <div className="stat-meta">Commercial Bench & NCLT</div>
        </div>
        <div className="summary-stat-card">
          <div className="stat-label">Later This Week</div>
          <div className="stat-value text-primary">{thisWeekHearings.length}</div>
          <div className="stat-meta">High Court & Arbitration</div>
        </div>
        <div className="summary-stat-card">
          <div className="stat-label">Total Cause List</div>
          <div className="stat-value">{filteredHearings.length}</div>
          <div className="stat-meta">Active Chamber Listings</div>
        </div>
      </div>

      {/* Filter Card */}
      <div className="filter-card">
        <div className="filter-grid hearings-filter-grid">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Date Range</label>
            <select
              className="form-select"
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
              aria-label="Filter by Date Range"
            >
              <option value="all">Next 7 Days ({hearings.length} Hearings)</option>
              <option value="today">Today Only ({hearings.filter(h => h.dateGroup === "today").length} Listed)</option>
              <option value="tomorrow">Tomorrow ({hearings.filter(h => h.dateGroup === "tomorrow").length} Listed)</option>
              <option value="this_week">This Week ({hearings.length} Listed)</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Jurisdiction / Court</label>
            <select
              className="form-select"
              value={selectedCourt}
              onChange={(e) => setSelectedCourt(e.target.value)}
              aria-label="Filter by Court"
            >
              <option value="all">All Courts</option>
              <option value="High Court of Delhi">High Court of Delhi</option>
              <option value="Saket District Court">Saket District Court</option>
              <option value="Supreme Court">Supreme Court</option>
              <option value="NCLT Principal Bench">NCLT Principal Bench</option>
              <option value="Delhi Arb. Centre">Delhi Arb. Centre</option>
              <option value="Patiala House Court">Patiala House Court</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Stage of Hearing</label>
            <select
              className="form-select"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              aria-label="Filter by Stage"
            >
              <option value="all">All Stages</option>
              <option value="final">Final Arguments</option>
              <option value="cross">Evidence / Cross-Exam</option>
              <option value="stay">Interim Relief / Stay</option>
              <option value="issues">Framing of Issues</option>
              <option value="notice">Admission & Notice</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Cause List Urgency</label>
            <select
              className="form-select"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              aria-label="Sort Cause List"
            >
              <option value="priority">High Priority First</option>
              <option value="time">Chronological Time</option>
            </select>
          </div>
        </div>

        {/* Quick Search inside Cause List */}
        <div className="hearings-quick-search-row">
          <div className="hearings-search-input-wrapper">
            <span className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              className="form-input hearings-search-input"
              placeholder="Filter cause list by case number, client, opposing party, or court..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
          {(searchQuery || selectedDateFilter !== "all" || selectedCourt !== "all" || selectedStage !== "all") && (
            <button
              type="button"
              className="filter-reset-link"
              onClick={() => {
                setSearchQuery("");
                setSelectedDateFilter("all");
                setSelectedCourt("all");
                setSelectedStage("all");
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* DATE GROUP 1: TODAY */}
      {(selectedDateFilter === "all" || selectedDateFilter === "today" || selectedDateFilter === "this_week") && todayHearings.length > 0 && (
        <div className="hearings-date-group">
          <div className="date-group-header">
            <div className="date-group-title">
              <span className="badge badge-danger font-semibold">TODAY</span>
              <span>Sunday, 06 September 2026</span>
            </div>
            <span className="badge badge-neutral" style={{ marginLeft: "auto" }}>
              {todayHearings.length} {todayHearings.length === 1 ? "Matter Listed" : "Matters Listed"}
            </span>
          </div>

          {todayHearings.map((hearing) => (
            <div key={hearing.id} className="hearing-docket-card priority-today">
              <div className="hearing-time-block">
                <div className="hearing-time-primary text-danger">{hearing.time}</div>
                <div className="hearing-court-item">{hearing.courtroom} &bull; {hearing.itemNo}</div>
              </div>
              <div>
                <Link
                  to={`/cases/${encodeURIComponent(hearing.caseNo)}`}
                  className="font-mono font-semibold text-primary hearing-case-link"
                >
                  {hearing.caseNo}
                </Link>
                <div className="hearing-client-name">{hearing.clientName}</div>
                <div className="text-muted hearing-dispute-snippet">
                  vs. {hearing.oppositeParty} ({hearing.disputeSnippet})
                </div>
              </div>
              <div>
                <div className="hearing-court-name">{hearing.court}</div>
                <div className="text-muted hearing-bench-name">{hearing.bench}</div>
              </div>
              <div>
                <span className={`badge badge-${hearing.stageBadgeVariant}`}>{hearing.stage}</span>
              </div>
              <div className="hearing-action-cell">
                <Link
                  to={`/cases/${encodeURIComponent(hearing.caseNo)}`}
                  className="btn btn-primary btn-sm"
                  title="Open Full Case Brief"
                >
                  Brief
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DATE GROUP 2: TOMORROW */}
      {(selectedDateFilter === "all" || selectedDateFilter === "tomorrow" || selectedDateFilter === "this_week") && tomorrowHearings.length > 0 && (
        <div className="hearings-date-group">
          <div className="date-group-header">
            <div className="date-group-title">
              <span className="badge badge-warning font-semibold">TOMORROW</span>
              <span>Monday, 07 September 2026</span>
            </div>
            <span className="badge badge-neutral" style={{ marginLeft: "auto" }}>
              {tomorrowHearings.length} {tomorrowHearings.length === 1 ? "Matter Listed" : "Matters Listed"}
            </span>
          </div>

          {tomorrowHearings.map((hearing) => (
            <div key={hearing.id} className="hearing-docket-card priority-tomorrow">
              <div className="hearing-time-block">
                <div className="hearing-time-primary text-warning">{hearing.time}</div>
                <div className="hearing-court-item">{hearing.courtroom} &bull; {hearing.itemNo}</div>
              </div>
              <div>
                <Link
                  to={`/cases/${encodeURIComponent(hearing.caseNo)}`}
                  className="font-mono font-semibold text-primary hearing-case-link"
                >
                  {hearing.caseNo}
                </Link>
                <div className="hearing-client-name">{hearing.clientName}</div>
                <div className="text-muted hearing-dispute-snippet">
                  vs. {hearing.oppositeParty} ({hearing.disputeSnippet})
                </div>
              </div>
              <div>
                <div className="hearing-court-name">{hearing.court}</div>
                <div className="text-muted hearing-bench-name">{hearing.bench}</div>
              </div>
              <div>
                <span className={`badge badge-${hearing.stageBadgeVariant}`}>{hearing.stage}</span>
              </div>
              <div className="hearing-action-cell">
                <Link
                  to={`/cases/${encodeURIComponent(hearing.caseNo)}`}
                  className="btn btn-secondary btn-sm"
                  title="Open Full Case Brief"
                >
                  Brief
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DATE GROUP 3: LATER THIS WEEK */}
      {(selectedDateFilter === "all" || selectedDateFilter === "this_week") && thisWeekHearings.length > 0 && (
        <div className="hearings-date-group">
          <div className="date-group-header">
            <div className="date-group-title">
              <span>Later This Week &bull; September 2026</span>
            </div>
            <span className="badge badge-neutral" style={{ marginLeft: "auto" }}>
              {thisWeekHearings.length} {thisWeekHearings.length === 1 ? "Matter Listed" : "Matters Listed"}
            </span>
          </div>

          {thisWeekHearings.map((hearing) => (
            <div key={hearing.id} className="hearing-docket-card">
              <div className="hearing-time-block">
                <div className="hearing-time-primary">{hearing.time}</div>
                <div className="hearing-court-item">{hearing.courtroom} &bull; {hearing.itemNo}</div>
              </div>
              <div>
                <Link
                  to={`/cases/${encodeURIComponent(hearing.caseNo)}`}
                  className="font-mono font-semibold text-primary hearing-case-link"
                >
                  {hearing.caseNo}
                </Link>
                <div className="hearing-client-name">{hearing.clientName}</div>
                <div className="text-muted hearing-dispute-snippet">
                  vs. {hearing.oppositeParty} ({hearing.disputeSnippet})
                </div>
              </div>
              <div>
                <div className="hearing-court-name">{hearing.court}</div>
                <div className="text-muted hearing-bench-name">{hearing.bench}</div>
              </div>
              <div>
                <span className={`badge badge-${hearing.stageBadgeVariant}`}>{hearing.stage}</span>
              </div>
              <div className="hearing-action-cell">
                <Link
                  to={`/cases/${encodeURIComponent(hearing.caseNo)}`}
                  className="btn btn-secondary btn-sm"
                  title="Open Full Case Brief"
                >
                  Brief
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredHearings.length === 0 && (
        <div className="hearings-empty-card">
          <div className="empty-icon-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3>No court hearings match your active filters</h3>
          <p className="text-muted">
            Try selecting "All Courts" or resetting your stage filter to display scheduled cause list listings.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setSearchQuery("");
              setSelectedDateFilter("all");
              setSelectedCourt("all");
              setSelectedStage("all");
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* ====================================================================
           SCHEDULE NEW HEARING MODAL
           ==================================================================== */}
      {isScheduleModalOpen && (
        <div className="hearings-modal-backdrop" onClick={() => setIsScheduleModalOpen(false)}>
          <div className="hearings-modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="hearings-modal-header">
              <h3>Schedule New Court Listing</h3>
              <button
                type="button"
                className="hearings-modal-close"
                onClick={() => setIsScheduleModalOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleScheduleSubmit}>
              <div className="hearings-modal-body">
                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Case Number *</label>
                    <input
                      type="text"
                      className="form-input font-mono"
                      value={newCaseNo}
                      onChange={(e) => setNewCaseNo(e.target.value)}
                      placeholder="e.g. WP(C) 14022/2023"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Client Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      placeholder="e.g. Vikramaditya Enterprises"
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Hearing Date & Time *</label>
                    <input
                      type="datetime-local"
                      className="form-input"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Jurisdiction Court *</label>
                    <select
                      className="form-select"
                      value={newCourt}
                      onChange={(e) => setNewCourt(e.target.value)}
                    >
                      <option>High Court of Delhi</option>
                      <option>Saket District Court</option>
                      <option>Supreme Court</option>
                      <option>NCLT Principal Bench</option>
                      <option>Delhi Arb. Centre</option>
                      <option>Patiala House Court</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Courtroom No.</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newCourtroom}
                      onChange={(e) => setNewCourtroom(e.target.value)}
                      placeholder="Courtroom 14"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cause List Item No.</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newItemNo}
                      onChange={(e) => setNewItemNo(e.target.value)}
                      placeholder="Item #12"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Hearing Stage / Purpose *</label>
                  <select
                    className="form-select"
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                  >
                    <option>Final Arguments on Stay Application</option>
                    <option>Final Arguments</option>
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
                    value={newBench}
                    onChange={(e) => setNewBench(e.target.value)}
                    placeholder="Hon'ble Chief Justice Bench"
                  />
                </div>
              </div>

              <div className="hearings-modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsScheduleModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Record Hearing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hearings;
