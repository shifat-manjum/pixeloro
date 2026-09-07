import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Check, Eye, X, ArrowDown } from 'lucide-react';

const showcaseItems = [
  {
    id: 1,
    title: "Trattoria & Osteria Tradizionale",
    category: "Italian Restaurant",
    categoryIt: "Ristorante Italiano & Tradizione",
    categoryDe: "Italienisches Restaurant",
    image: "/showcase-1.jpg",
    tag: "Rome & Florence Style",
    desc: "Sito web ad alto impatto visivo con focus sul menu tipico, piatti caldi della tradizione e prenotazione diretta al tavolo.",
    descEn: "High-impact visual website highlighting traditional recipes, authentic dishes, and direct table reservations.",
    descDe: "Visuell ansprechende Website mit Fokus auf traditionelle Küche und direkte Tischreservierung.",
    highlights: [
      "Menu Digitale QR interattivo",
      "Prenotazione WhatsApp diretta in 1 tocco",
      "Caricamento istantaneo su reti 4G/5G",
      "Design scuro di lusso con accenti dorati"
    ],
    highlightsEn: [
      "Interactive QR Digital Menu",
      "Direct 1-tap WhatsApp reservations",
      "Sub-second loading on 4G/5G mobile",
      "Luxury dark design with gold accents"
    ],
    highlightsDe: [
      "Interaktive digitale QR-Speisekarte",
      "1-Klick WhatsApp-Tischreservierung",
      "Blitzschnelle Ladezeit auf Mobilgeräten",
      "Elegantes Dark-Design mit Gold-Akzenten"
    ]
  },
  {
    id: 2,
    title: "Pizzeria Napoletana D.O.C.",
    category: "Pizzeria",
    categoryIt: "Pizzeria Gourmet & D.O.C.",
    categoryDe: "Pizzeria & Craft Beer",
    image: "/showcase-2.jpg",
    tag: "High-Converting Pizza UI",
    desc: "Layout studiato per valorizzare le pizze gourmet, gli impasti speciali e raccogliere ordini d'asporto e tavoli senza intermediari.",
    descEn: "Optimized layout showcasing gourmet pizzas, slow-fermented doughs, and direct takeout orders with zero commission.",
    descDe: "Speziell für Pizzerien entwickeltes Layout zur Präsentation von Spezialitäten und provisionsfreien Bestellungen.",
    highlights: [
      "Galleria fotografica ad altissima definizione",
      "Badge recensioni Google 4.9★ in tempo reale",
      "Bozza completa pronta in 24-48 ore",
      "Nessuna commissione sulle prenotazioni"
    ],
    highlightsEn: [
      "High-definition food photo gallery",
      "Live 4.9★ Google Reviews integration",
      "Full website draft ready in 24-48h",
      "Zero commission on table bookings"
    ],
    highlightsDe: [
      "Hochauflösende Fotogalerie",
      "Live 4.9★ Google-Bewertungen",
      "Kompletter Entwurf in 24-48 Stunden",
      "Null Provision auf Reservierungen"
    ]
  },
  {
    id: 3,
    title: "Artisanal Pasta Bar & Bistrot",
    category: "Fine Dining",
    categoryIt: "Fine Dining & Cucina d'Autore",
    categoryDe: "Fine Dining & Bistrot",
    image: "/showcase-3.jpg",
    tag: "Luxury Dark & Gold Theme",
    desc: "Un'atmosfera esclusiva che trasmette artigianalità e qualità, ideale per attirare turisti e clienti alto-spendenti.",
    descEn: "An exclusive atmosphere conveying craftsmanship and culinary excellence, ideal for high-ticket diners and tourists.",
    descDe: "Exklusive Atmosphäre für gehobene Gastronomie, ideal für anspruchsvolle Gäste und Feinschmecker.",
    highlights: [
      "Vetrina dei piatti speciali dello Chef",
      "100% ottimizzato per smartphone e tablet",
      "Hosting ultra-veloce su server dedicati con SSL",
      "Aggiornamenti illimitati inclusi nel piano"
    ],
    highlightsEn: [
      "Chef's signature dish showcase",
      "100% mobile-first optimized design",
      "Ultra-fast dedicated hosting with SSL",
      "Unlimited menu updates included"
    ],
    highlightsDe: [
      "Präsentation der Chefkoch-Spezialitäten",
      "100% für Mobilgeräte optimiert",
      "Blitzschnelles Hosting mit SSL",
      "Unbegrenzte Menü-Aktualisierungen inklusive"
    ]
  },
  {
    id: 4,
    title: "Boutique Hotel & Gourmet Restaurant",
    category: "Hotel Restaurant",
    categoryIt: "Ristorante d'Hotel & Panoramico",
    categoryDe: "Hotel-Restaurant & Terrasse",
    image: "/showcase-4.jpg",
    tag: "Hotel Dining Experience",
    desc: "Design prestigioso per ristoranti d'hotel e resort, con orari colazioni, cene di gala e prenotazione tavoli per ospiti interni ed esterni.",
    descEn: "Sophisticated experience for hotel dining and resorts, featuring breakfast hours, event bookings, and guest reservations.",
    descDe: "Elegantes Design für Hotel- und Resort-Restaurants mit Menüs und Tischreservierungen für Haus- und externe Gäste.",
    highlights: [
      "Orari colazione, pranzo e cena chiari",
      "Integrazione Google Maps e indicazioni",
      "Zero costi di setup (0€ anticipo)",
      "Gestione continua senza pensieri tecnici"
    ],
    highlightsEn: [
      "Clear dining hours & event schedules",
      "Google Maps local directions integration",
      "€0 setup cost (zero upfront risk)",
      "Continuous hands-off technical maintenance"
    ],
    highlightsDe: [
      "Übersichtliche Speise- & Öffnungszeiten",
      "Google Maps Wegbeschreibung integriert",
      "0€ Setup-Kosten (kein Vorabrisiko)",
      "Kontinuierliche technische Rundumbetreuung"
    ]
  },
  {
    id: 5,
    title: "Asian Fusion & Sushi Lounge",
    category: "Asian Restaurant",
    categoryIt: "Ristorante Asiatico & Sushi",
    categoryDe: "Asiatisches Restaurant & Sushi",
    image: "/showcase-5.jpg",
    tag: "Modern Asian Dining",
    desc: "Grafica scura e moderna studiata per sushi bar, ramen house e cucina asiatica fusion con menu fotografico completo.",
    descEn: "Modern dark aesthetic engineered for sushi bars, ramen shops, and Asian fusion concepts with full visual menus.",
    descDe: "Modernes dunkles Design für Sushi-Bars und asiatische Restaurants mit vollständiger Fotomenü-Präsentation.",
    highlights: [
      "Menu fotografico roll, sashimi e portate",
      "Pulsante WhatsApp per ordini da asporto",
      "Caricamento rapido sotto 1 secondo",
      "Supporto tecnico dedicato 7 giorni su 7"
    ],
    highlightsEn: [
      "Visual sushi & special dishes menu",
      "Fast 1-tap WhatsApp takeout orders",
      "Sub-second load times on all devices",
      "Dedicated 7-day technical support"
    ],
    highlightsDe: [
      "Visuelles Menü für Spezialitäten & Sushi",
      "Schnelle WhatsApp-Bestellungen",
      "Ladezeit unter 1 Sekunde",
      "Engagierter technischer 7-Tage-Support"
    ]
  },
  {
    id: 6,
    title: "Caffetteria, Bakery & Specialty Coffee",
    category: "Café",
    categoryIt: "Caffetteria, Bakery & Brunch",
    categoryDe: "Café, Bäckerei & Brunch",
    image: "/showcase-6.jpg",
    tag: "Pastry & Coffee Aesthetic",
    desc: "Grafica accogliente per colazioni, brunch e specialty coffee con menu dolci, salati e orari sempre aggiornati.",
    descEn: "Warm, welcoming aesthetic for breakfast, brunch, and specialty coffee spots with updated menus and opening hours.",
    descDe: "Einladendes Design für Cafés, Bäckereien und Brunch-Lokale mit aktuellen Öffnungszeiten und Angeboten.",
    highlights: [
      "Menu colazioni, dolci e bevande",
      "Integrazione profilo Instagram e social",
      "Dominio personalizzato e SSL sicuro",
      "Disdici quando vuoi senza vincoli"
    ],
    highlightsEn: [
      "Breakfast, bakery & specialty drinks menu",
      "Instagram feed & social proof integration",
      "Custom domain & full SSL security",
      "Cancel anytime with zero lock-in"
    ],
    highlightsDe: [
      "Frühstücks-, Gebäck- & Getränkekarte",
      "Instagram- & Social-Media-Integration",
      "Eigene Domain & sicheres SSL",
      "Jederzeit kündbar ohne Bindung"
    ]
  }
];

export default function ShowcaseCarousel({ lang = 'it', monthlyPrice = '45', onGetStarted }) {
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [showAllDesktop, setShowAllDesktop] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPreview(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const copy = {
    it: {
      badge: "ESEMPI DI SITI DEMO",
      title: "Guarda Come Potrebbe Essere il Tuo Ristorante",
      sub: "Esplora esempi di siti web moderni progettati specificamente per ristoranti.",
      demoLabel: "Sito Demo Dimostrativo",
      viewDemo: "GUARDA LA DEMO",
      primaryCta: "OTTIENI IL TUO SITO GRATIS",
      zeroUpfront: "0€ SETUP",
      monthlyTag: `${monthlyPrice}€/MESE`,
      seeMoreMobile: "Vedi altri 5 esempi demo",
      seeLessMobile: "Mostra solo 1 esempio",
      seeMoreDesktop: "Vedi altri 3 esempi demo",
      seeLessDesktop: "Mostra meno",
      previewBtn: "Clicca per ingrandire",
      bannerTitle: "Vuoi un sito web moderno come questo per il tuo ristorante?",
      bannerSub: "Creiamo la prima bozza completa su misura per il tuo locale con 0€ di anticipo.",
      modalClose: "Chiudi",
      modalCta: "OTTIENI IL TUO SITO GRATIS"
    },
    en: {
      badge: "RESTAURANT WEBSITE DEMOS",
      title: "See What Your Restaurant Could Look Like",
      sub: "Explore examples of modern websites designed specifically for restaurants.",
      demoLabel: "Demonstration Website Example",
      viewDemo: "VIEW DEMO",
      primaryCta: "GET MY FREE WEBSITE",
      zeroUpfront: "€0 SETUP",
      monthlyTag: `€${monthlyPrice}/MONTH`,
      seeMoreMobile: "See 5 more website demos",
      seeLessMobile: "Show only 1 demo",
      seeMoreDesktop: "See 3 more website demos",
      seeLessDesktop: "Show less",
      previewBtn: "Click to preview demo",
      bannerTitle: "Want a modern website like this for your restaurant?",
      bannerSub: "We'll build a custom website draft tailored to your restaurant for €0 setup.",
      modalClose: "Close",
      modalCta: "GET MY FREE WEBSITE"
    },
    de: {
      badge: "RESTAURANT-DEMO-WEBSITES",
      title: "Sehen Sie, wie Ihr Restaurant aussehen könnte",
      sub: "Entdecken Sie moderne Website-Beispiele, die speziell für Restaurants entwickelt wurden.",
      demoLabel: "Demo-Website Beispiel",
      viewDemo: "DEMO ANSEHEN",
      primaryCta: "KOSTENLOSE WEBSITE SICHERN",
      zeroUpfront: "0€ SETUP",
      monthlyTag: `${monthlyPrice}€/MONAT`,
      seeMoreMobile: "5 weitere Demo-Websites anzeigen",
      seeLessMobile: "Nur 1 Demo anzeigen",
      seeMoreDesktop: "3 weitere Demo-Websites anzeigen",
      seeLessDesktop: "Weniger anzeigen",
      previewBtn: "Klicken für Vorschau",
      bannerTitle: "Möchten Sie eine solche Website für Ihr Restaurant?",
      bannerSub: "Wir erstellen einen individuellen Website-Entwurf für Ihr Lokal mit 0€ Setup.",
      modalClose: "Schließen",
      modalCta: "KOSTENLOSE WEBSITE SICHERN"
    }
  }[lang] || {
    badge: "RESTAURANT WEBSITE DEMOS",
    title: "See What Your Restaurant Could Look Like",
    sub: "Explore examples of modern websites designed specifically for restaurants.",
    demoLabel: "Demonstration Website Example",
    viewDemo: "VIEW DEMO",
    primaryCta: "GET MY FREE WEBSITE",
    zeroUpfront: "€0 SETUP",
    monthlyTag: `€${monthlyPrice}/MONTH`,
    seeMoreMobile: "See 5 more website demos",
    seeLessMobile: "Show only 1 demo",
    seeMoreDesktop: "See 3 more website demos",
    seeLessDesktop: "Show less",
    previewBtn: "Click to preview demo",
    bannerTitle: "Want a modern website like this for your restaurant?",
    bannerSub: "We'll build a custom website draft tailored to your restaurant for €0 setup.",
    modalClose: "Close",
    modalCta: "GET MY FREE WEBSITE"
  };

  const handleCtaClick = () => {
    if (selectedPreview) setSelectedPreview(null);
    if (onGetStarted) {
      onGetStarted();
    } else {
      const el = document.getElementById('lead-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="demos" className="py-20 sm:py-24 px-4 max-w-7xl mx-auto border-t border-white/5 relative">
      
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest mb-4">
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

      {/* MOBILE DISPLAY: 1 Card Initially + Expand Button */}
      <div className="block md:hidden">
        <div className="space-y-6">
          {(showAllMobile ? showcaseItems : showcaseItems.slice(0, 1)).map((item) => {
            const cat = lang === 'it' ? item.categoryIt : lang === 'de' ? item.categoryDe : item.category;
            const desc = lang === 'it' ? item.desc : lang === 'de' ? item.descDe : item.descEn;
            const highlights = lang === 'it' ? item.highlights : lang === 'de' ? item.highlightsDe : item.highlightsEn;

            return (
              <div
                key={item.id}
                className="bg-[#14141c] rounded-3xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-xl flex flex-col group text-left"
              >
                {/* Image Preview Header */}
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
                    <span className="bg-black/90 backdrop-blur-md text-primary text-[11px] font-extrabold px-3 py-1 rounded-full border border-primary/40 uppercase tracking-wider">
                      {copy.zeroUpfront}
                    </span>
                    <span className="bg-black/80 backdrop-blur-md text-white/80 text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                      {copy.demoLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3.5 text-xs font-semibold text-primary/95 bg-black/85 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                    {cat}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-primary font-bold mb-1">
                      {cat}
                    </div>
                    <h3 className="text-xl font-black text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed mb-5 font-medium">
                      {desc}
                    </p>

                    <ul className="space-y-2 mb-6 text-xs text-text-muted font-medium">
                      {highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                            <Check size={10} className="stroke-[3]" />
                          </div>
                          <span className="text-white/85">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View Demo Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedPreview(item)}
                    className="w-full py-3.5 px-5 rounded-2xl bg-primary hover:bg-primary-hover text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    <Eye size={15} />
                    <span>{copy.viewDemo}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Toggle Button */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setShowAllMobile(!showAllMobile)}
            className="w-full py-3 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-primary border border-primary/30 hover:border-primary font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>{showAllMobile ? copy.seeLessMobile : copy.seeMoreMobile}</span>
            {showAllMobile ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* DESKTOP & TABLET DISPLAY: 3-Column Responsive Grid */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {(showAllDesktop ? showcaseItems : showcaseItems.slice(0, 3)).map((item) => {
            const cat = lang === 'it' ? item.categoryIt : lang === 'de' ? item.categoryDe : item.category;
            const desc = lang === 'it' ? item.desc : lang === 'de' ? item.descDe : item.descEn;
            const highlights = lang === 'it' ? item.highlights : lang === 'de' ? item.highlightsDe : item.highlightsEn;

            return (
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
                    <span className="bg-black/90 backdrop-blur-md text-primary text-[11px] font-extrabold px-3 py-1 rounded-full border border-primary/40 uppercase tracking-wider shadow-md">
                      {copy.zeroUpfront}
                    </span>
                    <span className="bg-black/80 backdrop-blur-md text-white/80 text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-md">
                      {copy.demoLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3.5 text-xs font-semibold text-primary/95 bg-black/85 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                    {cat}
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-primary text-black font-extrabold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye size={14} />
                      {copy.viewDemo}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-primary font-bold mb-1.5">
                      {cat}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-6 font-medium">
                      {desc}
                    </p>

                    <ul className="space-y-2.5 mb-8 text-sm text-text-muted font-medium">
                      {highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                            <Check size={12} className="stroke-[3]" />
                          </div>
                          <span className="text-white/85 text-xs sm:text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View Demo Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedPreview(item)}
                    className="w-full py-3.5 px-5 rounded-2xl bg-white/5 hover:bg-primary text-white hover:text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 hover:border-primary transition-all duration-300 shadow-md group/btn cursor-pointer"
                  >
                    <Eye size={16} className="text-primary group-hover/btn:text-black transition-colors" />
                    <span>{copy.viewDemo}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Expand / Collapse Button */}
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => setShowAllDesktop(!showAllDesktop)}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-primary hover:text-black hover:border-primary text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-black/50 hover:shadow-primary/20 cursor-pointer group"
          >
            <span>{showAllDesktop ? copy.seeLessDesktop : copy.seeMoreDesktop}</span>
            {showAllDesktop ? (
              <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        </div>
      </div>

      {/* Prominent CTA Banner After Demos */}
      <div className="mt-16 bg-gradient-to-r from-card via-[#161622] to-card border border-primary/30 rounded-3xl p-8 sm:p-12 text-center shadow-[0_0_40px_rgba(229,193,88,0.1)]">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
          {copy.bannerTitle}
        </h3>
        <p className="text-text-muted text-sm sm:text-base max-w-2xl mx-auto mb-8 font-medium">
          {copy.bannerSub}
        </p>
        <button
          type="button"
          onClick={handleCtaClick}
          className="px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-primary hover:bg-primary-hover text-black font-black text-sm sm:text-base uppercase tracking-wider inline-flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(229,193,88,0.4)] hover:shadow-[0_0_40px_rgba(229,193,88,0.6)] active:scale-98 cursor-pointer"
        >
          <span>{copy.primaryCta}</span>
          <ArrowDown size={18} />
        </button>
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
                <span className="text-xs uppercase tracking-widest text-primary font-bold">
                  {lang === 'it' ? selectedPreview.categoryIt : lang === 'de' ? selectedPreview.categoryDe : selectedPreview.category} • {copy.demoLabel}
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white">{selectedPreview.title}</h3>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedPreview(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label={copy.modalClose}
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
                {lang === 'it' ? selectedPreview.desc : lang === 'de' ? selectedPreview.descDe : selectedPreview.descEn}
              </div>
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full sm:w-auto py-3.5 px-8 bg-primary hover:bg-primary-hover text-black font-black text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/30 transition-all flex-shrink-0 cursor-pointer uppercase tracking-wider"
              >
                <span>{copy.modalCta}</span>
                <ArrowDown size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
