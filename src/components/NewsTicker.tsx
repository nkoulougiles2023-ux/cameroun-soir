"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getBreakingNews } from "@/lib/utils";

export default function NewsTicker() {
  const t = useTranslations("common");
  const locale = useLocale();
  const breakingNews = getBreakingNews();

  if (breakingNews.length === 0) return null;

  // Duplicate the list so the marquee loops seamlessly
  const headlines = [...breakingNews, ...breakingNews];

  return (
    <div className="bg-red-brand text-white w-full overflow-hidden flex items-stretch">
      {/* Label */}
      <div className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 font-bold text-sm uppercase tracking-wider bg-black/20 whitespace-nowrap">
        {/* Flash / bolt icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M13 2L4.09 12.96A1 1 0 0 0 5 14.5h5.5L11 22l8.91-10.96A1 1 0 0 0 19 9.5h-5.5L13 2z" />
        </svg>
        <span>{t("breakingNews")}</span>
      </div>

      {/* Scrolling ticker */}
      <div className="relative flex-1 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {headlines.map((article, index) => (
            <Link
              key={`${article.id}-${index}`}
              href={`/article/${article.slug}`}
              className="inline-flex items-center gap-2 px-6 py-2 text-sm hover:underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              <span className="text-white/50 mx-1">&#9654;</span>
              {article.title[locale as "fr" | "en"]}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
