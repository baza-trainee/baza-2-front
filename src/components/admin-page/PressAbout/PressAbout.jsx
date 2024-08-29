'use client';
import styles from './PressAbout.module.scss';
import { useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteArticleById, getAllArticles } from '@/src/api/articles';
import SectionAdmin from '../SectionAdmin/SectionAdmin';
import { Icon } from '../../shared/Icon/Icon';
import MainButton from '../../shared/MainButton/MainButton';
import Loader from '../../shared/loader/Loader';
import UseAlert from '../../shared/UseAlert/UseAlert';
import stateUseAlert from '@/src/state/stateUseAlert';
import PressList from './PressList/PressList';

export default function PressAbout() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const addPressPath = '/admin/press-about/add'

  // Параметри сторінок
  const [ params, setParams] = useState({
    search:'',
    page:1
  })

  // Функція пошуку
  const hendleSetSearch = (value) => {
    setParams({ page:1, search:value })
  }
  // Функція пагінації
  const hendleSetPage = (value) => {
    setParams({...params, page:value})
  }

  // Запит на базу  limit:6 - можливо краще 4
  const { isError, data, refetch } = useQuery({ queryKey: ['articles',  params.search, params.page], 
    queryFn:()=>{return getAllArticles({...params, limit:6})}, keepPreviousData: true });
 
  // Запит на видалення
  const deleteArticle = useMutation({
    mutationFn:(id) => {
      return deleteArticleById(id)
    },onSuccess: () => {
      refetch()
    },onError:()=>{
      open('error', false)
    }})

  return(
    <SectionAdmin 
      title={"Пресса про нас"} 
      hendleSearch={hendleSetSearch} 
      defaultValue={params.search}>

        <MainButton  variant='admin' className={styles.btn} onClick={()=>{
          router.push(addPressPath)
        }}>
          <Icon name={'plus_icon'} width={24} height={24} />
          {'Додати статтю'}
        </MainButton >

        { deleteArticle.isPending && <Loader/> }

        {isError ?
          <>
            <p className={styles.error}>Помилка завантаження контенту.</p>
            <p className={styles.error}>Оновіть сторінку або спробуйте пізніше.</p>
          </>:
          <>
            {data && <PressList 
              data={data} 
              hendleSetPage={hendleSetPage} 
              hendleRemove={ deleteArticle.mutate }/>
            }
          </>
        }

        <UseAlert/>
    </SectionAdmin>
  )
}