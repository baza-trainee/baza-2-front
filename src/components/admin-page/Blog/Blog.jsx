'use client';
import { useRouter } from '@/src/navigation';
import SectionAdmin from '../SectionAdmin/SectionAdmin'
import styles from './Blog.module.scss'
import stateUseAlert from '@/src/state/stateUseAlert';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteBlogArticleById, getAllBlogArticles } from '@/src/api/blog';
import MainButton from '../../shared/MainButton/MainButton';
import { Icon } from '../../shared/Icon/Icon';
import Loader from '../../shared/loader/Loader';
import UseAlert from '../../shared/UseAlert/UseAlert';
import BlogList from './BlogList/BlogList';

export default function Blog() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);

  const [ params, setParams] = useState({
    search:'',
    page:1
  })

  const hendleSetSearch = (value) => {
    setParams({page:1,search:value})
  }

  const hendleSetPage = (value) => {
    setParams({...params, page:value})
  }


  const addBlogArticlePath = '/admin/blog/add'

  // Запит на базу
  const { isError, data, refetch } = useQuery({ queryKey: ['articles-blog',  params.search, params.page], 
    queryFn:()=>{return getAllBlogArticles({...params})}, keepPreviousData: true });
 
  // Запит на видалення
  const deleteArticle = useMutation({
    mutationFn:(id) => {
      return deleteBlogArticleById(id)
    },onSuccess: () => {
      refetch()
    },onError:()=>{
      //open('error', false)
    }})


  return (
    <SectionAdmin 
      title={'Блог'} hendleSearch={hendleSetSearch}> 
        <MainButton  variant='admin' className={styles.btn} onClick={()=>{
            router.push(addBlogArticlePath)
          }}>
            <Icon name={'plus_icon'} width={24} height={24} />
          {'Додати статтю'}
        </MainButton >

        {isError ?
        <>
          <p className={styles.error}>Помилка завантаження контенту.</p>
          <p className={styles.error}>Оновіть сторінку або спробуйте пізніше.</p>
        </>:
        <>
          {data && <BlogList 
            data={data} 
            hendleRemove={deleteArticle.mutate} 
            hendleSetPage={hendleSetPage}/>}
        </>
      }

      { deleteArticle.isPending && <Loader/> }

      <UseAlert/>  
    </SectionAdmin>
  )
}