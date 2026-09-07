import React from "react";
import { Check, Sparkles } from "lucide-react";

/**
 * Reusable Pricing Card component
 */
export default function PricingCard({
  badge,
  title,
  price,
  currency = "€",
  period = "/ month",
  subtitle,
  features = [],
  featured = false,
  ctaText = "Get Started",
  ctaLink,
  onCtaClick,
  footnote,
  className = ""
}) {
  const cardBorder = featured
    ? "border-primary shadow-[0_0_35px_rgba(229,193,88,0.2)] bg-gradient-to-b from-[#181818] to-card"
    : "border-white/10 bg-card hover:border-white/20";

  return (
    <div
      className={`relative rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${cardBorder} ${className}`}
    >
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-black font-extrabold text-[11px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap">
          <Sparkles size={12} />
          {badge}
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        {subtitle && <p className="text-text-muted text-xs sm:text-sm mb-6">{subtitle}</p>}

        <div className="flex items-baseline gap-1.5 mb-6">
          <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            {currency}{price}
          </span>
          {period && (
            <span className="text-text-muted text-xs sm:text-sm font-semibold">{period}</span>
          )}
        </div>

        <div className="w-full h-px bg-white/10 mb-6" />

        <ul className="space-y-3.5 mb-8">
          {features.map((feat, i) => {
            const isObj = typeof feat === "object";
            const text = isObj ? feat.text : feat;
            const included = isObj ? feat.included !== false : true;

            return (
              <li
                key={i}
                className={`flex items-start gap-3 text-sm font-medium ${
                  included ? "text-white" : "text-white/40 line-through"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    included ? "bg-primary/20 text-primary" : "bg-white/5 text-white/30"
                  }`}
                >
                  <Check size={12} strokeWidth={2.5} />
                </div>
                <span>{text}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        {ctaLink ? (
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-4 rounded-xl font-extrabold text-sm flex items-center justify-center transition-all ${
              featured
                ? "bg-primary hover:bg-primary-hover text-black shadow-[0_0_20px_rgba(229,193,88,0.3)] hover:shadow-[0_0_30px_rgba(229,193,88,0.5)]"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            {ctaText}
          </a>
        ) : (
          <button
            type="button"
            onClick={onCtaClick}
            className={`w-full py-4 rounded-xl font-extrabold text-sm flex items-center justify-center transition-all cursor-pointer ${
              featured
                ? "bg-primary hover:bg-primary-hover text-black shadow-[0_0_20px_rgba(229,193,88,0.3)] hover:shadow-[0_0_30px_rgba(229,193,88,0.5)]"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            {ctaText}
          </button>
        )}

        {footnote && (
          <p className="text-center text-[11px] text-text-muted mt-3 font-medium">
            {footnote}
          </p>
        )}
      </div>
    </div>
  );
}
