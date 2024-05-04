import CarouselTestSection from "@/src/components/CarouselTestSection/CarouselTestSection";
import ContactFormSection from "@/src/components/ContactFormSection/ContactFormSection";
import Counter from "@/src/components/Counter/Counter";
import FAQ from "@/src/components/FAQ/FAQ";
import RoleCardTestSection from "@/src/components/RoleCardTestSection/RoleCardTestSection";
import Timeline from "@/src/components/Timeline/Timeline";

export default function Home() {
  return (
    <main>
      <input placeholder="" />
      <CarouselTestSection />
      <RoleCardTestSection />
      <Counter />
      <Timeline />
      <ContactFormSection/>
      <FAQ />
    </main>
  );
}
