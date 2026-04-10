import HeroSection from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <NewsTicker />
    </main>
  );
}
