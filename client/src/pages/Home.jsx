import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, Search, ShieldCheck, BarChart3, MapPin, Smartphone, Check, ChevronDown, Loader2, Lock, CreditCard, Sparkles, Zap } from 'lucide-react';
import Logo from '../components/Logo';

const ShowcaseCarousel = lazy(() => import('../components/ShowcaseCarousel'));



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
const getTranslations = (price, lifetimePrice = '399') => ({
  en: {
    bookCall: "Chat on WhatsApp",
    marketingSub: "WEB DESIGN BY ZENTIXX IT",
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
    findOutMore: "Chat with us on WhatsApp",
    pricingTitle: "Simple, transparent pricing",
    pricingSub: "No massive upfront costs. Choose a simple monthly subscription or lifetime ownership.",
    freeTierTitle: "Phase 1: The Build",
    freeTierPrice: "€0",
    freeTierUnit: "upfront",
    freeItem1: "Custom web design tailored to your brand.",
    freeItem2: "Mobile-optimized for hungry guests on the go.",
    freeItem3: "Menu integration & contact forms.",
    freeItem4: "Delivered in 24 hours to review.",
    proBadge: "Phase 2: Monthly",
    proTierTitle: "Hosting & Management",
    proTierPrice: `€${price}`,
    proTierUnit: "/ month + VAT",
    proItem1: "Premium, lightning-fast hosting.",
    proItem2: "Unlimited minor text/image updates.",
    proItem3: "Continuous technical maintenance & security.",
    proItem4: "Basic SEO to keep you ranking locally.",
    proItem5: "Cancel anytime. You own your domain.",
    proBtn: "Subscribe with Stripe",
    lifetimeBadge: "Phase 3: Buyout",
    lifetimeTierTitle: "Lifetime Ownership",
    lifetimeTierPrice: `€${lifetimePrice}`,
    lifetimeTierUnit: "one-time • forever",
    lifetimeSupportBadge: "✨ 2 Years Free Support Included",
    lifetimeItem1: "100% full website & code ownership forever.",
    lifetimeItem2: "2 Years of dedicated technical support for free.",
    lifetimeItem3: "Zero monthly fees or mandatory subscriptions.",
    lifetimeItem4: "High-speed hosting setup & custom domain connection.",
    lifetimeItem5: "Full source code export & complete admin handover.",
    lifetimeBtn: "Get Lifetime Access",
    trustText: "Join the modern restaurants growing with Zentixx IT.",
    payNowhere: "See the design first, pay nothing upfront.",
    catchTitle: "So what's the catch?",
    catchSub: "There is no catch. It's exactly how it sounds.",
    catchP1: "We take on all the risk. We build your website for free. If you don't like it, you walk away and pay absolutely nothing.",
    catchP2: `If you love it, you can subscribe to our Zentixx Pro €${price}/month plan or buy it outright for €${lifetimePrice} forever with 2 years of free support. We handle the servers, security, and all tech headaches so you can focus on cooking great food.`,
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
    aboutTitle: "About Zentixx IT",
    aboutRole: "Founder & Developer",
    aboutName: "KH Shifat Manjum",
    aboutDesc1: "Passionate about technology and design.",
    aboutDesc2: "I founded Zentixx IT with a simple mission: to bring Italian businesses into the digital world with websites that actually make a difference and drive results.",
    footerTitle: `Send us your menu. See your website in 48 hours. Free to build. €${price}/mo or €${lifetimePrice} lifetime only if you keep it.`,
  },
  it: {
    bookCall: "Scrivici su WhatsApp",
    marketingSub: "MARKETING PER RISTORANTI DA ZENTIXX IT",
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
    phoneLabel: "Numero di Telefono",
    phonePlace: "+39 333 123 4567",
    submitBtn: "Mostrami il mio posizionamento",
    noCreditCard: "100% gratis. Nessuna carta di credito richiesta.",
    terms: "* Si applicano termini e condizioni. La privacy dei dati è la nostra priorità. Non vendiamo i tuoi dati.",
    valueTitle1: "I tuoi clienti non chiedono agli amici dove mangiare. Chiedono a ",
    valueTitleHighlight: "Google e ChatGPT.",
    valueSub: "Assicurati di apparire per primo quando cercano \"ristoranti vicino a me\". Ti aiutiamo a ottimizzare la tua presenza digitale.",
    findOutMore: "Contattaci su WhatsApp",
    pricingTitle: "Tariffe semplici e trasparenti",
    pricingSub: "Nessun costo iniziale nascosto. Scegli tra abbonamento mensile o proprietà a vita con 2 anni di supporto gratis.",
    freeTierTitle: "Fase 1: La Creazione",
    freeTierPrice: "€0",
    freeTierUnit: "iniziale",
    freeItem1: "Design personalizzato su misura per il tuo brand.",
    freeItem2: "Ottimizzato per smartphone e clienti in movimento.",
    freeItem3: "Integrazione menu digitale e modulo contatti.",
    freeItem4: "Bozza pronta in sole 24-48 ore per la tua revisione.",
    proBadge: "Fase 2: Mensile",
    proTierTitle: "Hosting & Gestione",
    proTierPrice: `${price}€`,
    proTierUnit: "/ mese + IVA",
    proItem1: "Hosting dedicato ad alte prestazioni ultra-veloce.",
    proItem2: "Modifiche illimitate a menu, testi e immagini.",
    proItem3: "Manutenzione tecnica continua e sicurezza SSL.",
    proItem4: "Ottimizzazione SEO locale per posizionamento Google.",
    proItem5: "Disdici quando vuoi. Il dominio resta tuo.",
    proBtn: "Attiva Abbonamento Stripe",
    lifetimeBadge: "Fase 3: Acquisto Diretto",
    lifetimeTierTitle: "Proprietà a Vita",
    lifetimeTierPrice: `${lifetimePrice}€`,
    lifetimeTierUnit: "una tantum • per sempre",
    lifetimeSupportBadge: "✨ 2 Anni di Assistenza Tecnica Gratis Inclusa",
    lifetimeItem1: "Proprietà totale al 100% del sito web per sempre.",
    lifetimeItem2: "2 Anni di assistenza tecnica e aggiornamenti inclusi gratis.",
    lifetimeItem3: "Zero canoni mensili o costi ricorrenti futuri.",
    lifetimeItem4: "Configurazione hosting ultra-veloce e dominio.",
    lifetimeItem5: "Consegna completa di file, grafica e codice sorgente.",
    lifetimeBtn: "Acquista a Vita con Stripe",
    trustText: "Più di 1.000 ristoranti si affidano a Zentixx IT.",
    payNowhere: "Scopri di più, non pagarci nulla",
    catchTitle: "Quindi, dov'è la fregatura?",
    catchSub: "Non c'è nessuna fregatura. È esattamente come sembra.",
    catchP1: "Ti offriamo un enorme valore iniziale facendo il lavoro pesante e mostrandoti esattamente cosa non va nella tua attuale configurazione digitale. Tutto gratis. Nessuna carta richiesta.",
    catchP2: `Se ti piace ciò che vedi, puoi abbonarti a Zentixx Pro per soli ${price}€ al mese oppure acquistare il sito a vita a ${lifetimePrice}€ con 2 anni di supporto gratuito incluso. Altrimenti, non paghi assolutamente nulla.`,
    featuresTitle: "Cosa ottieni",
    f1Title: "Marketing a pagamento",
    f1Sub: "Gestiamo i tuoi Google Ads per darti maggiore visibilità quando conta di più.",
    f2Title: "Ottimizzazioni SEO",
    f2Sub: "Posizionati più in alto organicamente in modo che i clienti ti trovino senza pagare per i clic.",
    f3Title: "Supporto 24/7",
    f3Sub: "Ogni volta che hai una domanda, il nostro team dedicato è qui per aiutarti.",
    f4Title: "Dashboard semplici",
    f4Sub: "Tieni traccia della tua crescita in tempo reale con metriche facili da capire.",
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
    aboutTitle: "Informazioni su Zentixx IT",
    aboutRole: "Fondatore e Sviluppatore",
    aboutName: "KH Shifat Manjum",
    aboutDesc1: "Appassionato di tecnologia e design.",
    aboutDesc2: "Ho fondato Zentixx IT con una semplice missione: portare le aziende italiane nel mondo digitale con siti web che facciano davvero la differenza e portino risultati.",
    footerTitle: `Inviaci il tuo menu. Vedi il tuo sito in 48 ore. Gratis da costruire. ${price}€ al mese o ${lifetimePrice}€ a vita solo se lo mantieni.`,
  },
  de: {
    bookCall: "Auf WhatsApp schreiben",
    marketingSub: "RESTAURANT-MARKETING VON ZENTIXX IT",
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
    phoneLabel: "Telefonnummer",
    phonePlace: "+49 123 456789",
    submitBtn: "Zeig mir mein Ranking",
    noCreditCard: "100% kostenlos. Keine Kreditkarte erforderlich.",
    terms: "* Es gelten die AGB. Datenschutz ist unsere höchste Priorität. Wir verkaufen Ihre Daten nicht.",
    valueTitle1: "Ihre Gäste fragen nicht ihre Freunde, wo sie essen sollen. Sie fragen ",
    valueTitleHighlight: "Google und ChatGPT.",
    valueSub: "Stellen Sie sicher, dass Sie als Erster erscheinen, wenn sie nach \"Restaurants in meiner Nähe\" suchen. Wir optimieren Ihren digitalen Fußabdruck.",
    findOutMore: "Auf WhatsApp kontaktieren",
    pricingTitle: "Einfache, transparente Preise",
    pricingSub: "Keine versteckten Vorabkosten. Wählen Sie ein flexibles Monatsabo oder lebenslanges Eigentum mit 2 Jahren Support.",
    freeTierTitle: "Phase 1: Die Erstellung",
    freeTierPrice: "€0",
    freeTierUnit: "vorab",
    freeItem1: "Individuelles Webdesign, abgestimmt auf Ihre Marke.",
    freeItem2: "Mobil-optimiert für Gäste von unterwegs.",
    freeItem3: "Menü-Integration & Kontaktformulare.",
    freeItem4: "In 24-48 Stunden zur Überprüfung geliefert.",
    proBadge: "Phase 2: Monatlich",
    proTierTitle: "Hosting & Betreuung",
    proTierPrice: `${price}€`,
    proTierUnit: "/ Monat + MwSt",
    proItem1: "Premium, blitzschnelles Hosting.",
    proItem2: "Unbegrenzte Änderungen an Menü, Texten und Bildern.",
    proItem3: "Kontinuierliche technische Wartung & SSL-Sicherheit.",
    proItem4: "Lokale SEO-Optimierung für Google-Rankings.",
    proItem5: "Jederzeit kündbar. Sie besitzen Ihre Domain.",
    proBtn: "Mit Stripe abonnieren",
    lifetimeBadge: "Phase 3: Einmalkauf",
    lifetimeTierTitle: "Lebenslanges Eigentum",
    lifetimeTierPrice: `${lifetimePrice}€`,
    lifetimeTierUnit: "einmalig • für immer",
    lifetimeSupportBadge: "✨ 2 Jahre Gratis-Support inklusive",
    lifetimeItem1: "100% volles Eigentum an Website & Code für immer.",
    lifetimeItem2: "2 Jahre technischer Support & Wartung kostenlos inklusive.",
    lifetimeItem3: "Keine monatlichen Gebühren oder Pflichtabonnements.",
    lifetimeItem4: "Schnelles Hosting-Setup & Domain-Verbindung.",
    lifetimeItem5: "Vollständiges Quellcode-Paket & Übergabe der Admin-Rechte.",
    lifetimeBtn: "Lifetime mit Stripe sichern",
    trustText: "Mehr als 1.000 Restaurants vertrauen auf Zentixx IT.",
    payNowhere: "Mehr erfahren, nichts bezahlen",
    catchTitle: "Also, was ist der Haken?",
    catchSub: "Es gibt keinen Haken. Es ist genau so, wie es klingt.",
    catchP1: "Wir bieten Ihnen frühzeitig massiven Wert, indem wir die schwere Arbeit übernehmen und Ihnen genau zeigen, was an Ihrem aktuellen digitalen Setup falsch ist. Alles kostenlos.",
    catchP2: `Wenn Ihnen gefällt, was Sie sehen, können Sie uns für Zentixx Pro für nur ${price} € im Monat abonnieren oder die Website für einmalig ${lifetimePrice} € mit 2 Jahren kostenlosem Support für immer kaufen.`,
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
    aboutTitle: "Über Zentixx IT",
    aboutRole: "Gründer & Entwickler",
    aboutName: "KH Shifat Manjum",
    aboutDesc1: "Leidenschaftlich für Technologie und Design.",
    aboutDesc2: "Ich habe Zentixx IT mit einer einfachen Mission gegründet: italienische Unternehmen in die digitale Welt zu bringen, mit Websites, die wirklich einen Unterschied machen und Ergebnisse liefern.",
    footerTitle: `Senden Sie uns Ihr Menü. Sehen Sie Ihre Website in 48 Stunden. Kostenlos zu erstellen. ${price}€ im Monat oder ${lifetimePrice}€ Lifetime nur wenn Sie sie behalten.`,
  }
});

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
  const [lang, setLang] = useState(() => localStorage.getItem('pixeloro_lang') || 'it');
  const [monthlyPrice, setMonthlyPrice] = useState(() => localStorage.getItem('pixeloro_monthly_price') || '55');
  const [lifetimePrice, setLifetimePrice] = useState(() => localStorage.getItem('pixeloro_lifetime_price') || '399');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/settings`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          if (data.monthlyPrice) {
            setMonthlyPrice(String(data.monthlyPrice));
            localStorage.setItem('pixeloro_monthly_price', String(data.monthlyPrice));
          }
          if (data.lifetimePrice) {
            setLifetimePrice(String(data.lifetimePrice));
            localStorage.setItem('pixeloro_lifetime_price', String(data.lifetimePrice));
          }
        }
      })
      .catch(err => console.error("Error fetching settings:", err));
  }, []);

  const allTranslations = getTranslations(monthlyPrice, lifetimePrice);
  const t = allTranslations[lang] || allTranslations.it;

  const [formData, setFormData] = useState({
    restaurantName: '',
    name: '',
    email: '',
    phone: ''
  });

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
  const whatsappUrl = `https://wa.me/393481134181?text=${encodeURIComponent(
    lang === 'it' 
      ? `Ciao! Vorrei maggiori informazioni sulla bozza gratuita in 48 ore del nuovo sito web per il mio ristorante (offerta ${monthlyPrice}€/mese o ${lifetimePrice}€ a vita).` 
      : lang === 'de'
      ? `Hallo! Ich interessiere mich für einen kostenlosen Website-Entwurf innerhalb von 48 Stunden für mein Restaurant (${monthlyPrice}€/Monat oder ${lifetimePrice}€ Lifetime).`
      : `Hi! I would like more information about getting a free 48h custom website build for my restaurant (€${monthlyPrice}/mo or €${lifetimePrice} lifetime).`
  )}`;

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [checkingOut, setCheckingOut] = useState(null); // null | 'monthly' | 'lifetime'

  const handleLanguageChange = (l) => {
    setLang(l);
    localStorage.setItem('pixeloro_lang', l);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStripeCheckout = async (planType = 'monthly') => {
    setCheckingOut(planType);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType,
          monthlyPrice,
          lifetimePrice,
          price: planType === 'lifetime' ? lifetimePrice : monthlyPrice,
          customerName: formData.name || undefined,
          customerEmail: formData.email || undefined,
          restaurantName: formData.restaurantName || undefined,
          phone: formData.phone || undefined
        })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to start Stripe checkout session');
      }
    } catch (e) {
      console.error('Stripe checkout error:', e);
      alert('Error connecting to Stripe checkout.');
    } finally {
      setCheckingOut(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormData({ restaurantName: '', name: '', email: '', phone: '' });
        setTimeout(() => {
          navigate('/thank-you');
        }, 1200);
      } else {
        alert("Something went wrong. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Form submit error:", err);
      alert("Error submitting the form.");
      setIsSubmitting(false);
    }
  };

  const faqs = [
    { 
      q: lang === 'it' ? "È davvero gratis?" : lang === 'de' ? "Ist es wirklich kostenlos?" : "Is it really free?", 
      a: lang === 'it' 
        ? `Sì, progettiamo e costruiamo la prima bozza completa del tuo sito web al 100% gratis. Paghi solo ${monthlyPrice}€ al mese (o ${lifetimePrice}€ per l'acquisto a vita) se decidi di tenerlo attivo con il nostro hosting ultra-veloce e la manutenzione.`
        : lang === 'de'
        ? `Ja, wir entwerfen und erstellen Ihren ersten Website-Entwurf zu 100% kostenlos. Sie zahlen nur die ${monthlyPrice}€/Monat (oder ${lifetimePrice}€ für Lifetime), wenn Sie sich entscheiden, die Website zu behalten.`
        : `Yes, we design, build, and present your initial custom website 100% for free. You only pay €${monthlyPrice}/month (or €${lifetimePrice} lifetime buyout) if you decide to keep it live.` 
    },
    { 
      q: lang === 'it' ? "Posso acquistare il sito per sempre senza abbonamento mensile?" : lang === 'de' ? "Kann ich die Website für immer kaufen, ohne monatliches Abo?" : "Can I buy the website outright without a monthly subscription?", 
      a: lang === 'it'
        ? `Certamente! Con la nostra opzione Fase 3 (Proprietà a Vita a ${lifetimePrice}€ una tantum), il sito web diventa al 100% di tua proprietà per sempre, senza alcun canone mensile, e ricevi 2 anni di assistenza tecnica e supporto inclusi gratuitamente.`
        : lang === 'de'
        ? `Absolut! Mit unserer Phase 3 (Lebenslanges Eigentum für einmalig ${lifetimePrice}€) gehört die Website für immer Ihnen – ohne monatliche Gebühren und inklusive 2 Jahre kostenlosem technischen Support und Wartung.`
        : `Absolutely! With our Phase 3 Lifetime Ownership (€${lifetimePrice} one-time), the website and code belong 100% to you forever with zero recurring fees, and you still get 2 full years of dedicated technical support and maintenance for free.` 
    },
    { 
      q: lang === 'it' ? "Come funziona il processo?" : lang === 'de' ? "Wie funktioniert der Ablauf?" : "How does the process work?", 
      a: lang === 'it'
        ? "Inviaci semplicemente il tuo menu attuale e alcuni dettagli. Creiamo una bozza ad alta conversione in sole 24-48 ore. Se ti piace, la colleghiamo al tuo dominio e la mettiamo online."
        : lang === 'de'
        ? "Senden Sie uns einfach Ihre Speisekarte und Details. Wir erstellen innerhalb von 24-48 Stunden einen Entwurf. Wenn er Ihnen gefällt, schalten wir ihn live."
        : "Simply send us your current menu and some details. We will build a high-converting website draft in 24-48 hours. If you love it, we connect your domain and make it live." 
    },
    { 
      q: lang === 'it' ? "Quanto tempo ci vuole?" : lang === 'de' ? "Wie lange dauert es?" : "How long does it take?", 
      a: lang === 'it'
        ? "I nostri tempi di consegna sono rapidissimi: riceverai la bozza completa del tuo nuovo sito web su misura in sole 24-48 ore."
        : lang === 'de'
        ? "Unsere Bearbeitungszeit ist extrem schnell: Sie erhalten Ihren individuellen Website-Entwurf in nur 24-48 Stunden."
        : "Our standard turnaround time is incredibly fast. We will have your complete custom website draft ready to review in 24-48 hours after receiving your menu and details." 
    },
    { 
      q: lang === 'it' ? "Cosa include Zentixx Pro?" : lang === 'de' ? "Was beinhaltet Zentixx Pro?" : "What is Zentixx Pro?", 
      a: lang === 'it'
        ? `È il nostro abbonamento all-inclusive da ${monthlyPrice}€/mese. Include hosting dedicato ultra-rapido, certificato di sicurezza SSL, manutenzione tecnica continua e modifiche illimitate a menu, testi e foto.`
        : lang === 'de'
        ? `Es ist unser All-Inclusive-Abonnement für ${monthlyPrice}€/Monat. Es beinhaltet blitzschnelles Hosting, SSL-Zertifikat, kontinuierliche Wartung und unbegrenzte Änderungen an Menü, Texten und Bildern.`
        : `It's our all-inclusive €${monthlyPrice}/month subscription. It covers high-speed dedicated hosting, SSL security certificates, continuous technical maintenance, and unlimited minor updates to your menu, texts, and images.` 
    },
    { 
      q: lang === 'it' ? "Ci sono costi nascosti o contratti vincolanti?" : lang === 'de' ? "Gibt es versteckte Kosten oder Verträge?" : "Are there any hidden fees or contracts?", 
      a: lang === 'it'
        ? "Nessun costo nascosto e nessun vincolo a lungo termine. Il dominio rimane di tua proprietà e puoi disdire l'abbonamento in qualsiasi momento senza penali."
        : lang === 'de'
        ? "Keine versteckten Gebühren, keine langfristigen Verträge. Sie besitzen Ihre Domain und können das Abonnement jederzeit kündigen."
        : "No hidden fees and no lock-in contracts. You own your domain name, and you can cancel your subscription at any time with no questions asked." 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-bg text-text font-sans selection:bg-primary selection:text-black">
      {/* Navbar: Clean on Mobile, Full on Desktop */}
      <header className="flex justify-between items-center py-5 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto border-b border-white/10">
        <Logo size="md" />
        
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Switcher */}
          <div className="flex bg-white/5 rounded-full border border-white/10 p-1">
            {['it', 'en', 'de'].map(l => (
              <button 
                key={l}
                onClick={() => handleLanguageChange(l)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all uppercase cursor-pointer ${lang === l ? 'bg-primary text-black' : 'text-text-muted hover:text-white'}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* CRM Access */}
          <Link 
            to="/login"
            className="text-xs font-bold text-white/70 hover:text-primary transition-all py-2 px-3 sm:px-3.5 rounded-full hover:bg-white/5 flex items-center gap-1.5 border border-white/10 hover:border-primary/40 cursor-pointer"
            title="Access CRM Dashboard"
          >
            <Lock size={13} className="text-primary" />
            <span>CRM</span>
          </Link>

          {/* WhatsApp Action Button - Hidden on mobile to keep navbar clean, visible on desktop/tablets */}
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="bg-primary hover:bg-primary-hover text-black font-bold py-2.5 px-5 sm:px-6 rounded-full transition-all text-xs sm:text-sm shadow-[0_0_15px_rgba(229,193,88,0.3)] hidden sm:inline-flex items-center gap-2 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
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
            <button 
              type="submit" 
              disabled={isSubmitting || isSuccess}
              className={`w-full font-bold py-4 rounded-xl mt-4 transition-all shadow-[0_0_20px_rgba(229,193,88,0.2)] flex items-center justify-center gap-2 cursor-pointer ${
                isSuccess
                  ? 'bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                  : 'bg-primary hover:bg-primary-hover text-black hover:shadow-[0_0_30px_rgba(229,193,88,0.4)]'
              }`}
            >
              {isSuccess ? (
                <div className="flex items-center gap-2 text-black font-extrabold">
                  <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center">
                    <Check size={16} className="text-black stroke-[3]" />
                  </div>
                  <span>
                    {lang === 'it' ? 'Richiesta Inviata con Successo!' : lang === 'de' ? 'Anfrage erfolgreich gesendet!' : 'Request Received Successfully!'}
                  </span>
                </div>
              ) : isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  <span>{lang === 'it' ? 'Invio in corso...' : lang === 'de' ? 'Wird gesendet...' : 'Submitting...'}</span>
                </div>
              ) : (
                <span>{t.submitBtn}</span>
              )}
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
      <section id="pricing" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">{t.pricingTitle}</h2>
          <p className="text-text-muted font-medium text-base sm:text-lg max-w-2xl mx-auto">{t.pricingSub}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Phase 1: Free Build */}
          <div className="bg-card p-8 sm:p-10 rounded-[2rem] border border-white/10 flex flex-col hover:border-white/20 transition-all hover:-translate-y-1 duration-300">
            <div className="text-xs font-extrabold text-white/50 uppercase tracking-wider mb-2">Fase 01</div>
            <h3 className="font-black text-2xl mb-2 text-white">{t.freeTierTitle}</h3>
            <div className="flex items-end gap-1.5 mb-6">
              <span className="text-5xl sm:text-6xl font-black text-primary">{t.freeTierPrice}</span>
              <span className="text-text-muted font-bold mb-2 text-xs uppercase">{t.freeTierUnit}</span>
            </div>
            <p className="text-xs text-text-muted mb-6 pb-6 border-b border-white/10 font-medium">
              {lang === 'it' ? 'Creiamo la prima versione su misura del tuo sito senza alcun pagamento anticipato.' : lang === 'de' ? 'Wir erstellen den ersten kompletten Entwurf ohne Vorauszahlung.' : 'We design and build the first full version of your website with zero risk.'}
            </p>
            <ul className="space-y-4 font-medium text-text-muted flex-grow text-sm">
              <li className="flex gap-3 items-start"><Check className="text-primary flex-shrink-0 mt-0.5 w-4 h-4" /> <div>{t.freeItem1}</div></li>
              <li className="flex gap-3 items-start"><Check className="text-primary flex-shrink-0 mt-0.5 w-4 h-4" /> <div>{t.freeItem2}</div></li>
              <li className="flex gap-3 items-start"><Check className="text-primary flex-shrink-0 mt-0.5 w-4 h-4" /> <div>{t.freeItem3}</div></li>
              <li className="flex gap-3 items-start"><Check className="text-primary flex-shrink-0 mt-0.5 w-4 h-4" /> <div>{t.freeItem4}</div></li>
            </ul>
            <div className="mt-8 pt-6 border-t border-white/10">
              <a
                href="#hero-form"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 transition-all text-center cursor-pointer"
              >
                {t.submitBtn}
              </a>
            </div>
          </div>

          {/* Phase 2: Monthly Subscription */}
          <div className="bg-card p-8 sm:p-10 rounded-[2rem] border-2 border-primary relative flex flex-col shadow-[0_0_35px_rgba(229,193,88,0.15)] hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(229,193,88,0.4)] whitespace-nowrap">
              {t.proBadge}
            </div>
            <div className="text-xs font-extrabold text-primary uppercase tracking-wider mb-2 mt-2">Fase 02</div>
            <h3 className="font-black text-2xl mb-2 text-white">{t.proTierTitle}</h3>
            <div className="flex items-end gap-1.5 mb-6">
              <span className="text-5xl sm:text-6xl font-black text-primary">{t.proTierPrice}</span>
              <span className="text-text-muted font-bold mb-2 text-xs uppercase">{t.proTierUnit}</span>
            </div>
            <p className="text-xs text-text-muted mb-6 pb-6 border-b border-white/10 font-medium">
              {lang === 'it' ? 'Gestione continua: hosting ultra-rapido, sicurezza SSL, modifiche illimitate e supporto.' : lang === 'de' ? 'Vollständige Betreuung: Hosting, Sicherheit, unbegrenzte Updates & Support.' : 'Hands-off peace of mind: premium hosting, continuous updates, and local SEO.'}
            </p>
            <ul className="space-y-4 font-medium text-text-muted flex-grow text-sm">
              <li className="flex gap-3 items-start"><Check className="text-primary flex-shrink-0 mt-0.5 w-4 h-4" /> <div>{t.proItem1}</div></li>
              <li className="flex gap-3 items-start"><Check className="text-primary flex-shrink-0 mt-0.5 w-4 h-4" /> <div>{t.proItem2}</div></li>
              <li className="flex gap-3 items-start"><Check className="text-primary flex-shrink-0 mt-0.5 w-4 h-4" /> <div>{t.proItem3}</div></li>
              <li className="flex gap-3 items-start"><Check className="text-primary flex-shrink-0 mt-0.5 w-4 h-4" /> <div>{t.proItem4}</div></li>
              <li className="flex gap-3 items-start"><Check className="text-primary flex-shrink-0 mt-0.5 w-4 h-4" /> <div>{t.proItem5}</div></li>
            </ul>

            {/* Direct Stripe Subscription Button */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => handleStripeCheckout('monthly')}
                disabled={checkingOut === 'monthly'}
                className="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-primary-hover text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(229,193,88,0.3)] hover:shadow-[0_0_35px_rgba(229,193,88,0.5)] transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              >
                {checkingOut === 'monthly' ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    <span>{lang === 'it' ? 'Apertura Stripe...' : lang === 'de' ? 'Wird geöffnet...' : 'Opening Stripe...'}</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={17} />
                    <span>{t.proBtn || (lang === 'it' ? 'Attiva Abbonamento Stripe' : lang === 'de' ? 'Mit Stripe abonnieren' : 'Subscribe with Stripe')}</span>
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-text-muted font-medium text-center">
                <ShieldCheck size={13} className="text-primary flex-shrink-0" />
                <span>{lang === 'it' ? 'Apple Pay, Carte, SEPA • Disdici quando vuoi' : lang === 'de' ? 'Apple Pay, Karten, SEPA • Jederzeit kündbar' : 'Apple Pay, Cards, SEPA • Cancel anytime'}</span>
              </div>
            </div>
          </div>

          {/* Phase 3: Lifetime Ownership (399€ Buyout + 2 Years Free Support) */}
          <div className="bg-gradient-to-b from-[#181622] to-card p-8 sm:p-10 rounded-[2rem] border-2 border-amber-500/60 relative flex flex-col shadow-[0_0_40px_rgba(245,158,11,0.15)] hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.5)] whitespace-nowrap">
              {t.lifetimeBadge}
            </div>
            <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2 mt-2">Fase 03</div>
            <h3 className="font-black text-2xl mb-2 text-white">{t.lifetimeTierTitle}</h3>
            <div className="flex items-end gap-1.5 mb-4">
              <span className="text-5xl sm:text-6xl font-black text-amber-400">{t.lifetimeTierPrice}</span>
              <span className="text-text-muted font-bold mb-2 text-xs uppercase">{t.lifetimeTierUnit}</span>
            </div>

            {/* Special Support Badge */}
            <div className="mb-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 text-center">
              <Sparkles size={14} className="text-amber-400 flex-shrink-0" />
              <span>{t.lifetimeSupportBadge}</span>
            </div>

            <ul className="space-y-4 font-medium text-text-muted flex-grow text-sm">
              <li className="flex gap-3 items-start"><Check className="text-amber-400 flex-shrink-0 mt-0.5 w-4 h-4" /> <div className="text-white/90">{t.lifetimeItem1}</div></li>
              <li className="flex gap-3 items-start"><Check className="text-amber-400 flex-shrink-0 mt-0.5 w-4 h-4" /> <div className="text-amber-300 font-bold">{t.lifetimeItem2}</div></li>
              <li className="flex gap-3 items-start"><Check className="text-amber-400 flex-shrink-0 mt-0.5 w-4 h-4" /> <div>{t.lifetimeItem3}</div></li>
              <li className="flex gap-3 items-start"><Check className="text-amber-400 flex-shrink-0 mt-0.5 w-4 h-4" /> <div>{t.lifetimeItem4}</div></li>
              <li className="flex gap-3 items-start"><Check className="text-amber-400 flex-shrink-0 mt-0.5 w-4 h-4" /> <div>{t.lifetimeItem5}</div></li>
            </ul>

            {/* Direct Stripe Lifetime Button */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => handleStripeCheckout('lifetime')}
                disabled={checkingOut === 'lifetime'}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              >
                {checkingOut === 'lifetime' ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    <span>{lang === 'it' ? 'Apertura Stripe...' : lang === 'de' ? 'Wird geöffnet...' : 'Opening Stripe...'}</span>
                  </>
                ) : (
                  <>
                    <Zap size={17} className="fill-black" />
                    <span>{t.lifetimeBtn || (lang === 'it' ? 'Acquista a Vita con Stripe' : lang === 'de' ? 'Lifetime mit Stripe sichern' : 'Get Lifetime Access')}</span>
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-amber-400/80 font-medium text-center">
                <ShieldCheck size={13} className="text-amber-400 flex-shrink-0" />
                <span>{lang === 'it' ? 'Pagamento unico • 2 Anni di Assistenza Inclusa' : lang === 'de' ? 'Einmalige Zahlung • 2 Jahre Support inklusive' : 'One-time payment • 2 Years Support Included'}</span>
              </div>
            </div>
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
            <div className="text-5xl font-black text-primary">
              <CountUp end={2150} prefix="€" />
            </div>
          </div>
          <div className="bg-primary/10 p-8 rounded-3xl border border-primary/50 relative shadow-[0_0_30px_rgba(229,193,88,0.2)]">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
              Zentixx Setup
            </div>
            <h4 className="text-primary font-bold uppercase tracking-wider text-sm mb-4 mt-2">What we charge to build</h4>
            <div className="text-6xl font-black text-primary">
              <CountUp end={0} prefix="€" />
            </div>
          </div>
          <div className="bg-black/50 p-8 rounded-3xl border border-white/10">
            <h4 className="text-white/60 font-bold uppercase tracking-wider text-sm mb-4">Turnaround Time</h4>
            <div className="text-5xl font-black text-primary">
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

      {/* Live Showcase & Portfolio (Mobile: 1 Card + Toggle, Desktop: 3 Columns) */}
      <Suspense fallback={<div className="py-24 text-center text-primary/40"><div className="w-8 h-8 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
        <ShowcaseCarousel lang={lang} whatsappUrl={whatsappUrl} monthlyPrice={monthlyPrice} />
      </Suspense>

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
           <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="bg-primary hover:bg-primary-hover text-black font-bold py-4 px-10 rounded-full transition-all shadow-[0_0_20px_rgba(229,193,88,0.2)] inline-flex items-center gap-2.5 text-base"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            {t.bookCall}
          </a>
        </div>
      </section>

      {/* Limit Banner */}
      <section className="py-24 px-4 bg-card text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-6 text-white">{t.limitTitle}</h2>
        <p className="text-text-muted font-medium max-w-2xl mx-auto mb-10 text-lg">
          {t.limitSub}
        </p>
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="bg-primary hover:bg-primary-hover text-black font-bold py-4 px-10 rounded-full transition-all shadow-[0_0_20px_rgba(229,193,88,0.2)] inline-flex items-center gap-2.5 text-base"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
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
             <img src="/founder.webp" alt="KH Shifat Manjum" width="128" height="128" loading="lazy" fetchpriority="low" decoding="async" className="w-full h-full object-cover object-top" />
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
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="bg-primary hover:bg-primary-hover text-black font-bold py-4 px-12 rounded-full text-lg transition-all mb-24 shadow-[0_0_20px_rgba(229,193,88,0.2)] hover:shadow-[0_0_30px_rgba(229,193,88,0.4)] inline-flex items-center gap-3"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          {t.bookCall}
        </a>
        
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto text-sm text-text-muted font-medium">
          <Logo size="md" />
          <div className="flex items-center gap-6 sm:gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <Link to="/login" className="hover:text-primary transition-colors flex items-center gap-1.5 text-white/60 hover:text-white">
              <Lock size={12} className="text-primary" />
              <span>CRM Login</span>
            </Link>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={whatsappUrl}
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
