import BlogArticleSection from "@/src/components/blog-page/BlogArticleSection/BlogArticleSection";
import { truncateString } from "@/src/lib/utils/truncateString";

// metadata
const metadataBlogArticlePage ={
  ua:{
    title: "Стаття",
  },
  en:{
    title: "Article",
  }, 
  pl:{
    title: "Artykuł",
  },
}

export async function generateMetadata({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const id = params.id;
  const defaultTitle = `${metadataBlogArticlePage[params.locale].title}-${params.id}`
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
    title: truncateString(article?.title || defaultTitle, 60),
    alternates: {
      languages: {
        'uk-UA': `${baseUrl}/ua/blog/${id}`,
        'en': `${baseUrl}/en/blog/${id}`,
        'pl': `${baseUrl}/pl/blog/${id}`,
      }
    }
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
