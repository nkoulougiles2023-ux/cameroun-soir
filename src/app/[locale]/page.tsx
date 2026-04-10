import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import CategorySection from "@/components/CategorySection";
import Sidebar from "@/components/Sidebar";
import { categories } from "@/data/categories";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="flex-1">
      <HeroSection />
      <NewsTicker />
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {categories.map((cat) => (
              <CategorySection key={cat.slug} categorySlug={cat.slug} />
            ))}
          </div>
          <div className="w-full lg:w-80 shrink-0">
            <Sidebar />
          </div>
        </div>
      </section>
    </main>
  );
}
