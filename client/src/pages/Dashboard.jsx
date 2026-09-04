import { BarChart3, Users, Globe, Settings, LogOut, Bell, Search, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ totalVisitors: 0 });
  const [loading, setLoading] = useState(true);

  // Security Check: Only allow KH Shifat
  useEffect(() => {
    if (!user) return; // ProtectedRoute will handle undefined user
    const adminEmails = ['khshifat@gmail.com', 'khshifatmanjum@gmail.com', 'khshi@gmail.com'];
    if (!adminEmails.includes(user.email)) {
      alert("Access Denied: Admin Panel Only.");
      logout();
      navigate('/');
    }
  }, [user, navigate, logout]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Leads
        const leadsRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/leads`);
        const leadsData = await leadsRes.json();
        setLeads(leadsData);

        // Fetch Stats
        const statsRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/stats`);
        const statsData = await statsRes.json();
        setStats(statsData);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      }
    };
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

  const totalVisitors = stats.totalVisitors || 0;
  const activeLeads = leads.length;
  const conversionRate = totalVisitors > 0 ? ((activeLeads / totalVisitors) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-gray-bg text-text font-sans flex flex-col md:flex-row selection:bg-primary selection:text-black">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black border-r border-white/10 p-6 flex flex-col hidden md:flex">
        <div className="text-2xl font-black tracking-tighter text-primary mb-12">pixeloro</div>
        
        <nav className="flex-1 space-y-2">
          <a href="#" className="flex items-center gap-3 bg-white/5 text-white px-4 py-3 rounded-xl font-medium border border-white/5 transition-colors">
            <BarChart3 size={18} className="text-primary" />
            Overview
          </a>
          <a href="#" className="flex items-center gap-3 text-text-muted hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl font-medium transition-colors">
            <Globe size={18} />
            My Websites
          </a>
          <a href="#" className="flex items-center gap-3 text-text-muted hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl font-medium transition-colors">
            <Users size={18} />
            Leads
          </a>
          <a href="#" className="flex items-center gap-3 text-text-muted hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl font-medium transition-colors">
            <Settings size={18} />
            Settings
          </a>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 text-text-muted hover:text-red-400 px-4 py-3 rounded-xl font-medium transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4 md:hidden">
            <Menu size={24} className="text-white" />
            <div className="text-xl font-black tracking-tighter text-primary">pixeloro</div>
          </div>
          
          <h1 className="text-2xl font-black text-white hidden md:block">
            Welcome back, {user?.displayName || 'KH Shifat'}
          </h1>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="text" placeholder="Search..." className="bg-black border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary text-white" />
            </div>
            <button className="text-text-muted hover:text-white relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-gray-bg"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center font-bold text-primary">
              KH
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-card p-6 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgba(229,193,88,0.05)]">
            <div className="text-text-muted font-medium mb-2 text-sm uppercase tracking-wider">Total Unique Visitors</div>
            <div className="text-4xl font-black text-white">{totalVisitors}</div>
            <div className="text-primary text-sm font-bold mt-2">Real-time tracker</div>
          </div>
          <div className="bg-card p-6 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgba(229,193,88,0.05)]">
            <div className="text-text-muted font-medium mb-2 text-sm uppercase tracking-wider">Active Leads</div>
            <div className="text-4xl font-black text-white">{activeLeads}</div>
            <div className="text-primary text-sm font-bold mt-2">from Marketing Funnel</div>
          </div>
          <div className="bg-card p-6 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgba(229,193,88,0.05)]">
            <div className="text-text-muted font-medium mb-2 text-sm uppercase tracking-wider">Conversion Rate</div>
            <div className="text-4xl font-black text-white">{conversionRate}%</div>
            <div className="text-text-muted text-sm font-medium mt-2">Leads / Visitors</div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-card rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Recent Leads</h2>
            <button className="text-primary text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-text-muted text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Restaurant</th>
                  <th className="p-4 font-semibold">Contact Info</th>
                  <th className="p-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {loading ? (
                  <tr><td colSpan="4" className="p-8 text-center text-text-muted">Loading leads...</td></tr>
                ) : !Array.isArray(leads) ? (
                  <tr><td colSpan="4" className="p-8 text-center text-red-400 font-bold">Database Connection Error. Check Render Backend Logs.</td></tr>
                ) : leads.length === 0 ? (
                  <tr><td colSpan="4" className="p-8 text-center text-text-muted">No leads yet. Time to run some ads!</td></tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white">{lead.name}</td>
                      <td className="p-4 text-text-muted">{lead.restaurantName}</td>
                      <td className="p-4 text-text-muted text-xs">
                        {lead.phone && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-white font-medium">{lead.phone}</span>
                            <div className="flex gap-1 ml-auto">
                              <a href={`tel:${lead.phone}`} title="Call Lead" className="p-1.5 bg-primary/20 hover:bg-primary text-primary hover:text-black rounded-md transition-colors">
                                📞
                              </a>
                              <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" title="WhatsApp Lead" className="p-1.5 bg-green-500/20 hover:bg-green-500 text-green-500 hover:text-black rounded-md transition-colors">
                                💬
                              </a>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span>✉️ {lead.email}</span>
                          <a href={`mailto:${lead.email}`} title="Email Lead" className="p-1 ml-auto bg-white/10 hover:bg-white text-white hover:text-black rounded-md transition-colors">
                            ↗
                          </a>
                        </div>
                      </td>
                      <td className="p-4 text-text-muted">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;

