import { useState } from 'react';
import { Mail, Lock, ArrowRight, User, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle, loginWithApple, loginAsMasterAdmin } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMasterAdminLogin = () => {
    loginAsMasterAdmin('khshifatmanjum@gmail.com');
    navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password);
      }
      navigate('/dashboard');
    } catch (err) {
      // If error, check if email is Shifat's admin email and provide easy entry
      const adminEmails = ['khshifat@gmail.com', 'khshifatmanjum@gmail.com', 'khshi@gmail.com'];
      if (adminEmails.includes(formData.email.toLowerCase().trim())) {
        loginAsMasterAdmin(formData.email.toLowerCase().trim());
        navigate('/dashboard');
        return;
      }
      setError('Failed to ' + (isLogin ? 'log in' : 'create account') + ': ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Google Sign-In note: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApple = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithApple();
      navigate('/dashboard');
    } catch (err) {
      setError('Apple Sign-In note: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-bg text-text font-sans flex items-center justify-center p-4 selection:bg-primary selection:text-black relative">
      
      {/* Back to Home Button */}
      <Link to="/" className="absolute top-6 left-6 sm:top-10 sm:left-10 text-sm font-bold text-primary border border-primary hover:bg-primary/10 px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(229,193,88,0.2)] hover:shadow-[0_0_25px_rgba(229,193,88,0.4)] flex items-center gap-2">
        <ArrowRight size={16} className="rotate-180" />
        Return to Website
      </Link>

      <div className="w-full max-w-md mt-16 sm:mt-0">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="text-4xl font-black tracking-tighter text-primary hover:text-primary-hover transition-colors inline-block">
            pixeloro
          </a>
          <p className="text-text-muted mt-2 font-medium">
            {isLogin ? 'Welcome back to your CRM Dashboard.' : 'Start dominating local search.'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card p-8 sm:p-10 rounded-3xl border border-white/10 shadow-[0_10px_40px_rgba(229,193,88,0.08)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-white">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              Admin Portal
            </span>
          </div>

          {/* Quick 1-Click Founder Access */}
          <button
            type="button"
            onClick={handleMasterAdminLogin}
            className="w-full mb-6 py-3 px-4 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent hover:from-primary/30 hover:via-primary/20 border border-primary/40 hover:border-primary rounded-2xl text-primary font-bold text-xs flex items-center justify-between transition-all duration-300 shadow-md group/btn"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-primary" />
              <span>Quick Login as KH Shifat (Founder)</span>
            </div>
            <Sparkles size={14} className="text-primary group-hover/btn:scale-125 transition-transform" />
          </button>

          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-text-muted">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="w-full border border-white/10 rounded-xl py-3.5 pl-11 pr-4 bg-black text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-white/30" 
                    placeholder="KH Shifat Manjum" 
                    required={!isLogin} 
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2 text-text-muted">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full border border-white/10 rounded-xl py-3.5 pl-11 pr-4 bg-black text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-white/30" 
                  placeholder="khshifatmanjum@gmail.com" 
                  required 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-semibold text-text-muted">Password</label>
                {isLogin && <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot?</a>}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  className="w-full border border-white/10 rounded-xl py-3.5 pl-11 pr-4 bg-black text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-white/30" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-text-muted">Retype Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    className="w-full border border-white/10 rounded-xl py-3.5 pl-11 pr-4 bg-black text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-white/30" 
                    placeholder="••••••••" 
                    required={!isLogin} 
                  />
                </div>
              </div>
            )}

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-black font-bold py-4 rounded-xl mt-8 transition-all shadow-[0_0_20px_rgba(229,193,88,0.2)] hover:shadow-[0_0_30px_rgba(229,193,88,0.4)] flex justify-center items-center gap-2 cursor-pointer"
            >
              {isLogin ? 'Sign In to Dashboard' : 'Get Started'}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-text-muted">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button onClick={handleGoogle} disabled={loading} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium text-white disabled:opacity-50 cursor-pointer">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button onClick={handleApple} disabled={loading} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium text-white disabled:opacity-50 cursor-pointer">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.79 2.12-.13 3.73.95 4.75 2.76-4.13 2.33-3.32 7.7.92 9.29-.86 2.2-2.04 4.31-4.33 6.91zm-2.83-16.7c-.5.12-1.09.28-1.52.54-.7.42-1.35 1.14-1.74 1.96-.34.69-.53 1.48-.56 2.19.79.03 1.64-.28 2.3-.72.67-.44 1.25-1.12 1.62-1.89.32-.69.5-1.47.5-2.12-.76-.08-1.54.1-2.26.32z"/>
                </svg>
                Apple
              </button>
            </div>
          </div>

        </div>

        {/* Toggle Login/Signup */}
        <p className="text-center text-text-muted mt-8 font-medium">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-primary hover:underline font-bold cursor-pointer"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;
