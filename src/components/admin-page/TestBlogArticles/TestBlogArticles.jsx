'use client';
//import { createNewArticle, deleteArticleById, getAllArticles } from "@/src/api/articles";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReviewForm from "./ReviewForm/ReviewForm";
import { createImageUrl } from "@/src/lib/hooks/createImageUrl";
import SectionAdmin from "../SectionAdmin/SectionAdmin";
import { createNewBlogArticle, deleteBlogArticleById, getAllBlogArticles } from "@/src/api/blog";

export default function TestBlogArticles() {
const s=''
const l=25
  // const { isError, data, refetch } = useQuery({ queryKey: ['articles',s,l], 
  //   queryFn:()=>{return getAllArticles({limit:l, search:s})}, keepPreviousData: true });

  const { isError, data, refetch } = useQuery({ queryKey: ['articles',s,l], 
    queryFn:()=>{return getAllBlogArticles({limit:l, search:s})}, keepPreviousData: true });



    if(data){
      console.log(data)
    }


  const createArticle = useMutation({
    mutationFn:(data) => {
      return createNewBlogArticle(data)
    },onSuccess: () => {
      refetch()
    },onError:()=>{
      //open('error', false)
    }})





  const deleteArticle = useMutation({
    mutationFn:(id) => {
      return deleteBlogArticleById(id)
    },onSuccess: () => {
      refetch()
    },onError:()=>{
      //open('error', false)
    }})

  const deleteA  =(id)=>{
    deleteArticle.mutate(id)
  }


  return (

       <SectionAdmin 
      title={'Test Blog and Articles'} 
      //hendleSearch={hendleSetSearch} 
      //lang={true} 
     // defaultValue={params.search}
     >

      {data&& data.results.map((el)=>{
        return(
          <div key={el._id} onClick={()=>{deleteA(el._id)}}>
            <h2>{el.title}</h2>
           {el.description && <p>{el.description}</p>}
           { el.text && <p>{el.text}</p>}
            <img width={150} src={createImageUrl(el.imageUrl)} alt={el.title}/>
          </div>
        )
      })}
   
      <ReviewForm hendleMutate={createArticle.mutate}/>
    </SectionAdmin>
  )
}