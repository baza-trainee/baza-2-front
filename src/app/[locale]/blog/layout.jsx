import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }){
  const t = await getTranslations({
    locale:params.locale, 
    namespace: 'Metadata'
  });

  return {
    title: t('blog_title'),
    description: t('blog_description'),
  };
};

export default function layoutBlog( {children}) {
  return (
    <main>
      {children}
    </main>
  );
};