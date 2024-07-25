"use client";

import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import styles from './Settings.module.scss'
import SettingsForm from './SettingsForm/SettingsForm'

export default function Settings({variant='settings'}) {
const title = variant==='settings'&&'Налаштування'||variant==='edit'&&'Змінити пароль'
  return (
    <section className={styles.section}>
      <HeaderAdmin title={title}/>
      <div className={styles.srroll_wrapper}>
       {variant==='settings' && <SettingsForm/>}
       {variant==='edit' && <ChangePasswordForm/>}
      </div>
    </section>
  )
}