import { Article, CategorySlug } from "./types";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.isFeatured);
}

export function getBreakingNews(): Article[] {
  return articles.filter((a) => a.isBreaking);
}

export function getMostRead(limit = 5): Article[] {
  return [...articles].sort((a, b) => b.views - a.views).slice(0, limit);
}

export function getInstitutionalArticles(): Article[] {
  return articles.filter((a) => a.isInstitutional);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
