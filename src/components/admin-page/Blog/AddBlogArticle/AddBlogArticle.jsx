'use client';
import { useCallback, useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import { createNewBlogArticle } from '@/src/api/blog';
import stateUseAlert from '@/src/state/stateUseAlert';
import SectionAdmin from '../../SectionAdmin/SectionAdmin'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import Loader from '@/src/components/shared/loader/Loader';
import BlogArticleForm from '../BlogArticleForm/BlogArticleForm';

export default function AddBlogArticle() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/blog')
  })
  // Запит на створення нової статті
  const { mutate, isPending, error } = useMutation({
    mutationFn:(data) => {
      return createNewBlogArticle(data)
    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})


 return( 
    <SectionAdmin title={'Додати статтю'}>
      <BlogArticleForm hendleMutate={mutate} variant='add'/>

      { isPending && <Loader/> }

      <AdminModal 
        isOpen={modalOpen} 
        handleCallback={closeModal} 
        title={'Статтю успішно додано'} 
        btn={true}>
      </AdminModal>

      <UseAlert text={error && error.message}/>
    </SectionAdmin>
  )
}