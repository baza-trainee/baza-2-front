import Projects from "@/src/components/projects-page/Projects";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }){
  const baseUrl = process.env.VERCEL_URL ? 
    `https://${process.env.VERCEL_URL}` : 
    process.env.NEXT_PUBLIC_BASE_URL;

  const t = await getTranslations({
    locale:params.locale, 
    namespace: 'Metadata'
  });

  const canonicalUrl = `${baseUrl}/${params.locale}/projects`; 
  return {
    title: t('projects_title'),
    description: t('projects_description'),
    alternates: {
      canonical: canonicalUrl,
    },
  };
};

export default function ProjectsPage() {
  return (
    <main>
      <Projects />
    </main>
  );
}
