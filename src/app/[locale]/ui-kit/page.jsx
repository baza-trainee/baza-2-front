import ExampleButtons from "@/src/components/ExampleButtons/ExampleButtons";
import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";
import FeedbackCard from "@/src/components/shared/FeedbackCard/FeedbackCard";
import FooterLinks from "@/src/components/FooterLinks/FooterLinks";
import Logo from "@/src/components/shared/Logo/Logo";

export default function UiKit() {
  return (
    <main>
      <ExampleButtons />
      <ScrollToTopBtn />
      <FeedbackCard />
      <FooterLinks />
      <Logo variant="footer"/>
    </main>
  );
}
