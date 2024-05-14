//"use client";
//import { useState } from "react";
import { ScrollToTopBtn } from "@/src/components/shared/ScrollToTopBtn/ScrollToTopBtn";
import FooterLinks from "@/src/components/shared/FooterLinks/FooterLinks";
import PartnerCard from "@/src/components/shared/PartnerCard/PartnerCard";
import SocialIcons from "@/src/components/shared/SocialIcons/SocialIcons";
import HeroCard from "@/src/components/shared/HeroCard/HeroCard";
import RegistrationFormModal from "../../../components/RegistrationFormModal/RegistrationFormModal";
//import { useBodyLock } from "../../../lib/hooks/useBodyLock";
import StructureSection from "../../../components/StructureSection/StructureSection";

export default function UiKit() {
  //const [regModalOpen, setRegModalOpen] = useState(false);
  //useBodyLock(regModalOpen);
  return (
    <main>
      <ScrollToTopBtn />
      <FooterLinks />
      <PartnerCard />

   <RegistrationFormModal/>
      <StructureSection />
      <HeroCard
        title="slide_1.title"
        desc="slide_1.text"
        img="/images/hero_section/img-hero.jpg"
      />
      <SocialIcons />
      {/* <button
        style={{
          margin: "10px",
          padding: "10px",
          backgroundColor: "white",
          color: "black",
        }}
        onClick={(e) => (setRegModalOpen(true), e.stopPropagation())}
      >
        open RegistrationModal
      </button> */}
    </main>
  );
}
