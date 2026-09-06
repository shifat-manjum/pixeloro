import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function ThankYou() {
  const whatsappUrl = "https://wa.me/393481134181?text=Ciao!%20Ho%20appena%20inviato%20la%20richiesta%20per%20il%20nuovo%20sito%20del%20mio%20ristorante%20su%20Pixeloro.";

  return (
    <div className="min-h-screen bg-[#0A0A0E] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-primary selection:text-black">
      
      {/* Ambient Lighting: Golden & Emerald Green Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-2xl w-full bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-14 text-center relative z-10 shadow-[0_0_60px_rgba(0,0,0,0.9)] hover:border-emerald-500/30 transition-all duration-500">
        
        {/* Brand mark */}
        <div className="text-xl font-black tracking-tighter text-primary mb-6">pixeloro</div>

        {/* Glowing Emerald Green Checkmark Tick */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse"></div>
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/30 via-emerald-500/10 to-transparent border-2 border-emerald-500/60 shadow-[0_0_35px_rgba(16,185,129,0.35)] flex items-center justify-center relative">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)] stroke-[2.5]" />
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Richiesta Ricevuta con Successo
        </div>

        {/* Heading in White & Gold */}
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
          Sei nella lista! <span className="text-primary font-serif italic">Grazie.</span>
        </h1>
        
        <p className="text-base sm:text-lg text-white/80 max-w-lg mx-auto mb-8 font-medium leading-relaxed">
          Abbiamo ricevuto i dettagli del tuo ristorante. Il nostro team sta già analizzando il tuo menu per iniziare a creare una bozza esclusiva ad alta conversione.
        </p>
        
        {/* Next Steps Card */}
        <div className="bg-black/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 text-left space-y-4 shadow-inner">
          <h3 className="text-white font-bold text-sm sm:text-base flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-primary" />
            <span>Cosa succede adesso?</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border border-emerald-500/30">
                1
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Creazione Bozza Digitale su Misura</p>
                <p className="text-text-muted text-xs sm:text-sm mt-0.5">Disegniamo la prima versione del sito personalizzata con i tuoi piatti e la tua identità.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border border-emerald-500/30">
                2
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Anteprima Privata in 24-48 Ore</p>
                <p className="text-text-muted text-xs sm:text-sm mt-0.5">Ti inviamo il link su WhatsApp per navigare e provare il sito in anteprima dal tuo telefono.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border border-emerald-500/30">
                3
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Decidi Tu: 0€ Anticipo, 55€/mese solo se lo tieni</p>
                <p className="text-text-muted text-xs sm:text-sm mt-0.5">Se ti piace lo pubblichiamo online sul tuo dominio a 55€/mese tutto compreso. Se non ti convince, amici come prima senza spendere un centesimo.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_45px_rgba(16,185,129,0.5)] active:scale-98 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>Scrivici subito su WhatsApp</span>
          </a>

          <Link 
            to="/" 
            className="w-full sm:w-auto px-6 py-4 rounded-full border border-white/15 hover:border-primary text-white hover:text-primary font-bold text-sm sm:text-base inline-flex items-center justify-center gap-2 transition-all duration-300 bg-white/5 hover:bg-white/10"
          >
            <span>Torna alla Homepage</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-primary" /> Nessuna carta di credito</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Clock size={14} className="text-emerald-400" /> Risposta in 24-48h</span>
        </div>

      </div>
    </div>
  );
}
