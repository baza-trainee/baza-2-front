import ExampleButtons from "@/src/components/ExampleButtons/ExampleButtons";
import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";
import FeedbackCard from "@/src/components/shared/FeedbackCard/FeedbackCard";
import FooterLinks from "@/src/components/FooterLinks/FooterLinks";
import StructureCard from "@/src/components/shared/StructureCard/StructureCard";
import PartnerCard from "@/src/components/shared/PartnerCard/PartnerCard";
import Logo from "@/src/components/shared/Logo/Logo";
import SocialIcons from "@/src/components/shared/SocialIcons/SocialIcons";
import { HeroCard } from "@/src/components/shared/HeroCard/HeroCard";

export default function UiKit() {
  return (
    <main>
      <ExampleButtons />
      <ScrollToTopBtn />
      <FeedbackCard />
      <FooterLinks />
      <StructureCard />
      <PartnerCard />
      <Logo variant="footer" />
      <SocialIcons />
      <HeroCard
        title="Baza Trainee Ukraine"
        desc="Громадська організація,яка має на меті отримання першого досвіду роботи тими, хто починає свій шлях в ІТ"
        img="/images/img-hero.jpg"
      />
    </main>
  );
}
