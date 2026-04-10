import HeroSection from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import CategorySection from "@/components/CategorySection";
import { categories } from "@/data/categories";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <NewsTicker />
      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Main content area - will have sidebar added later */}
        <div>
          {categories.map((cat) => (
            <CategorySection key={cat.slug} categorySlug={cat.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
