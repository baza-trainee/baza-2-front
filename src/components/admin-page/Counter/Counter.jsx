"use client";

import styles from './Counter.module.scss'
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import { useMutation, useQuery } from '@tanstack/react-query';
import { getEmployed, updateEmployed } from '@/src/api/achievements'
import { useState } from 'react';
import InputField from '../../shared/InputField/InputField';
import Loader from '../../shared/loader/Loader';


export default function Counter() {
  const employed = useQuery({ queryKey: ['employed'], queryFn: getEmployed });
  const { mutate, isPending, isError, data, error } = useMutation({
    mutationFn:(data) => {
      return updateEmployed(data)

    },onSuccess: () => {
      employed.refetch()
    },})

    const [valueEmployed,setValueEmployed] = useState(1)
  
   
  return (
    <section className={styles.section}>
      <HeaderAdmin title={'Каунтер'}/>
      <div className={styles.srroll_wrapper}>
       {employed.data && <h1>employed: {employed.data.employed}</h1>}

       <InputField version={'input'} type='number'className={styles.input}  value={valueEmployed} onChange={(e)=>{setValueEmployed(e.target.value)}}/>
        <p className={styles.btn} onClick={()=>{mutate({
  "employed": Number(valueEmployed)
})}}>Змінити</p>

      </div>
      {isPending && <Loader/>}
    </section>
  )
}