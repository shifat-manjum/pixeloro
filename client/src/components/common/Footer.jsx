import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

/**
 * Reusable Footer component
 */
export default function Footer({
  logo = <Logo size="md" />,
  tagline = "High-performing digital products engineered to grow your business.",
  columns = [],
  copyrightText = `© ${new Date().getFullYear()} Zentixx IT. All rights reserved.`,
  legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" }
  ],
  className = ""
}) {
  return (
    <footer className={`bg-black border-t border-white/10 py-14 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="mb-4">{logo}</div>
            <p className="text-text-muted text-sm font-medium leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Dynamic Link Columns */}
          {columns.map((col, idx) => (
            <div key={idx}>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>{copyrightText}</p>
          {legalLinks.length > 0 && (
            <div className="flex items-center gap-6">
              {legalLinks.map((l, idx) => (
                <a
                  key={idx}
                  href={l.href}
                  className="hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
