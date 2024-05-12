import { ArticlesSection } from "@/src/components/ArticlesSection/ArticlesSection";
import ContactFormSection from "@/src/components/ContactFormSection/ContactFormSection";
import Counter from "@/src/components/Counter/Counter";
import FAQ from "@/src/components/FAQ/FAQ";
import ReviewsSection from "@/src/components/ReviewsSection/ReviewsSection";
import HistorySection from "@/src/components/HistorySection/HistorySection";
import MentorSection from "@/src/components/MentorSection/MentorSection";
import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";
import HeroSection from "@/src/components/HeroSection/HeroSection";
import RegistrationFormModal from "@/src/components/RegistrationFormModal/RegistrationFormModal";
//import useStateModal from "@/src/state/useStateModal";

//const isOpen = useStateModal((state) => state.isOpen)

export default function Home() {
  

  return (
    <main>
      <HeroSection />
      <HistorySection />
      <Counter />
      <MentorSection />
      <FAQ />
      <ReviewsSection />
      <ArticlesSection />
      <ContactFormSection />
      <ScrollToTopBtn />
      <RegistrationFormModal/>
    </main>
  );
}
