import CarouselTestSection from "@/src/components/CarouselTestSection/CarouselTestSection";
import Counter from "@/src/components/Counter/Counter";
import FAQ from "@/src/components/FAQ/FAQ";
import HeroSection from "@/src/components/HeroSection/HeroSection";
import RoleCardTestSection from "@/src/components/RoleCardTestSection/RoleCardTestSection";
import Timeline from "@/src/components/Timeline/Timeline";

export default function Home() {
  return (
    <main>
      <HeroSection/>
      <input placeholder="" />
      <CarouselTestSection />
      <RoleCardTestSection />
      <Counter />
      <Timeline />
      <FAQ />
    </main>
  );
}
