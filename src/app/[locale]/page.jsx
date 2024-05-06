import { ArticlesSection } from "@/src/components/ArticlesSection/ArticlesSection";
import CarouselTestSection from "@/src/components/CarouselTestSection/CarouselTestSection";
import Counter from "@/src/components/Counter/Counter";

import RoleCardTestSection from "@/src/components/RoleCardTestSection/RoleCardTestSection";
import Timeline from "@/src/components/Timeline/Timeline";
import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";

export default function Home() {
  return (
    <main>
      <input placeholder="" />
      <CarouselTestSection />
      <RoleCardTestSection />
      <Counter />
      <Timeline />
      <ArticlesSection />
      <ScrollToTopBtn />
    </main>
  );
}
