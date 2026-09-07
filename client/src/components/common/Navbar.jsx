import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../Logo";
import LanguageSwitcher from "./LanguageSwitcher";

/**
 * Reusable Responsive Navbar
 */
export default function Navbar({
  logo = <Logo size="md" linkTo="/" />,
  links = [],
  currentLang = "it",
  onLanguageChange,
  showLanguageSwitcher = true,
  languages = ["it", "en", "de"],
  actionButton,
  className = ""
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className={`sticky top-0 z-50 bg-[#0A0A0E]/90 backdrop-blur-xl border-b border-white/10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center">
          {logo}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, idx) => {
            if (link.to) {
              return (
                <Link
                  key={idx}
                  to={link.to}
                  className="text-sm font-bold text-text-muted hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <a
                key={idx}
                href={link.href}
                className="text-sm font-bold text-text-muted hover:text-white transition-colors"
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {showLanguageSwitcher && (
            <LanguageSwitcher
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
              languages={languages}
            />
          )}
          {actionButton}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {showLanguageSwitcher && (
            <LanguageSwitcher
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
              languages={languages}
            />
          )}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-text-muted hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0E0E14] px-6 py-6 space-y-4">
          {links.map((link, idx) => (
            <div key={idx}>
              {link.to ? (
                <Link
                  to={link.to}
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-base font-bold text-white/90 hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-base font-bold text-white/90 hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}

          {actionButton && (
            <div className="pt-4 border-t border-white/10">
              {actionButton}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
