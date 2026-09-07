import React from "react";

/**
 * Reusable Language Switcher component
 * Supports any list of language codes (default: ['it', 'en', 'de'])
 */
export default function LanguageSwitcher({
  currentLang = "it",
  onLanguageChange,
  languages = ["it", "en", "de"],
  className = ""
}) {
  const handleSelect = (lang) => {
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  return (
    <div className={`flex items-center bg-white/5 rounded-full border border-white/10 p-1 ${className}`}>
      {languages.map((l) => {
        const isActive = currentLang.toLowerCase() === l.toLowerCase();
        return (
          <button
            key={l}
            type="button"
            onClick={() => handleSelect(l)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all uppercase cursor-pointer ${
              isActive
                ? "bg-primary text-black shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            aria-label={`Switch to ${l.toUpperCase()}`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
