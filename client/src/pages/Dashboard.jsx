import { BarChart3, Users, Globe, Settings, LogOut, Bell, Search, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

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
            Welcome back, {user?.displayName || user?.email || 'User'}
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
            <div className="text-text-muted font-medium mb-2 text-sm uppercase tracking-wider">Total Visitors</div>
            <div className="text-4xl font-black text-white">12,450</div>
            <div className="text-primary text-sm font-bold mt-2">+14.5% this month</div>
          </div>
          <div className="bg-card p-6 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgba(229,193,88,0.05)]">
            <div className="text-text-muted font-medium mb-2 text-sm uppercase tracking-wider">Active Leads</div>
            <div className="text-4xl font-black text-white">342</div>
            <div className="text-primary text-sm font-bold mt-2">+5.2% this month</div>
          </div>
          <div className="bg-card p-6 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgba(229,193,88,0.05)]">
            <div className="text-text-muted font-medium mb-2 text-sm uppercase tracking-wider">Conversion Rate</div>
            <div className="text-4xl font-black text-white">2.8%</div>
            <div className="text-text-muted text-sm font-medium mt-2">Stable</div>
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
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-white">Mario Rossi</td>
                  <td className="p-4 text-text-muted">Bella Napoli</td>
                  <td className="p-4"><span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold border border-primary/30">New</span></td>
                  <td className="p-4 text-text-muted">Today, 14:30</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-white">Giuseppe Conte</td>
                  <td className="p-4 text-text-muted">Trattoria Roma</td>
                  <td className="p-4"><span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold border border-white/20">Contacted</span></td>
                  <td className="p-4 text-text-muted">Yesterday</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-white">Luigi Bros</td>
                  <td className="p-4 text-text-muted">Mushroom Kingdom Pizza</td>
                  <td className="p-4"><span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30">Converted</span></td>
                  <td className="p-4 text-text-muted">Aug 28, 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;

