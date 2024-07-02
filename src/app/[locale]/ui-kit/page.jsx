import FooterLinks from "@/src/components/shared/FooterLinks/FooterLinks";
import SocialIcons from "@/src/components/shared/SocialIcons/SocialIcons";
import HeroCard from "@/src/components/shared/HeroCard/HeroCard";
import RegistrationFormModal from "@/src/components/modals/RegistrationFormModal/RegistrationFormModal";
import ControlBtnRegistrationFormModal from "@/src/components/shared/controlButtons/ControlBtnRegistrationFormModal";
import JoinProjectSection from "@/src/components/JoinProjectSection/JoinProjectSection";
import ContactFormSection from "@/src/components/ContactFormSection/ContactFormSection";
import ModalDocumentPdf from "@/src/components/modals/ModalDocumentPdf/ModalDocumentPdf";


export default function UiKit() {
  return (
    <main>
      <FooterLinks />
      <ControlBtnRegistrationFormModal>Test RegistrationFormModal</ControlBtnRegistrationFormModal>
      <ControlBtnRegistrationFormModal type="partaker">Test RegistrationFormModal Partaker </ControlBtnRegistrationFormModal>
      <ModalDocumentPdf/>
      <HeroCard
        title="slide_1.title"
        desc="slide_1.text"
        img="/images/hero_section/slide_1.jpg"
      />
      <JoinProjectSection />
    
      <ContactFormSection />
      <SocialIcons />
      <RegistrationFormModal/>

    </main>
  );
}
