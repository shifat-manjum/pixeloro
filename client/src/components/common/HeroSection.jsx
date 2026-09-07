import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Check } from "lucide-react";

/**
 * Reusable Hero Section
 */
export default function HeroSection({
  badge = "Digital Experience Agency",
  titleLead = "We Build Digital Products",
  titleHighlight = "That Convert.",
  titleTail = "",
  subtitle = "High-performing websites, e-commerce, and mobile experiences crafted to scale your business.",
  primaryCta = { text: "Get Started", href: "#" },
  secondaryCta = { text: "Learn More", href: "#features" },
  trustPills = ["Fast Delivery", "Modern Tech Stack", "Direct Support", "Mobile-First"],
  ambientGlow = true,
  children,
  className = ""
}) {
  const renderCta = (cta, isPrimary = true) => {
    if (!cta || !cta.text) return null;

    const baseClass = isPrimary
      ? "w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-black font-extrabold text-sm sm:text-base rounded-full transition-all shadow-[0_0_30px_rgba(229,193,88,0.35)] hover:shadow-[0_0_50px_rgba(229,193,88,0.55)] inline-flex items-center justify-center gap-2.5"
      : "w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-primary text-white hover:text-primary font-bold text-sm sm:text-base rounded-full transition-all inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10";

    const Icon = cta.icon;

    const content = (
      <>
        {Icon && <Icon size={18} />}
        <span>{cta.text}</span>
      </>
    );

    if (cta.to) {
      return (
        <Link to={cta.to} className={baseClass}>
          {content}
        </Link>
      );
    }

    if (cta.href) {
      return (
        <a
          href={cta.href}
          target={cta.external ? "_blank" : undefined}
          rel={cta.external ? "noopener noreferrer" : undefined}
          className={baseClass}
        >
          {content}
        </a>
      );
    }

    if (cta.onClick) {
      return (
        <button type="button" onClick={cta.onClick} className={`${baseClass} cursor-pointer`}>
          {content}
        </button>
      );
    }

    return null;
  };

  return (
    <section
      className={`relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-20 overflow-hidden ${className}`}
    >
      {ambientGlow && (
        <>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
        </>
      )}

      <div className="relative z-10 max-w-5xl mx-auto">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={13} />
            <span>{badge}</span>
          </div>
        )}

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
          {titleLead}{" "}
          <span className="text-primary font-serif italic">{titleHighlight}</span>
          {titleTail && ` ${titleTail}`}
        </h1>

        {subtitle && (
          <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            {subtitle}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {renderCta(primaryCta, true)}
          {renderCta(secondaryCta, false)}
        </div>

        {trustPills && trustPills.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-white/50 font-medium">
            {trustPills.map((pill, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <Check size={13} className="text-primary" />
                <span>{pill}</span>
              </div>
            ))}
          </div>
        )}

        {children && <div className="mt-12 w-full">{children}</div>}
      </div>
    </section>
  );
}
