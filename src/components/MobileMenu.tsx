"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_ITEMS = [
  { key: "politique", slug: "politique" },
  { key: "economie", slug: "economie" },
  { key: "societe", slug: "societe" },
  { key: "actionPublique", slug: "action-publique" },
  { key: "international", slug: "international" },
  { key: "tribunes", slug: "tribunes" },
  { key: "enquetes", slug: "enquetes" },
  { key: "institutionnel", slug: "institutionnel" },
] as const;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");

  // Close on escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed top-0 right-0 z-50 h-full w-72 max-w-full bg-dark-primary flex flex-col shadow-2xl"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-white font-bold text-sm tracking-widest uppercase">
            Menu
          </span>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col">
            {NAV_ITEMS.map(({ key, slug }) => (
              <li key={key}>
                <Link
                  href={`/category/${slug}`}
                  onClick={onClose}
                  className="block px-6 py-3.5 text-white/80 hover:text-white hover:bg-teal-brand/20 border-b border-white/5 transition-colors text-sm font-medium"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language switcher footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
}
