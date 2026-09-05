import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Golden Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-2xl w-full bg-[#111] border border-white/10 rounded-3xl p-10 md:p-16 text-center relative z-10 shadow-[0_0_50px_rgba(229,193,88,0.15)]">
        
        <div className="w-24 h-24 bg-gradient-to-br from-primary/30 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/40 shadow-[0_0_30px_rgba(229,193,88,0.3)]">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          You're on the list!
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"></div>
        
        <p className="text-lg md:text-xl text-text-muted mb-8 leading-relaxed">
          Thank you for requesting your free website build. We have received your restaurant's details. Our team is currently reviewing your online presence and will begin crafting your premium design.
        </p>
        
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 mb-10 text-left">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            What happens next?
          </h3>
          <ul className="text-text-muted space-y-3 text-sm md:text-base">
            <li className="flex gap-3"><strong className="text-white">1.</strong> We build a stunning, custom website draft for your restaurant.</li>
            <li className="flex gap-3"><strong className="text-white">2.</strong> We reach out within 24-48 hours to show you the result.</li>
            <li className="flex gap-3"><strong className="text-white">3.</strong> You review it. If you love it, you keep it. No obligations.</li>
          </ul>
        </div>
        
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-semibold transition-colors group">
          Back to homepage
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

