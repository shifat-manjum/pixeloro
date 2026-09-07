import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Single FAQ item accordion
 */
export function FAQItem({ question, answer, defaultOpen = false, className = "" }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-white/10 rounded-2xl mb-4 bg-card/60 overflow-hidden transition-colors hover:border-primary/30 ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-bold text-white text-base sm:text-lg pr-4">{question}</span>
        <ChevronDown
          size={20}
          className={`text-primary flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-text-muted text-sm sm:text-base leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/**
 * Reusable FAQ Accordion list
 */
export default function FAQAccordion({ items = [], allowMultiple = true, className = "" }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (allowMultiple) {
    return (
      <div className={`w-full max-w-4xl mx-auto ${className}`}>
        {items.map((item, idx) => (
          <FAQItem key={idx} question={item.question} answer={item.answer} defaultOpen={idx === 0} />
        ))}
      </div>
    );
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-white/10 rounded-2xl mb-4 bg-card/60 overflow-hidden transition-colors hover:border-primary/30"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-bold text-white text-base sm:text-lg pr-4">{item.question}</span>
              <ChevronDown
                size={20}
                className={`text-primary flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
