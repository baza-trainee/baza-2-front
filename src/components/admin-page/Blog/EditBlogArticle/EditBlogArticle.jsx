'use client';
import { useCallback, useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getBlogArticleById, updateBlogArticleById } from '@/src/api/blog';
import stateUseAlert from '@/src/state/stateUseAlert';
import SectionAdmin from '../../SectionAdmin/SectionAdmin'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import Loader from '@/src/components/shared/loader/Loader';
import BlogArticleForm from '../BlogArticleForm/BlogArticleForm';

export default function EditBlogArticle() {
  const router = useRouter();
  const {id}= useParams()
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/blog')
  })
  // Запит отримання статті по Id
  const articleById = useQuery({ 
    queryKey: ['article', id], 
    queryFn:()=>{return getBlogArticleById(id)}, 
    keepPreviousData: true 
  });
  //  Запит редагування статті по Id
  const { mutate, isPending, error } = useMutation({
    mutationFn:(data) => {
      return updateBlogArticleById(id,data)
    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})

 return( 
    <SectionAdmin title={'Редагувати статтю'}>

      <BlogArticleForm 
        hendleMutate={mutate} 
        data={articleById.data} 
        submitBtnText='Зберегти'/>

      { isPending && <Loader/> }

      <AdminModal 
        isOpen={modalOpen} 
        handleCallback={closeModal} 
        title={'Дані успішно збережено'} 
        btn={true}>
      </AdminModal>

      <UseAlert text={error && error.message}/>
    </SectionAdmin>
  )
}