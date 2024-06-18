import AdvantagesSection from "@/src/components/AdvantagesSection/AdvantagesSection";
import JoinProjectSection from "@/src/components/JoinProjectSection/JoinProjectSection";
import RoleSection from "@/src/components/RoleSection/RoleSection";
import RegistrationFormModal from "@/src/components/modals/RegistrationFormModal/RegistrationFormModal";
export default function Internship() {
  return (
    <main style={{ marginTop: "120px" }}>
      <RoleSection />
      <JoinProjectSection style={{ marginBottom: "20px" }} />
      <AdvantagesSection />
      <RegistrationFormModal />
    </main>
  );
}
