import ExampleButtons from "@/src/components/ExampleButtons/ExampleButtons";
import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";
import FeedbackCard from "@/src/components/shared/FeedbackCard/FeedbackCard";
import FooterLinks from "@/src/components/FooterLinks/FooterLinks";
import StructureCard from "@/src/components/shared/StructureCard/StructureCard";

export default function UiKit() {
  return (
    <main>
      <ExampleButtons />
      <ScrollToTopBtn />
      <FeedbackCard />
      <FooterLinks />
      <StructureCard />
    </main>
  );
}
