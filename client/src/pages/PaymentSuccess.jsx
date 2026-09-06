import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, ExternalLink, Zap } from 'lucide-react';
import Logo from '../components/Logo';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const isDemo = searchParams.get('demo') === 'true';
  const plan = searchParams.get('plan') || 'monthly';
  const isLifetime = plan === 'lifetime';
  const price = searchParams.get('price') || (isLifetime ? (localStorage.getItem('pixeloro_lifetime_price') || '399') : (localStorage.getItem('pixeloro_monthly_price') || '55'));
  const restaurantName = searchParams.get('restaurant') || 'il tuo ristorante';

  const [lang, setLang] = useState(() => localStorage.getItem('pixeloro_lang') || 'it');

  const copy = {
    it: {
      badge: isLifetime ? "Proprietà a Vita Acquistata con Successo" : "Abbonamento Attivato con Successo",
      title1: isLifetime ? "Congratulazioni!" : "Benvenuto in",
      title2: isLifetime ? "Sito Web 100% Tuo!" : "Zentixx Pro!",
      subtitle: isLifetime 
        ? "Il pagamento è andato a buon fine. Il sito web ti appartiene per sempre e include 2 anni di assistenza tecnica gratuita."
        : "Il pagamento è andato a buon fine. La gestione digitale del tuo ristorante è ora ufficialmente attiva.",
      orderSummary: isLifetime ? "Riepilogo Acquisto a Vita" : "Riepilogo Abbonamento",
      planName: isLifetime ? "Zentixx Proprietà a Vita (Full Buyout)" : "Zentixx Pro — Piano Mensile",
      billing: isLifetime ? `${price}€ una tantum • Per Sempre` : `${price}€ / mese (Disdici quando vuoi)`,
      billingType: isLifetime ? "Pagamento Unico Stripe" : "Stripe Recurring",
      step1Title: isLifetime ? "1. Consegna Codici & Collegamento Dominio" : "1. Collegamento Dominio & Certificato SSL",
      step1Desc: isLifetime 
        ? "I nostri sviluppatori collegano il tuo dominio e ti preparano i file completi con tutti i diritti amministrativi."
        : "I nostri ingegneri stanno collegando il tuo dominio personalizzato e attivando la crittografia HTTPS ultra-veloce.",
      step2Title: "2. Messa Online del Sito & Indicizzazione Google",
      step2Desc: "Il tuo sito web sarà visibile a tutti i clienti su Google Maps e motori di ricerca nelle prossime 24 ore.",
      step3Title: isLifetime ? "3. 2 Anni di Assistenza Tecnica Gratuita" : "3. Assistenza & Aggiornamenti Illimitati",
      step3Desc: isLifetime 
        ? "Per i prossimi 2 anni hai supporto prioritario gratuito: per modifiche a menu, orari o foto, scrivici su WhatsApp."
        : "Per qualsiasi modifica al menu, prezzi o foto, inviaci un messaggio su WhatsApp in qualsiasi momento.",
      whatsappBtn: "Conferma Dettagli su WhatsApp",
      whatsappText: isLifetime 
        ? `Ciao Shifat! Ho appena completato l'acquisto a vita (${price}€) su Zentixx IT per ${restaurantName}.`
        : `Ciao Shifat! Ho appena completato l'abbonamento Zentixx Pro per ${restaurantName}.`,
      homeBtn: "Torna alla Homepage",
      demoNotice: "Modalità Demo: Questo è un test di simulazione completato con successo."
    },
    en: {
      badge: isLifetime ? "Lifetime Ownership Successfully Purchased" : "Subscription Successfully Activated",
      title1: isLifetime ? "Congratulations!" : "Welcome to",
      title2: isLifetime ? "100% Yours Forever!" : "Zentixx Pro!",
      subtitle: isLifetime 
        ? "Your payment was successful. The website is 100% yours forever with 2 years of free technical support included."
        : "Your payment was successful. Your restaurant's digital presence and management are now officially live.",
      orderSummary: isLifetime ? "Lifetime Purchase Summary" : "Subscription Summary",
      planName: isLifetime ? "Zentixx Lifetime Ownership (Buyout)" : "Zentixx Pro — Monthly Plan",
      billing: isLifetime ? `€${price} one-time • Forever` : `€${price} / month (Cancel anytime)`,
      billingType: isLifetime ? "One-Time Stripe Payment" : "Stripe Recurring",
      step1Title: isLifetime ? "1. Source Code Handover & Domain Setup" : "1. Custom Domain & SSL Setup",
      step1Desc: isLifetime 
        ? "Our team is connecting your custom domain and preparing your full code export with admin access."
        : "Our technical team is configuring your custom domain and high-speed HTTPS cloud servers.",
      step2Title: "2. Live Launch & Google Search Indexing",
      step2Desc: "Your high-converting website is being published live on Google Maps and search engines.",
      step3Title: isLifetime ? "3. 2 Years Free Technical Support" : "3. 24/7 Support & Unlimited Updates",
      step3Desc: isLifetime 
        ? "You have 2 full years of free priority support: whenever you need text, menu, or photo updates, message us on WhatsApp."
        : "Whenever you need menu, price, or photo changes, message us directly on WhatsApp.",
      whatsappBtn: "Confirm Details on WhatsApp",
      whatsappText: isLifetime 
        ? `Hi Shifat! I just completed the Lifetime Ownership purchase (€${price}) on Zentixx IT for ${restaurantName}.`
        : `Hi Shifat! I just completed the Zentixx Pro subscription for ${restaurantName}.`,
      homeBtn: "Return to Homepage",
      demoNotice: "Demo Mode: This was a successful simulation test."
    },
    de: {
      badge: isLifetime ? "Lebenslanges Eigentum erfolgreich erworben" : "Abonnement erfolgreich aktiviert",
      title1: isLifetime ? "Herzlichen Glückwunsch!" : "Willkommen bei",
      title2: isLifetime ? "100% Ihr Eigentum!" : "Zentixx Pro!",
      subtitle: isLifetime 
        ? "Ihre Zahlung war erfolgreich. Die Website gehört für immer Ihnen, inklusive 2 Jahre kostenlosem technischem Support."
        : "Ihre Zahlung war erfolgreich. Die digitale Verwaltung Ihres Restaurants ist nun offiziell aktiv.",
      orderSummary: isLifetime ? "Lifetime-Kauf Übersicht" : "Abonnement-Übersicht",
      planName: isLifetime ? "Zentixx Lifetime Ownership (Vollkauf)" : "Zentixx Pro — Monatlicher Plan",
      billing: isLifetime ? `${price}€ einmalig • Für immer` : `${price}€ / Monat (Jederzeit kündbar)`,
      billingType: isLifetime ? "Einmalzahlung Stripe" : "Stripe Recurring",
      step1Title: isLifetime ? "1. Quellcode-Übergabe & Domain-Setup" : "1. Domain- & SSL-Einrichtung",
      step1Desc: isLifetime 
        ? "Unser Team richtet Ihre Domain ein und übergibt Ihnen das vollständige Code-Paket mit Admin-Rechten."
        : "Unser technisches Team richtet Ihre individuelle Domain und sichere Server ein.",
      step2Title: "2. Live-Schaltung & Google-Indexierung",
      step2Desc: "Ihre neue Website wird live geschaltet und auf Google Maps optimiert.",
      step3Title: isLifetime ? "3. 2 Jahre kostenloser technischer Support" : "3. 24/7 Support & Unbegrenzte Updates",
      step3Desc: isLifetime 
        ? "Sie erhalten 2 Jahre kostenlosen Support für alle Text-, Menü- oder Bildänderungen über WhatsApp."
        : "Für Änderungen an Speisekarte oder Preisen schreiben Sie uns einfach auf WhatsApp.",
      whatsappBtn: "Details auf WhatsApp bestätigen",
      whatsappText: isLifetime 
        ? `Hallo Shifat! Ich habe gerade den Lifetime-Kauf (${price}€) auf Zentixx IT für ${restaurantName} abgeschlossen.`
        : `Hallo Shifat! Ich habe gerade das Zentixx Pro Abonnement für ${restaurantName} abgeschlossen.`,
      homeBtn: "Zur Startseite zurückkehren",
      demoNotice: "Demo-Modus: Dies war ein erfolgreicher Simulationstest."
    }
  }[lang] || copy.it;

  const whatsappUrl = `https://wa.me/393481134181?text=${encodeURIComponent(copy.whatsappText)}`;

  return (
    <div className="min-h-screen bg-[#0A0A0E] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-primary selection:text-black">
      
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-2xl w-full bg-[#121218]/90 backdrop-blur-xl border border-white/10 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-14 text-center relative z-10 shadow-[0_0_70px_rgba(0,0,0,0.9)] hover:border-primary/40 transition-all duration-500">
        
        {/* Brand */}
        <div className="mb-6 flex justify-center">
          <Logo size="md" />
        </div>

        {/* Glowing Gold / Emerald Icon */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse"></div>
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 via-emerald-500/10 to-transparent border-2 border-primary shadow-[0_0_35px_rgba(229,193,88,0.4)] flex items-center justify-center relative">
            <CheckCircle2 className="w-12 h-12 text-primary drop-shadow-[0_0_15px_rgba(229,193,88,0.7)] stroke-[2.5]" />
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {copy.badge}
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
          {copy.title1} <span className="text-primary font-serif italic">{copy.title2}</span>
        </h1>
        
        <p className="text-base sm:text-lg text-white/80 max-w-lg mx-auto mb-8 font-medium leading-relaxed">
          {copy.subtitle}
        </p>

        {isDemo && (
          <div className="mb-6 p-3 bg-primary/10 border border-primary/30 rounded-xl text-primary text-xs font-bold">
            {copy.demoNotice}
          </div>
        )}

        {/* Plan Summary Card */}
        <div className="bg-black/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 text-left space-y-4 shadow-inner">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-extrabold">{copy.orderSummary}</div>
              <div className="text-base font-black text-white mt-1">{copy.planName}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-primary">{copy.billing}</div>
              <div className="text-[11px] text-text-muted font-medium">{copy.billingType || 'Stripe'}</div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border border-primary/30">
                1
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{copy.step1Title}</p>
                <p className="text-text-muted text-xs sm:text-sm mt-0.5">{copy.step1Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border border-primary/30">
                2
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{copy.step2Title}</p>
                <p className="text-text-muted text-xs sm:text-sm mt-0.5">{copy.step2Desc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border border-primary/30">
                3
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{copy.step3Title}</p>
                <p className="text-text-muted text-xs sm:text-sm mt-0.5">{copy.step3Desc}</p>
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
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_30px_rgba(229,193,88,0.35)] hover:shadow-[0_0_45px_rgba(229,193,88,0.5)] active:scale-98 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>{copy.whatsappBtn}</span>
          </a>

          <Link 
            to="/" 
            className="w-full sm:w-auto px-6 py-4 rounded-full border border-white/15 hover:border-primary text-white hover:text-primary font-bold text-sm sm:text-base inline-flex items-center justify-center gap-2 transition-all duration-300 bg-white/5 hover:bg-white/10"
          >
            <span>{copy.homeBtn}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-primary" /> Pagamento Sicuro Stripe SSL</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Zap size={14} className="text-emerald-400" /> Attivazione Immediata</span>
        </div>

      </div>
    </div>
  );
}
