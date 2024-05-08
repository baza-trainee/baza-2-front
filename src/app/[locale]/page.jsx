import { ArticlesSection } from "@/src/components/ArticlesSection/ArticlesSection";
//import CarouselTestSection from "@/src/components/CarouselTestSection/CarouselTestSection";
import ContactFormSection from "@/src/components/ContactFormSection/ContactFormSection";
import Counter from "@/src/components/Counter/Counter";
import FAQ from "@/src/components/FAQ/FAQ";
import ReviewsSection from "@/src/components/ReviewsSection/ReviewsSection";
import HistorySection from "@/src/components/HistorySection/HistorySection";
import MentorSection from "@/src/components/MentorSection/MentorSection";
import HeroSection from "@/src/components/HeroSection/HeroSection";
//import RoleCardTestSection from "@/src/components/RoleCardTestSection/RoleCardTestSection";
//import Timeline from "@/src/components/Timeline/Timeline";
import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";

export default function Home() {
  return (
    <main>
      <HeroSection/>
      {/* <input placeholder="" /> */}
      {/* <CarouselTestSection /> */}
      {/* <RoleCardTestSection /> */}
      <HistorySection />
      <Counter />
      <MentorSection />
      {/* <Timeline /> */}
      <ContactFormSection />
      <ArticlesSection />
      <ScrollToTopBtn />
      <FAQ />
      <ReviewsSection />
    </main>
  );
}
