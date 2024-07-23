"use client";
import { useEffect } from 'react';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import styles from './Settings.module.scss'
import SettingsForm from './SettingsForm/SettingsForm'

export default function Settings() {
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        `https://baza-trainee.tech/api/v1/auth/user`,
        // {credentials: "include",}
        // { cache: 'no-store' }
      );
      if (response.ok) {
        //router.push('/admin');
        //setIsShow(true);
      } else {
        //router.push('/');
      }
      console.log(response)
    };
   
    getUser();
  }, []);


  return (
    <section className={styles.section}>
      <HeaderAdmin title={'Налаштування'}/>
      <div className={styles.srroll_wrapper}>
        <SettingsForm/>
      </div>
    </section>
  )
}