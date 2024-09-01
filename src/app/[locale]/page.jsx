import ContactFormSection from "@/src/components/main-page/ContactFormSection/ContactFormSection";
import Counter from "@/src/components/main-page/Counter/Counter";
import FAQ from "@/src/components/main-page/FAQ/FAQ";
import ReviewsSection from "@/src/components/main-page/ReviewsSection/ReviewsSection";
import HistorySection from "@/src/components/main-page/HistorySection/HistorySection";
import MentorSection from "@/src/components/main-page/MentorSection/MentorSection";
import HeroSection from "@/src/components/main-page/HeroSection/HeroSection";
import PartnerSection from "@/src/components/main-page/PartnerSection/PartnerSection";
import StructureSection from "@/src/components/main-page/StructureSection/StructureSection";
import ArticlesSection from "@/src/components/main-page/ArticlesSection/ArticlesSection";
import RegistrationFormModal from "@/src/components/modals/RegistrationFormModal/RegistrationFormModal";
import HiddenTtitlePage from "@/src/components/shared/HiddenTtitlePage/HiddenTtitlePage";

// metadata
const metadataMainPage ={
  ua:{
    title: "Baza Trainee Ukraine",
    description : "Baza Trainee Ukraine"
  },
  en:{
    title: "Baza Trainee Ukraine",
    description : "Baza Trainee Ukraine"
  }, 
  pl:{
    title: "Baza Trainee Ukraine",
    description : "Baza Trainee Ukraine"
  },
}

export const generateMetadata = ({ params }) => {
  return {
    title: metadataMainPage[params.locale].title,
    description: metadataMainPage[params.locale].description,
  };
};


export default function HomePage() {
  return (
    <main>
      <HiddenTtitlePage namePage={'main'}/>
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
      <RegistrationFormModal/>
    </main>
  );
}
