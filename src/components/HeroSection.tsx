"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getFeaturedArticles } from "@/lib/utils";
import { categories } from "@/data/categories";
import { Article } from "@/lib/types";

function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface ArticleCardProps {
  article: Article;
  locale: string;
  large?: boolean;
}

function ArticleCard({ article, locale, large = false }: ArticleCardProps) {
  const cat = categories.find((c) => c.slug === article.category);
  const catLabel = cat?.label[locale as "fr" | "en"] ?? article.category;
  const catColor = cat?.color ?? "#2B8C8C";

  const title = article.title[locale as "fr" | "en"];
  const formattedDate = formatDate(article.date, locale);

  return (
    <Link
      href={`/article/${article.slug}`}
      className="group relative block w-full h-full overflow-hidden"
      style={{ minHeight: large ? "420px" : "200px" }}
    >
      {/* Background image */}
      <img
        src={article.image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark gradient overlay from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Text content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        {/* Category badge */}
        <span
          className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-2 text-white"
          style={{ backgroundColor: catColor }}
        >
          {catLabel}
        </span>

        {/* Title */}
        <h2
          className={`font-bold leading-tight mb-2 group-hover:text-teal-light transition-colors ${
            large ? "text-xl md:text-2xl lg:text-3xl" : "text-sm md:text-base"
          }`}
        >
          {title}
        </h2>

        {/* Author + Date */}
        <p className="text-xs text-white/70">
          {article.author} &bull; {formattedDate}
        </p>
      </div>
    </Link>
  );
}

export default function HeroSection() {
  const locale = useLocale();
  const featured = getFeaturedArticles().slice(0, 3);

  if (featured.length === 0) return null;

  const [main, ...secondary] = featured;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row gap-2 h-auto md:h-[480px]">
        {/* Left: main featured article (60%) */}
        <div className="w-full md:w-[60%] rounded-lg overflow-hidden relative min-h-[300px] md:min-h-0">
          <ArticleCard article={main} locale={locale} large />
        </div>

        {/* Right: 2 smaller articles stacked (40%) */}
        <div className="w-full md:w-[40%] flex flex-col gap-2">
          {secondary.map((article) => (
            <div
              key={article.id}
              className="flex-1 rounded-lg overflow-hidden relative min-h-[180px] md:min-h-0"
            >
              <ArticleCard article={article} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
