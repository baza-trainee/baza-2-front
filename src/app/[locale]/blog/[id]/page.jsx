import BlogArticleSection from "@/src/components/blog-page/BlogArticleSection/BlogArticleSection";
import { getTranslations } from "next-intl/server";
import { truncateString } from "@/src/lib/utils/truncateString";

export async function generateMetadata({ params }) {
  const baseApiUrl = process.env.NEXT_PUBLIC_API2_URL ? 
    process.env.NEXT_PUBLIC_API2_URL : 
    ''; 
    
  const t = await getTranslations({
    locale:params.locale, 
    namespace: 'Metadata'
  });

  const id = params.id;
  const defaultTitle = `${t('article_title')}-${id}`
  // fetch data
  const article = await fetch(`${baseApiUrl}/blog/${id}`)
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
    title: article?.title? truncateString(article?.title, 57) : defaultTitle,
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
