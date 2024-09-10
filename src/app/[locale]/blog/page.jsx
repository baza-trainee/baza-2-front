import BlogSection from "@/src/components/blog-page/BlogSection/BlogSection";
import HiddenTtitlePage from "@/src/components/shared/HiddenTtitlePage/HiddenTtitlePage";

export default function blogPage() {
  return (
    <>  
      <HiddenTtitlePage namePage={'blog'}/>
      <BlogSection />
    </>
  )
}
