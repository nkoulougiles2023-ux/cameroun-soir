export interface Article {
  id: string;
  slug: string;
  title: { fr: string; en: string };
  excerpt: { fr: string; en: string };
  body: { fr: string; en: string };
  category: CategorySlug;
  image: string;
  author: string;
  date: string;
  views: number;
  isInstitutional: boolean;
  institutionName?: string;
  isFeatured: boolean;
  isBreaking: boolean;
}

export type CategorySlug =
  | "politique"
  | "economie"
  | "societe"
  | "action-publique"
  | "international"
  | "tribunes"
  | "enquetes"
  | "institutionnel";

export interface Category {
  slug: CategorySlug;
  label: { fr: string; en: string };
  description: { fr: string; en: string };
  color: string;
}
