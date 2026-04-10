import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getArticleBySlug, getArticlesByCategory, formatDate } from "@/lib/utils";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import ShareButtons from "@/components/ShareButtons";
import InstitutionalBadge from "@/components/InstitutionalBadge";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title[locale as "fr" | "en"],
    description: article.excerpt[locale as "fr" | "en"],
    openGraph: {
      title: article.title[locale as "fr" | "en"],
      description: article.excerpt[locale as "fr" | "en"],
      images: [article.image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");

  const article = getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const l = locale as "fr" | "en";
  const title = article.title[l];
  const body = article.body[l];
  const formattedDate = formatDate(article.date, locale);

  const cat = categories.find((c) => c.slug === article.category);
  const catLabel = cat?.label[l] ?? article.category;
  const catColor = cat?.color ?? "#2B8C8C";

  // Related articles: same category, exclude current, max 3
  const relatedArticles = getArticlesByCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  // Body paragraphs
  const paragraphs = body.split("\n\n").filter(Boolean);

  return (
    <main className="flex-1">
      {/* ── Hero Image ── */}
      <div className="relative w-full max-h-96 overflow-hidden">
        <img
          src={article.image}
          alt={title}
          className="w-full max-h-96 object-cover"
        />
        {/* Dark gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* ── Article Header ── */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 py-4">
          <Link href="/" className="hover:text-teal-brand transition-colors">
            {locale === "fr" ? "Accueil" : "Home"}
          </Link>
          <span>/</span>
          <Link
            href={`/${article.category}` as Parameters<typeof Link>[0]["href"]}
            className="hover:text-teal-brand transition-colors"
          >
            {catLabel}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium line-clamp-1">{title}</span>
        </nav>

        {/* Category badge + title + meta */}
        <div className="mb-6">
          {/* Category badge */}
          <span
            className="inline-block mb-3 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded text-white"
            style={{ backgroundColor: catColor }}
          >
            {catLabel}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>
              {t("by")} <span className="font-semibold text-gray-700">{article.author}</span>
            </span>
            <span>&bull;</span>
            <span>
              {t("publishedOn")} <span className="font-semibold text-gray-700">{formattedDate}</span>
            </span>
            <span>&bull;</span>
            <span>
              {article.views.toLocaleString(locale === "fr" ? "fr-FR" : "en-US")} {t("views")}
            </span>
          </div>

          {/* Institutional badge */}
          {article.isInstitutional && (
            <div className="flex items-center gap-3 mt-3">
              <InstitutionalBadge />
              {article.institutionName && (
                <span className="text-sm font-semibold text-institutional-badge">
                  {article.institutionName}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Content Area ── */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Article body */}
            <article className="prose prose-lg max-w-none text-gray-800">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-5 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </article>

            {/* Share buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">{t("share")}</p>
              <ShareButtons title={title} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <Sidebar />
          </div>
        </div>
      </section>

      {/* ── Related Articles ── */}
      {relatedArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2
            className="text-2xl font-bold text-gray-900 mb-6 pl-4"
            style={{ borderLeft: `4px solid ${catColor}` }}
          >
            {t("relatedArticles")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.id} article={related} variant="vertical" />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
