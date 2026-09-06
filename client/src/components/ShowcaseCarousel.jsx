import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Check, ExternalLink, Eye, X } from 'lucide-react';

const showcaseItems = [
  {
    id: 1,
    title: "Trattoria & Osteria Tradizionale",
    category: "Cucina Romana & Wine Bar",
    image: "/showcase-1.webp",
    tag: "Rome & Florence Style",
    desc: "Sito web ad alto impatto visivo con focus sul menu tipico, piatti caldi della tradizione e prenotazione diretta al tavolo.",
    highlights: [
      "Menu Digitale QR interattivo",
      "Prenotazione WhatsApp diretta in 1 tocco",
      "Caricamento istantaneo su reti 4G/5G",
      "Design scuro di lusso con accenti dorati"
    ]
  },
  {
    id: 2,
    title: "Pizzeria Napoletana D.O.C.",
    category: "Pizze a Lievitazione Naturale & Craft Beer",
    image: "/showcase-2.webp",
    tag: "High-Converting Pizza UI",
    desc: "Layout studiato per valorizzare le pizze gourmet, gli impasti speciali e raccogliere ordini d'asporto e tavoli senza intermediari.",
    highlights: [
      "Galleria fotografica ad altissima definizione",
      "Badge recensioni Google 4.9★ in tempo reale",
      "Bozza completa pronta in 24-48 ore",
      "Nessuna commissione sulle prenotazioni"
    ]
  },
  {
    id: 3,
    title: "Artisanal Pasta Bar & Bistrot",
    category: "Pasta Fresca & Cucina d'Autore",
    image: "/showcase-3.webp",
    tag: "Luxury Dark & Gold Theme",
    desc: "Un'atmosfera esclusiva che trasmette artigianalità e qualità, ideale per attirare turisti e clienti alto-spendenti.",
    highlights: [
      "Vetrina dei piatti speciali dello Chef",
      "100% ottimizzato per smartphone e tablet",
      "Hosting ultra-veloce su server dedicati con SSL",
      "Aggiornamenti illimitati inclusi nel piano"
    ]
  },
  {
    id: 4,
    title: "Ristorante di Pesce & Crudi",
    category: "Cucina Marinara & Frutti di Mare",
    image: "/showcase-4.webp",
    tag: "Seafood & Coastal Dining",
    desc: "Design fresco ed elegante con sezione 'Pescato del Giorno' aggiornabile in 30 secondi con un messaggio WhatsApp.",
    highlights: [
      "Pescato del giorno aggiornabile facilmente",
      "Ottimizzazione SEO locale per Google Maps",
      "Zero costi iniziali (0€ anticipo)",
      "Tutto compreso nel piano mensile senza vincoli"
    ]
  },
  {
    id: 5,
    title: "Steakhouse, Braceria & Grill",
    category: "Carni Pregiate & Dry Aged Selection",
    image: "/showcase-5.webp",
    tag: "Prime Cuts Experience",
    desc: "Interfaccia audace e moderna per bracerie che vogliono mettere in risalto la frollatura delle carni e le selezioni di vini.",
    highlights: [
      "Menu interattivo tagli di carne e frollature",
      "Pulsante WhatsApp sempre visibile in basso",
      "Velocità di caricamento inferiore a 1 secondo",
      "Assistenza tecnica 7 giorni su 7"
    ]
  },
  {
    id: 6,
    title: "Caffetteria, Bakery & Gelato",
    category: "Pasticceria Artigianale & Specialty Coffee",
    image: "/showcase-6.webp",
    tag: "Pastry & Coffee Aesthetic",
    desc: "Grafica pulita e accogliente per colazioni, brunch e pause caffè, con integrazione diretta dei contenuti social.",
    highlights: [
      "Integrazione profilo Instagram e recensioni",
      "Menu colazioni e lista gusti gelato sempre aggiornata",
      "Dominio personalizzato e certificato di sicurezza",
      "Disdici quando vuoi senza vincoli contrattuali"
    ]
  }
];

export default function ShowcaseCarousel({ lang = 'it', whatsappUrl, monthlyPrice = '55' }) {
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [showAllDesktop, setShowAllDesktop] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null);

  // Close preview modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPreview(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const copy = {
    it: {
      badge: "Showcase dal Vivo & Portfolio",
      title: `Cosa Riceve il Tuo Ristorante per ${monthlyPrice}€/Mese`,
      sub: "Esperienze digitali create su misura, ad alta conversione, progettate per riempire i tuoi tavoli ogni sera.",
      cta: "Richiedi Bozza su WhatsApp",
      zeroUpfront: "0€ Iniziali",
      builtIn48h: "Bozza in 48h",
      seeMoreMobile: "Vedi altri 5 siti demo",
      seeLessMobile: "Mostra solo 1 sito",
      seeMoreDesktop: "Vedi altri 3 siti demo",
      seeLessDesktop: "Mostra meno",
      previewBtn: "Clicca per ingrandire",
      modalCta: "Voglio una bozza per il mio ristorante su WhatsApp",
      readyBadge: `Pronto per ${monthlyPrice}€/mese`
    },
    en: {
      badge: "Live Showcase & Portfolio",
      title: `What Your Restaurant Gets for €${monthlyPrice}/Month`,
      sub: "Handcrafted, high-converting digital experiences engineered to fill your tables every night.",
      cta: "Claim a Free Draft on WhatsApp",
      zeroUpfront: "€0 Upfront",
      builtIn48h: "Draft in 48h",
      seeMoreMobile: "See 5 more demo websites",
      seeLessMobile: "Show only 1 demo",
      seeMoreDesktop: "See 3 more demo websites",
      seeLessDesktop: "Show less",
      previewBtn: "Click to preview demo",
      modalCta: "Claim this draft for my restaurant on WhatsApp",
      readyBadge: `€${monthlyPrice}/mo Ready`
    },
    de: {
      badge: "Live Showcase & Portfolio",
      title: `Was Ihr Restaurant für ${monthlyPrice}€/Monat bekommt`,
      sub: "Handgefertigte, konversionsstarke digitale Erlebnisse, die Ihre Tische jeden Abend füllen.",
      cta: "Kostenlosen Entwurf auf WhatsApp anfragen",
      zeroUpfront: "0€ Anzahlung",
      builtIn48h: "Entwurf in 48h",
      seeMoreMobile: "5 weitere Demo-Websites anzeigen",
      seeLessMobile: "Nur 1 Demo anzeigen",
      seeMoreDesktop: "3 weitere Demo-Websites anzeigen",
      seeLessDesktop: "Weniger anzeigen",
      previewBtn: "Klicken für Vorschau",
      modalCta: "Diesen Entwurf für mein Restaurant auf WhatsApp anfragen",
      readyBadge: `Bereit für ${monthlyPrice}€/Monat`
    }
  }[lang] || {
    badge: "Live Showcase & Portfolio",
    title: `What Your Restaurant Gets for €${monthlyPrice}/Month`,
    sub: "Handcrafted, high-converting digital experiences engineered to fill your tables every night.",
    cta: "Claim a Free Draft on WhatsApp",
    zeroUpfront: "€0 Upfront",
    builtIn48h: "Draft in 48h",
    seeMoreMobile: "See 5 more demo websites",
    seeLessMobile: "Show only 1 demo",
    seeMoreDesktop: "See 3 more demo websites",
    seeLessDesktop: "Show less",
    previewBtn: "Click to preview demo",
    modalCta: "Claim this draft for my restaurant on WhatsApp",
    readyBadge: `€${monthlyPrice}/mo Ready`
  };

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto border-t border-white/5 relative">
      
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles size={14} />
          {copy.badge}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight max-w-4xl mx-auto">
          {copy.title}
        </h2>
        <p className="text-text-muted mt-4 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          {copy.sub}
        </p>
      </div>

      {/* MOBILE DISPLAY: 1 Card Initially + "See more demo websites" Button */}
      <div className="block md:hidden">
        <div className="space-y-6">
          {(showAllMobile ? showcaseItems : showcaseItems.slice(0, 1)).map((item) => (
            <div
              key={item.id}
              className="bg-[#14141c] rounded-3xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-xl flex flex-col group text-left"
            >
              {/* Image Preview */}
              <div 
                onClick={() => setSelectedPreview(item)}
                className="relative aspect-[16/10] overflow-hidden bg-black cursor-pointer select-none"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14141c] via-transparent to-black/40"></div>
                
                <div className="absolute top-3.5 left-3.5 flex gap-2">
                  <span className="bg-black/85 backdrop-blur-md text-primary text-[11px] font-extrabold px-3 py-1 rounded-full border border-primary/30 uppercase tracking-wider">
                    {copy.zeroUpfront}
                  </span>
                  <span className="bg-black/85 backdrop-blur-md text-white/90 text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                    {copy.builtIn48h}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3.5 text-xs font-semibold text-primary/95 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                  {item.tag}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-primary font-bold mb-1">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-xs leading-relaxed mb-5 font-medium">
                    {item.desc}
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-text-muted font-medium">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                          <Check size={10} className="stroke-[3]" />
                        </div>
                        <span className="text-white/85">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-5 rounded-2xl bg-primary hover:bg-primary-hover text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  <span>{copy.cta}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAllMobile(!showAllMobile)}
            className="w-full py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-primary border border-primary/30 hover:border-primary font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>{showAllMobile ? copy.seeLessMobile : copy.seeMoreMobile}</span>
            {showAllMobile ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* DESKTOP & TABLET DISPLAY: 3-Column Responsive Grid with Desktop "See More" */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {(showAllDesktop ? showcaseItems : showcaseItems.slice(0, 3)).map((item) => (
            <div
              key={item.id}
              className="bg-[#14141c] rounded-3xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(229,193,88,0.15)] flex flex-col group text-left"
            >
              {/* Clickable Image Preview Header */}
              <div 
                onClick={() => setSelectedPreview(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedPreview(item); }}
                className="relative aspect-[16/10] overflow-hidden bg-black cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14141c] via-transparent to-black/40"></div>

                <div className="absolute top-3.5 left-3.5 flex gap-2">
                  <span className="bg-black/85 backdrop-blur-md text-primary text-[11px] font-extrabold px-3 py-1 rounded-full border border-primary/30 uppercase tracking-wider shadow-md">
                    {copy.zeroUpfront}
                  </span>
                  <span className="bg-black/85 backdrop-blur-md text-white/90 text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-md">
                    {copy.builtIn48h}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3.5 text-xs font-semibold text-primary/95 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                  {item.tag}
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="bg-primary text-black font-extrabold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye size={14} />
                    {copy.previewBtn}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-primary font-bold mb-1.5">
                    {item.category}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-6 font-medium">
                    {item.desc}
                  </p>

                  <ul className="space-y-2.5 mb-8 text-sm text-text-muted font-medium">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                          <Check size={12} className="stroke-[3]" />
                        </div>
                        <span className="text-white/85 text-xs sm:text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-5 rounded-2xl bg-white/5 hover:bg-primary text-white hover:text-black font-extrabold text-sm flex items-center justify-center gap-2 border border-white/10 hover:border-primary transition-all duration-300 shadow-md group/btn"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-primary group-hover/btn:text-black transition-colors"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  <span>{copy.cta}</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Expand / Collapse Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAllDesktop(!showAllDesktop)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 bg-white/5 hover:bg-primary hover:text-black hover:border-primary text-white font-black text-sm tracking-wide transition-all duration-300 shadow-lg shadow-black/50 hover:shadow-primary/20 cursor-pointer group"
          >
            <span>{showAllDesktop ? copy.seeLessDesktop : copy.seeMoreDesktop}</span>
            {showAllDesktop ? (
              <ChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        </div>
      </div>

      {/* Fullscreen High-Res Image Preview Modal */}
      {selectedPreview && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPreview(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#171720] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-bold">{selectedPreview.category}</span>
                <h3 className="text-lg sm:text-2xl font-black text-white">{selectedPreview.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedPreview(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-6 bg-black flex justify-center items-center">
              <img 
                src={selectedPreview.image} 
                alt={selectedPreview.title} 
                className="max-h-[60vh] w-auto object-contain rounded-xl border border-white/10 shadow-2xl"
              />
            </div>

            <div className="p-4 sm:p-6 border-t border-white/10 bg-[#14141c] flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xs sm:text-sm text-text-muted font-medium text-center sm:text-left">
                {selectedPreview.desc}
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto py-3 px-6 bg-primary hover:bg-primary-hover text-black font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30 transition-all flex-shrink-0"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                <span>{copy.modalCta}</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
