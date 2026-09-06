import { 
  BarChart3, Users, Settings, LogOut, Search, Menu, 
  Trash2, Download, Check, X, RefreshCw, Save, CreditCard, ShieldCheck, Key, ExternalLink
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState, useMemo } from 'react';

const dashTranslations = {
  it: {
    overview: "Panoramica",
    myWebsites: "Siti Web",
    leads: "Lead & Contatti",
    settings: "Impostazioni",
    signOut: "Disconnetti",
    welcome: "Bentornato,",
    searchPlaceholder: "Cerca per ristorante, nome, email...",
    totalVisitors: "Visitatori Unici Totali",
    realtime: "Tracker in tempo reale",
    activeLeads: "Lead Attivi",
    fromFunnel: "dal funnel di marketing",
    conversionRate: "Tasso di Conversione",
    leadsOverVisits: "Lead / Visitatori",
    recentLeads: "Lead Recenti",
    viewAll: "Vedi Tutti",
    noLeads: "Nessun lead al momento.",
    tableName: "Nome",
    tableRestaurant: "Ristorante",
    tableContact: "Contatto",
    tableStatus: "Stato Abbonamento",
    tableDate: "Data",
    tableActions: "Azioni",
    exportCsv: "Esporta CSV",
    filterAll: "Tutti i Lead",
    pricingSettingsTitle: "Prezzo & Configurazione Sito Web",
    pricingSettingsSub: "Modifica il prezzo mostrato dinamicamente in tutte le sezioni del sito web.",
    monthlyPriceLabel: "Prezzo Abbonamento Mensile Mostrato nel Sito (€/mese)",
    monthlyPriceHelp: "Questo valore aggiorna automaticamente tutti i testi del sito (es. 55€, 70€/mese, titoli, FAQ e messaggi WhatsApp).",
    whatsappNumberLabel: "Numero WhatsApp per Ricevere i Lead",
    stripeConfigTitle: "Configurazione Stripe & Pagamenti Automatici",
    stripeConfigSub: "Collega il tuo account Stripe per ricevere automaticamente gli abbonamenti mensili con Apple Pay, Carte e SEPA.",
    stripeSecretKeyLabel: "Stripe Secret Key (sk_live_... / sk_test_...)",
    stripePublishableKeyLabel: "Stripe Publishable Key (pk_live_... / pk_test_...)",
    stripePaymentLinkLabel: "Stripe Payment Link Diretto (Opzionale)",
    stripePaymentLinkHelp: "Se hai creato un link di pagamento ricorrente nella dashboard Stripe, incollalo qui per usarlo direttamente.",
    stripeStatusActive: "Stripe Connesso & Pronto",
    stripeStatusDemo: "Modalità Demo Attiva (Inserisci le chiavi Stripe per ricevere pagamenti reali)",
    saveChanges: "Salva Modifiche",
    savedSuccess: "Impostazioni salvate e sincronizzate con successo!",
    deleteConfirm: "Sei sicuro di voler eliminare questo lead?",
    refresh: "Aggiorna Dati",
    sendStripeLink: "Invia Link Pagamento",
    statusSubscribed: "Abbonato",
    statusPending: "In Attesa Pagamento",
    statusLead: "Bozza Gratuita",
    statusCanceled: "Cancellato"
  },
  en: {
    overview: "Overview",
    myWebsites: "Websites",
    leads: "Leads & CRM",
    settings: "Settings",
    signOut: "Sign Out",
    welcome: "Welcome back,",
    searchPlaceholder: "Search restaurant, name, email...",
    totalVisitors: "Total Unique Visitors",
    realtime: "Real-time tracker",
    activeLeads: "Active Leads",
    fromFunnel: "from marketing funnel",
    conversionRate: "Conversion Rate",
    leadsOverVisits: "Leads / Visitors",
    recentLeads: "Recent Leads",
    viewAll: "View All",
    noLeads: "No leads yet.",
    tableName: "Name",
    tableRestaurant: "Restaurant",
    tableContact: "Contact Info",
    tableStatus: "Subscription Status",
    tableDate: "Date",
    tableActions: "Actions",
    exportCsv: "Export CSV",
    filterAll: "All Leads",
    pricingSettingsTitle: "Pricing & Website Configuration",
    pricingSettingsSub: "Update the dynamic monthly price displayed across all sections of the live website.",
    monthlyPriceLabel: "Monthly Subscription Price Shown on Website (€/month)",
    monthlyPriceHelp: "This value automatically updates all prices across the website (e.g. €55, €70/month, titles, FAQs, and WhatsApp prefilled texts).",
    whatsappNumberLabel: "WhatsApp Phone Number to Receive Leads",
    stripeConfigTitle: "Stripe & Automated Payments Configuration",
    stripeConfigSub: "Connect your Stripe account to automatically collect monthly subscriptions via Apple Pay, Cards, and SEPA.",
    stripeSecretKeyLabel: "Stripe Secret Key (sk_live_... / sk_test_...)",
    stripePublishableKeyLabel: "Stripe Publishable Key (pk_live_... / pk_test_...)",
    stripePaymentLinkLabel: "Stripe Direct Payment Link (Optional)",
    stripePaymentLinkHelp: "If you created a recurring payment link in Stripe Dashboard, paste it here to use directly.",
    stripeStatusActive: "Stripe Connected & Ready",
    stripeStatusDemo: "Demo Mode Active (Add your Stripe keys to collect real payments)",
    saveChanges: "Save Changes",
    savedSuccess: "Settings saved and synchronized successfully!",
    deleteConfirm: "Are you sure you want to delete this lead?",
    refresh: "Refresh Data",
    sendStripeLink: "Send Stripe Link",
    statusSubscribed: "Subscribed",
    statusPending: "Pending Payment",
    statusLead: "Free Draft",
    statusCanceled: "Canceled"
  },
  de: {
    overview: "Übersicht",
    myWebsites: "Websites",
    leads: "Leads & Kontakte",
    settings: "Einstellungen",
    signOut: "Abmelden",
    welcome: "Willkommen zurück,",
    searchPlaceholder: "Restaurant, Name, E-Mail suchen...",
    totalVisitors: "Eindeutige Besucher gesamt",
    realtime: "Echtzeit-Tracker",
    activeLeads: "Aktive Leads",
    fromFunnel: "aus dem Marketing-Trichter",
    conversionRate: "Konversionsrate",
    leadsOverVisits: "Leads / Besucher",
    recentLeads: "Aktuelle Leads",
    viewAll: "Alle ansehen",
    noLeads: "Noch keine Leads vorhanden.",
    tableName: "Name",
    tableRestaurant: "Restaurant",
    tableContact: "Kontaktdaten",
    tableStatus: "Abo-Status",
    tableDate: "Datum",
    tableActions: "Aktionen",
    exportCsv: "CSV exportieren",
    filterAll: "Alle Leads",
    pricingSettingsTitle: "Preise & Website-Konfiguration",
    pricingSettingsSub: "Aktualisieren Sie den monatlichen Preis, der dynamisch auf der gesamten Website angezeigt wird.",
    monthlyPriceLabel: "Auf der Website angezeigter monatlicher Preis (€/Monat)",
    monthlyPriceHelp: "Dieser Wert aktualisiert automatisch alle Preise auf der Website (z. B. 55€, 70€/Monat, Titel, FAQs und WhatsApp-Nachrichten).",
    whatsappNumberLabel: "WhatsApp-Telefonnummer für Leads",
    stripeConfigTitle: "Stripe & Automatische Zahlungen",
    stripeConfigSub: "Verbinden Sie Ihr Stripe-Konto, um monatliche Abonnements mit Apple Pay, Karten und SEPA automatisch einzuziehen.",
    stripeSecretKeyLabel: "Stripe Secret Key (sk_live_... / sk_test_...)",
    stripePublishableKeyLabel: "Stripe Publishable Key (pk_live_... / pk_test_...)",
    stripePaymentLinkLabel: "Direkter Stripe-Zahlungslink (Optional)",
    stripePaymentLinkHelp: "Wenn Sie einen Zahlungslink in Stripe erstellt haben, fügen Sie ihn hier ein.",
    stripeStatusActive: "Stripe Verbunden & Bereit",
    stripeStatusDemo: "Demo-Modus aktiv (Fügen Sie Ihre Stripe-Schlüssel für echte Zahlungen ein)",
    saveChanges: "Änderungen speichern",
    savedSuccess: "Einstellungen erfolgreich gespeichert und synchronisiert!",
    deleteConfirm: "Sind Sie sicher, dass Sie diesen Lead löschen möchten?",
    refresh: "Daten aktualisieren",
    sendStripeLink: "Zahlungslink senden",
    statusSubscribed: "Abonniert",
    statusPending: "Zahlung ausstehend",
    statusLead: "Kostenloser Entwurf",
    statusCanceled: "Gekündigt"
  }
};

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [lang, setLang] = useState(() => localStorage.getItem('pixeloro_lang') || 'it');
  const t = dashTranslations[lang] || dashTranslations.it;

  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ totalVisitors: 0 });
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('overview'); // 'overview' | 'leads' | 'settings'
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(15);
  const [deletingId, setDeletingId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic Settings State
  const [settings, setSettings] = useState({
    monthlyPrice: '55',
    whatsappNumber: '+393481134181',
    whatsappAlerts: true,
    emailAlerts: true,
    stripePublishableKey: '',
    stripeSecretKey: '',
    stripePaymentLink: ''
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  // Security Check: Allow KH Shifat and Master Admin
  useEffect(() => {
    if (!user) return;
    const adminEmails = ['khshifat@gmail.com', 'khshifatmanjum@gmail.com', 'khshi@gmail.com'];
    if (user.isAdmin) return; // Master login approved
    if (user.email && adminEmails.includes(user.email.toLowerCase().trim())) return;
    
    // If other user
    alert("Access Denied: Admin Panel Only.");
    logout();
    navigate('/login');
  }, [user, navigate, logout]);

  // Fetch Leads, Stats, and Dynamic Settings
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Leads
      const leadsRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/leads`);
      const leadsData = await leadsRes.json();
      setLeads(Array.isArray(leadsData) ? leadsData : []);

      // Fetch Stats
      const statsRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/stats`);
      const statsData = await statsRes.json();
      setStats(statsData || { totalVisitors: 0 });

      // Fetch Dynamic Settings
      const settingsRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/settings`);
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        setSettings(prev => ({ ...prev, ...settingsData }));
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('pixeloro_lang', newLang);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Delete Lead
  const handleDeleteLead = async (leadId, leadName) => {
    const confirmed = window.confirm(`${t.deleteConfirm} ("${leadName}")`);
    if (!confirmed) return;

    setDeletingId(leadId);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/leads/${leadId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setLeads(prev => prev.filter(item => item._id !== leadId));
      } else {
        alert("Failed to delete lead. Check server logs.");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
      alert("Network error while deleting lead.");
    } finally {
      setDeletingId(null);
    }
  };

  // Save Settings to Backend API & localStorage
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        localStorage.setItem('pixeloro_admin_settings', JSON.stringify(settings));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        alert("Failed to save settings to server.");
      }
    } catch (err) {
      console.error("Settings save error:", err);
      // Still save locally
      localStorage.setItem('pixeloro_admin_settings', JSON.stringify(settings));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } finally {
      setSavingSettings(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No leads to export.");
      return;
    }

    const headers = ["ID", "Name", "Restaurant Name", "Email", "Phone", "Created Date"];
    const rows = leads.map(l => [
      l._id,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.restaurantName || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      new Date(l.createdAt).toISOString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pixeloro_leads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Search Filter
  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) return leads;
    const q = searchQuery.toLowerCase();
    return leads.filter(l => 
      (l.name && l.name.toLowerCase().includes(q)) ||
      (l.restaurantName && l.restaurantName.toLowerCase().includes(q)) ||
      (l.email && l.email.toLowerCase().includes(q)) ||
      (l.phone && l.phone.includes(q))
    );
  }, [leads, searchQuery]);

  const totalVisitors = stats.totalVisitors || 0;
  const activeLeads = leads.length;
  const conversionRate = totalVisitors > 0 ? ((activeLeads / totalVisitors) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-text font-sans flex flex-col md:flex-row selection:bg-primary selection:text-black">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-primary rounded-lg border border-white/10"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="text-xl font-black tracking-tighter text-primary">pixeloro</div>
        </div>

        {/* Language Switcher on Mobile */}
        <div className="flex bg-white/5 rounded-full border border-white/10 p-1">
          {['it', 'en', 'de'].map(l => (
            <button 
              key={l}
              onClick={() => handleLanguageChange(l)}
              className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase transition-all ${lang === l ? 'bg-primary text-black' : 'text-text-muted hover:text-white'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`w-full md:w-64 bg-black/90 border-r border-white/10 p-6 flex flex-col ${mobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
        <div className="text-3xl font-black tracking-tighter text-primary mb-10 hidden md:block">
          pixeloro
        </div>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => { setCurrentTab('overview'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${currentTab === 'overview' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
          >
            <BarChart3 size={18} />
            {t.overview}
          </button>

          <button 
            onClick={() => { setCurrentTab('leads'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all ${currentTab === 'leads' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
          >
            <div className="flex items-center gap-3">
              <Users size={18} />
              {t.leads}
            </div>
            {leads.length > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${currentTab === 'leads' ? 'bg-black text-primary' : 'bg-primary/20 text-primary'}`}>
                {leads.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => { setCurrentTab('settings'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${currentTab === 'settings' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
          >
            <Settings size={18} />
            {t.settings}
          </button>

          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-text-muted hover:text-primary hover:bg-white/5 transition-all"
          >
            <span>↗</span>
            Vedi Sito Live
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-primary text-sm">
              KH
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user?.displayName || 'KH Shifat'}</div>
              <div className="text-[11px] text-text-muted truncate">{user?.email || 'Founder'}</div>
            </div>
          </div>

          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 text-text-muted hover:text-red-400 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors hover:bg-red-500/10"
          >
            <LogOut size={16} />
            {t.signOut}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 md:p-10 max-w-7xl">
        
        {/* Top Header Bar */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {t.welcome} {user?.displayName || 'KH Shifat'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              Pixeloro CRM & Digital Growth Suite
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            
            {/* Language Switcher (Desktop & Tablet) */}
            <div className="hidden sm:flex bg-white/5 rounded-full border border-white/10 p-1">
              {['it', 'en', 'de'].map(l => (
                <button 
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${lang === l ? 'bg-primary text-black' : 'text-text-muted hover:text-white'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={fetchData}
              title={t.refresh}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin text-primary' : ''} />
            </button>
          </div>
        </header>

        {/* TAB 1: OVERVIEW */}
        {currentTab === 'overview' && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-[#14141c] p-6 rounded-3xl border border-white/10 shadow-lg">
                <div className="text-text-muted font-bold text-xs uppercase tracking-wider mb-2">{t.totalVisitors}</div>
                <div className="text-4xl font-black text-white">{totalVisitors}</div>
                <div className="text-primary text-xs font-bold mt-2 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  {t.realtime}
                </div>
              </div>

              <div className="bg-[#14141c] p-6 rounded-3xl border border-white/10 shadow-lg">
                <div className="text-text-muted font-bold text-xs uppercase tracking-wider mb-2">{t.activeLeads}</div>
                <div className="text-4xl font-black text-white">{activeLeads}</div>
                <div className="text-primary text-xs font-bold mt-2">{t.fromFunnel}</div>
              </div>

              <div className="bg-[#14141c] p-6 rounded-3xl border border-white/10 shadow-lg">
                <div className="text-text-muted font-bold text-xs uppercase tracking-wider mb-2">{t.conversionRate}</div>
                <div className="text-4xl font-black text-white">{conversionRate}%</div>
                <div className="text-text-muted text-xs font-medium mt-2">{t.leadsOverVisits}</div>
              </div>
            </div>

            {/* Recent Leads Table */}
            <div className="bg-[#14141c] rounded-3xl border border-white/10 overflow-hidden shadow-xl">
              <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-black text-white">{t.recentLeads}</h2>
                  <p className="text-xs text-text-muted">{leads.length} {t.filterAll}</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                      type="text" 
                      placeholder={t.searchPlaceholder} 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button 
                    onClick={handleExportCSV}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Download size={14} />
                    <span className="hidden sm:inline">{t.exportCsv}</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/50 text-text-muted text-[11px] uppercase tracking-wider">
                      <th className="p-4 font-bold">{t.tableName}</th>
                      <th className="p-4 font-bold">{t.tableRestaurant}</th>
                      <th className="p-4 font-bold">{t.tableContact}</th>
                      <th className="p-4 font-bold">{t.tableStatus}</th>
                      <th className="p-4 font-bold">{t.tableDate}</th>
                      <th className="p-4 font-bold text-right">{t.tableActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {loading ? (
                      <tr><td colSpan="6" className="p-8 text-center text-text-muted">Caricamento lead...</td></tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr><td colSpan="6" className="p-8 text-center text-text-muted">{t.noLeads}</td></tr>
                    ) : (
                      filteredLeads.slice(0, visibleCount).map((lead) => (
                        <tr key={lead._id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-bold text-white">
                            {lead.name}
                          </td>
                          <td className="p-4 text-primary font-semibold">
                            {lead.restaurantName}
                          </td>
                          <td className="p-4 text-text-muted">
                            <div className="space-y-1">
                              {lead.phone && (
                                <div className="text-white font-mono">{lead.phone}</div>
                              )}
                              <div className="text-text-muted">{lead.email}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            {lead.status === 'subscribed' ? (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit">
                                <Check size={12} className="stroke-[3]" /> {t.statusSubscribed}
                              </span>
                            ) : lead.status === 'pending_payment' ? (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1 w-fit">
                                <CreditCard size={12} /> {t.statusPending}
                              </span>
                            ) : lead.status === 'canceled' ? (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-red-500/20 text-red-400 border border-red-500/30 w-fit">
                                {t.statusCanceled}
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/10 text-text-muted border border-white/10 w-fit">
                                {t.statusLead}
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-text-muted whitespace-nowrap">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {lead.phone && (
                                <>
                                  <a 
                                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Ciao%20${encodeURIComponent(lead.name)}!%20Ti%20contatto%20da%20Pixeloro%20per%20la%20bozza%20del%20tuo%20nuovo%20sito.`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="px-2.5 py-1.5 bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-black rounded-lg font-bold transition-colors flex items-center gap-1"
                                    title="Chat on WhatsApp"
                                  >
                                    <span>💬</span> WhatsApp
                                  </a>
                                  <a 
                                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Ciao ${lead.name}! Ecco il link sicuro per attivare l'abbonamento Pixeloro Pro per ${lead.restaurantName} (${settings.monthlyPrice}€/mese): ${settings.stripePaymentLink || `${window.location.origin}/#pricing`}`)}`}
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="px-2.5 py-1.5 bg-primary/20 hover:bg-primary text-primary hover:text-black rounded-lg font-bold transition-colors flex items-center gap-1 border border-primary/30"
                                    title="Invia Link Stripe su WhatsApp"
                                  >
                                    <CreditCard size={13} />
                                    <span>Paga</span>
                                  </a>
                                </>
                              )}
                              <button
                                onClick={() => handleDeleteLead(lead._id, lead.name)}
                                disabled={deletingId === lead._id}
                                className="p-1.5 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                                title="Delete Lead"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEADS CRM */}
        {currentTab === 'leads' && (
          <div className="bg-[#14141c] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-black text-white">{t.leads}</h2>
                <p className="text-xs text-text-muted">Gestisci contatti, invia link Stripe ed esporta i dati</p>
              </div>
              <button 
                onClick={handleExportCSV}
                className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-black rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
              >
                <Download size={15} />
                {t.exportCsv}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/50 text-text-muted text-[11px] uppercase tracking-wider">
                    <th className="p-4 font-bold">{t.tableName}</th>
                    <th className="p-4 font-bold">{t.tableRestaurant}</th>
                    <th className="p-4 font-bold">{t.tableContact}</th>
                    <th className="p-4 font-bold">{t.tableStatus}</th>
                    <th className="p-4 font-bold">{t.tableDate}</th>
                    <th className="p-4 font-bold text-right">{t.tableActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {filteredLeads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-white">{lead.name}</td>
                      <td className="p-4 text-primary font-semibold">{lead.restaurantName}</td>
                      <td className="p-4 text-text-muted">
                        <div className="text-white font-mono">{lead.phone}</div>
                        <div className="text-text-muted">{lead.email}</div>
                      </td>
                      <td className="p-4">
                        {lead.status === 'subscribed' ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit">
                            <Check size={12} className="stroke-[3]" /> {t.statusSubscribed}
                          </span>
                        ) : lead.status === 'pending_payment' ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1 w-fit">
                            <CreditCard size={12} /> {t.statusPending}
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/10 text-text-muted border border-white/10 w-fit">
                            {t.statusLead}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-text-muted">{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {lead.phone && (
                            <>
                              <a 
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Ciao%20${encodeURIComponent(lead.name)}!%20Ti%20contatto%20da%20Pixeloro%20per%20la%20bozza%20del%20tuo%20nuovo%20sito.`} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="px-2.5 py-1.5 bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-black rounded-lg font-bold transition-colors flex items-center gap-1"
                              >
                                <span>💬</span> WhatsApp
                              </a>
                              <a 
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Ciao ${lead.name}! Ecco il link sicuro per attivare l'abbonamento Pixeloro Pro per ${lead.restaurantName} (${settings.monthlyPrice}€/mese): ${settings.stripePaymentLink || `${window.location.origin}/#pricing`}`)}`}
                                target="_blank" 
                                rel="noreferrer" 
                                className="px-2.5 py-1.5 bg-primary/20 hover:bg-primary text-primary hover:text-black rounded-lg font-bold transition-colors flex items-center gap-1 border border-primary/30"
                                title="Invia Link Stripe su WhatsApp"
                              >
                                <CreditCard size={13} />
                                <span>Paga</span>
                              </a>
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteLead(lead._id, lead.name)}
                            className="p-1.5 text-text-muted hover:text-red-400 rounded-lg cursor-pointer hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS (DYNAMIC MONTHLY PRICE & STRIPE CONFIG) */}
        {currentTab === 'settings' && (
          <div className="max-w-3xl bg-[#14141c] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
                <Settings size={22} className="text-primary" />
                {t.pricingSettingsTitle}
              </h2>
              <p className="text-sm text-text-muted mt-1">
                {t.pricingSettingsSub}
              </p>
            </div>

            {saveSuccess && (
              <div className="p-4 mb-6 bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl text-xs font-bold flex items-center gap-2">
                <Check size={16} />
                {t.savedSuccess}
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-8">
              
              {/* Dynamic Monthly Price Input */}
              <div className="bg-black/60 p-6 rounded-2xl border border-white/10 space-y-4">
                <div>
                  <label className="block text-sm font-black text-white mb-1">
                    {t.monthlyPriceLabel}
                  </label>
                  <p className="text-xs text-text-muted mb-4">
                    {t.monthlyPriceHelp}
                  </p>
                  <div className="relative max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary font-black text-lg">
                      €
                    </div>
                    <input 
                      type="number" 
                      min="1" 
                      max="999" 
                      value={settings.monthlyPrice}
                      onChange={(e) => setSettings({ ...settings, monthlyPrice: e.target.value })}
                      className="w-full bg-[#171720] border-2 border-primary/60 focus:border-primary text-white font-black text-xl rounded-xl py-3 pl-10 pr-16 focus:outline-none"
                      placeholder="55"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-xs text-text-muted font-bold">
                      / mese
                    </div>
                  </div>
                </div>

                {/* WhatsApp Phone Number */}
                <div className="pt-4 border-t border-white/10">
                  <label className="block text-sm font-black text-white mb-1">
                    {t.whatsappNumberLabel}
                  </label>
                  <input 
                    type="text" 
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full bg-[#171720] border border-white/10 focus:border-primary text-white font-mono text-sm rounded-xl py-3 px-4 focus:outline-none max-w-md"
                    placeholder="+393481134181"
                    required
                  />
                </div>
              </div>

              {/* Stripe Payment Gateway Settings */}
              <div className="bg-black/60 p-6 rounded-2xl border border-white/10 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <CreditCard size={20} className="text-primary" />
                    <div>
                      <h3 className="text-sm font-black text-white">{t.stripeConfigTitle}</h3>
                      <p className="text-xs text-text-muted">{t.stripeConfigSub}</p>
                    </div>
                  </div>
                  <div className="text-xs font-bold px-3 py-1 rounded-full border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                    {settings.stripeSecretKey || settings.stripePaymentLink ? t.stripeStatusActive : t.stripeStatusDemo}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-muted mb-1 flex items-center gap-1.5">
                    <Key size={13} className="text-primary" />
                    <span>{t.stripeSecretKeyLabel}</span>
                  </label>
                  <input 
                    type="password" 
                    value={settings.stripeSecretKey || ''}
                    onChange={(e) => setSettings({ ...settings, stripeSecretKey: e.target.value })}
                    className="w-full bg-[#171720] border border-white/10 focus:border-primary text-white font-mono text-xs rounded-xl py-3 px-4 focus:outline-none placeholder:text-white/20"
                    placeholder="sk_live_... oppure sk_test_..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-muted mb-1 flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-primary" />
                    <span>{t.stripePublishableKeyLabel}</span>
                  </label>
                  <input 
                    type="text" 
                    value={settings.stripePublishableKey || ''}
                    onChange={(e) => setSettings({ ...settings, stripePublishableKey: e.target.value })}
                    className="w-full bg-[#171720] border border-white/10 focus:border-primary text-white font-mono text-xs rounded-xl py-3 px-4 focus:outline-none placeholder:text-white/20"
                    placeholder="pk_live_... oppure pk_test_..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-text-muted mb-1 flex items-center gap-1.5">
                    <ExternalLink size={13} className="text-primary" />
                    <span>{t.stripePaymentLinkLabel}</span>
                  </label>
                  <input 
                    type="url" 
                    value={settings.stripePaymentLink || ''}
                    onChange={(e) => setSettings({ ...settings, stripePaymentLink: e.target.value })}
                    className="w-full bg-[#171720] border border-white/10 focus:border-primary text-white font-mono text-xs rounded-xl py-3 px-4 focus:outline-none placeholder:text-white/20"
                    placeholder="https://buy.stripe.com/..."
                  />
                  <p className="text-[11px] text-text-muted mt-1">
                    {t.stripePaymentLinkHelp}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={savingSettings}
                className="py-4 px-10 bg-primary hover:bg-primary-hover text-black font-extrabold text-sm rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-50"
              >
                <Save size={16} />
                {savingSettings ? 'Salvataggio...' : t.saveChanges}
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}

export default Dashboard;
