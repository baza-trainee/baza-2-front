import BlogArticleSection from "@/src/components/blog-page/BlogArticleSection/BlogArticleSection";

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

export const generateMetadata = ({ params }) => {
  return {
    title: `${metadataBlogArticlePage[params.locale].title}-${params.id}`,
  };
};

export default function articlePage() {
  return <BlogArticleSection />;
}
