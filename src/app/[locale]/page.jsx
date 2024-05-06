import CarouselTestSection from "@/src/components/CarouselTestSection/CarouselTestSection";
import Counter from "@/src/components/Counter/Counter";
import FAQ from "@/src/components/FAQ/FAQ";
import HistorySection from "@/src/components/HistorySection/HistorySection";
import MentorSection from "@/src/components/MentorSection/MentorSection";
import RoleCardTestSection from "@/src/components/RoleCardTestSection/RoleCardTestSection";


export default function Home() {
  return (
    <main>
      <input placeholder="" />
      <CarouselTestSection />
      <RoleCardTestSection />
      <HistorySection />
      <Counter />
      <MentorSection />
      <FAQ />
    </main>
  );
}
