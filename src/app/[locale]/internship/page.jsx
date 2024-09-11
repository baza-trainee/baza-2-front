import AdvantagesSection from "@/src/components/internship-page/AdvantagesSection/AdvantagesSection";
import JoinProjectSection from "@/src/components/internship-page/JoinProjectSection/JoinProjectSection";
import RoleSection from "@/src/components/internship-page/RoleSection/RoleSection";
import RegistrationFormModal from "@/src/components/modals/RegistrationFormModal/RegistrationFormModal";
import HiddenTtitlePage from "@/src/components/shared/HiddenTtitlePage/HiddenTtitlePage";

// metadata
const metadataInternshipPage ={ 
  ua:{ 
    title: "Baza Trainee Ukraine Стажування – єдине практичне стажування в розробці", 
    description : "Baza Trainee Ukraine: З нуля до джуна за 6 місяців - наша практика доступна в будь-який час" 
  }, 
  en:{ 
    title: "Baza Trainee Ukraine Internship - the only practical internship in development", 
    description : "Baza Trainee Ukraine Internship: From zero to junior in 6 months - our practice is available at any time" 
  }, 
  pl:{ 
    title: "Baza Trainee Ukraine Praktyka", 
    description : "Baza Trainee Ukraine Praktyka: Od zera do juniora w 6 miesięcy - nasza praktyka jest dostępna w każdej chwili" 
  }, 
}

export async function generateMetadata({ params }){
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/ua/internship`; 
  return {
    title: metadataInternshipPage[params.locale].title,
    description: metadataInternshipPage[params.locale].description,
    alternates: {
      canonical: canonicalUrl,
    },
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
