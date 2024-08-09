'use client';
import styles from './Projects.module.scss'
import { useRouter } from '@/src/navigation';
//import { useMutation, useQuery } from '@tanstack/react-query';
//import { deletePartnerById, getAllPartners } from '@/src/api/partners';
import SectionAdmin from "../SectionAdmin/SectionAdmin";
import MainButton from '../../shared/MainButton/MainButton';
//import PartnerList from './PartnerList/PartnerList';
import { useState } from 'react';
import { Icon } from '../../shared/Icon/Icon';
import Loader from '../../shared/loader/Loader';
import UseAlert from '../../shared/UseAlert/UseAlert';
import stateUseAlert from '@/src/state/stateUseAlert';
import PartnerList from './ProjectsList/ProjectsList';
import { deleteProjectById, getAllProjects } from '@/src/api/projects';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function Projects() {
  const router = useRouter();
  const [ search, setSearch ] = useState('')
  const open = stateUseAlert(state => state.open);

  const { isError, data, refetch } = useQuery({ queryKey: ['projects', search], 
    queryFn:()=>{return getAllProjects({query:search})}, keepPreviousData: true });

  const deleteProject = useMutation({
    mutationFn:(id) => {
      return deleteProjectById(id)
    },onSuccess: () => {
      refetch()
    },onError:()=>{
      open('error', false)
    }})

  return(
    <SectionAdmin title={'Проєкти'} hendleSearch={setSearch} lang={true} defaultValue={search}>
      <MainButton  variant='admin' className={styles.btn} onClick={()=>{
        router.push('/admin/projects/add-project')
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
            <PartnerList data={data?.results} hendleRemove={deleteProject.mutate}/>
          }
        </>
      }
      {/* {deletePartner.isPending && <Loader/>} */}
      <UseAlert/>
    </SectionAdmin>
  )
}