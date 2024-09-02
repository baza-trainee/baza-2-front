import BlogArticleSection from "@/src/components/blog-page/BlogArticleSection/BlogArticleSection";

// export const generateMetadata = async ({ params }) => {
//   // const response = await fetch(`${process.env.NEXT_PUBLIC_API2_URL}/${params.id}`)
//   // if (!response.ok) {
//   //   console.log("Ответ сети был не ok.");
//   // }
//   // //const article = await response.json();
//   // console.log(response)
//   // const article = await(res)=>{
//   //   if(res.ok){
//   //     return res.json();
//   //   }
//   // }
//   // if(res.ok){
//   //   const article = await res.json();
//   // }

//   return {
//     title: article?.title || 'Стаття',
//   };
// };


export default function articlePage() {
  return <BlogArticleSection />;
}
