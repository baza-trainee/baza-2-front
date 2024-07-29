'use client';
import styles from './Partners.module.scss'
import { useRouter } from '@/src/navigation';
import { useQuery } from '@tanstack/react-query';
import { getAllPartners } from '@/src/api/partners';
import SectionAdmin from "../SectionAdmin/SectionAdmin";
import MainButton from '../../shared/MainButton/MainButton';
import PartnerList from './PartnerList/PartnerList';
import { useState } from 'react';
//PartnerCard edit-partner
export default function Partners() {
  const router = useRouter();
  const [ search, setSearch ] = useState('')

  const { isError, data, refetch } = useQuery({ queryKey: ['partners', search], 
    queryFn:()=>{return getAllPartners({query:search})}, keepPreviousData: true });

  return(
    <SectionAdmin title={'Партнери'} hendleSearch={setSearch} lang={true}>
      <MainButton  variant='admin' className={styles.btn} onClick={()=>{
        router.push('/admin/partners/add-partner')
      }}>{'➕ Додати партнера'}</MainButton >

      {data?.results && !isError && <PartnerList data={data?.results}/>}
    </SectionAdmin>
  )
}