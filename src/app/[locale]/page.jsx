import { ArticlesSection } from "@/src/components/ArticlesSection/ArticlesSection";
import ContactFormSection from "@/src/components/ContactFormSection/ContactFormSection";
import Counter from "@/src/components/Counter/Counter";
import FAQ from "@/src/components/FAQ/FAQ";
import ReviewsSection from "@/src/components/ReviewsSection/ReviewsSection";
import HistorySection from "@/src/components/HistorySection/HistorySection";
import MentorSection from "@/src/components/MentorSection/MentorSection";
import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";
import HeroSection from "@/src/components/HeroSection/HeroSection";
import PartnerSection from "@/src/components/PartnerSection/PartnerSection";
import StructureSection from "@/src/components/StructureSection/StructureSection";
import Cookies from "@/src/components/Cookies/Cookies";

export default function Home() {
  

  return (
    <main>
      <HeroSection />
      <HistorySection />
      <Counter />
      <MentorSection />
      <StructureSection />
      <FAQ />
      <ReviewsSection />
      <ArticlesSection />
      <PartnerSection />
      <ContactFormSection />
      <ScrollToTopBtn />
      <Cookies/>
    </main>
  );
}
