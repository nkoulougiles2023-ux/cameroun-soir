import { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "politique",
    label: { fr: "Politique", en: "Politics" },
    description: { fr: "Actualité politique nationale et internationale", en: "National and international political news" },
    color: "#2B8C8C",
  },
  {
    slug: "economie",
    label: { fr: "Économie", en: "Economy" },
    description: { fr: "Business, finance et développement économique", en: "Business, finance and economic development" },
    color: "#1E6B6B",
  },
  {
    slug: "societe",
    label: { fr: "Société", en: "Society" },
    description: { fr: "Faits de société, éducation, santé", en: "Social issues, education, health" },
    color: "#3AA8A8",
  },
  {
    slug: "action-publique",
    label: { fr: "Action Publique", en: "Public Action" },
    description: { fr: "Politiques publiques, projets gouvernementaux", en: "Public policies, government projects" },
    color: "#16213E",
  },
  {
    slug: "international",
    label: { fr: "International", en: "International" },
    description: { fr: "Actualité mondiale et africaine", en: "World and African news" },
    color: "#1A1A2E",
  },
  {
    slug: "tribunes",
    label: { fr: "Tribunes & Opinions", en: "Opinions & Editorials" },
    description: { fr: "Points de vue, débats et analyses", en: "Viewpoints, debates and analyses" },
    color: "#E63946",
  },
  {
    slug: "enquetes",
    label: { fr: "Enquêtes", en: "Investigations" },
    description: { fr: "Enquêtes approfondies et reportages", en: "In-depth investigations and reports" },
    color: "#8B4513",
  },
  {
    slug: "institutionnel",
    label: { fr: "Institutionnel", en: "Institutional" },
    description: { fr: "Contenus institutionnels et communications officielles", en: "Institutional content and official communications" },
    color: "#B8860B",
  },
];
