import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ChevronDown, Loader2, Lock, Zap, ArrowDown, UtensilsCrossed, CheckCircle2 } from 'lucide-react';
import Logo from '../components/Logo';

const ShowcaseCarousel = lazy(() => import('../components/ShowcaseCarousel'));


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
const getTranslations = (price = '45', lifetimePrice = '399') => ({
  en: {
    heroBadge: "SPECIFICALLY FOR RESTAURANTS",
    heroTitleLead: "Your Restaurant Deserves a",
    heroTitleHighlight: "Professional Website",
    heroSubtitle: "We build modern, mobile-friendly websites specifically for restaurants — with €0 setup.",
    setupZero: "€0 SETUP",
    setupSub: "100% free initial build",
    priceMonthly: `€${price}/MONTH`,
    priceSub: "Hosting, updates & maintenance",
    noUpfront: "No large upfront website-development cost.",
    primaryCta: "GET MY FREE WEBSITE",
    trustItem1: "24-48h Delivery",
    trustItem2: "Mobile-First Design",
    trustItem3: "Digital Menu & QR",
    trustItem4: "WhatsApp Direct Bookings",
    
    // Offer Section
    offerBadge: "TRANSPARENT RESTAURANT OFFER",
    offerTitle: "Restaurant Website",
    offerSubtitle: "Get your restaurant online without a large upfront website-development cost.",
    offerFeatures: [
      "Professional restaurant website",
      "Mobile responsive design",
      "Digital menu & QR code",
      "High-resolution photo gallery",
      "Google Maps & local discovery setup",
      "Contact & table reservation features",
      "WhatsApp direct booking button",
      "Ultra-fast dedicated hosting",
      "SSL security certificate",
      "Continuous technical maintenance",
      "Unlimited menu & text updates",
      "Multilingual support (IT/EN/DE)"
    ],
    offerFootnote: "No hidden fees. Cancel anytime. You own your domain name.",

    // Form Section
    formBadge: "CLAIM YOUR WEBSITE",
    formTitle: "Let's Build Your Restaurant Website",
    formSubtitle: "Tell us a little about your restaurant and we'll contact you about your website.",
    restNameLabel: "Restaurant Name",
    restNamePlace: "e.g. Mario's Pizzeria",
    yourNameLabel: "Your Name",
    yourNamePlace: "John Doe",
    emailLabel: "Email Address",
    emailPlace: "john@example.com",
    phoneLabel: "Phone / WhatsApp Number",
    phonePlace: "+39 333 123 4567",
    cityLabel: "City / Location",
    cityPlace: "e.g. Rome, Milan, Berlin",
    hasWebsiteLabel: "Do you currently have a website?",
    hasWebsiteNo: "No, I need a new website",
    hasWebsiteYes: "Yes, but it needs a modern redesign",
    submitBtn: "GET MY FREE WEBSITE",
    submittingBtn: "Submitting your request...",
    submittedSuccess: "Request Received Successfully! Opening confirmation...",
    noCreditCard: "100% free build. No credit card required. No upfront cost.",
    terms: "* We will contact you via WhatsApp or Email to gather your menu and logo to create your draft.",

    lifetimeOptionTitle: "Or Prefer Full Lifetime Ownership?",
    lifetimeOptionSub: `If you prefer not to have a monthly subscription, own your website outright for €${lifetimePrice} one-time with 2 years of free technical support.`,
    lifetimeBtn: "Own It For Lifetime (€399)",
    
    howItWorks: "How It Works in 3 Simple Steps",
    hw1Title: "1. Tell Us About Your Restaurant",
    hw1Sub: "Fill out the quick form with your restaurant name and contact info.",
    hw2Title: "2. We Build Your Website Draft",
    hw2Sub: "Our team crafts a custom, mobile-friendly restaurant website in 24-48 hours.",
    hw3Title: "3. You Review & Decide",
    hw3Sub: `Love it? Keep it live for just €${price}/month. Don't love it? You pay absolutely €0.`,

    aboutTitle: "Who Is Behind Zentixx IT?",
    aboutName: "KH Shifat Manjum",
    aboutRole: "Founder & Lead Developer — Zentixx IT",
    aboutDesc: "I created Zentixx IT specifically to solve a huge problem for restaurant owners: agencies charge €2,000+ upfront for slow, outdated websites. We deliver luxury, high-converting digital menus and reservation sites with €0 setup, so you can fill your tables every single night.",

    faqTitle: "Frequently Asked Questions",
    footerTitle: "Ready to Fill Your Restaurant Tables?",
    footerRights: "© 2025 Zentixx IT. All rights reserved.",
    crmLogin: "CRM Login"
  },
  it: {
    heroBadge: "SPECIFICO PER LA RISTORAZIONE",
    heroTitleLead: "Il Tuo Ristorante Merita un",
    heroTitleHighlight: "Sito Web Professionale",
    heroSubtitle: "Creiamo siti web moderni e ottimizzati per smartphone specificamente per ristoranti — con 0€ di anticipo.",
    setupZero: "0€ SETUP",
    setupSub: "Bozza su misura 100% gratuita",
    priceMonthly: `${price}€/MESE`,
    priceSub: "Hosting, modifiche & manutenzione",
    noUpfront: "Nessun costo elevato di sviluppo iniziale.",
    primaryCta: "OTTIENI IL TUO SITO GRATIS",
    trustItem1: "Bozza Pronta in 24-48h",
    trustItem2: "Design Ottimizzato Smartphone",
    trustItem3: "Menu Digitale & QR Code",
    trustItem4: "Prenotazioni Dirette WhatsApp",
    
    // Offer Section
    offerBadge: "OFFERTA TRASPARENTE PER RISTORANTI",
    offerTitle: "Sito Web per Ristoranti",
    offerSubtitle: "Porta il tuo ristorante online senza costi elevati di sviluppo iniziale.",
    offerFeatures: [
      "Sito web professionale per ristoranti",
      "Design 100% responsive per smartphone",
      "Menu digitale interattivo con QR code",
      "Galleria fotografica piatti in alta definizione",
      "Integrazione Google Maps e posizione locale",
      "Funzionalità contatto e richiesta prenotazione",
      "Pulsante prenotazione diretta WhatsApp",
      "Hosting dedicato ultra-veloce",
      "Certificato di sicurezza SSL incluso",
      "Manutenzione tecnica continua e sicurezza",
      "Aggiornamenti illimitati di testi e menu",
      "Supporto multilingua (Italiano, Inglese, Tedesco)"
    ],
    offerFootnote: "Nessun costo nascosto. Disdici quando vuoi. Il dominio resta di tua proprietà.",

    // Form Section
    formBadge: "RICHIEDI IL TUO SITO",
    formTitle: "Creiamo il Sito Web del Tuo Ristorante",
    formSubtitle: "Raccontaci del tuo locale e ti contatteremo con la bozza su misura per il tuo sito.",
    restNameLabel: "Nome del Ristorante",
    restNamePlace: "es. Trattoria da Mario",
    yourNameLabel: "Il Tuo Nome / Titolare",
    yourNamePlace: "Mario Rossi",
    emailLabel: "Indirizzo Email",
    emailPlace: "mario@example.com",
    phoneLabel: "Numero di Telefono / WhatsApp",
    phonePlace: "+39 333 123 4567",
    cityLabel: "Città / Località",
    cityPlace: "es. Roma, Milano, Napoli",
    hasWebsiteLabel: "Hai già un sito web?",
    hasWebsiteNo: "No, ho bisogno di un nuovo sito",
    hasWebsiteYes: "Sì, ma è vecchio e serve un redesign",
    submitBtn: "OTTIENI IL TUO SITO GRATIS",
    submittingBtn: "Invio richiesta in corso...",
    submittedSuccess: "Richiesta Ricevuta con Successo! Apertura conferma...",
    noCreditCard: "100% gratis per iniziare. Nessuna carta di credito. 0€ anticipo.",
    terms: "* Ti contatteremo su WhatsApp o Email per ricevere il menu e logo e iniziare la bozza.",

    lifetimeOptionTitle: "Preferisci Acquistare il Sito a Vita?",
    lifetimeOptionSub: `Se non desideri l'abbonamento mensile, puoi acquistare il sito per sempre a ${lifetimePrice}€ una tantum con 2 anni di assistenza tecnica gratuita inclusa.`,
    lifetimeBtn: "Acquisto a Vita (399€)",

    howItWorks: "Come Funziona in 3 Semplici Passaggi",
    hw1Title: "1. Invia i Dettagli del Locale",
    hw1Sub: "Compila il modulo rapido con il nome del ristorante e i tuoi recapiti.",
    hw2Title: "2. Creiamo la Tua Bozza su Misura",
    hw2Sub: "Il nostro team realizza una prima versione completa in sole 24-48 ore.",
    hw3Title: "3. Guarda e Decidi Senza Rischi",
    hw3Sub: `Ti piace? Lo teniamo attivo a soli ${price}€/mese. Non ti convince? Amici come prima, 0€ spesi.`,

    aboutTitle: "Chi c'è Dietro Zentixx IT?",
    aboutName: "KH Shifat Manjum",
    aboutRole: "Fondatore & Lead Developer — Zentixx IT",
    aboutDesc: "Ho fondato Zentixx IT per risolvere un problema concreto dei ristoratori: le agenzie tradizionali chiedono oltre 2.000€ di anticipo per siti lenti e difficili da aggiornare. Noi offriamo siti moderni, menu digitali e prenotazioni dirette a 0€ di anticipo, per aiutarti a riempire i tavoli ogni sera.",

    faqTitle: "Domande Frequenti",
    footerTitle: "Pronto a Riempire i Tavoli del Tuo Locale?",
    footerRights: "© 2025 Zentixx IT. Tutti i diritti riservati.",
    crmLogin: "Accesso CRM"
  },
  de: {
    heroBadge: "SPEZIELL FÜR RESTAURANTS",
    heroTitleLead: "Ihr Restaurant verdient eine",
    heroTitleHighlight: "professionelle Website",
    heroSubtitle: "Wir erstellen moderne, mobil-optimierte Websites speziell für Restaurants — mit 0€ Setup.",
    setupZero: "0€ SETUP",
    setupSub: "100% kostenloser Entwurf",
    priceMonthly: `${price}€/MONAT`,
    priceSub: "Hosting, Updates & Wartung",
    noUpfront: "Keine hohen Vorabkosten für die Website-Entwicklung.",
    primaryCta: "KOSTENLOSE WEBSITE SICHERN",
    trustItem1: "Entwurf in 24-48h",
    trustItem2: "Mobile-First Design",
    trustItem3: "Digitale Speisekarte & QR",
    trustItem4: "Direkte WhatsApp-Reservierungen",

    // Offer Section
    offerBadge: "TRANSPARENTES RESTAURANT-ANGEBOT",
    offerTitle: "Restaurant-Website",
    offerSubtitle: "Bringen Sie Ihr Restaurant online ohne hohe Vorabkosten für die Website-Entwicklung.",
    offerFeatures: [
      "Professionelle Restaurant-Website",
      "100% mobil-optimiertes responsives Design",
      "Digitale Speisekarte & QR-Code",
      "Fotogalerie in hoher Auflösung",
      "Google Maps Integration für lokale Sichtbarkeit",
      "Kontakt- & Tischreservierungsfunktionen",
      "Direkter WhatsApp-Buchungsbutton",
      "Blitzschnelles dediziertes Hosting",
      "SSL-Sicherheitszertifikat inklusive",
      "Kontinuierliche technische Wartung",
      "Unbegrenzte Menü- & Text-Updates",
      "Mehrsprachige Unterstützung (IT/EN/DE)"
    ],
    offerFootnote: "Keine versteckten Gebühren. Jederzeit kündbar. Sie besitzen Ihre Domain.",

    // Form Section
    formBadge: "WEBSITE ANFORDERN",
    formTitle: "Erstellen wir Ihre Restaurant-Website",
    formSubtitle: "Erzählen Sie uns von Ihrem Restaurant und wir melden uns mit Ihrem individuellen Website-Entwurf.",
    restNameLabel: "Name des Restaurants",
    restNamePlace: "z.B. Pizzeria Napoli",
    yourNameLabel: "Ihr Name / Inhaber",
    yourNamePlace: "Max Mustermann",
    emailLabel: "E-Mail-Adresse",
    emailPlace: "max@example.com",
    phoneLabel: "Telefon / WhatsApp-Nummer",
    phonePlace: "+49 170 123 4567",
    cityLabel: "Stadt / Standort",
    cityPlace: "z.B. Berlin, München, Wien",
    hasWebsiteLabel: "Haben Sie bereits eine Website?",
    hasWebsiteNo: "Nein, ich brauche eine neue Website",
    hasWebsiteYes: "Ja, aber sie benötigt ein modernes Redesign",
    submitBtn: "KOSTENLOSE WEBSITE SICHERN",
    submittingBtn: "Anfrage wird gesendet...",
    submittedSuccess: "Anfrage erfolgreich empfangen! Weiterleitung...",
    noCreditCard: "100% kostenloser Start. Keine Kreditkarte erforderlich. 0€ Setup.",
    terms: "* Wir kontaktieren Sie per WhatsApp oder E-Mail, um Speisekarte und Logo für den Entwurf zu erhalten.",

    lifetimeOptionTitle: "Lieber einmalig kaufen statt Monatsabo?",
    lifetimeOptionSub: `Wenn Sie kein Monatsabo wünschen, können Sie die Website für einmalig ${lifetimePrice}€ für immer kaufen – inklusive 2 Jahre technischem Support.`,
    lifetimeBtn: "Auf Lebenszeit sichern (399€)",

    howItWorks: "So funktioniert es in 3 einfachen Schritten",
    hw1Title: "1. Restaurant-Details angeben",
    hw1Sub: "Füllen Sie das kurze Formular mit Namen und Kontaktdaten aus.",
    hw2Title: "2. Wir erstellen Ihren Entwurf",
    hw2Sub: "Unser Team baut innerhalb von 24-48 Stunden Ihre maßgeschneiderte Website.",
    hw3Title: "3. Sie prüfen und entscheiden",
    hw3Sub: `Gefällt sie Ihnen? Behalten Sie sie für nur ${price}€/Monat. Wenn nicht, zahlen Sie absolut 0€.`,

    aboutTitle: "Wer steht hinter Zentixx IT?",
    aboutName: "KH Shifat Manjum",
    aboutRole: "Gründer & Lead Developer — Zentixx IT",
    aboutDesc: "Ich habe Zentixx IT gegründet, um Gastronomen von überteuerten Agenturen zu befreien: Statt 2.000€+ Vorauszahlung bieten wir moderne Restaurant-Websites mit 0€ Setup, damit Sie jeden Abend Ihre Tische füllen.",

    faqTitle: "Häufig gestellte Fragen",
    footerTitle: "Bereit, die Tische Ihres Restaurants zu füllen?",
    footerRights: "© 2025 Zentixx IT. Alle Rechte vorbehalten.",
    crmLogin: "CRM Login"
  }
});

function Home() {
  const [lang, setLang] = useState(() => localStorage.getItem('pixeloro_lang') || 'it');
  const [monthlyPrice, setMonthlyPrice] = useState(() => localStorage.getItem('pixeloro_monthly_price') || '45');
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
    phone: '',
    city: '',
    hasWebsite: 'no'
  });

  // Track page visit on mount
  useEffect(() => {
    if (!sessionStorage.getItem('hasVisited')) {
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/stats/visit`, { method: 'POST' })
        .then(() => sessionStorage.setItem('hasVisited', 'true'))
        .catch(err => console.error("Error tracking visit:", err));
    }
  }, []);

  const whatsappUrl = `https://wa.me/393481134181?text=${encodeURIComponent(
    lang === 'it' 
      ? `Ciao! Vorrei maggiori informazioni sul sito web per il mio ristorante con 0€ di setup e ${monthlyPrice}€/mese.` 
      : lang === 'de'
      ? `Hallo! Ich interessiere mich für eine Website für mein Restaurant mit 0€ Setup und ${monthlyPrice}€/Monat.`
      : `Hi! I would like more information about a website for my restaurant with €0 setup and €${monthlyPrice}/month.`
  )}`;

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [checkingOut, setCheckingOut] = useState(null);

  const handleLanguageChange = (l) => {
    setLang(l);
    localStorage.setItem('pixeloro_lang', l);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToLeadForm = () => {
    const el = document.getElementById('lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
      const payload = {
        restaurantName: formData.city ? `${formData.restaurantName} (${formData.city})` : formData.restaurantName,
        name: formData.name,
        email: formData.email,
        phone: formData.hasWebsite === 'yes' ? `${formData.phone} [Has site: yes]` : formData.phone,
      };
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormData({ restaurantName: '', name: '', email: '', phone: '', city: '', hasWebsite: 'no' });
        setTimeout(() => {
          navigate('/thank-you');
        }, 800);
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
      q: lang === 'it' ? "È davvero 0€ di anticipo?" : lang === 'de' ? "Ist es wirklich 0€ Setup?" : "Is it really €0 setup?", 
      a: lang === 'it' 
        ? `Sì, assolutamente. Progettiamo e creiamo la prima bozza completa del tuo sito web senza alcun pagamento anticipato. Paghi solo ${monthlyPrice}€ al mese se decidi di attivarlo con il nostro hosting ultra-veloce e supporto continuo.`
        : lang === 'de'
        ? `Ja, absolut. Wir gestalten und erstellen Ihren ersten Website-Entwurf ohne Vorauszahlung. Sie zahlen nur die ${monthlyPrice}€/Monat, wenn Sie die Website online schalten möchten.`
        : `Yes, 100%. We design and build the first custom draft of your website with zero upfront development cost. You only pay €${monthlyPrice}/month if you love it and want to launch.` 
    },
    { 
      q: lang === 'it' ? "Cosa include l'abbonamento da " + monthlyPrice + "€/mese?" : lang === 'de' ? `Was beinhaltet das ${monthlyPrice}€/Monat Abo?` : `What is included in the €${monthlyPrice}/month subscription?`, 
      a: lang === 'it'
        ? "Include hosting dedicato ultra-rapido, certificato di sicurezza SSL, aggiornamenti continui a menu, prezzi e foto, supporto tecnico e ottimizzazione per Google."
        : lang === 'de'
        ? "Es beinhaltet blitzschnelles Hosting, SSL-Zertifikat, kontinuierliche Wartung, unbegrenzte Updates von Speisekarte und Texten sowie technischen Support."
        : "It includes lightning-fast hosting, SSL security certificate, continuous maintenance, unlimited updates to your menu, prices, and photos, and dedicated technical support." 
    },
    { 
      q: lang === 'it' ? "Quanto tempo ci vuole per vedere la bozza?" : lang === 'de' ? "Wie lange dauert es bis zum Entwurf?" : "How long does it take to see the draft?", 
      a: lang === 'it'
        ? "La nostra consegna è rapidissima: riceverai la bozza del tuo nuovo sito ristorante su misura in sole 24-48 ore."
        : lang === 'de'
        ? "Sehr schnell: Sie erhalten Ihren maßgeschneiderten Restaurant-Website-Entwurf innerhalb von 24-48 Stunden."
        : "Very fast: you will receive your custom restaurant website draft in just 24-48 hours after submitting your information." 
    },
    { 
      q: lang === 'it' ? "Ci sono contratti a lungo termine o vincoli?" : lang === 'de' ? "Gibt es lange Vertragslaufzeiten?" : "Are there long-term contracts?", 
      a: lang === 'it'
        ? "Nessun vincolo. Puoi disdire l'abbonamento in qualsiasi momento senza penali. Il nome del dominio rimane di tua proprietà."
        : lang === 'de'
        ? "Keine Bindung. Sie können das monatliche Abonnement jederzeit kündigen. Ihre Domain bleibt Ihr Eigentum."
        : "No lock-in contracts. You can cancel your monthly subscription at any time with no penalty. You own your domain name." 
    },
    { 
      q: lang === 'it' ? "Posso acquistare il sito per sempre a vita?" : lang === 'de' ? "Kann ich die Website auf Lebenszeit kaufen?" : "Can I buy the website outright?", 
      a: lang === 'it'
        ? `Certamente. Offriamo anche l'acquisto a vita a ${lifetimePrice}€ una tantum, con 2 anni di assistenza tecnica gratuita inclusa.`
        : lang === 'de'
        ? `Ja! Wir bieten auch den einmaligen Kauf auf Lebenszeit für ${lifetimePrice}€ an – inklusive 2 Jahre technischem Support.`
        : `Yes! We also offer complete lifetime ownership for €${lifetimePrice} one-time, including 2 full years of dedicated technical support.` 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-bg text-text font-sans selection:bg-primary selection:text-black pb-16 sm:pb-0">
      {/* Sticky Header / Navbar */}
      <header className="sticky top-0 z-40 bg-gray-bg/95 backdrop-blur-md flex justify-between items-center py-4 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto border-b border-white/10">
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

          {/* Primary CTA in Navbar */}
          <button 
            onClick={scrollToLeadForm}
            className="bg-primary hover:bg-primary-hover text-black font-extrabold py-2.5 px-4 sm:px-6 rounded-full transition-all text-xs sm:text-sm shadow-[0_0_15px_rgba(229,193,88,0.3)] hidden sm:inline-flex items-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            {t.primaryCta}
          </button>
        </div>
      </header>

      {/* Hero Section: Tailored for Restaurant Owners */}
      <section className="text-center pt-16 sm:pt-24 pb-16 px-4 max-w-5xl mx-auto">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest mb-6">
          <UtensilsCrossed size={14} />
          <span>{t.heroBadge}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight tracking-tight text-white">
          {t.heroTitleLead} <br className="hidden sm:inline" />
          <span className="text-primary italic">{t.heroTitleHighlight}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-text-muted mb-8 max-w-2xl mx-auto text-base sm:text-xl font-medium leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* Pricing Highlight Boxes: €0 Setup + €45/Month */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-6">
          {/* €0 Setup */}
          <div className="bg-card/90 border-2 border-primary/70 rounded-2xl p-5 sm:p-6 text-center shadow-[0_0_30px_rgba(229,193,88,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-black text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-lg tracking-wider">
              {lang === 'it' ? 'Zero Rischi' : lang === 'de' ? 'Null Risiko' : 'Zero Risk'}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-primary mb-1">
              {t.setupZero}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white/90">
              {t.setupSub}
            </div>
          </div>

          {/* €45/Month */}
          <div className="bg-card/90 border border-white/15 rounded-2xl p-5 sm:p-6 text-center shadow-lg relative overflow-hidden">
            <div className="text-3xl sm:text-4xl font-black text-white mb-1">
              {t.priceMonthly}
            </div>
            <div className="text-xs sm:text-sm font-medium text-text-muted">
              {t.priceSub}
            </div>
          </div>
        </div>

        {/* Reassurance text */}
        <p className="text-sm sm:text-base font-bold text-primary mb-8 tracking-wide">
          {t.noUpfront}
        </p>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <button 
            onClick={scrollToLeadForm}
            className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-black font-black text-base sm:text-lg py-4 px-8 sm:px-10 rounded-full transition-all shadow-[0_0_30px_rgba(229,193,88,0.4)] hover:shadow-[0_0_45px_rgba(229,193,88,0.6)] hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-3"
          >
            <span>{t.primaryCta}</span>
            <ArrowDown size={20} className="stroke-[3]" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs sm:text-sm text-text-muted font-medium">
          <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-3 rounded-xl border border-white/5">
            <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
            <span>{t.trustItem1}</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-3 rounded-xl border border-white/5">
            <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
            <span>{t.trustItem2}</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-3 rounded-xl border border-white/5">
            <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
            <span>{t.trustItem3}</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-3 rounded-xl border border-white/5">
            <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
            <span>{t.trustItem4}</span>
          </div>
        </div>
      </section>

      {/* Demos Immediately Below Hero */}
      <Suspense fallback={<div className="py-24 text-center text-primary/40"><div className="w-8 h-8 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
        <ShowcaseCarousel lang={lang} monthlyPrice={monthlyPrice} onGetStarted={scrollToLeadForm} />
      </Suspense>

      {/* Transparent Restaurant Offer (€0 Setup / €45 Monthly) */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="bg-gradient-to-b from-card to-black p-8 sm:p-12 rounded-[2.5rem] border-2 border-primary/40 shadow-[0_0_50px_rgba(229,193,88,0.12)]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black tracking-widest text-primary uppercase mb-3 block">{t.offerBadge}</span>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 text-white">{t.offerTitle}</h2>
            <p className="text-text-muted text-base sm:text-lg font-medium">{t.offerSubtitle}</p>
            
            {/* Pricing highlights */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6">
              <div className="bg-primary text-black font-black text-xl sm:text-2xl py-2 px-4 sm:px-5 rounded-xl shadow-[0_0_20px_rgba(229,193,88,0.3)]">
                {t.setupZero}
              </div>
              <div className="text-2xl font-black text-white">
                +
              </div>
              <div className="bg-white/10 text-white font-black text-xl sm:text-2xl py-2 px-4 sm:px-5 rounded-xl border border-white/10">
                {t.priceMonthly}
              </div>
            </div>
          </div>

          {/* 12 Features List */}
          <div className="grid sm:grid-cols-2 gap-3.5 max-w-3xl mx-auto mb-10">
            {t.offerFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/5">
                <Check className="text-primary flex-shrink-0 mt-0.5 w-5 h-5 stroke-[2.5]" />
                <span className="text-white/90 text-sm font-medium">{feat}</span>
              </div>
            ))}
          </div>

          {/* CTA & Footnote */}
          <div className="text-center space-y-4">
            <button 
              onClick={scrollToLeadForm}
              className="bg-primary hover:bg-primary-hover text-black font-black text-base sm:text-lg py-4 px-10 rounded-full transition-all shadow-[0_0_30px_rgba(229,193,88,0.35)] hover:shadow-[0_0_40px_rgba(229,193,88,0.5)] hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider inline-flex items-center gap-3"
            >
              <span>{t.primaryCta}</span>
              <ArrowDown size={18} className="stroke-[3]" />
            </button>
            <p className="text-xs text-text-muted font-medium block">
              {t.offerFootnote}
            </p>
          </div>

          {/* Lifetime Buyout Option */}
          <div className="mt-10 pt-8 border-t border-white/10 text-center max-w-xl mx-auto">
            <h4 className="text-sm font-bold text-amber-400 mb-1">{t.lifetimeOptionTitle}</h4>
            <p className="text-xs text-text-muted mb-4">{t.lifetimeOptionSub}</p>
            <button
              onClick={() => handleStripeCheckout('lifetime')}
              disabled={checkingOut === 'lifetime'}
              className="text-xs font-bold py-2.5 px-5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Zap size={14} className="fill-amber-400" />
              <span>{t.lifetimeBtn}</span>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works in 3 Steps */}
      <section className="py-20 px-4 border-y border-white/5 bg-card/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-14 text-white">{t.howItWorks}</h2>
          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-center relative">
              <div className="w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center font-black text-xl mx-auto mb-4 shadow-[0_0_15px_rgba(229,193,88,0.3)]">1</div>
              <h3 className="font-black text-lg mb-2 text-white">{t.hw1Title}</h3>
              <p className="text-text-muted font-medium text-sm leading-relaxed">{t.hw1Sub}</p>
            </div>
            <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-center relative">
              <div className="w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center font-black text-xl mx-auto mb-4 shadow-[0_0_15px_rgba(229,193,88,0.3)]">2</div>
              <h3 className="font-black text-lg mb-2 text-white">{t.hw2Title}</h3>
              <p className="text-text-muted font-medium text-sm leading-relaxed">{t.hw2Sub}</p>
            </div>
            <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-center relative">
              <div className="w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center font-black text-xl mx-auto mb-4 shadow-[0_0_15px_rgba(229,193,88,0.3)]">3</div>
              <h3 className="font-black text-lg mb-2 text-white">{t.hw3Title}</h3>
              <p className="text-text-muted font-medium text-sm leading-relaxed">{t.hw3Sub}</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={scrollToLeadForm}
              className="bg-primary hover:bg-primary-hover text-black font-extrabold py-3.5 px-8 rounded-full transition-all text-sm shadow-[0_0_20px_rgba(229,193,88,0.25)] uppercase tracking-wider cursor-pointer inline-flex items-center gap-2"
            >
              <span>{t.primaryCta}</span>
              <ArrowDown size={16} className="stroke-[3]" />
            </button>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="lead-form" className="py-24 px-4 bg-gradient-to-b from-black to-card scroll-mt-12">
        <div className="max-w-xl mx-auto bg-card p-6 sm:p-10 rounded-3xl shadow-2xl border-2 border-primary/40 relative">
          <div className="text-center mb-8">
            <span className="text-xs font-black tracking-widest text-primary uppercase mb-2 block">{t.formBadge}</span>
            <h2 className="text-2xl sm:text-4xl font-black mb-3 text-white">{t.formTitle}</h2>
            <p className="text-text-muted text-sm sm:text-base font-medium">{t.formSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-text-muted">{t.restNameLabel} *</label>
              <input 
                type="text" 
                name="restaurantName" 
                value={formData.restaurantName} 
                onChange={handleChange} 
                className="w-full border border-white/10 rounded-xl p-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-white/30 text-sm" 
                placeholder={t.restNamePlace} 
                required 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-text-muted">{t.yourNameLabel} *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full border border-white/10 rounded-xl p-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-white/30 text-sm" 
                  placeholder={t.yourNamePlace} 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-text-muted">{t.cityLabel}</label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  className="w-full border border-white/10 rounded-xl p-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-white/30 text-sm" 
                  placeholder={t.cityPlace} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-text-muted">{t.emailLabel} *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full border border-white/10 rounded-xl p-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-white/30 text-sm" 
                  placeholder={t.emailPlace} 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-text-muted">{t.phoneLabel} *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="w-full border border-white/10 rounded-xl p-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-white/30 text-sm" 
                  placeholder={t.phonePlace} 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1.5 text-text-muted">{t.hasWebsiteLabel}</label>
              <select 
                name="hasWebsite" 
                value={formData.hasWebsite} 
                onChange={handleChange}
                className="w-full border border-white/10 rounded-xl p-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm cursor-pointer"
              >
                <option value="no">{t.hasWebsiteNo}</option>
                <option value="yes">{t.hasWebsiteYes}</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || isSuccess}
              className={`w-full font-black py-4 rounded-xl mt-4 transition-all shadow-[0_0_25px_rgba(229,193,88,0.25)] flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-sm sm:text-base ${
                isSuccess
                  ? 'bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                  : 'bg-primary hover:bg-primary-hover text-black hover:shadow-[0_0_35px_rgba(229,193,88,0.4)] active:scale-98'
              }`}
            >
              {isSuccess ? (
                <div className="flex items-center gap-2 text-black font-extrabold">
                  <Check size={18} className="stroke-[3]" />
                  <span>{t.submittedSuccess}</span>
                </div>
              ) : isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  <span>{t.submittingBtn}</span>
                </div>
              ) : (
                <span>{t.submitBtn}</span>
              )}
            </button>
          </form>

          <div className="mt-4 text-center space-y-2">
            <p className="text-xs font-semibold text-primary">{t.noCreditCard}</p>
            <p className="text-[11px] text-white/40 leading-relaxed">{t.terms}</p>
          </div>
        </div>
      </section>

      {/* Founder / About Section */}
      <section className="py-20 px-4 bg-black border-t border-white/5">
        <div className="text-center mb-10">
          <div className="w-12 h-1 bg-primary mx-auto mb-4"></div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#F2F2F2]">{t.aboutTitle}</h2>
        </div>
        
        <div className="max-w-xl mx-auto bg-[#1A1A1A] rounded-3xl p-8 sm:p-10 border border-primary/30 text-center shadow-[0_0_30px_rgba(229,193,88,0.15)]">
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-5 flex-shrink-0 border-2 border-primary/80 shadow-[0_0_20px_rgba(229,193,88,0.3)]">
             <img src="/founder.webp" alt="KH Shifat Manjum" width="112" height="112" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#E5E5E5] tracking-wide mb-1">{t.aboutName}</h3>
          <p className="text-primary font-medium text-xs sm:text-sm mb-4">{t.aboutRole}</p>
          <p className="text-[#999999] leading-relaxed font-medium text-sm">
            {t.aboutDesc}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-bg border-t border-white/5">
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 text-white">{t.faqTitle}</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQAccordion key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 text-center px-4 border-t border-white/10">
        <h2 className="text-3xl sm:text-4xl font-black mb-8 max-w-2xl mx-auto leading-tight text-white">
          {t.footerTitle}
        </h2>
        <button 
          onClick={scrollToLeadForm}
          className="bg-primary hover:bg-primary-hover text-black font-black py-4 px-10 rounded-full text-base transition-all mb-16 shadow-[0_0_25px_rgba(229,193,88,0.25)] hover:shadow-[0_0_35px_rgba(229,193,88,0.45)] inline-flex items-center gap-2 uppercase tracking-wider cursor-pointer"
        >
          <span>{t.primaryCta}</span>
          <ArrowDown size={18} className="stroke-[3]" />
        </button>
        
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto text-xs text-text-muted font-medium gap-4">
          <Logo size="md" />
          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-primary transition-colors flex items-center gap-1.5 text-white/60 hover:text-white">
              <Lock size={12} className="text-primary" />
              <span>{t.crmLogin}</span>
            </Link>
          </div>
          <div>
            {t.footerRights}
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-primary/30 p-3 px-4 flex items-center justify-between gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <div>
          <div className="text-xs font-black text-primary uppercase leading-tight">{t.setupZero}</div>
          <div className="text-[10px] font-bold text-white/80">{t.priceMonthly}</div>
        </div>
        <button
          onClick={scrollToLeadForm}
          className="bg-primary hover:bg-primary-hover text-black font-black text-xs py-2.5 px-4 rounded-full shadow-[0_0_15px_rgba(229,193,88,0.4)] active:scale-95 transition-all uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          <span>{t.primaryCta}</span>
          <ArrowDown size={14} className="stroke-[3]" />
        </button>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href={whatsappUrl}
        target="_blank" 
        rel="noreferrer" 
        className="fixed bottom-20 sm:bottom-6 right-5 sm:right-6 z-40 bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center group cursor-pointer"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:scale-110 transition-transform"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>
    </div>
  );
}

export default Home;
