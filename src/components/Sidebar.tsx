"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getMostRead } from "@/lib/utils";

export default function Sidebar() {
  const t = useTranslations("common");
  const locale = useLocale() as "fr" | "en";
  const [email, setEmail] = useState("");

  const mostRead = getMostRead(5);

  return (
    <aside className="sticky top-24 flex flex-col gap-8">
      {/* ── 1. Les Plus Lus ── */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2
          className="text-base font-bold text-gray-900 mb-4 pl-3"
          style={{ borderLeft: "4px solid #E63946" }}
        >
          {t("mostRead")}
        </h2>

        <ol className="flex flex-col gap-4">
          {mostRead.map((article, index) => (
            <li key={article.id}>
              <Link
                href={`/article/${article.slug}` as Parameters<typeof Link>[0]["href"]}
                className="flex items-start gap-3 group"
              >
                <span className="text-2xl font-bold text-teal-brand leading-none w-7 shrink-0">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-teal-brand transition-colors leading-snug line-clamp-2">
                    {article.title[locale]}
                  </p>
                  <p className="text-xs text-gray-500">
                    {article.views.toLocaleString(locale === "fr" ? "fr-FR" : "en-US")}{" "}
                    {t("views")}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* ── 2. En Kiosque ── */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">{t("atKiosk")}</h2>

        {/* Placeholder cover */}
        <div className="bg-gradient-to-br from-teal-brand to-dark-primary rounded-lg aspect-[3/4] flex flex-col items-center justify-center text-white mb-4 select-none">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-1">
            Cameroun Soir
          </p>
          <p className="text-lg font-bold text-center leading-tight px-4">Hebdo</p>
        </div>

        <p className="text-sm text-gray-600 mb-3 text-center">
          N° 42 — Avril 2026
        </p>

        <button className="w-full bg-teal-brand text-white text-sm font-semibold py-2 rounded hover:opacity-90 transition-opacity">
          {t("readMore")}
        </button>
      </div>

      {/* ── 3. Newsletter ── */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-base font-bold text-gray-900 mb-2">{t("newsletter")}</h2>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {locale === "fr"
            ? "Recevez nos analyses directement dans votre boîte mail"
            : "Get our analyses directly in your inbox"}
        </p>

        <div className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email")}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-brand"
          />
          <button className="w-full bg-red-brand text-white text-sm font-semibold py-2 rounded hover:opacity-90 transition-opacity">
            {t("subscribe")}
          </button>
        </div>
      </div>
    </aside>
  );
}
