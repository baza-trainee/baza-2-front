import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";
import FooterLinks from "@/src/components/shared/FooterLinks/FooterLinks";
import PartnerCard from "@/src/components/shared/PartnerCard/PartnerCard";
import SocialIcons from "@/src/components/shared/SocialIcons/SocialIcons";
import { HeroCard } from "@/src/components/shared/HeroCard/HeroCard";
import RegistrationForm from "@/src/components/shared/RegistrationFormTEST/RegistrationForm";

export default function UiKit() {
  return (
    <main>
      <ScrollToTopBtn />
      <FooterLinks />
      <PartnerCard />
      <SocialIcons />
      <HeroCard
        title="Baza Trainee Ukraine"
        desc="Громадська організація,яка має на меті отримання першого досвіду роботи тими, хто починає свій шлях в ІТ"
        img="/images/img-hero.jpg"
      />
      <RegistrationForm></RegistrationForm>
      <SocialIcons />
    </main>
  );
}
