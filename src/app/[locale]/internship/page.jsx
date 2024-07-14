import AdvantagesSection from "@/src/components/AdvantagesSection/AdvantagesSection";
import JoinProjectSection from "@/src/components/JoinProjectSection/JoinProjectSection";
import RoleSection from "@/src/components/RoleSection/RoleSection";
import RegistrationFormModal from "@/src/components/modals/RegistrationFormModal/RegistrationFormModal";
import HiddenTtitlePage from "@/src/components/shared/HiddenTtitlePage/HiddenTtitlePage";
export default function Internship() {
  return (
    <main>
      <HiddenTtitlePage namePage={'internship'}/>
      <RoleSection />
      <JoinProjectSection />
      <AdvantagesSection />
      <RegistrationFormModal />
    </main>
  );
}
