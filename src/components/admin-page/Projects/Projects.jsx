'use client';
import styles from './Projects.module.scss'
import { useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import SectionAdmin from "../SectionAdmin/SectionAdmin";
import MainButton from '../../shared/MainButton/MainButton';
import { Icon } from '../../shared/Icon/Icon';
import Loader from '../../shared/loader/Loader';
import stateUseAlert from '@/src/state/stateUseAlert';
import PartnerList from './ProjectsList/ProjectsList';
import { deleteProjectById, getAllProjects, getAllProjects2 } from '@/src/api/projects';

export default function Projects() {
  const router = useRouter();
  const addProjectPath = '/admin/projects/add'
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

  const { isError, data, refetch } = useQuery({ queryKey: ['projects', params.search, params.page], 
    queryFn:()=>{return getAllProjects2({...params, limit:6})}, keepPreviousData: true });

  const deleteProject = useMutation({
    mutationFn:(id) => {
      return deleteProjectById(id)
    },onSuccess: () => {
      refetch()
    },onError:()=>{
      open('error', false)
    }})

  return(
    <SectionAdmin 
      title={'Проєкти'} 
      hendleSearch={hendleSetSearch} 
      lang={true} 
      defaultValue={params.search}>

      <MainButton  variant='admin' 
        className={styles.btn} 
        onClick={()=>{
          router.push(addProjectPath)
        }}>
        <Icon name={'plus_icon'} width={24} height={24}/>
        {'Додати проєкт'}</MainButton >
      {isError ?
        <>
          <p className={styles.error}>Помилка завантаження контенту.</p>
          <p className={styles.error}>Оновіть сторінку або спробуйте пізніше.</p>
        </>:
        <>
          {data?.results && 
            <PartnerList data={data} hendleRemove={deleteProject.mutate} hendleSetPage={hendleSetPage}/>
          }
        </>
      }

      {deleteProject.isPending && <Loader/>}
      <UseAlert/>
    </SectionAdmin>
  )
}