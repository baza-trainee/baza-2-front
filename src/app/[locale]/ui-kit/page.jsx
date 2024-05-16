import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";
import FooterLinks from "@/src/components/shared/FooterLinks/FooterLinks";
import PartnerCard from "@/src/components/shared/PartnerCard/PartnerCard";
import SocialIcons from "@/src/components/shared/SocialIcons/SocialIcons";
import HeroCard from "@/src/components/shared/HeroCard/HeroCard";
import StructureSection from "../../../components/StructureSection/StructureSection";
import PaymentModal from "@/src/components/PaymentModal/PaymentModal";
import ControlBtnModalPayment from "@/src/components/shared/controlButtons/ControlBtnModalPayment";

export default function UiKit() {
  return (
    <main>
      <PaymentModal/>
      <ScrollToTopBtn />
      <FooterLinks />
      <ControlBtnModalPayment>Test PaymentModal</ControlBtnModalPayment>
      <PartnerCard />
      <StructureSection />
      <HeroCard
        title="slide_1.title"
        desc="slide_1.text"
        img="/images/hero_section/img-hero.jpg"
      />
      <SocialIcons />
    </main>
  );
}
