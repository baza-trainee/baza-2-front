"use client";

import styles from './Counter.module.scss'
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import { useMutation, useQuery } from '@tanstack/react-query';
import { getEmployed, updateEmployed } from '@/src/api/achievements'
import { useEffect } from 'react';

export default function Counter() {
  const { mutate, isPending, isError, data, error } = useMutation({
    mutationFn:(data) => {
      return updateEmployed(data)
    }})
    
    // useEffect(() => {
    //   const getUser = async () => {
    //     const response = await fetch(
    //       `https://baza2.crabdance.com/api/v1/auth/user`,
    //       { cache: 'no-store' }
    //     );
    //     if (response.ok) {
    //       //router.push('/admin');
    //       //setIsShow(true);
    //     } else {
    //       //router.push('/');
    //     }
    //     console.log(response)
    //   };
     
    //   getUser();
    // }, []);
  

  const employed = useQuery({ 
    queryKey: ['Employed'], 
    queryFn: getEmployed 
  });
if(!employed.data){return null}
  console.log(employed.data)

  return (
    <section className={styles.section}>
      <HeaderAdmin title={'Каунтер'}/>
      <div className={styles.srroll_wrapper}>

      {<h1>employed: {employed.data.employed}</h1>}
      </div>
    </section>
  )
}