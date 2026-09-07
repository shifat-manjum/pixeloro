import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const THEME_STYLES = {
  gold: {
    gradient: "from-primary/20 to-yellow-500/5",
    border: "border-primary/30 hover:border-primary/70",
    iconBg: "bg-primary/15 text-primary border-primary/20",
    badge: "bg-primary text-black",
    price: "text-primary"
  },
  emerald: {
    gradient: "from-emerald-500/20 to-teal-500/5",
    border: "border-emerald-500/30 hover:border-emerald-400/70",
    iconBg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    badge: "bg-emerald-400 text-black",
    price: "text-emerald-400"
  },
  blue: {
    gradient: "from-blue-500/20 to-indigo-500/5",
    border: "border-blue-500/30 hover:border-blue-400/70",
    iconBg: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    badge: "bg-blue-400 text-white",
    price: "text-blue-400"
  },
  purple: {
    gradient: "from-purple-500/20 to-violet-500/5",
    border: "border-purple-500/30 hover:border-purple-400/70",
    iconBg: "bg-purple-500/15 text-purple-400 border-purple-500/20",
    badge: "bg-purple-400 text-white",
    price: "text-purple-400"
  },
  pink: {
    gradient: "from-pink-500/20 to-rose-500/5",
    border: "border-pink-500/30 hover:border-pink-400/70",
    iconBg: "bg-pink-500/15 text-pink-400 border-pink-500/20",
    badge: "bg-pink-400 text-white",
    price: "text-pink-400"
  }
};

/**
 * Reusable Service / Feature Card
 */
export default function ServiceCard({
  icon: Icon,
  badge,
  title,
  description,
  price,
  features = [],
  linkTo,
  href,
  actionText = "Learn More",
  onAction,
  theme = "gold",
  className = ""
}) {
  const t = THEME_STYLES[theme] || THEME_STYLES.gold;

  const renderAction = () => {
    const content = (
      <>
        <span>{actionText}</span>
        <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
      </>
    );

    if (linkTo) {
      return (
        <Link
          to={linkTo}
          className="group/link flex items-center gap-1.5 text-xs font-bold text-white/70 hover:text-white transition-colors"
        >
          {content}
        </Link>
      );
    }

    if (href) {
      return (
        <a
          href={href}
          className="group/link flex items-center gap-1.5 text-xs font-bold text-white/70 hover:text-white transition-colors"
        >
          {content}
        </a>
      );
    }

    if (onAction) {
      return (
        <button
          type="button"
          onClick={onAction}
          className="group/link flex items-center gap-1.5 text-xs font-bold text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          {content}
        </button>
      );
    }

    return null;
  };

  return (
    <div
      className={`relative bg-gradient-to-br ${t.gradient} border ${t.border} rounded-3xl p-7 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:-translate-y-1 flex flex-col group ${className}`}
    >
      {badge && (
        <div
          className={`absolute -top-3 left-6 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md ${t.badge}`}
        >
          {badge}
        </div>
      )}

      {Icon && (
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${t.iconBg}`}>
          <Icon size={22} strokeWidth={2} />
        </div>
      )}

      <h3 className="text-xl font-black text-white mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      <p className="text-text-muted text-sm leading-relaxed mb-5 flex-grow">
        {description}
      </p>

      {features.length > 0 && (
        <ul className="space-y-2 mb-6 pt-2 border-t border-white/5">
          {features.map((feat, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-white/80 font-medium">
              <Check size={14} className={t.price} />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
        {price ? (
          <span className={`text-xs sm:text-sm font-extrabold ${t.price}`}>{price}</span>
        ) : <span />}
        {renderAction()}
      </div>
    </div>
  );
}
