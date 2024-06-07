import FooterLinks from "@/src/components/shared/FooterLinks/FooterLinks";
import PartnerCard from "@/src/components/shared/PartnerCard/PartnerCard";
import SocialIcons from "@/src/components/shared/SocialIcons/SocialIcons";
import HeroCard from "@/src/components/shared/HeroCard/HeroCard";
import RegistrationFormModal from "@/src/components/RegistrationFormModal/RegistrationFormModal";
import ControlBtnRegistrationFormModal from "@/src/components/shared/controlButtons/ControlBtnRegistrationFormModal";
import JoinProjectSection from "@/src/components/JoinProjectSection/JoinProjectSection";

export default function UiKit() {
  return (
    <main>
      <FooterLinks />
      <ControlBtnRegistrationFormModal>Test RegistrationFormModal</ControlBtnRegistrationFormModal>
      <PartnerCard />
      <HeroCard
        title="slide_1.title"
        desc="slide_1.text"
        img="/images/hero_section/slide_1.jpg"
      />
      <JoinProjectSection />
      <SocialIcons />
      <RegistrationFormModal/>
      
    </main>
  );
}
