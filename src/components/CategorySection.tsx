"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CategorySlug } from "@/lib/types";
import { categories } from "@/data/categories";
import { getArticlesByCategory } from "@/lib/utils";
import ArticleCard from "@/components/ArticleCard";

interface CategorySectionProps {
  categorySlug: CategorySlug;
}

export default function CategorySection({ categorySlug }: CategorySectionProps) {
  const locale = useLocale() as "fr" | "en";

  const cat = categories.find((c) => c.slug === categorySlug);
  if (!cat) return null;

  const articles = getArticlesByCategory(categorySlug).slice(0, 3);
  if (articles.length === 0) return null;

  const catLabel = cat.label[locale];
  const catColor = cat.color;
  const isInstitutional = categorySlug === "institutionnel";

  const inner = (
    <>
      {/* Section header */}
      <div
        className="flex items-center justify-between mb-6"
        style={{ borderLeft: `4px solid ${catColor}`, paddingLeft: "12px" }}
      >
        <h2 className="text-xl font-bold text-gray-900">{catLabel}</h2>
      </div>

      {/* Article grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="vertical" />
        ))}
      </div>

      {/* "Voir tout" link */}
      <div className="mt-4 flex justify-end">
        <Link
          href={`/${categorySlug}` as Parameters<typeof Link>[0]["href"]}
          className="text-sm font-semibold text-teal-brand hover:underline"
        >
          Voir tout →
        </Link>
      </div>
    </>
  );

  if (isInstitutional) {
    return (
      <section className="mb-12 bg-institutional-bg/30 rounded-xl p-6">
        {inner}
      </section>
    );
  }

  return <section className="mb-12">{inner}</section>;
}
