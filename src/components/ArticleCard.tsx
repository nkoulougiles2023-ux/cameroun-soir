"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Article } from "@/lib/types";
import { categories } from "@/data/categories";
import { formatDate } from "@/lib/utils";
import InstitutionalBadge from "@/components/InstitutionalBadge";

interface ArticleCardProps {
  article: Article;
  variant?: "vertical" | "horizontal";
}

export default function ArticleCard({ article, variant = "vertical" }: ArticleCardProps) {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("common");

  const cat = categories.find((c) => c.slug === article.category);
  const catLabel = cat?.label[locale] ?? article.category;
  const catColor = cat?.color ?? "#2B8C8C";

  const title = article.title[locale];
  const excerpt = article.excerpt[locale];
  const formattedDate = formatDate(article.date, locale);

  const wrapperClasses = article.isInstitutional
    ? "group bg-institutional-bg border border-institutional-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
    : "group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300";

  if (variant === "horizontal") {
    return (
      <Link href={`/article/${article.slug}`} className={`flex ${wrapperClasses}`}>
        {/* Image */}
        <div className="w-1/3 flex-shrink-0 relative overflow-hidden">
          <img
            src={article.image}
            alt={title}
            className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="w-2/3 p-3 flex flex-col gap-1">
          {article.isInstitutional && (
            <div className="mb-1">
              <InstitutionalBadge />
            </div>
          )}
          <span
            className="inline-block self-start text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded text-white"
            style={{ backgroundColor: catColor }}
          >
            {catLabel}
          </span>
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-gray-900">
            {title}
          </h3>
          <p className="text-xs text-gray-500">
            {t("by")} {article.author} &bull; {formattedDate}
          </p>
          <span className="mt-auto text-xs font-semibold text-teal-brand hover:underline">
            {t("readMore")}
          </span>
        </div>
      </Link>
    );
  }

  // Vertical (default)
  return (
    <Link href={`/article/${article.slug}`} className={`flex flex-col ${wrapperClasses}`}>
      {/* Image */}
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        <img
          src={article.image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        {article.isInstitutional && (
          <div>
            <InstitutionalBadge />
          </div>
        )}
        <span
          className="inline-block self-start text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded text-white"
          style={{ backgroundColor: catColor }}
        >
          {catLabel}
        </span>
        <h3 className="font-semibold text-lg leading-snug text-gray-900">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{excerpt}</p>
        <p className="text-xs text-gray-500">
          {t("by")} {article.author} &bull; {formattedDate}
        </p>
        <span className="mt-auto text-sm font-semibold text-teal-brand hover:underline">
          {t("readMore")}
        </span>
      </div>
    </Link>
  );
}
