import { 
  BarChart3, Users, Settings, LogOut, Bell, Search, Menu, 
  Trash2, Clock, Download, Check, Phone, Mail, X, RefreshCw 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState, useMemo } from 'react';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ totalVisitors: 0 });
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('overview'); // 'overview' | 'leads' | 'settings'
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(15);
  const [deletingId, setDeletingId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Settings State (persisted to localStorage)
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('pixeloro_admin_settings');
    return saved ? JSON.parse(saved) : {
      whatsappNumber: '+393481134181',
      monthlyPrice: '55',
      whatsappAlerts: true,
      emailAlerts: true,
    };
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Security Check: Only allow KH Shifat
  useEffect(() => {
    if (!user) return;
    const adminEmails = ['khshifat@gmail.com', 'khshifatmanjum@gmail.com', 'khshi@gmail.com'];
    if (!adminEmails.includes(user.email)) {
      alert("Access Denied: Admin Panel Only.");
      logout();
      navigate('/');
    }
  }, [user, navigate, logout]);

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

      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminEmails = ['khshifat@gmail.com', 'khshifatmanjum@gmail.com', 'khshi@gmail.com'];
    if (user && adminEmails.includes(user.email)) {
      fetchData();
    }
  }, [user]);

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
    const confirmed = window.confirm(`Are you sure you want to delete lead "${leadName}"?`);
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

  // Filter leads based on live search query
  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) return leads;
    const q = searchQuery.toLowerCase().trim();
    return leads.filter(lead => 
      (lead.name && lead.name.toLowerCase().includes(q)) ||
      (lead.restaurantName && lead.restaurantName.toLowerCase().includes(q)) ||
      (lead.email && lead.email.toLowerCase().includes(q)) ||
      (lead.phone && lead.phone.includes(q))
    );
  }, [leads, searchQuery]);

  // Paginated visible leads (15 at a time)
  const visibleLeads = useMemo(() => {
    return filteredLeads.slice(0, visibleCount);
  }, [filteredLeads, visibleCount]);

  // Helper to format exact date and time
  const formatSubmissionTime = (isoString) => {
    if (!isoString) return { date: '—', time: '—' };
    const d = new Date(isoString);
    return {
      date: d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
  };

  // Export Leads to CSV file
  const exportLeadsToCSV = () => {
    if (!leads.length) {
      alert("No leads to export!");
      return;
    }
    const headers = ["Restaurant Name", "Contact Name", "Email", "Phone", "Submission Date", "Submission Time"];
    const rows = leads.map(l => {
      const { date, time } = formatSubmissionTime(l.createdAt);
      return [
        `"${(l.restaurantName || '').replace(/"/g, '""')}"`,
        `"${(l.name || '').replace(/"/g, '""')}"`,
        `"${(l.email || '').replace(/"/g, '""')}"`,
        `"${(l.phone || '').replace(/"/g, '""')}"`,
        `"${date}"`,
        `"${time}"`
      ].join(',');
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pixeloro-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('pixeloro_admin_settings', JSON.stringify(settings));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const totalVisitors = stats.totalVisitors || 0;
  const activeLeads = leads.length;
  const conversionRate = totalVisitors > 0 ? ((activeLeads / totalVisitors) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-[#0A0A0E] text-text font-sans flex flex-col md:flex-row selection:bg-primary selection:text-black">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black border-r border-white/10 p-6 flex flex-col hidden md:flex">
        <div className="text-2xl font-black tracking-tighter text-primary mb-10">pixeloro</div>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setCurrentTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left cursor-pointer ${
              currentTab === 'overview'
                ? 'bg-primary text-black font-bold shadow-[0_0_20px_rgba(229,193,88,0.25)]' 
                : 'text-text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 size={18} />
            Panoramica
          </button>

          <button 
            onClick={() => setCurrentTab('leads')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all text-left cursor-pointer ${
              currentTab === 'leads'
                ? 'bg-primary text-black font-bold shadow-[0_0_20px_rgba(229,193,88,0.25)]' 
                : 'text-text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users size={18} />
              <span>Tutti i Leads</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${currentTab === 'leads' ? 'bg-black/20 text-black' : 'bg-white/10 text-white'}`}>
              {leads.length}
            </span>
          </button>

          <button 
            onClick={() => setCurrentTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left cursor-pointer ${
              currentTab === 'settings'
                ? 'bg-primary text-black font-bold shadow-[0_0_20px_rgba(229,193,88,0.25)]' 
                : 'text-text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings size={18} />
            Impostazioni
          </button>
        </nav>

        {/* Quick CSV Export in Sidebar */}
        <div className="mb-4">
          <button 
            onClick={exportLeadsToCSV}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-white/10 hover:border-primary text-white/80 hover:text-primary text-xs font-semibold bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Esporta Leads (CSV)</span>
          </button>
        </div>

        <div className="mt-auto pt-6 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 text-text-muted hover:text-red-400 px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer">
            <LogOut size={18} />
            Esci
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 md:p-10 overflow-x-hidden">
        
        {/* Header Bar */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-3 md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="p-2 text-white bg-white/5 rounded-lg"
              >
                <Menu size={20} />
              </button>
              <div className="text-xl font-black tracking-tighter text-primary">pixeloro</div>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-black text-white hidden md:block">
              Bentornato, <span className="text-primary">{user?.displayName || 'KH Shifat'}</span>
            </h1>
          </div>
          
          {/* Header Actions: Search, Refresh, Export, Profile */}
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-end">
            
            {/* Live Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca per nome, ristorante, tel..." 
                className="w-full bg-black/60 border border-white/10 rounded-full py-2 pl-9 pr-8 text-xs sm:text-sm focus:outline-none focus:border-primary text-white placeholder:text-white/30 transition-all" 
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Refresh button */}
            <button 
              onClick={fetchData} 
              title="Aggiorna dati"
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-text-muted hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>

            {/* Notification Bell */}
            <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-text-muted hover:text-white border border-white/10 relative transition-colors">
              <Bell size={16} />
              {activeLeads > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-black"></span>
              )}
            </button>

            {/* User Avatar */}
            <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center font-black text-xs text-primary flex-shrink-0">
              KH
            </div>
          </div>
        </header>

        {/* Mobile Navigation Pills */}
        <div className="flex md:hidden gap-2 mb-6 overflow-x-auto pb-2">
          {['overview', 'leads', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all ${
                currentTab === tab 
                  ? 'bg-primary text-black' 
                  : 'bg-white/5 text-text-muted'
              }`}
            >
              {tab === 'overview' ? 'Panoramica' : tab === 'leads' ? 'Tutti i Leads' : 'Impostazioni'}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {currentTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <div className="bg-[#14141c] p-6 sm:p-7 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgba(229,193,88,0.05)]">
                <div className="text-text-muted font-medium mb-2 text-xs uppercase tracking-widest">Visitatori Totali Unici</div>
                <div className="text-4xl font-black text-white">{totalVisitors}</div>
                <div className="text-primary text-xs font-bold mt-2">Tracciamento in tempo reale</div>
              </div>

              <div className="bg-[#14141c] p-6 sm:p-7 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgba(229,193,88,0.05)]">
                <div className="text-text-muted font-medium mb-2 text-xs uppercase tracking-widest">Leads Ricevuti</div>
                <div className="text-4xl font-black text-white">{activeLeads}</div>
                <div className="text-emerald-400 text-xs font-bold mt-2">Dal funnel di conversione</div>
              </div>

              <div className="bg-[#14141c] p-6 sm:p-7 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgba(229,193,88,0.05)]">
                <div className="text-text-muted font-medium mb-2 text-xs uppercase tracking-widest">Tasso di Conversione</div>
                <div className="text-4xl font-black text-white">{conversionRate}%</div>
                <div className="text-text-muted text-xs font-medium mt-2">Rapporto Leads / Visitatori</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1 & 2: LEADS TABLE (Shows in both Overview and Leads tab) */}
        {(currentTab === 'overview' || currentTab === 'leads') && (
          <div className="bg-[#14141c] rounded-3xl border border-white/10 overflow-hidden shadow-2xl mb-12">
            
            {/* Table Header Controls */}
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>{currentTab === 'overview' ? 'Ultimi Leads Ricevuti' : 'Tutti i Leads'}</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {filteredLeads.length} {filteredLeads.length === 1 ? 'risultato' : 'risultati'}
                  </span>
                </h2>
                {searchQuery && (
                  <p className="text-xs text-text-muted mt-1">
                    Filtro attivo per: "<span className="text-white">{searchQuery}</span>"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 self-stretch sm:self-auto justify-end">
                <button 
                  onClick={exportLeadsToCSV}
                  className="px-4 py-2 rounded-xl border border-white/10 hover:border-primary text-xs font-bold text-white/90 hover:text-primary flex items-center gap-2 transition-all bg-white/5 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Esporta CSV</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/60 text-text-muted text-xs uppercase tracking-wider border-b border-white/5">
                    <th className="p-4 pl-6 font-bold">Ristorante & Nome</th>
                    <th className="p-4 font-bold">Contatti & Azioni Rapide</th>
                    <th className="p-4 font-bold">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-primary" />
                        <span>Data & Ora Esatta</span>
                      </div>
                    </th>
                    <th className="p-4 pr-6 font-bold text-right">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="p-12 text-center text-text-muted">
                        <div className="inline-flex items-center gap-2">
                          <RefreshCw size={16} className="animate-spin text-primary" />
                          <span>Caricamento leads in corso...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-12 text-center text-text-muted">
                        {searchQuery ? 'Nessun lead corrisponde alla ricerca.' : 'Nessun lead ancora registrato.'}
                      </td>
                    </tr>
                  ) : (
                    visibleLeads.map((lead) => {
                      const { date, time } = formatSubmissionTime(lead.createdAt);
                      const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');

                      return (
                        <tr key={lead._id} className="hover:bg-white/5 transition-colors group">
                          
                          {/* Restaurant & Contact Name */}
                          <td className="p-4 pl-6">
                            <div className="font-bold text-white text-base leading-snug">
                              {lead.restaurantName || 'Nome non specificato'}
                            </div>
                            <div className="text-xs text-text-muted mt-0.5">
                              Titolare: <span className="text-white/80 font-medium">{lead.name}</span>
                            </div>
                          </td>

                          {/* Contact Info & 1-Tap CTAs */}
                          <td className="p-4">
                            <div className="space-y-1.5">
                              {lead.phone && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-white/90 font-mono">{lead.phone}</span>
                                  <a 
                                    href={`https://wa.me/${cleanPhone}?text=Ciao%20${encodeURIComponent(lead.name)}!%20Ti%20contatto%20da%20Pixeloro%20per%20la%20bozza%20del%20tuo%20nuovo%20sito.`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    title="Apri chat WhatsApp" 
                                    className="px-2 py-0.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-black text-xs font-bold inline-flex items-center gap-1 transition-all"
                                  >
                                    <span>💬</span> WhatsApp
                                  </a>
                                  <a 
                                    href={`tel:${lead.phone}`}
                                    title="Chiama subito"
                                    className="p-1 rounded-md bg-white/5 hover:bg-white text-white hover:text-black text-xs transition-colors"
                                  >
                                    <Phone size={12} />
                                  </a>
                                </div>
                              )}

                              {lead.email && (
                                <div className="flex items-center gap-2 text-xs text-text-muted">
                                  <Mail size={12} className="text-primary/70" />
                                  <span className="truncate max-w-[200px]">{lead.email}</span>
                                  <a 
                                    href={`mailto:${lead.email}`}
                                    title="Invia email"
                                    className="hover:text-primary text-[10px] underline ml-1"
                                  >
                                    Invia
                                  </a>
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Exact Submission Date & Time */}
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="font-semibold text-white text-xs sm:text-sm">
                                {date}
                              </span>
                              <div className="inline-flex items-center gap-1 text-[11px] font-mono text-primary font-bold mt-0.5">
                                <Clock size={11} />
                                <span>{time}</span>
                              </div>
                            </div>
                          </td>

                          {/* Action Buttons: Delete */}
                          <td className="p-4 pr-6 text-right">
                            <button
                              onClick={() => handleDeleteLead(lead._id, lead.restaurantName || lead.name)}
                              disabled={deletingId === lead._id}
                              title="Elimina lead"
                              className="p-2 rounded-xl text-text-muted hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer disabled:opacity-50"
                            >
                              <Trash2 size={16} className={deletingId === lead._id ? "animate-bounce text-red-400" : ""} />
                            </button>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination: 15 Leads + See More Button */}
            {filteredLeads.length > visibleCount && (
              <div className="p-6 border-t border-white/5 bg-black/30 text-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 15)}
                  className="px-8 py-3 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-black border border-primary/40 font-black text-xs sm:text-sm transition-all duration-300 shadow-[0_0_20px_rgba(229,193,88,0.15)] hover:shadow-[0_0_30px_rgba(229,193,88,0.3)] cursor-pointer"
                >
                  Mostra Altri Leads (+15) — Visualizzati {visibleLeads.length} di {filteredLeads.length}
                </button>
              </div>
            )}

            {filteredLeads.length > 15 && visibleCount >= filteredLeads.length && (
              <div className="p-4 border-t border-white/5 bg-black/30 text-center text-xs text-text-muted font-medium">
                Visualizzati tutti i {filteredLeads.length} leads.
              </div>
            )}

          </div>
        )}

        {/* TAB 3: FUNCTIONAL SETTINGS */}
        {currentTab === 'settings' && (
          <div className="max-w-3xl bg-[#14141c] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
            <div className="border-b border-white/10 pb-6 mb-8">
              <h2 className="text-2xl font-black text-white">Impostazioni Piattaforma Pixeloro</h2>
              <p className="text-text-muted text-sm mt-1">Configura le preferenze di notifica, prezzi e gestione dei contatti.</p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-8">
              
              {/* WhatsApp Notification Number */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Numero WhatsApp per Ricezione Notifiche e Lead
                </label>
                <div className="relative">
                  <input 
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    placeholder="+39 348 113 4181"
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3.5 text-white font-mono focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <p className="text-xs text-text-muted mt-2">
                  I clienti che cliccano sul pulsante WhatsApp invieranno messaggi direttamente a questo numero.
                </p>
              </div>

              {/* Monthly Subscription Price */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Prezzo Abbonamento Mensile Mostrato nel Sito (€/mese)
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary font-bold">€</span>
                    <input 
                      type="number"
                      value={settings.monthlyPrice}
                      onChange={(e) => setSettings({ ...settings, monthlyPrice: e.target.value })}
                      placeholder="55"
                      className="w-full bg-black/60 border border-white/15 rounded-xl p-3.5 pl-8 text-white font-bold focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <span className="text-xs text-primary font-bold px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                    Prezzo Attuale: 55€/mese
                  </span>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div>
                    <h4 className="text-sm font-bold text-white">Avviso WhatsApp per Nuovi Lead</h4>
                    <p className="text-xs text-text-muted">Genera link diretto WhatsApp quando un lead si registra.</p>
                  </div>
                  <input 
                    type="checkbox"
                    checked={settings.whatsappAlerts}
                    onChange={(e) => setSettings({ ...settings, whatsappAlerts: e.target.checked })}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div>
                    <h4 className="text-sm font-bold text-white">Backup Automatico e Download CSV</h4>
                    <p className="text-xs text-text-muted">Consente il download con un clic dell'intero archivio lead.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={exportLeadsToCSV}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-primary flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Scarica Ora</span>
                  </button>
                </div>
              </div>

              {/* Submit / Save Button */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-black font-black text-sm transition-all shadow-[0_0_20px_rgba(229,193,88,0.2)] hover:shadow-[0_0_30px_rgba(229,193,88,0.4)] cursor-pointer"
                >
                  Salva Impostazioni
                </button>

                {saveSuccess && (
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold animate-fadeIn">
                    <Check size={16} />
                    <span>Impostazioni salvate con successo!</span>
                  </div>
                )}
              </div>

            </form>
          </div>
        )}

      </main>
    </div>
  );
}

export default Dashboard;
