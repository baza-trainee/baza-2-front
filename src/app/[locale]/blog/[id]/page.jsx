import BlogArticleSection from "@/src/components/blog-page/BlogArticleSection/BlogArticleSection";
import { truncateString } from "@/src/lib/utils/truncateString";
import { getTranslations } from "next-intl/server";


export async function generateMetadata({ params }) {
  const t = await getTranslations({
    locale:params.locale, 
    namespace: 'Metadata'
  });

  const id = params.id;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.locale}/blog/${id}`;
  const defaultTitle = `${t('article_title')}-${params.id}`
  // fetch data
  const article = await fetch(`${process.env.NEXT_PUBLIC_API2_URL}/blog/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch article');
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  // Формуємо метадані
  const metadata = {
    title: article?.title? truncateString(article?.title, 60) : defaultTitle,
    alternates: {
      canonical: canonicalUrl,
    },
  };

  // Додаємо description тільки якщо є текст
  if (article?.text) {
    metadata.description = truncateString(article.text, 155);
  }

  return metadata;
}

export default function articlePage() {
  return <BlogArticleSection />
}
