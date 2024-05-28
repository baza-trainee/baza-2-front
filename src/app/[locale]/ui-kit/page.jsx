import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";
import FooterLinks from "@/src/components/shared/FooterLinks/FooterLinks";
import PartnerCard from "@/src/components/shared/PartnerCard/PartnerCard";
import SocialIcons from "@/src/components/shared/SocialIcons/SocialIcons";
import HeroCard from "@/src/components/shared/HeroCard/HeroCard";
import RegistrationFormModal from "@/src/components/RegistrationFormModal/RegistrationFormModal";
import ControlBtnRegistrationFormModal from "@/src/components/shared/controlButtons/ControlBtnRegistrationFormModal";
import JoinProjectCard from "@/src/components/shared/JoinProjectCard/JoinProjectCard";
// import JoinProjectSection from "@/src/components/JoinProjectSection/JoinProjectSection";

export default function UiKit() {
  return (
    <main>
      <ScrollToTopBtn />
      <FooterLinks />
      <ControlBtnRegistrationFormModal>Test RegistrationFormModal</ControlBtnRegistrationFormModal>
      <PartnerCard />
      <HeroCard
        title="slide_1.title"
        desc="slide_1.text"
        img="/images/hero_section/slide_1.jpg"
      />
      <SocialIcons />
      <RegistrationFormModal/>
      <JoinProjectCard 
        title="card_1.title"
        text_1="card_1.text_1"
        text_2="card_1.text_2"
        text_3="card_1.text_3"
        icon="/images/icons/1.svg"

        />
      {/* <JoinProjectSection /> */}
    </main>
  );
}
