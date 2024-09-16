import Projects from "@/src/components/projects-page/Projects";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }){
  const t = await getTranslations({
    locale:params.locale, 
    namespace: 'Metadata'
  });

  return {
    title: t('projects_title'),
    description: t('projects_description'),
  };
};

export default function ProjectsPage() {
  return (
    <main>
      <Projects />
    </main>
  );
}
