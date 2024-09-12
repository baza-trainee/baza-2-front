import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }){
  const t = await getTranslations({
    locale:params.locale, 
    namespace: 'Metadata'
  });

  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.locale}/blog`;
  return {
    title: t('blog_title'),
    description: t('blog_description'),
    alternates: {
      canonical: canonicalUrl,
    },
  };
};

export default function layoutBlog( {children}) {
  return (
    <main>
      {children}
    </main>
  );
};