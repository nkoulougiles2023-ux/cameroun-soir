import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/utils";
import { categories } from "@/data/categories";
import { CategorySlug } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: cat.label[locale as "fr" | "en"],
    description: cat.description[locale as "fr" | "en"],
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  const t = await getTranslations("common");

  const cat = getCategoryBySlug(category);
  if (!cat) {
    notFound();
  }

  const articles = getArticlesByCategory(cat.slug as CategorySlug);
  const catLabel = cat.label[locale as "fr" | "en"] ?? cat.label.fr;
  const catDescription = cat.description[locale as "fr" | "en"] ?? cat.description.fr;
  const isInstitutional = cat.slug === "institutionnel";

  const mainContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} variant="vertical" />
      ))}
      {articles.length === 0 && (
        <p className="text-gray-500 col-span-full text-center py-12">
          {locale === "fr" ? "Aucun article dans cette catégorie." : "No articles in this category."}
        </p>
      )}
    </div>
  );

  return (
    <main className="flex-1">
      {/* Banner */}
      <div
        className="w-full py-12 px-4"
        style={{ backgroundColor: cat.color }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">{catLabel}</h1>
          <p className="text-white/80 text-lg">{catDescription}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal-brand transition-colors">
            {locale === "fr" ? "Accueil" : "Home"}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{catLabel}</span>
        </nav>
      </div>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {isInstitutional ? (
              <div className="bg-institutional-bg/30 rounded-xl p-6">
                {mainContent}
              </div>
            ) : (
              mainContent
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <Sidebar />
          </div>
        </div>
      </section>
    </main>
  );
}
