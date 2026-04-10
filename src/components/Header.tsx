"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

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

function formatDate(locale: string): string {
  return new Date().toLocaleDateString(locale === "fr" ? "fr-CM" : "en-CM", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 w-full">
        {/* ── Top Bar ── */}
        <div className="bg-dark-primary text-white text-xs">
          <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-between gap-4">
            {/* Date */}
            <time className="opacity-70 capitalize hidden sm:block">
              {formatDate(locale)}
            </time>

            {/* Right side: phone + language */}
            <div className="flex items-center gap-4 ml-auto">
              <span className="opacity-70 tracking-wide hidden sm:inline">
                (+237) 6 91 60 27 99
              </span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* ── Main Bar ── */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" aria-label="Cameroun Soir Hebdo – Accueil">
              <Image
                src="/images/logo.jpeg"
                alt="Cameroun Soir Hebdo"
                width={120}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Slogan */}
            <p className="hidden md:block text-dark-primary/70 text-sm italic font-medium tracking-wide text-right">
              {t("common.slogan")}
            </p>
          </div>
        </div>

        {/* ── Nav Bar ── */}
        <nav
          className="bg-teal-brand text-white"
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-4 flex items-center h-10">
            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-0 flex-1">
              {NAV_ITEMS.map(({ key, slug }) => (
                <li key={key}>
                  <Link
                    href={`/${slug}` as Parameters<typeof Link>[0]["href"]}
                    className="block px-3 py-2 text-xs font-semibold tracking-wide uppercase hover:bg-teal-dark/60 hover:underline underline-offset-2 transition-colors whitespace-nowrap"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Search icon (desktop) */}
            <div className="hidden md:flex items-center ml-auto">
              <button
                aria-label={t("nav.search")}
                className="p-1.5 hover:bg-teal-dark/60 rounded transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>

            {/* Mobile: hamburger */}
            <div className="md:hidden flex items-center ml-auto">
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                className="p-1.5 hover:bg-teal-dark/60 rounded transition-colors"
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
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu rendered outside header to cover full screen */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
