import ExampleButtons from "@/src/components/ExampleButtons/ExampleButtons";
import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";
import FeedbackCard from "@/src/components/shared/FeedbackCard/FeedbackCard";
import FooterLinks from "@/src/components/FooterLinks/FooterLinks";
import StructureCard from "@/src/components/shared/StructureCard/StructureCard";
import PartnerCard from "@/src/components/shared/PartnerCard/PartnerCard";
import Logo from "@/src/components/shared/Logo/Logo";
import InputField from "@/src/components/shared/InputField/InputField";

export default function UiKit() {
  return (
    <main>
      <ExampleButtons />
      <ScrollToTopBtn />
      <FeedbackCard />
      <FooterLinks />
      <StructureCard />
      <PartnerCard />
      <InputField />
      <Logo variant="footer" />
      
    </main>
  );
}
