import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'md', linkTo = '/', className = '' }) {
  const sizeClasses = {
    sm: {
      emblem: 'w-7 h-7',
      text: 'text-xl',
      badge: 'text-sm'
    },
    md: {
      emblem: 'w-8 h-8 sm:w-9 sm:h-9',
      text: 'text-2xl sm:text-3xl',
      badge: 'text-base sm:text-lg'
    },
    lg: {
      emblem: 'w-11 h-11 sm:w-12 sm:h-12',
      text: 'text-3xl sm:text-4xl',
      badge: 'text-lg sm:text-xl'
    }
  }[size] || {
    emblem: 'w-8 h-8 sm:w-9 sm:h-9',
    text: 'text-2xl sm:text-3xl',
    badge: 'text-base sm:text-lg'
  };

  const Content = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* Golden Z Monogram Emblem */}
      <div className={`relative ${sizeClasses.emblem} flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#E5C158] via-[#FFE388] to-[#997720] p-[1.5px] shadow-[0_0_20px_rgba(229,193,88,0.35)] group-hover:shadow-[0_0_30px_rgba(229,193,88,0.55)] group-hover:scale-105 transition-all duration-300`}>
        <div className="w-full h-full bg-[#0E0E14] rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-amber-400/15 pointer-events-none"></div>
          
          <svg viewBox="0 0 24 24" fill="none" className="w-[60%] h-[60%] text-primary drop-shadow-[0_0_6px_rgba(229,193,88,0.7)]" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 5.5h15l-11 13h11" />
            <circle cx="19.5" cy="5.5" r="1.2" fill="#E5C158" stroke="none" />
            <circle cx="4.5" cy="18.5" r="1.2" fill="#E5C158" stroke="none" />
          </svg>
        </div>
      </div>

      {/* Brand Name Typography */}
      <div className="flex items-baseline tracking-tighter">
        <span className={`${sizeClasses.text} font-black text-white group-hover:text-white/95 transition-colors`}>
          zentixx
        </span>
        <span className={`${sizeClasses.badge} font-black text-primary ml-1 group-hover:text-primary-hover transition-colors`}>
          it
        </span>
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-block focus:outline-none" title="Zentixx IT">
        {Content}
      </Link>
    );
  }

  return Content;
}
