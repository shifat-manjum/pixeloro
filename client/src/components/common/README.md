# Zentixx IT Reusable Component Library

Ready-to-use, dark luxury components built with React and Tailwind CSS for any new website (Restaurants, E-Commerce, Portfolios, Hotels, Landing Pages, etc.).

## Components Included

| Component | Description |
|---|---|
| `Navbar` | Responsive desktop + mobile drawer navbar with logo, links, language switcher & CTA |
| `HeroSection` | Luxury hero with gold badge, gradient typography, CTAs, trust pills & ambient glow |
| `ServiceCard` | Feature/service cards with icons, price badges, checkmarks & 5 theme colors |
| `PricingCard` | Pricing tiers with checkmarks, popular badge, monthly/lifetime options & CTA buttons |
| `FAQAccordion` | Smooth accordion FAQ items (individual or list) |
| `StatsBar` | Animated count-up stats on scroll into view |
| `WhatsAppFloat` | Floating WhatsApp contact button with prefilled message & tooltip |
| `LanguageSwitcher` | Multilingual pill switcher (IT / EN / DE or custom languages) |
| `PixelAnalytics` | Plug-and-play Meta (Facebook) Pixel & Google Analytics 4 (GA4) tracker |
| `Footer` | Modern footer with logo, description, link columns & copyright |

## Quick Import Example

```jsx
import {
  Navbar,
  HeroSection,
  ServiceCard,
  PricingCard,
  FAQAccordion,
  StatsBar,
  WhatsAppFloat,
  LanguageSwitcher,
  PixelAnalytics,
  Footer
} from "../components/common";
```

## Example: Building a Quick Landing Page

```jsx
import React, { useState } from "react";
import {
  Navbar,
  HeroSection,
  ServiceCard,
  PricingCard,
  FAQAccordion,
  StatsBar,
  WhatsAppFloat,
  Footer
} from "../components/common";
import { ShoppingCart } from "lucide-react";

export default function NewSite() {
  const [lang, setLang] = useState("it");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar
        currentLang={lang}
        onLanguageChange={setLang}
        links={[
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ]}
      />

      <HeroSection
        badge="New Launch"
        titleLead="Scale Your Brand"
        titleHighlight="Effortlessly."
        subtitle="Custom built websites designed to convert visitors into paying clients."
        primaryCta={{ text: "Get Started", href: "#pricing" }}
      />

      <StatsBar
        stats={[
          { value: 50, suffix: "+", label: "Websites Launched" },
          { value: 99, suffix: "%", label: "Satisfaction Rate" },
        ]}
      />

      <div id="features" className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-6">
        <ServiceCard
          icon={ShoppingCart}
          theme="emerald"
          badge="Popular"
          title="E-Commerce Store"
          description="High converting shop with Stripe and mobile app companion."
          price="From €699"
          linkTo="/contact"
        />
      </div>

      <WhatsAppFloat phoneNumber="393481134181" />

      <Footer />
    </div>
  );
}
```
