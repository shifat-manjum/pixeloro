import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Check, ExternalLink } from 'lucide-react';

const showcaseItems = [
  {
    id: 1,
    title: "Trattoria & Osteria Tradizionale",
    category: "Cucina Romana & Wine Bar",
    image: "/showcase-1.jpg",
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
    image: "/showcase-2.jpg",
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
    image: "/showcase-3.jpg",
    tag: "Luxury Dark & Gold Theme",
    desc: "Un'atmosfera esclusiva che trasmette artigianalità e qualità, ideale per attirare turisti e clienti alto-spendenti.",
    highlights: [
      "Vetrina dei piatti speciali dello Chef",
      "100% ottimizzato per la visualizzazione da smartphone",
      "Hosting ultra-veloce su server dedicati con SSL",
      "Aggiornamenti illimitati inclusi nel piano"
    ]
  },
  {
    id: 4,
    title: "Ristorante di Pesce & Crudi",
    category: "Cucina Marinara & Frutti di Mare",
    image: "/showcase-4.jpg",
    tag: "Seafood & Coastal Dining",
    desc: "Design fresco ed elegante con sezione 'Pescato del Giorno' aggiornabile in 30 secondi con un messaggio WhatsApp.",
    highlights: [
      "Pescato del giorno aggiornabile facilmente",
      "Ottimizzazione SEO locale per Google Maps",
      "Zero costi iniziali (0€ anticipo)",
      "Solo 55€/mese tutto compreso se decidi di tenerlo"
    ]
  },
  {
    id: 5,
    title: "Steakhouse, Braceria & Grill",
    category: "Carni Pregiate & Dry Aged Selection",
    image: "/showcase-5.jpg",
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
    image: "/showcase-6.jpg",
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

export default function ShowcaseCarousel({ lang = 'it', whatsappUrl }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? showcaseItems.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === showcaseItems.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  const currentItem = showcaseItems[currentIndex];

  const copy = {
    it: {
      badge: "Showcase dal Vivo & Portfolio",
      title: "Cosa Riceve il Tuo Ristorante per 55€/Mese",
      sub: "Esperienze digitali create su misura, ad alta conversione, progettate per riempire i tuoi tavoli ogni sera.",
      cta: "Richiedi una Bozza Gratuita su WhatsApp",
      zeroUpfront: "0€ Iniziali",
      builtIn48h: "Bozza in 48h",
      viewing: "Esempio"
    },
    en: {
      badge: "Live Showcase & Portfolio",
      title: "What Your Restaurant Gets for €55/Month",
      sub: "Handcrafted, high-converting digital experiences engineered to fill your tables every night.",
      cta: "Claim a Free Draft on WhatsApp",
      zeroUpfront: "€0 Upfront",
      builtIn48h: "Draft in 48h",
      viewing: "Example"
    },
    de: {
      badge: "Live Showcase & Portfolio",
      title: "Was Ihr Restaurant für 55€/Monat bekommt",
      sub: "Handgefertigte, konversionsstarke digitale Erlebnisse, die Ihre Tische jeden Abend füllen.",
      cta: "Kostenlosen Entwurf auf WhatsApp anfragen",
      zeroUpfront: "0€ Anzahlung",
      builtIn48h: "Entwurf in 48h",
      viewing: "Beispiel"
    }
  }[lang] || {
    badge: "Live Showcase & Portfolio",
    title: "What Your Restaurant Gets for €55/Month",
    sub: "Handcrafted, high-converting digital experiences engineered to fill your tables every night.",
    cta: "Claim a Free Draft on WhatsApp",
    zeroUpfront: "€0 Upfront",
    builtIn48h: "Draft in 48h",
    viewing: "Example"
  };

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto overflow-hidden relative">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles size={14} />
          {copy.badge}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight max-w-3xl mx-auto">
          {copy.title}
        </h2>
        <p className="text-text-muted mt-4 text-base sm:text-lg max-w-2xl mx-auto font-medium">
          {copy.sub}
        </p>
      </div>

      {/* Main Single-Card Carousel Stage */}
      <div className="relative flex items-center justify-center">
        
        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous showcase slide"
          className="absolute left-0 sm:-left-6 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-black/90 hover:bg-primary hover:text-black hover:border-primary text-white flex items-center justify-center transition-all duration-300 shadow-2xl group active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          aria-label="Next showcase slide"
          className="absolute right-0 sm:-right-6 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-black/90 hover:bg-primary hover:text-black hover:border-primary text-white flex items-center justify-center transition-all duration-300 shadow-2xl group active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* The Active Showcase Card (Single Card in UI) */}
        <div 
          className="w-full max-w-4xl mx-auto bg-[#14141c] rounded-3xl sm:rounded-[2.5rem] border border-white/15 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-primary/50"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            
            {/* Left Column: Image Preview */}
            <div className="lg:col-span-7 relative bg-black flex items-center justify-center overflow-hidden group">
              <img
                key={currentItem.id}
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full min-h-[300px] lg:min-h-[460px] object-cover object-top transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14141c] via-transparent to-black/30 lg:hidden"></div>
              
              {/* Badges on Top of Image */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-black/85 backdrop-blur-md text-primary text-xs font-black px-3.5 py-1.5 rounded-full border border-primary/40 uppercase tracking-wider shadow-lg">
                  {copy.zeroUpfront}
                </span>
                <span className="bg-black/85 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">
                  {copy.builtIn48h}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 text-xs font-bold text-primary bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                {currentItem.tag}
              </div>
            </div>

            {/* Right Column: Card Details & WhatsApp CTA */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                
                {/* Counter & Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest text-primary font-bold">
                    {currentItem.category}
                  </span>
                  <span className="text-xs font-bold text-text-muted bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    {currentIndex + 1} / {showcaseItems.length}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  {currentItem.title}
                </h3>

                {/* Description */}
                <p className="text-text-muted text-sm leading-relaxed mb-6 font-medium">
                  {currentItem.desc}
                </p>

                {/* Features Highlights */}
                <ul className="space-y-3 mb-8 text-sm text-text font-medium">
                  {currentItem.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        <Check size={13} className="stroke-[3]" />
                      </div>
                      <span className="text-white/90">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-black font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_25px_rgba(229,193,88,0.25)] hover:shadow-[0_0_35px_rgba(229,193,88,0.4)] active:scale-98"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  <span>{copy.cta}</span>
                  <ExternalLink size={15} />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Pagination Indicators / Slide Selector */}
      <div className="flex justify-center items-center gap-2.5 mt-8">
        {showcaseItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === index
                ? 'w-10 bg-primary shadow-[0_0_12px_rgba(229,193,88,0.6)]'
                : 'w-3 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

    </section>
  );
}
