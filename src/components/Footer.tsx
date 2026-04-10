"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

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

export default function Footer() {
  const t = useTranslations();
  const [email, setEmail] = useState("");

  const leftLinks = NAV_ITEMS.slice(0, 4);
  const rightLinks = NAV_ITEMS.slice(4);

  return (
    <footer className="bg-dark-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="Cameroun Soir Hebdo – Accueil">
              <Image
                src="/images/logo.jpeg"
                alt="Cameroun Soir Hebdo"
                width={80}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm italic text-white/80 leading-relaxed">
              {t("common.slogan")}
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              {t("common.signature")}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-teal-brand transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-teal-brand transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-teal-brand mb-5">
              Rubriques
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {leftLinks.map(({ key, slug }) => (
                <Link
                  key={key}
                  href={`/${slug}`}
                  className="text-sm text-white/70 hover:text-teal-brand hover:underline underline-offset-2 transition-colors"
                >
                  {t(`nav.${key}`)}
                </Link>
              ))}
              {rightLinks.map(({ key, slug }) => (
                <Link
                  key={key}
                  href={`/${slug}`}
                  className="text-sm text-white/70 hover:text-teal-brand hover:underline underline-offset-2 transition-colors"
                >
                  {t(`nav.${key}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 — Contact & Newsletter */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-teal-brand mb-3">
                {t("common.contact")}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                (+237) 6 96 52 46 40&nbsp;/&nbsp;6 58 76 20 38
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-teal-brand mb-3">
                {t("common.newsletter")}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmail("");
                }}
                className="flex flex-col gap-2"
              >
                <label htmlFor="footer-email" className="sr-only">
                  {t("common.email")}
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("common.email")}
                  required
                  className="w-full px-3 py-2 text-sm rounded bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-teal-brand focus:ring-1 focus:ring-teal-brand"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-semibold rounded bg-teal-brand hover:bg-teal-dark transition-colors"
                >
                  {t("common.subscribe")}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <span>
            &copy; 2026 CAMEROUN SOIR Hebdo. {t("common.allRightsReserved")}.
          </span>
          <nav aria-label="Footer legal navigation" className="flex items-center gap-4">
            <Link href="/legal" className="hover:text-teal-brand transition-colors">
              {t("common.legal")}
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="/about" className="hover:text-teal-brand transition-colors">
              {t("common.about")}
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="/contact" className="hover:text-teal-brand transition-colors">
              {t("common.contact")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
