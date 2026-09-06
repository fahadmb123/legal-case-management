import { useState, useMemo } from "react";
import "./Clients.css";

export interface ClientRecord {
  id: string;
  clientId: string;
  name: string;
  type: "Corporate" | "Individual";
  avatarText: string;
  avatarGradient: string;
  phone: string;
  email: string;
  primaryCaseNo: string;
  caseType: string;
  court: string;
  status: "Active" | "Pending Sec 11" | "Consultation" | "Disposed";
  activeCasesCount: number;
  nextHearing: string;
  hearingUrgency: "today" | "tomorrow" | "upcoming" | "past";
  address?: string;
  onboardedDate?: string;
  notes?: string;
}

const INITIAL_CLIENTS: ClientRecord[] = [
  {
    id: "1",
    clientId: "CLT-2023-089",
    name: "Vikramaditya Enterprises Ltd.",
    type: "Corporate",
    avatarText: "VE",
    avatarGradient: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    phone: "+91 98112 34500",
    email: "legal@vikramaditya.in",
    primaryCaseNo: "WP(C) 14022/2023",
    caseType: "Civil Writ Petition",
    court: "Delhi High Court",
    status: "Active",
    activeCasesCount: 3,
    nextHearing: "Today, 10:30 AM",
    hearingUrgency: "today",
    address: "Regd. Office: 44 Barakhamba Road, Connaught Place, New Delhi 110001",
    onboardedDate: "15 Mar 2023",
    notes: "Lead company in writ challenging municipal tax assessment notices."
  },
  {
    id: "2",
    clientId: "CLT-2022-041",
    name: "Suresh Chand Mathur",
    type: "Individual",
    avatarText: "SM",
    avatarGradient: "linear-gradient(135deg, #059669, #047857)",
    phone: "+91 98710 99211",
    email: "sc.mathur@delhinet.org",
    primaryCaseNo: "CRL.A. 419/2022",
    caseType: "Criminal Appeal",
    court: "Saket District Court",
    status: "Active",
    activeCasesCount: 1,
    nextHearing: "Today, 02:15 PM",
    hearingUrgency: "today",
    address: "B-4/12 Hauz Khas Enclave, New Delhi 110016",
    onboardedDate: "10 Aug 2022",
    notes: "Appeal against trial court conviction order under NI Act Section 138."
  },
  {
    id: "3",
    clientId: "CLT-2024-112",
    name: "AeroTech Dynamics Corp.",
    type: "Corporate",
    avatarText: "AD",
    avatarGradient: "linear-gradient(135deg, #d97706, #b45309)",
    phone: "+91 11 4455 6600",
    email: "counsel@aerotech.in",
    primaryCaseNo: "CS(COMM) 298/2024",
    caseType: "Commercial Suit",
    court: "Delhi High Court",
    status: "Active",
    activeCasesCount: 2,
    nextHearing: "Tomorrow, 11:00 AM",
    hearingUrgency: "tomorrow",
    address: "DLF Cyber City, Tower 8C, 9th Floor, Gurugram, Haryana 122002",
    onboardedDate: "12 Jan 2024",
    notes: "Breach of aeronautical procurement agreement and injunction suit."
  },
  {
    id: "4",
    clientId: "CLT-2023-076",
    name: "Pooja Singhania",
    type: "Individual",
    avatarText: "PS",
    avatarGradient: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    phone: "+91 99990 12345",
    email: "pooja.singh@chambers.in",
    primaryCaseNo: "ARB.P. 512/2023",
    caseType: "Arbitration Pet.",
    court: "Delhi Arb. Centre",
    status: "Pending Sec 11",
    activeCasesCount: 1,
    nextHearing: "14 Sep 2026",
    hearingUrgency: "upcoming",
    address: "C-18 Vasant Vihar, New Delhi 110057",
    onboardedDate: "28 Nov 2023",
    notes: "Appointment of sole arbitrator in commercial partnership dissolution."
  },
  {
    id: "5",
    clientId: "CLT-2024-033",
    name: "Hindustan Infra Logistics Ltd.",
    type: "Corporate",
    avatarText: "HI",
    avatarGradient: "linear-gradient(135deg, #0284c7, #0369a1)",
    phone: "+91 98200 44110",
    email: "legal@hindinfra.co.in",
    primaryCaseNo: "ARB.O.P. 882/2023",
    caseType: "Commercial Suit",
    court: "Supreme Court of India",
    status: "Active",
    activeCasesCount: 4,
    nextHearing: "18 Sep 2026",
    hearingUrgency: "upcoming",
    address: "Nariman Point, Express Towers 14th Floor, Mumbai 400021",
    onboardedDate: "05 Feb 2024",
    notes: "National highway concessionaire contract arbitration appeal."
  },
  {
    id: "6",
    clientId: "CLT-2022-105",
    name: "Dr. Rajeshwar Sen",
    type: "Individual",
    avatarText: "RS",
    avatarGradient: "linear-gradient(135deg, #0d9488, #0f766e)",
    phone: "+91 98101 22987",
    email: "r.sen.neuro@delhihosp.org",
    primaryCaseNo: "W.P.(C) 9140/2024",
    caseType: "Civil Writ Petition",
    court: "Delhi High Court",
    status: "Active",
    activeCasesCount: 1,
    nextHearing: "22 Sep 2026",
    hearingUrgency: "upcoming",
    address: "24 Ring Road, Lajpat Nagar IV, New Delhi 110024",
    onboardedDate: "19 Oct 2022",
    notes: "Service matter petition regarding superannuation and pension benefits."
  },
  {
    id: "7",
    clientId: "CLT-2023-149",
    name: "Bharat Renewable Energy Corp.",
    type: "Corporate",
    avatarText: "BR",
    avatarGradient: "linear-gradient(135deg, #ea580c, #c2410c)",
    phone: "+91 11 2341 8900",
    email: "contact@bharatrenew.in",
    primaryCaseNo: "COMP.APP 64/2024",
    caseType: "Company Appeal",
    court: "NCLT Principal Bench",
    status: "Active",
    activeCasesCount: 2,
    nextHearing: "25 Sep 2026",
    hearingUrgency: "upcoming",
    address: "Scope Complex, Lodhi Road, New Delhi 110003",
    onboardedDate: "14 Jul 2023",
    notes: "Merger sanction application and creditor objection hearing."
  },
  {
    id: "8",
    clientId: "CLT-2024-082",
    name: "Arvind Kejriwal & Associates LLP",
    type: "Corporate",
    avatarText: "AK",
    avatarGradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
    phone: "+91 98188 77665",
    email: "arvind@aka-law.in",
    primaryCaseNo: "CS(OS) 104/2023",
    caseType: "Commercial Suit",
    court: "Patiala House Court",
    status: "Consultation",
    activeCasesCount: 1,
    nextHearing: "28 Sep 2026",
    hearingUrgency: "upcoming",
    address: "Legal Chambers, 21 Tilak Marg, New Delhi 110001",
    onboardedDate: "03 Jun 2024",
    notes: "Retainer consultation on trade secrets and non-compete covenants."
  },
  {
    id: "9",
    clientId: "CLT-2023-055",
    name: "Meenakshi Sundaram",
    type: "Individual",
    avatarText: "MS",
    avatarGradient: "linear-gradient(135deg, #64748b, #475569)",
    phone: "+91 94440 12984",
    email: "msundaram@advchambers.com",
    primaryCaseNo: "CRL.M.C. 3310/2023",
    caseType: "Criminal Appeal",
    court: "Delhi High Court",
    status: "Disposed",
    activeCasesCount: 0,
    nextHearing: "Concluded",
    hearingUrgency: "past",
    address: "Flat 302, Mandakini Enclave, Alaknanda, New Delhi 110019",
    onboardedDate: "04 May 2023",
    notes: "Quashing petition allowed by Single Bench. Matter successfully resolved."
  },
  {
    id: "10",
    clientId: "CLT-2024-201",
    name: "Zenith Biotech Pharma",
    type: "Corporate",
    avatarText: "ZB",
    avatarGradient: "linear-gradient(135deg, #059669, #0f766e)",
    phone: "+91 22 6678 9900",
    email: "legal@zenithpharma.com",
    primaryCaseNo: "FAO(OS) 55/2024",
    caseType: "Civil Writ Petition",
    court: "Delhi High Court",
    status: "Active",
    activeCasesCount: 3,
    nextHearing: "03 Oct 2026",
    hearingUrgency: "upcoming",
    address: "Bandra Kurla Complex, G-Block, Mumbai 400051",
    onboardedDate: "18 Aug 2024",
    notes: "Patent infringement challenge and interim injunction proceedings."
  }
];

const ITEMS_PER_PAGE = 5;

function Clients() {
  const [clients, setClients] = useState<ClientRecord[]>(INITIAL_CLIENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedCaseType, setSelectedCaseType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [selectedClientForView, setSelectedClientForView] = useState<ClientRecord | null>(null);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Client Form State
  const [newClientName, setNewClientName] = useState("");
  const [newClientType, setNewClientType] = useState<"Corporate" | "Individual">("Corporate");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newCaseNumber, setNewCaseNumber] = useState("");
  const [newCaseType, setNewCaseType] = useState("Civil Writ Petition");
  const [newCourt, setNewCourt] = useState("Delhi High Court");
  const [newStatus, setNewStatus] = useState<"Active" | "Pending Sec 11" | "Consultation" | "Disposed">("Active");
  const [newNotes, setNewNotes] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filter logic
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        client.name.toLowerCase().includes(q) ||
        client.clientId.toLowerCase().includes(q) ||
        client.email.toLowerCase().includes(q) ||
        client.phone.includes(q) ||
        client.primaryCaseNo.toLowerCase().includes(q);

      const matchesCourt = !selectedCourt || client.court === selectedCourt;
      const matchesCaseType = !selectedCaseType || client.caseType === selectedCaseType;
      const matchesStatus = !selectedStatus || client.status === selectedStatus;

      return matchesSearch && matchesCourt && matchesCaseType && matchesStatus;
    });
  }, [clients, searchQuery, selectedCourt, selectedCaseType, selectedStatus]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredClients.length / ITEMS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCourt("");
    setSelectedCaseType("");
    setSelectedStatus("");
    setCurrentPage(1);
  };

  const hasActiveFilters = Boolean(searchQuery || selectedCourt || selectedCaseType || selectedStatus);

  const handleAddClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const initials = newClientName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "CL";

    const generatedId = `CLT-2026-${String(Math.floor(Math.random() * 900) + 100)}`;

    const newRecord: ClientRecord = {
      id: Date.now().toString(),
      clientId: generatedId,
      name: newClientName.trim(),
      type: newClientType,
      avatarText: initials,
      avatarGradient: newClientType === "Corporate"
        ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
        : "linear-gradient(135deg, #059669, #047857)",
      phone: newClientPhone.trim() || "+91 98112 00000",
      email: newClientEmail.trim() || "legal@client.in",
      primaryCaseNo: newCaseNumber.trim() || "WP(C) " + Math.floor(1000 + Math.random() * 9000) + "/2026",
      caseType: newCaseType,
      court: newCourt,
      status: newStatus,
      activeCasesCount: 1,
      nextHearing: "Listing Pending",
      hearingUrgency: "upcoming",
      address: "New Delhi, India",
      onboardedDate: "Today",
      notes: newNotes.trim() || "Newly enrolled client."
    };

    setClients((prev) => [newRecord, ...prev]);
    setIsAddClientOpen(false);
    showToast(`Client "${newRecord.name}" successfully enrolled (${newRecord.clientId})`);

    // Reset form
    setNewClientName("");
    setNewClientPhone("");
    setNewClientEmail("");
    setNewCaseNumber("");
    setNewNotes("");
  };

  return (
    <div className="clients-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="clients-toast" role="alert">
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
            <h1>Client Directory</h1>
            <span className="client-total-pill">{clients.length} Registered</span>
          </div>
          <p>
            Maintain confidential client rosters, corporate contacts, matter histories, and court representation.
          </p>
        </div>
        <div className="page-header-actions">
          <button
            type="button"
            className="btn btn-primary add-client-btn"
            onClick={() => setIsAddClientOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Client
          </button>
        </div>
      </div>

      {/* Quick Summary Metrics Cards */}
      <div className="client-stats-grid">
        <div className="client-stat-card">
          <div className="stat-card-label">Total Roster</div>
          <div className="stat-card-value">{clients.length}</div>
          <div className="stat-card-meta">Retained Chambers Roster</div>
        </div>
        <div className="client-stat-card">
          <div className="stat-card-label">Active Representation</div>
          <div className="stat-card-value text-success">
            {clients.filter(c => c.status === "Active").length}
          </div>
          <div className="stat-card-meta">Active High Court & District</div>
        </div>
        <div className="client-stat-card">
          <div className="stat-card-label">Corporate Entities</div>
          <div className="stat-card-value text-primary">
            {clients.filter(c => c.type === "Corporate").length}
          </div>
          <div className="stat-card-meta">Enterprises & LLPs</div>
        </div>
        <div className="client-stat-card">
          <div className="stat-card-label">Hearings Today / Tomorrow</div>
          <div className="stat-card-value text-warning">
            {clients.filter(c => c.hearingUrgency === "today" || c.hearingUrgency === "tomorrow").length}
          </div>
          <div className="stat-card-meta">Immediate Cause List Matters</div>
        </div>
      </div>

      {/* Modern Unified Search & Filter Card */}
      <div className="clients-filter-bar">
        <div className="clients-toolbar-row">
          {/* Primary Quick Search Bar */}
          <div className="clients-search-wrapper">
            <span className="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              className="clients-search-input"
              placeholder="Search by client name, ID, phone, email, or case number..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          {/* Quick Filter Dropdowns */}
          <div className="clients-select-group">
            <div className="filter-select-wrapper">
              <select
                className="form-select filter-select"
                value={selectedCourt}
                onChange={(e) => {
                  setSelectedCourt(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by Court"
              >
                <option value="">All Courts</option>
                <option value="Delhi High Court">Delhi High Court</option>
                <option value="Supreme Court of India">Supreme Court of India</option>
                <option value="Saket District Court">Saket District Court</option>
                <option value="Patiala House Court">Patiala House Court</option>
                <option value="NCLT Principal Bench">NCLT Principal Bench</option>
                <option value="Delhi Arb. Centre">Delhi Arb. Centre</option>
              </select>
            </div>

            <div className="filter-select-wrapper">
              <select
                className="form-select filter-select"
                value={selectedCaseType}
                onChange={(e) => {
                  setSelectedCaseType(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by Case Type"
              >
                <option value="">All Case Types</option>
                <option value="Civil Writ Petition">Civil Writ Petition</option>
                <option value="Commercial Suit">Commercial Suit</option>
                <option value="Criminal Appeal">Criminal Appeal</option>
                <option value="Arbitration Pet.">Arbitration Pet.</option>
                <option value="Company Appeal">Company Appeal</option>
              </select>
            </div>

            <div className="filter-select-wrapper">
              <select
                className="form-select filter-select"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by Status"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending Sec 11">Pending Sec 11</option>
                <option value="Consultation">Consultation</option>
                <option value="Disposed">Disposed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="filter-chip-bar">
            <span className="filter-chip-label">Active Filters:</span>

            {searchQuery && (
              <span className="filter-chip">
                Query: "{searchQuery}"
                <button
                  type="button"
                  className="filter-chip-remove"
                  onClick={() => setSearchQuery("")}
                  aria-label="Remove search filter"
                >
                  &times;
                </button>
              </span>
            )}

            {selectedCourt && (
              <span className="filter-chip">
                Court: {selectedCourt}
                <button
                  type="button"
                  className="filter-chip-remove"
                  onClick={() => setSelectedCourt("")}
                  aria-label="Remove court filter"
                >
                  &times;
                </button>
              </span>
            )}

            {selectedCaseType && (
              <span className="filter-chip">
                Type: {selectedCaseType}
                <button
                  type="button"
                  className="filter-chip-remove"
                  onClick={() => setSelectedCaseType("")}
                  aria-label="Remove case type filter"
                >
                  &times;
                </button>
              </span>
            )}

            {selectedStatus && (
              <span className="filter-chip">
                Status: {selectedStatus}
                <button
                  type="button"
                  className="filter-chip-remove"
                  onClick={() => setSelectedStatus("")}
                  aria-label="Remove status filter"
                >
                  &times;
                </button>
              </span>
            )}

            <button
              type="button"
              className="filter-reset-link"
              onClick={resetFilters}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Table Card */}
      <div className="data-table-wrapper client-table-wrapper">
        {paginatedClients.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Client Profile</th>
                    <th>Contact Details</th>
                    <th>Primary Matter</th>
                    <th>Case Category</th>
                    <th>Jurisdiction</th>
                    <th>Status</th>
                    <th>Next Cause Hearing</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedClients.map((client) => {
                    const isToday = client.hearingUrgency === "today";
                    const isTomorrow = client.hearingUrgency === "tomorrow";

                    return (
                      <tr key={client.id} className="client-table-row">
                        <td>
                          <div className="client-identity-cell">
                            <div
                              className="advocate-avatar client-avatar"
                              style={{ background: client.avatarGradient }}
                            >
                              {client.avatarText}
                            </div>
                            <div className="client-name-details">
                              <button
                                type="button"
                                className="client-name-btn"
                                onClick={() => setSelectedClientForView(client)}
                              >
                                {client.name}
                              </button>
                              <div className="client-submeta">
                                <span className="client-id-badge">{client.clientId}</span>
                                <span className="submeta-separator">&bull;</span>
                                <span className="client-active-cases">
                                  {client.activeCasesCount} {client.activeCasesCount === 1 ? "Active Matter" : "Active Matters"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="contact-cell">
                            <div className="contact-phone">{client.phone}</div>
                            <div className="contact-email text-muted">{client.email}</div>
                          </div>
                        </td>

                        <td>
                          <div className="primary-case-cell">
                            <span className="case-number-pill">{client.primaryCaseNo}</span>
                          </div>
                        </td>

                        <td>
                          <span className="case-type-text">{client.caseType}</span>
                        </td>

                        <td>
                          <span className="court-text">{client.court}</span>
                        </td>

                        <td>
                          {client.status === "Active" && (
                            <span className="badge badge-success">
                              <span className="badge-dot"></span> Active
                            </span>
                          )}
                          {client.status === "Pending Sec 11" && (
                            <span className="badge badge-warning">
                              <span className="badge-dot"></span> Pending Sec 11
                            </span>
                          )}
                          {client.status === "Consultation" && (
                            <span className="badge" style={{ backgroundColor: "var(--color-bg-surface-subtle)", border: "1px solid var(--color-border-default)", color: "var(--color-text-secondary)" }}>
                              <span className="badge-dot" style={{ backgroundColor: "var(--color-primary)" }}></span> Consultation
                            </span>
                          )}
                          {client.status === "Disposed" && (
                            <span className="badge badge-neutral">
                              Disposed
                            </span>
                          )}
                        </td>

                        <td>
                          {isToday && (
                            <span className="badge badge-danger hearing-badge">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              {client.nextHearing}
                            </span>
                          )}
                          {isTomorrow && (
                            <span className="badge badge-warning hearing-badge">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              {client.nextHearing}
                            </span>
                          )}
                          {!isToday && !isTomorrow && (
                            <span className="hearing-date-muted">{client.nextHearing}</span>
                          )}
                        </td>

                        <td style={{ textAlign: "right" }}>
                          <div className="table-row-actions" style={{ justifyContent: "flex-end" }}>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm action-pill-btn"
                              onClick={() => setSelectedClientForView(client)}
                              title="View Full Client Dossier"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              className="btn btn-ghost btn-sm action-pill-btn"
                              onClick={() => {
                                showToast(`New Case creation drawer opened for ${client.name}`);
                              }}
                              title="Link New Case Matter"
                            >
                              + Case
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Dynamic Functional Pagination Bar */}
            <div className="pagination-container client-pagination-bar">
              <div className="pagination-info">
                Showing <strong>{startIndex + 1} – {Math.min(startIndex + ITEMS_PER_PAGE, filteredClients.length)}</strong> of{" "}
                <strong>{filteredClients.length}</strong> clients
                {hasActiveFilters && <span className="filtered-label-tag"> (Filtered)</span>}
              </div>

              <div className="pagination-controls">
                <button
                  type="button"
                  className="pagination-item"
                  disabled={activePage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  aria-label="Previous page"
                >
                  &laquo; Prev
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    className={`pagination-item ${pageNum === activePage ? "is-active" : ""}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  className="pagination-item"
                  disabled={activePage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Next page"
                >
                  Next &raquo;
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty Search Results State */
          <div className="clients-empty-state">
            <div className="empty-state-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
            <h3 className="empty-state-title">No client records match your search criteria</h3>
            <p className="empty-state-text">
              We couldn't find any clients matching your active filters. Try adjusting your search query, selecting different courts, or resetting parameters.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetFilters}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
           VIEW CLIENT DOSSIER MODAL
           ========================================================================= */}
      {selectedClientForView && (
        <div className="client-modal-backdrop" onClick={() => setSelectedClientForView(null)}>
          <div
            className="client-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-client-title"
          >
            <div className="client-modal-header">
              <div className="modal-header-profile">
                <div
                  className="advocate-avatar modal-avatar"
                  style={{ background: selectedClientForView.avatarGradient }}
                >
                  {selectedClientForView.avatarText}
                </div>
                <div>
                  <h2 id="modal-client-title" className="modal-client-name">
                    {selectedClientForView.name}
                  </h2>
                  <div className="modal-client-meta">
                    <span className="client-id-badge">{selectedClientForView.clientId}</span>
                    <span className="submeta-separator">&bull;</span>
                    <span>{selectedClientForView.type} Client</span>
                    <span className="submeta-separator">&bull;</span>
                    <span className="text-muted">Onboarded: {selectedClientForView.onboardedDate}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedClientForView(null)}
                aria-label="Close dossier"
              >
                &times;
              </button>
            </div>

            <div className="client-modal-body">
              <div className="modal-section-grid">
                <div className="modal-info-box">
                  <div className="info-box-label">Primary Court Jurisdiction</div>
                  <div className="info-box-value">{selectedClientForView.court}</div>
                </div>
                <div className="modal-info-box">
                  <div className="info-box-label">Case Classification</div>
                  <div className="info-box-value">{selectedClientForView.caseType}</div>
                </div>
                <div className="modal-info-box">
                  <div className="info-box-label">Telephone Contact</div>
                  <div className="info-box-value font-mono">{selectedClientForView.phone}</div>
                </div>
                <div className="modal-info-box">
                  <div className="info-box-label">Confidential Email</div>
                  <div className="info-box-value">{selectedClientForView.email}</div>
                </div>
              </div>

              <div className="modal-detail-card">
                <div className="detail-card-title">Active Cause List Matter</div>
                <div className="matter-summary-row">
                  <div>
                    <div className="matter-case-no">{selectedClientForView.primaryCaseNo}</div>
                    <div className="matter-court text-muted">{selectedClientForView.court} &bull; Courtroom 14</div>
                  </div>
                  <div>
                    <span className="badge badge-primary">Next Listing: {selectedClientForView.nextHearing}</span>
                  </div>
                </div>
              </div>

              <div className="modal-detail-card">
                <div className="detail-card-title">Registered Office / Address</div>
                <p className="detail-address-text">{selectedClientForView.address}</p>
              </div>

              <div className="modal-detail-card">
                <div className="detail-card-title">Chamber Case Brief & Notes</div>
                <p className="detail-notes-text">{selectedClientForView.notes}</p>
              </div>
            </div>

            <div className="client-modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSelectedClientForView(null)}
              >
                Close Dossier
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  showToast(`Matter docket opened for ${selectedClientForView.name}`);
                  setSelectedClientForView(null);
                }}
              >
                Open Case Docket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
           ADD NEW CLIENT MODAL
           ========================================================================= */}
      {isAddClientOpen && (
        <div className="client-modal-backdrop" onClick={() => setIsAddClientOpen(false)}>
          <div
            className="client-modal-card add-client-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-add-title"
          >
            <div className="client-modal-header">
              <div>
                <h2 id="modal-add-title" className="modal-client-name">Enroll New Client</h2>
                <p className="modal-header-desc">
                  Create client profile, assign cause jurisdiction, and record initial litigation matter.
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsAddClientOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddClientSubmit}>
              <div className="client-modal-body">
                <div className="add-client-form-grid">
                  <div className="form-group span-2">
                    <label className="form-label">Client or Corporation Legal Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Acme Infra Logistics Ltd. or Rameshwar Lal"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Client Category</label>
                    <select
                      className="form-select"
                      value={newClientType}
                      onChange={(e) => setNewClientType(e.target.value as "Corporate" | "Individual")}
                    >
                      <option value="Corporate">Corporate / Institution</option>
                      <option value="Individual">Individual Citizen</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="+91 98..."
                      value={newClientPhone}
                      onChange={(e) => setNewClientPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group span-2">
                    <label className="form-label">Contact Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="counsel@client.in"
                      value={newClientEmail}
                      onChange={(e) => setNewClientEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Primary Court Jurisdiction</label>
                    <select
                      className="form-select"
                      value={newCourt}
                      onChange={(e) => setNewCourt(e.target.value)}
                    >
                      <option>Delhi High Court</option>
                      <option>Supreme Court of India</option>
                      <option>Saket District Court</option>
                      <option>Patiala House Court</option>
                      <option>NCLT Principal Bench</option>
                      <option>Delhi Arb. Centre</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Case Classification</label>
                    <select
                      className="form-select"
                      value={newCaseType}
                      onChange={(e) => setNewCaseType(e.target.value)}
                    >
                      <option>Civil Writ Petition</option>
                      <option>Commercial Suit</option>
                      <option>Criminal Appeal</option>
                      <option>Arbitration Pet.</option>
                      <option>Company Appeal</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Initial Case / Filing No.</label>
                    <input
                      type="text"
                      className="form-input font-mono"
                      placeholder="e.g. WP(C) 1205/2026"
                      value={newCaseNumber}
                      onChange={(e) => setNewCaseNumber(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Representation Status</label>
                    <select
                      className="form-select"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as any)}
                    >
                      <option value="Active">Active Representation</option>
                      <option value="Pending Sec 11">Pending Sec 11</option>
                      <option value="Consultation">Consultation Only</option>
                      <option value="Disposed">Disposed</option>
                    </select>
                  </div>

                  <div className="form-group span-2">
                    <label className="form-label">Chamber Briefing Notes</label>
                    <textarea
                      className="form-input"
                      rows={2}
                      placeholder="Summary of dispute, opposite party counsel, next key listing..."
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="client-modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsAddClientOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Enroll Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;