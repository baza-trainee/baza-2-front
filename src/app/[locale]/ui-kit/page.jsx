import SocialIcons from "@/src/components/shared/SocialIcons/SocialIcons";
import HeroCard from "@/src/components/shared/HeroCard/HeroCard";
import RegistrationFormModal from "@/src/components/modals/RegistrationFormModal/RegistrationFormModal";
import JoinProjectSection from "@/src/components/JoinProjectSection/JoinProjectSection";
import ContactFormSection from "@/src/components/main-page/ContactFormSection/ContactFormSection";
import ExampleProjects from "@/src/example-data/ExampleProjects/ExampleProjects";

export default function UiKit() {
  return (
    <main>
      <ExampleProjects/>
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
