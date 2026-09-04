import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Rocket, Search, ShieldCheck, BarChart3, MapPin, Smartphone, Check, ChevronDown } from 'lucide-react';

function useInView(options = { threshold: 0.1 }) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIntersecting(true);
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);
  return [ref, isIntersecting];
}

const CountUp = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  
  useEffect(() => {
    if (!inView) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [inView, end, duration]);
  
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const FAQAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl mb-4 bg-card/50 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-white/5 transition-colors"
      >
        <span className="font-bold text-white text-lg">{question}</span>
        <ChevronDown className={`text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-text-muted">{answer}</p>
      </div>
    </div>
  );
};

const phoneNumber = "+393481134181";

const translations = {
  en: {
    bookCall: "Book a call",
    marketingSub: "WEB DESIGN BY PIXELORO",
    heroTitle1: "Get a luxury restaurant website built for",
    heroTitleHighlight: "€0 upfront.",
    heroTitle2: "",
    heroSubtitle: "Stop paying agencies €2,000+. Send us your menu, and we'll build a stunning, high-converting website in 24 hours. You only pay if you love it.",
    restCheck: "Claim Your Free Website",
    restNameLabel: "Restaurant Name",
    restNamePlace: "e.g. Mario's Pizza",
    yourNameLabel: "Your Name",
    yourNamePlace: "John Doe",
    emailLabel: "Email Address",
    emailPlace: "john@example.com",
    phoneLabel: "Phone Number",
    phonePlace: "+39 333 123 4567",
    submitBtn: "Claim My Free Website",
    noCreditCard: "100% free build. No credit card required.",
    terms: "* Terms and conditions apply. We will contact you to get your menu and logo.",
    valueTitle1: "Your guests judge your food by your ",
    valueTitleHighlight: "website.",
    valueSub: "A bad website costs you bookings every single day. We build digital experiences that make your food look irresistible and drive reservations.",
    findOutMore: "Find out more - book a call",
    pricingTitle: "Simple, transparent pricing",
    pricingSub: "No massive upfront costs. Just a simple monthly subscription.",
    freeTierTitle: "Phase 1: The Build",
    freeTierPrice: "€0",
    freeTierUnit: "upfront",
    freeItem1: "Custom web design tailored to your brand.",
    freeItem2: "Mobile-optimized for hungry guests on the go.",
    freeItem3: "Menu integration & contact forms.",
    freeItem4: "Delivered in 24 hours to review.",
    proBadge: "Phase 2",
    proTierTitle: "Hosting & Management",
    proTierPrice: "€85",
    proTierUnit: "/ month + VAT",
    proItem1: "Premium, lightning-fast hosting.",
    proItem2: "Unlimited minor text/image updates.",
    proItem3: "Continuous technical maintenance & security.",
    proItem4: "Basic SEO to keep you ranking locally.",
    proItem5: "Cancel anytime. You own your domain.",
    trustText: "Join the modern restaurants growing with Pixeloro.",
    payNowhere: "See the design first, pay nothing upfront.",
    catchTitle: "So what's the catch?",
    catchSub: "There is no catch. It's exactly how it sounds.",
    catchP1: "We take on all the risk. We build your website for free. If you don't like it, you walk away and pay absolutely nothing.",
    catchP2: "If you love it, you simply subscribe to our €85/month plan. We handle the hosting, the servers, the security, and all the annoying tech stuff so you can focus on cooking great food.",
    featuresTitle: "What you get",
    f1Title: "Paid marketing",
    f1Sub: "We handle your Google Ads to get you more visibility when it matters most.",
    f2Title: "SEO optimizations",
    f2Sub: "Rank higher organically so guests find you without you paying for clicks.",
    f3Title: "24/7 support",
    f3Sub: "Whenever you have a question, our dedicated team is here to help.",
    f4Title: "Simple dashboards",
    f4Sub: "Track your growth in real-time with easy-to-understand metrics.",
    f5Title: "Google maps setup",
    f5Sub: "Make sure you are the first pin that pops up when someone searches.",
    f6Title: "Website optimization",
    f6Sub: "Fast, mobile-friendly, and designed specifically to drive reservations.",
    testTitle: "Restaurant owners, in their own words.",
    exampleTitle: "Example builds",
    exampleSub: "High converting designs optimized for speed and user experience.",
    howItWorks: "How it works",
    hw1Title: "send your menu",
    hw1Sub: "Send us an email with a link to your menu or upload it in our form.",
    hw2Title: "we build it",
    hw2Sub: "We take your menu and build the first version of your new website.",
    hw3Title: "you decide",
    hw3Sub: "Love it? Keep it and we handle everything else. Don't like it? No problem.",
    stat1Value: "€2150",
    stat1Label: "What an agency charges",
    stat2Value: "€0",
    stat2Label: "What we charge to build it",
    stat3Value: "24 Hrs",
    stat3Label: "Turnaround time",
    limitTitle: "We take on 10 new restaurants a month.",
    limitSub: "To ensure the highest quality of service and real results, we limit our intake. Secure your spot now before we close the books for this month.",
    faqTitle: "Questions, answered straight",
    aboutTitle: "About Pixeloro",
    aboutRole: "Founder & Developer",
    aboutName: "KH Shifat Manjum",
    aboutDesc1: "Passionate about technology and design.",
    aboutDesc2: "I founded Pixeloro with a simple mission: to bring Italian businesses into the digital world with websites that actually make a difference and drive results.",
    footerTitle: "Send us your menu. See your website in 48 hours. Free to build. €85 a month only if you keep it.",
  },
  it: {
    bookCall: "Prenota una chiamata",
    marketingSub: "MARKETING PER RISTORANTI DA PIXELORO",
    heroTitle1: "Scopri dove il tuo ristorante",
    heroTitleHighlight: "si posiziona",
    heroTitle2: "su Google.",
    heroSubtitle: "Analizziamo centinaia di dati e scopriamo esattamente come ti trovano i tuoi clienti. Gratis, senza inganni.",
    restCheck: "Controllo Ristorante",
    restNameLabel: "Nome del Ristorante",
    restNamePlace: "es. Pizzeria Da Mario",
    yourNameLabel: "Il tuo Nome",
    yourNamePlace: "Mario Rossi",
    emailLabel: "Indirizzo Email",
    emailPlace: "mario@esempio.it",
    submitBtn: "Mostrami il mio posizionamento",
    noCreditCard: "100% gratis. Nessuna carta di credito richiesta.",
    terms: "* Si applicano termini e condizioni. La privacy dei dati è la nostra priorità. Non vendiamo i tuoi dati.",
    valueTitle1: "I tuoi clienti non chiedono agli amici dove mangiare. Chiedono a ",
    valueTitleHighlight: "Google e ChatGPT.",
    valueSub: "Assicurati di apparire per primo quando cercano \"ristoranti vicino a me\". Ti aiutiamo a ottimizzare la tua presenza digitale.",
    findOutMore: "Scopri di più - prenota una chiamata",
    pricingTitle: "Cosa ottieni davvero",
    pricingSub: "Smetti di indovinare. Ottieni dati reali e piani d'azione.",
    freeTierTitle: "La tua situazione attuale",
    freeTierPrice: "€0",
    freeTierUnit: "/ audit",
    freeItem1: "Audit completo del Profilo Google & SEO. Scopri esattamente dove ti trovi.",
    freeItem2: "Lista dei tuoi concorrenti locali. E cosa fanno meglio di te.",
    freeItem3: "Feedback di base sul sito web.",
    freeItem4: "Chiamata di consulenza di 15 minuti. Senza impegno.",
    proBadge: "Solo se lo desideri",
    proTierTitle: "Pixeloro Pro",
    proTierPrice: "€85",
    proTierUnit: "/ mese + IVA",
    proItem1: "Facciamo tutto noi per te. Rilassati e goditi i risultati.",
    proItem2: "Google My Business ottimizzato. Massimizza la ricerca locale.",
    proItem3: "Sito web ad alta conversione. Progettato per ottenere prenotazioni.",
    proItem4: "Generazione automatica di recensioni. Ottieni più recensioni a 5 stelle.",
    proItem5: "Report mensili sulle prestazioni. Controlla il tuo ROI.",
    trustText: "Più di 1.000 ristoranti ci affidano i loro dettagli.",
    payNowhere: "Scopri di più, non pagarci nulla",
    catchTitle: "Quindi, dov'è la fregatura?",
    catchSub: "Non c'è nessuna fregatura. È esattamente come sembra.",
    catchP1: "Ti offriamo un enorme valore iniziale facendo il lavoro pesante e mostrandoti esattamente cosa non va nella tua attuale configurazione digitale. Tutto gratis. Nessuna carta richiesta.",
    catchP2: "Se ti piace ciò che vedi e vuoi che lo sistemiamo, puoi assumerci per soli 85€ al mese. Altrimenti, prendi l'audit e lo sistemi da solo. È un vantaggio per tutti.",
    featuresTitle: "Cosa ottieni",
    f1Title: "Marketing a pagamento",
    f1Sub: "Gestiamo i tuoi Google Ads per darti maggiore visibilità quando conta di più.",
    f2Title: "Ottimizzazioni SEO",
    f2Sub: "Posizionati più in alto organicamente in modo che i clienti ti trovino senza pagare per i clic.",
    f3Title: "Supporto 24/7",
    f3Sub: "Ogni volta che hai una domanda, il nostro team dedicato è qui per aiutarti.",
    f4Title: "Dashboard semplici",
    f4Sub: "Tieni traccia della tua crescita in tempo reale con metricas facili da capire.",
    f5Title: "Configurazione Google Maps",
    f5Sub: "Assicurati di essere il primo pin che appare quando qualcuno cerca.",
    f6Title: "Ottimizzazione sito web",
    f6Sub: "Veloce, ottimizzato per dispositivi mobili e progettato per generare prenotazioni.",
    testTitle: "I proprietari di ristoranti, con le loro parole.",
    exampleTitle: "Esempi di siti",
    exampleSub: "Design ad alta conversione ottimizzati per velocità ed esperienza utente.",
    howItWorks: "Come funziona",
    hw1Title: "invia il tuo menu",
    hw1Sub: "Inviaci un'email con un link al tuo menu o caricalo nel nostro modulo.",
    hw2Title: "noi lo costruiamo",
    hw2Sub: "Prendiamo il tuo menu e costruiamo la prima versione del tuo nuovo sito web.",
    hw3Title: "tu decidi",
    hw3Sub: "Ti piace? Tienilo e gestiamo tutto il resto. Non ti piace? Nessun problema.",
    stat1Value: "€2150",
    stat1Label: "Cosa fa pagare un'agenzia",
    stat2Value: "€0",
    stat2Label: "Cosa facciamo pagare noi",
    stat3Value: "24 Ore",
    stat3Label: "Tempo di consegna",
    limitTitle: "Accettiamo 10 nuovi ristoranti al mese.",
    limitSub: "Per garantire la massima qualità del servizio, limitiamo le nostre iscrizioni. Assicurati il tuo posto ora.",
    faqTitle: "Domande, risposte dirette",
    aboutTitle: "Informazioni su Pixeloro",
    aboutRole: "Fondatore e Sviluppatore",
    aboutName: "KH Shifat Manjum",
    aboutDesc1: "Appassionato di tecnologia e design.",
    aboutDesc2: "Ho fondato Pixeloro con una semplice missione: portare le aziende italiane nel mondo digitale con siti web che facciano davvero la differenza e portino risultati.",
    footerTitle: "Inviaci il tuo menu. Vedi il tuo sito in 48 ore. Gratis da costruire. 85€ al mese solo se lo mantieni.",
  },
  de: {
    bookCall: "Gespräch buchen",
    marketingSub: "RESTAURANT-MARKETING VON PIXELORO",
    heroTitle1: "Finden Sie heraus, wo Ihr Restaurant",
    heroTitleHighlight: "wirklich steht",
    heroTitle2: "auf Google.",
    heroSubtitle: "Wir verarbeiten Hunderte von Datenpunkten und finden genau heraus, wie Ihre Gäste Sie finden. Kostenlos, kein Haken.",
    restCheck: "Restaurant Check",
    restNameLabel: "Restaurant Name",
    restNamePlace: "z.B. Marios Pizza",
    yourNameLabel: "Ihr Name",
    yourNamePlace: "Max Mustermann",
    emailLabel: "E-Mail Adresse",
    emailPlace: "max@beispiel.de",
    submitBtn: "Zeig mir mein Ranking",
    noCreditCard: "100% kostenlos. Keine Kreditkarte erforderlich.",
    terms: "* Es gelten die AGB. Datenschutz ist unsere höchste Priorität. Wir verkaufen Ihre Daten nicht.",
    valueTitle1: "Ihre Gäste fragen nicht ihre Freunde, wo sie essen sollen. Sie fragen ",
    valueTitleHighlight: "Google und ChatGPT.",
    valueSub: "Stellen Sie sicher, dass Sie als Erster erscheinen, wenn sie nach \"Restaurants in meiner Nähe\" suchen. Wir optimieren Ihren digitalen Fußabdruck.",
    findOutMore: "Mehr erfahren - Gespräch buchen",
    pricingTitle: "Was Sie tatsächlich bekommen",
    pricingSub: "Hören Sie auf zu raten. Erhalten Sie echte Einblicke und Aktionspläne.",
    freeTierTitle: "Ihr aktuelles Setup",
    freeTierPrice: "€0",
    freeTierUnit: "/ Audit",
    freeItem1: "Vollständiges Google-Profil & SEO-Audit. Wissen Sie genau, wo Sie stehen.",
    freeItem2: "Liste Ihrer lokalen Konkurrenten. Und was sie besser machen.",
    freeItem3: "Grundlegendes Website-Feedback.",
    freeItem4: "15-minütiges Beratungsgespräch. Unverbindlich.",
    proBadge: "Nur wenn Sie es wollen",
    proTierTitle: "Pixeloro Pro",
    proTierPrice: "€85",
    proTierUnit: "/ Monat + MwSt",
    proItem1: "Wir erledigen alles für Sie. Lehnen Sie sich zurück.",
    proItem2: "Optimiertes Google My Business. Maximieren Sie die lokale Suche.",
    proItem3: "Konversionsstarke Website. Entwickelt, um Buchungen zu erhalten.",
    proItem4: "Automatisierte Bewertungserstellung. Mehr 5-Sterne-Bewertungen.",
    proItem5: "Monatliche Leistungsberichte. Sehen Sie den ROI.",
    trustText: "Mehr als 1.000 Restaurants vertrauen uns ihre Daten an.",
    payNowhere: "Mehr erfahren, nichts bezahlen",
    catchTitle: "Also, was ist der Haken?",
    catchSub: "Es gibt keinen Haken. Es ist genau so, wie es klingt.",
    catchP1: "Wir bieten Ihnen frühzeitig massiven Wert, indem wir die schwere Arbeit übernehmen und Ihnen genau zeigen, was an Ihrem aktuellen digitalen Setup falsch ist. Alles kostenlos.",
    catchP2: "Wenn Ihnen gefällt, was Sie sehen, können Sie uns für nur 85 € im Monat beauftragen. Wenn nicht, nehmen Sie einfach das Audit und beheben es selbst. Eine Win-Win-Situation.",
    featuresTitle: "Was Sie bekommen",
    f1Title: "Bezahltes Marketing",
    f1Sub: "Wir verwalten Ihre Google Ads, um Ihnen mehr Sichtbarkeit zu verschaffen.",
    f2Title: "SEO-Optimierungen",
    f2Sub: "Ranken Sie organisch höher, damit Gäste Sie finden, ohne für Klicks zu bezahlen.",
    f3Title: "24/7 Support",
    f3Sub: "Wann immer Sie eine Frage haben, ist unser engagiertes Team für Sie da.",
    f4Title: "Einfache Dashboards",
    f4Sub: "Verfolgen Sie Ihr Wachstum in Echtzeit mit leicht verständlichen Metriken.",
    f5Title: "Google Maps Einrichtung",
    f5Sub: "Stellen Sie sicher, dass Sie der erste Pin sind, der bei einer Suche erscheint.",
    f6Title: "Website-Optimierung",
    f6Sub: "Schnell, mobilfreundlich und speziell entwickelt, um Reservierungen zu fördern.",
    testTitle: "Restaurantbesitzer, in ihren eigenen Worten.",
    exampleTitle: "Beispiel-Websites",
    exampleSub: "Konversionsstarke Designs, optimiert für Geschwindigkeit und Benutzererfahrung.",
    howItWorks: "Wie es funktioniert",
    hw1Title: "senden Sie Ihr Menü",
    hw1Sub: "Senden Sie uns eine E-Mail mit einem Link zu Ihrem Menü oder laden Sie es hoch.",
    hw2Title: "wir bauen es",
    hw2Sub: "Wir nehmen Ihr Menü und erstellen die erste Version Ihrer neuen Website.",
    hw3Title: "Sie entscheiden",
    hw3Sub: "Gefällt es Ihnen? Behalten Sie es und wir kümmern uns um den Rest. Wenn nicht? Kein Problem.",
    stat1Value: "€2150",
    stat1Label: "Was eine Agentur berechnet",
    stat2Value: "€0",
    stat2Label: "Was wir für den Bau berechnen",
    stat3Value: "24 Std",
    stat3Label: "Bearbeitungszeit",
    limitTitle: "Wir nehmen 10 neue Restaurants pro Monat auf.",
    limitSub: "Um die höchste Servicequalität zu gewährleisten, begrenzen wir unsere Aufnahme. Sichern Sie sich jetzt Ihren Platz.",
    faqTitle: "Fragen, direkt beantwortet",
    aboutTitle: "Über Pixeloro",
    aboutRole: "Gründer & Entwickler",
    aboutName: "KH Shifat Manjum",
    aboutDesc1: "Leidenschaftlich für Technologie und Design.",
    aboutDesc2: "Ich habe Pixeloro mit einer einfachen Mission gegründet: italienische Unternehmen in die digitale Welt zu bringen, mit Websites, die wirklich einen Unterschied machen und Ergebnisse liefern.",
    footerTitle: "Senden Sie uns Ihr Menü. Sehen Sie Ihre Website in 48 Stunden. Kostenlos zu erstellen. 85€ im Monat, nur wenn Sie sie behalten.",
  }
};

const FeatureCard = ({ icon: Icon, title, desc }) => {
  const [ref, inView] = useInView();
  return (
    <div 
      ref={ref}
      className={`bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 transition-all duration-700 relative overflow-hidden group 
      ${inView ? 'opacity-100 translate-y-0 shadow-[0_8px_40px_rgba(229,193,88,0.25)] border-primary/50' : 'opacity-0 translate-y-12 shadow-[0_8px_30px_rgba(229,193,88,0.08)]'}
      hover:shadow-[0_8px_40px_rgba(229,193,88,0.35)] hover:-translate-y-2 hover:border-primary/80`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className={`w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 border border-primary/20 shadow-inner ${inView ? 'scale-100' : 'scale-50'} group-hover:scale-110`}>
        <Icon className="text-primary w-6 h-6" />
      </div>
      <h3 className="font-black text-xl mb-3 text-white tracking-wide">{title}</h3>
      <p className="text-text-muted font-medium leading-relaxed">{desc}</p>
    </div>
  );
};

function Home() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const [formData, setFormData] = useState({
    restaurantName: '',
    name: '',
    email: '',
    phone: ''
  });

  const [openFaq, setOpenFaq] = useState(null);

  // Track page visit on mount
  useEffect(() => {
    // Basic deduplication using sessionStorage to prevent refreshing from counting as a new visit
    if (!sessionStorage.getItem('hasVisited')) {
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/stats/visit`, { method: 'POST' })
        .then(() => sessionStorage.setItem('hasVisited', 'true'))
        .catch(err => console.error("Error tracking visit:", err));
    }
  }, []);

  const phoneNumber = "+393481134181";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Thanks! We'll be in touch soon.");
        setFormData({ restaurantName: '', name: '', email: '', phone: '' });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Error submitting the form.");
    }
  };

  const faqs = [
    { q: "Is it really free?", a: "Yes, we design, build, and launch your initial website 100% for free. You only pay the €85/month if you decide to keep it and use our hosting & maintenance." },
    { q: "How does the process work?", a: "Simply send us your current menu and some details. We will build a high-converting website draft. If you love it, we make it live." },
    { q: "How long does it take?", a: "Our standard turnaround time is incredibly fast. We will have your new website ready in 24-48 hours after receiving your menu and details." },
    { q: "What is Pixeloro Pro?", a: "It's our all-inclusive €85/month subscription. It covers premium hosting, SSL security, continuous technical maintenance, and unlimited minor text/image updates." },
    { q: "Are there any hidden fees or contracts?", a: "No hidden fees, no long-term contracts. You can cancel your subscription at any time with no questions asked." }
  ];

  return (
    <div className="min-h-screen bg-gray-bg text-text font-sans selection:bg-primary selection:text-black">
      {/* Navbar */}
      <header className="flex justify-between items-center py-6 px-8 md:px-16 max-w-7xl mx-auto border-b border-white/10">
        <div className="text-3xl font-black tracking-tighter text-primary">pixeloro</div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 rounded-full border border-white/10 p-1">
            {['it', 'en', 'de'].map(l => (
              <button 
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all uppercase ${lang === l ? 'bg-primary text-black' : 'text-text-muted hover:text-white'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <Link to="/login" className="text-sm font-bold text-primary border border-primary hover:bg-primary/10 px-6 py-2.5 rounded-full transition-all hidden sm:block shadow-[0_0_15px_rgba(229,193,88,0.2)] hover:shadow-[0_0_25px_rgba(229,193,88,0.4)]">
            Login
          </Link>
          <a href={`tel:${phoneNumber}`} className="bg-primary hover:bg-primary-hover text-black font-bold py-2.5 px-6 rounded-full transition-colors text-sm shadow-[0_0_15px_rgba(229,193,88,0.3)] inline-block">
            {t.bookCall}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center pt-20 pb-16 px-4">
        <p className="text-xs font-bold tracking-widest text-primary uppercase mb-6">{t.marketingSub}</p>
        <h1 className="text-5xl md:text-7xl font-black mb-6 max-w-4xl mx-auto leading-tight tracking-tight text-white">
          {t.heroTitle1} <br />
          <span className="text-primary italic">{t.heroTitleHighlight}</span> {t.heroTitle2}
        </h1>
        <p className="text-text-muted mb-12 max-w-2xl mx-auto text-lg font-medium">
          {t.heroSubtitle}
        </p>

        {/* Hero Form */}
        <div className="bg-card p-8 rounded-3xl shadow-2xl max-w-xl mx-auto text-left relative border border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold text-xl">P</div>
            <span className="font-bold text-lg text-white">{t.restCheck}</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-text-muted">{t.restNameLabel}</label>
              <input type="text" name="restaurantName" value={formData.restaurantName} onChange={handleChange} className="w-full border border-white/10 rounded-xl p-3.5 bg-black text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-white/30" placeholder={t.restNamePlace} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-text-muted">{t.yourNameLabel}</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-white/10 rounded-xl p-3.5 bg-black text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-white/30" placeholder={t.yourNamePlace} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-text-muted">{t.emailLabel}</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-white/10 rounded-xl p-3.5 bg-black text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-white/30" placeholder={t.emailPlace} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-text-muted">{t.phoneLabel || 'Phone Number'}</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-white/10 rounded-xl p-3.5 bg-black text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-white/30" placeholder={t.phonePlace || '+39 123 456'} required />
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-black font-bold py-4 rounded-xl mt-4 transition-all shadow-[0_0_20px_rgba(229,193,88,0.2)] hover:shadow-[0_0_30px_rgba(229,193,88,0.4)]">
              {t.submitBtn}
            </button>
          </form>
          <p className="text-xs text-center text-text-muted mt-5">{t.noCreditCard}</p>
        </div>
        
        <p className="text-xs text-white/30 mt-12 max-w-3xl mx-auto">
          {t.terms}
        </p>
      </section>

      {/* Value Prop Section */}
      <section className="text-center py-24 px-4 border-y border-white/5 bg-gradient-to-b from-gray-bg to-card">
        <h2 className="text-4xl md:text-5xl font-black max-w-4xl mx-auto leading-tight mb-8 text-white">
          {t.valueTitle1}<span className="text-primary">{t.valueTitleHighlight}</span>
        </h2>
        <p className="text-lg text-text-muted max-w-2xl mx-auto mb-10 font-medium">
          {t.valueSub}
        </p>
        <a href={`tel:${phoneNumber}`} className="bg-primary hover:bg-primary-hover text-black font-bold py-4 px-10 rounded-full transition-colors shadow-[0_0_20px_rgba(229,193,88,0.2)] inline-block">
          {t.findOutMore}
        </a>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-3 text-white">{t.pricingTitle}</h2>
          <p className="text-text-muted font-medium">{t.pricingSub}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Free Tier */}
          <div className="bg-card p-10 rounded-[2rem] border border-white/10 flex flex-col hover:border-white/20 transition-colors">
            <h3 className="font-bold text-xl mb-2 text-white">{t.freeTierTitle}</h3>
            <div className="flex items-end gap-1 mb-8">
              <span className="text-6xl font-black text-primary">{t.freeTierPrice}</span>
              <span className="text-text-muted font-bold mb-2">{t.freeTierUnit}</span>
            </div>
            <ul className="space-y-5 font-medium text-text-muted flex-grow">
              <li className="flex gap-4 items-start"><Check className="text-primary flex-shrink-0 mt-1" /> <div>{t.freeItem1}</div></li>
              <li className="flex gap-4 items-start"><Check className="text-primary flex-shrink-0 mt-1" /> <div>{t.freeItem2}</div></li>
              <li className="flex gap-4 items-start"><Check className="text-primary flex-shrink-0 mt-1" /> <div>{t.freeItem3}</div></li>
              <li className="flex gap-4 items-start"><Check className="text-primary flex-shrink-0 mt-1" /> <div>{t.freeItem4}</div></li>
            </ul>
          </div>

          {/* Paid Tier */}
          <div className="bg-card p-10 rounded-[2rem] border-2 border-primary relative flex flex-col shadow-[0_0_30px_rgba(229,193,88,0.1)]">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              {t.proBadge}
            </div>
            <h3 className="font-bold text-xl mb-2 text-white mt-2">{t.proTierTitle}</h3>
            <div className="flex items-end gap-1 mb-8">
              <span className="text-6xl font-black text-primary">{t.proTierPrice}</span>
              <span className="text-text-muted font-bold mb-2">{t.proTierUnit}</span>
            </div>
            <ul className="space-y-5 font-medium text-text-muted flex-grow">
              <li className="flex gap-4 items-start"><Check className="text-primary flex-shrink-0 mt-1" /> <div>{t.proItem1}</div></li>
              <li className="flex gap-4 items-start"><Check className="text-primary flex-shrink-0 mt-1" /> <div>{t.proItem2}</div></li>
              <li className="flex gap-4 items-start"><Check className="text-primary flex-shrink-0 mt-1" /> <div>{t.proItem3}</div></li>
              <li className="flex gap-4 items-start"><Check className="text-primary flex-shrink-0 mt-1" /> <div>{t.proItem4}</div></li>
              <li className="flex gap-4 items-start"><Check className="text-primary flex-shrink-0 mt-1" /> <div>{t.proItem5}</div></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center mt-12">
           <p className="text-sm font-bold text-text-muted mb-6">{t.trustText}</p>
           <a href={`tel:${phoneNumber}`} className="bg-primary hover:bg-primary-hover text-black font-bold py-4 px-10 rounded-full transition-colors shadow-[0_0_20px_rgba(229,193,88,0.2)] inline-block">
            {t.payNowhere}
          </a>
        </div>
      </section>

      {/* So what's the catch */}
      <section className="text-center py-24 px-4 border-t border-white/5 bg-card">
        <h2 className="text-4xl font-black mb-8 text-primary">{t.catchTitle}</h2>
        <h3 className="text-2xl font-black mb-6 text-white">{t.catchSub}</h3>
        <p className="text-text-muted max-w-3xl mx-auto mb-12 text-lg">
          {t.catchP1}
        </p>

        {/* Dynamic Comparison */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-black/50 p-8 rounded-3xl border border-white/10">
            <h4 className="text-white/60 font-bold uppercase tracking-wider text-sm mb-4">Traditional Agency Setup</h4>
            <div className="text-5xl font-black text-white/50 line-through">
              <CountUp end={2150} prefix="€" />
            </div>
          </div>
          <div className="bg-primary/10 p-8 rounded-3xl border border-primary/50 relative shadow-[0_0_30px_rgba(229,193,88,0.2)]">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
              Pixeloro Setup
            </div>
            <h4 className="text-primary font-bold uppercase tracking-wider text-sm mb-4 mt-2">What we charge to build</h4>
            <div className="text-6xl font-black text-primary">
              <CountUp end={0} prefix="€" />
            </div>
          </div>
          <div className="bg-black/50 p-8 rounded-3xl border border-white/10">
            <h4 className="text-white/60 font-bold uppercase tracking-wider text-sm mb-4">Turnaround Time</h4>
            <div className="text-5xl font-black text-white">
              <CountUp end={48} suffix=" Hours" duration={1500} />
            </div>
          </div>
        </div>

        <p className="text-text-muted max-w-3xl mx-auto text-lg">
          {t.catchP2}
        </p>
      </section>

      {/* What you get Grid */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-white">{t.featuresTitle}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Rocket, title: t.f1Title, desc: t.f1Sub },
            { icon: Search, title: t.f2Title, desc: t.f2Sub },
            { icon: ShieldCheck, title: t.f3Title, desc: t.f3Sub },
            { icon: BarChart3, title: t.f4Title, desc: t.f4Sub },
            { icon: MapPin, title: t.f5Title, desc: t.f5Sub },
            { icon: Smartphone, title: t.f6Title, desc: t.f6Sub }
          ].map((feat, i) => (
            <FeatureCard key={i} icon={feat.icon} title={feat.title} desc={feat.desc} />
          ))}
        </div>
      </section>


      {/* How it works */}
      <section className="py-24 px-4 border-y border-white/5 bg-card">
        <h2 className="text-4xl font-black text-center mb-16 text-white">{t.howItWorks}</h2>
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-4 max-w-5xl mx-auto relative">
          
          <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent -z-10"></div>
          
          <div className="flex-1 text-center relative px-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center font-black text-xl text-primary mx-auto mb-6 border-2 border-primary shadow-[0_0_15px_rgba(229,193,88,0.3)]">1</div>
            <h3 className="font-black text-xl mb-3 text-white">{t.hw1Title}</h3>
            <p className="text-text-muted font-medium text-sm">{t.hw1Sub}</p>
          </div>
          <div className="flex-1 text-center relative px-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center font-black text-xl text-primary mx-auto mb-6 border-2 border-primary shadow-[0_0_15px_rgba(229,193,88,0.3)]">2</div>
            <h3 className="font-black text-xl mb-3 text-white">{t.hw2Title}</h3>
            <p className="text-text-muted font-medium text-sm">{t.hw2Sub}</p>
          </div>
          <div className="flex-1 text-center relative px-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center font-black text-xl text-primary mx-auto mb-6 border-2 border-primary shadow-[0_0_15px_rgba(229,193,88,0.3)]">3</div>
            <h3 className="font-black text-xl mb-3 text-white">{t.hw3Title}</h3>
            <p className="text-text-muted font-medium text-sm">{t.hw3Sub}</p>
          </div>
        </div>
        <div className="text-center mt-20">
           <a href={`tel:${phoneNumber}`} className="bg-primary hover:bg-primary-hover text-black font-bold py-4 px-10 rounded-full transition-colors shadow-[0_0_20px_rgba(229,193,88,0.2)] inline-block">
            {t.bookCall}
          </a>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-black text-white py-20 px-4 border-b border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="py-4">
            <div className="text-5xl font-black text-primary mb-3 text-shadow-glow">{t.stat1Value}</div>
            <div className="text-white/60 font-bold uppercase tracking-wider text-sm">{t.stat1Label}</div>
          </div>
          <div className="py-4">
            <div className="text-5xl font-black text-primary mb-3 text-shadow-glow">{t.stat2Value}</div>
            <div className="text-white/60 font-bold uppercase tracking-wider text-sm">{t.stat2Label}</div>
          </div>
          <div className="py-4">
            <div className="text-5xl font-black text-primary mb-3 text-shadow-glow">{t.stat3Value}</div>
            <div className="text-white/60 font-bold uppercase tracking-wider text-sm">{t.stat3Label}</div>
          </div>
        </div>
      </section>

      {/* Limit Banner */}
      <section className="py-24 px-4 bg-card text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-6 text-white">{t.limitTitle}</h2>
        <p className="text-text-muted font-medium max-w-2xl mx-auto mb-10 text-lg">
          {t.limitSub}
        </p>
        <a href={`tel:${phoneNumber}`} className="bg-primary hover:bg-primary-hover text-black font-bold py-4 px-10 rounded-full transition-colors shadow-[0_0_20px_rgba(229,193,88,0.2)] inline-block">
          {t.bookCall}
        </a>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 bg-black border-t border-white/5">
        <div className="text-center mb-12">
          <div className="w-12 h-1 bg-primary mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-serif mb-2 text-[#F2F2F2]">{t.aboutTitle}</h2>
        </div>
        
        <div className="max-w-xl mx-auto bg-[#1A1A1A] rounded-3xl p-10 border border-primary/30 text-center shadow-[0_0_30px_rgba(229,193,88,0.2)] hover:shadow-[0_0_40px_rgba(229,193,88,0.3)] transition-all duration-500 group">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 flex-shrink-0 border-2 border-primary/80 shadow-[0_0_20px_rgba(229,193,88,0.4)] transition-all duration-500">
             <img src="/founder.jpg" alt="KH Shifat Manjum" className="w-full h-full object-cover object-top" />
          </div>
          <h3 className="text-2xl font-semibold text-[#E5E5E5] tracking-wide mb-2">{t.aboutName}</h3>
          <p className="text-primary font-medium text-sm mb-6">{t.aboutRole}</p>
          <p className="text-[#999999] leading-relaxed font-medium">
            {t.aboutDesc1} {t.aboutDesc2}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-gray-bg border-t border-white/5">
        <h2 className="text-4xl font-black text-center mb-16 text-white">{t.faqTitle}</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <FAQAccordion key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-24 text-center px-4 border-t border-white/10">
        <h2 className="text-4xl md:text-5xl font-black mb-12 max-w-4xl mx-auto leading-tight text-white">
          {t.footerTitle}
        </h2>
        <a href={`tel:${phoneNumber}`} className="bg-primary hover:bg-primary-hover text-black font-bold py-4 px-12 rounded-full text-lg transition-colors mb-24 shadow-[0_0_20px_rgba(229,193,88,0.2)] hover:shadow-[0_0_30px_rgba(229,193,88,0.4)] inline-block">
          {t.bookCall}
        </a>
        
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto text-sm text-text-muted font-medium">
          <div className="font-black text-primary mb-6 md:mb-0 text-2xl tracking-tighter">pixeloro</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=Hi%20KH%20Shifat!%20I'm%20interested%20in%20a%20free%20website%20build.`}
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center group"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:scale-110 transition-transform"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>

    </div>
  );
}

export default Home;
