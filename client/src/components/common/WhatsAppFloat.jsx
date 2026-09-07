import React from "react";

/**
 * Reusable Floating WhatsApp Button
 * Can be placed on any page or website.
 */
export default function WhatsAppFloat({
  phoneNumber = "393481134181",
  message = "Hello! I would like to get more information about your services.",
  tooltipText = "Chat on WhatsApp",
  position = "bottom-right",
  showTooltip = false,
  className = ""
}) {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6"
  }[position] || "bottom-6 right-6";

  return (
    <div className={`fixed ${positionClasses} z-50 flex items-center gap-3 ${className}`}>
      {showTooltip && (
        <span className="hidden sm:inline-block bg-[#14141C] text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
          {tooltipText}
        </span>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={tooltipText}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_28px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300 group"
      >
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:scale-110"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </a>
    </div>
  );
}
