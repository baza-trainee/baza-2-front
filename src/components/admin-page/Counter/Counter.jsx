"use client";

import styles from './Counter.module.scss'
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import { useMutation, useQuery } from '@tanstack/react-query';
import { getEmployed, updateEmployed } from '@/src/api/achievements'
import { useEffect } from 'react';
import { getInfoUser } from '@/src/api/auth';

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
  
  //   useEffect(() => {
  //     const getUser = async () => {
  //       const response = await fetch('https://baza2.crabdance.com/api/v1/auth/login', {
  //   method: "POST",
  //   credentials: "same-origin", 
  //   body: JSON.stringify({"email": "user@example.com",
  // "password": "password123"}),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }).then((response) => {
  //   return response.json();
  // }).then((data) => {
  //   console.log(data);
  // })
  //     };
     
  //     getUser();
  //   }, []);
  const employed = useQuery({ 
    queryKey: ['InfoUser'], 
    queryFn: getInfoUser
  });

 // console.log(employed.data)

// if(!employed.data){return null}
  //console.log(employed.data)

  return (
    <section className={styles.section}>
      <HeaderAdmin title={'Каунтер'}/>
      <div className={styles.srroll_wrapper}>

      {<h1>employed: {employed.data.employed}</h1>} 
      </div>
    </section>
  )
}