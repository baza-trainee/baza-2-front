import AdvantagesSection from "@/src/components/internship-page/AdvantagesSection/AdvantagesSection";
import JoinProjectSection from "@/src/components/internship-page/JoinProjectSection/JoinProjectSection";
import RoleSection from "@/src/components/internship-page/RoleSection/RoleSection";
import RegistrationFormModal from "@/src/components/modals/RegistrationFormModal/RegistrationFormModal";
import HiddenTtitlePage from "@/src/components/shared/HiddenTtitlePage/HiddenTtitlePage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }){
  const t = await getTranslations({
    locale:params.locale, 
    namespace: 'Metadata'
  });
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.locale}/internship`; 
  return {
    title: t('internship_title'),
    description: t('internship_description'),
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
