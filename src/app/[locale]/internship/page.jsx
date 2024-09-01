import AdvantagesSection from "@/src/components/internship-page/AdvantagesSection/AdvantagesSection";
import JoinProjectSection from "@/src/components/internship-page/JoinProjectSection/JoinProjectSection";
import RoleSection from "@/src/components/internship-page/RoleSection/RoleSection";
import RegistrationFormModal from "@/src/components/modals/RegistrationFormModal/RegistrationFormModal";
import HiddenTtitlePage from "@/src/components/shared/HiddenTtitlePage/HiddenTtitlePage";

// metadata
const metadataInternshipPage ={
  ua:{
    title: "Стажування",
    description : "Baza Trainee Ukraine Стажування"
  },
  en:{
    title: "Internship",
    description : "Baza Trainee Ukraine Internship"
  }, 
  pl:{
    title: "Praktyka",
    description : "Baza Trainee Ukraine Praktyka"
  },
}

export const generateMetadata = ({ params }) => {
  return {
    title: metadataInternshipPage[params.locale].title,
    description: metadataInternshipPage[params.locale].description,
  };
};

export default function InternshipPage() {
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
