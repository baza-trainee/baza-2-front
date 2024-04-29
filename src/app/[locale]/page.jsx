import style from "./page.module.scss";

import CarouselTestSection from "@/src/components/CarouselTestSection/CarouselTestSection";
import RoleCardTestSection from "@/src/components/RoleCardTestSection/RoleCardTestSection";
import ExampleButtons from "@/src/components/ExampleButtons/ExampleButtons";
import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";
import FeedbackCard from "@/src/components/shared/FeedbackCard/FeedbackCard";
import FooterLinks from "@/src/components/FooterLinks/FooterLinks";

export default function Home() {
  return (
    <main>
      <ExampleButtons />
      <ScrollToTopBtn />
      <FeedbackCard />
      <CarouselTestSection />
      <RoleCardTestSection />
      <FooterLinks />
    </main>
  );
}
