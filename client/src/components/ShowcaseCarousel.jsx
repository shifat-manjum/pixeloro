import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Check, ExternalLink } from 'lucide-react';

const showcaseItems = [
  {
    id: 1,
    title: "Trattoria & Osteria Tradizionale",
    category: "Cucina Romana & Wine Bar",
    image: "/showcase-1.jpg",
    tag: "Rome & Florence Style",
    highlights: ["Menu Digitale QR", "Prenotazione WhatsApp in 1 Tocco", "Caricamento Istantaneo 4G"]
  },
  {
    id: 2,
    title: "Pizzeria Napoletana D.O.C.",
    category: "Pizze a Lievitazione Naturale",
    image: "/showcase-2.jpg",
    tag: "High-Converting Pizza UI",
    highlights: ["Galleria Foto Alta Definizione", "Recensioni Google 4.9★", "Bozza Pronta in 48 Ore"]
  },
  {
    id: 3,
    title: "Artisanal Pasta Bar",
    category: "Pasta Fresca & Cucina d'Autore",
    image: "/showcase-3.jpg",
    tag: "Luxury Dark & Gold",
    highlights: ["Vetrina Piatti dello Chef", "Design Ottimizzato per Smartphone", "Hosting Veloce & SSL"]
  },
  {
    id: 4,
    title: "Ristorante di Pesce & Crudi",
    category: "Cucina Marinara & Frutti di Mare",
    image: "/showcase-4.jpg",
    tag: "Seafood & Coastal Dining",
    highlights: ["Pescato del Giorno Aggiornabile", "Posizionamento SEO Google", "Nessun Costo Iniziale"]
  },
  {
    id: 5,
    title: "Bistrot, Steakhouse & Grill",
    category: "Carni Pregiate & Braceria",
    image: "/showcase-5.jpg",
    tag: "Prime Cuts Experience",
    highlights: ["Menu Interattivo Carni", "Pulsante WhatsApp Sempre Visibile", "Aggiornamenti Illimitati"]
  },
  {
    id: 6,
    title: "Caffetteria, Bakery & Gelato",
    category: "Pasticceria Artigianale & Bar",
    image: "/showcase-6.jpg",
    tag: "Pastry & Coffee Bar",
    highlights: ["Integrazione Profilo Instagram", "Design Moderno & Pulito", "Dominio & Sicurezza Inclusi"]
  }
];

export default function ShowcaseCarousel({ lang = 'it', whatsappUrl }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Update cards visible based on window resize
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, showcaseItems.length - cardsPerView);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
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

  const copy = {
    it: {
      badge: "Showcase dal Vivo & Portfolio",
      title: "Cosa Riceve il Tuo Ristorante per 55€/Mese",
      sub: "Esperienze digitali create su misura, ad alta conversione, progettate per riempire i tuoi tavoli ogni sera.",
      cta: "Voglio un sito come questo su WhatsApp",
      zeroUpfront: "0€ Iniziali",
      builtIn48h: "Pronto in 48h"
    },
    en: {
      badge: "Live Showcase & Portfolio",
      title: "What Your Restaurant Gets for €55/Month",
      sub: "Handcrafted, high-converting digital experiences engineered to fill your tables every night.",
      cta: "Get a website like this on WhatsApp",
      zeroUpfront: "€0 Upfront",
      builtIn48h: "Built in 48h"
    },
    de: {
      badge: "Live Showcase & Portfolio",
      title: "Was Ihr Restaurant für 55€/Monat bekommt",
      sub: "Handgefertigte, konversionsstarke digitale Erlebnisse, die Ihre Tische jeden Abend füllen.",
      cta: "Website wie diese auf WhatsApp anfragen",
      zeroUpfront: "0€ Anzahlung",
      builtIn48h: "In 48h fertig"
    }
  }[lang] || {
    badge: "Live Showcase & Portfolio",
    title: "What Your Restaurant Gets for €55/Month",
    sub: "Handcrafted, high-converting digital experiences engineered to fill your tables every night.",
    cta: "Get a website like this on WhatsApp",
    zeroUpfront: "€0 Upfront",
    builtIn48h: "Built in 48h"
  };

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto overflow-hidden relative">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            {copy.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            {copy.title}
          </h2>
          <p className="text-text-muted mt-3 text-base sm:text-lg max-w-2xl font-medium">
            {copy.sub}
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-3 self-start md:self-end">
          <button
            onClick={prevSlide}
            aria-label="Previous showcase slide"
            className="w-12 h-12 rounded-full border border-white/15 bg-black/60 hover:bg-primary hover:text-black hover:border-primary text-white flex items-center justify-center transition-all duration-300 shadow-lg group active:scale-95"
          >
            <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next showcase slide"
            className="w-12 h-12 rounded-full border border-white/15 bg-black/60 hover:bg-primary hover:text-black hover:border-primary text-white flex items-center justify-center transition-all duration-300 shadow-lg group active:scale-95"
          >
            <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Carousel Track Container */}
      <div 
        className="overflow-hidden select-none -mx-2 sm:-mx-3"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
          }}
        >
          {showcaseItems.map((item) => (
            <div
              key={item.id}
              className="px-2 sm:px-3 flex-shrink-0"
              style={{ width: `${100 / cardsPerView}%` }}
            >
              <div className="bg-[#14141c] rounded-3xl border border-white/10 overflow-hidden group hover:border-primary/60 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(229,193,88,0.15)] flex flex-col h-full">
                
                {/* Showcase Image Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14141c] via-transparent to-black/40"></div>
                  
                  {/* Badges on Top of Image */}
                  <div className="absolute top-3.5 left-3.5 flex gap-2">
                    <span className="bg-black/80 backdrop-blur-md text-primary text-[11px] font-extrabold px-3 py-1 rounded-full border border-primary/30 uppercase tracking-wider">
                      {copy.zeroUpfront}
                    </span>
                    <span className="bg-black/80 backdrop-blur-md text-white/90 text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                      {copy.builtIn48h}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3.5 text-xs font-semibold text-primary/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                    {item.tag}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-text-muted font-bold mb-1">
                      {item.category}
                    </div>
                    <h3 className="text-xl font-black text-white mb-4 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    {/* Features checklist */}
                    <ul className="space-y-2.5 mb-6 text-sm text-text-muted font-medium">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <Check size={16} className="text-primary flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 1-Tap CTA to WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-primary text-white hover:text-black font-bold text-sm flex items-center justify-center gap-2 border border-white/10 hover:border-primary transition-all duration-300 shadow-sm"
                  >
                    <span>{copy.cta}</span>
                    <ExternalLink size={15} />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dot Indicators */}
      <div className="flex justify-center items-center gap-2 mt-10">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'w-8 bg-primary shadow-[0_0_10px_rgba(229,193,88,0.5)]'
                : 'w-2.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

    </section>
  );
}
