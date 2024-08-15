'use client';
import clsx from 'clsx'
import { usePathname, useRouter } from '@/src/navigation';
import InputSearch from '../../shared/inputs/InputSearch/InputSearch'
import LangDropdown from '../../shared/LangDropdown/LangDropdown'
import styles from './HeaderAdmin.module.scss'
import { Icon } from '../../shared/Icon/Icon'
import { useParams } from 'next/navigation';

export default function HeaderAdmin({ title, hendleSearch, lang, defaultValue, nav }) {

  const router = useRouter();
  const pathname = usePathname()
  const {id}= useParams()

  const isActive=(name)=>{
   return pathname.split('/').includes(name)
  }
  const addDescriptionPath = `/admin/projects/${isActive('add')?'add':`edit/${id}`}/description`
  const addTeamPath = `/admin/projects/${isActive('add')?'add':`edit/${id}`}/team`
  return(
    <header className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{title}</h1>
        <div className={clsx(styles.options)}>
          {hendleSearch && <InputSearch onSubmit={hendleSearch} defaultValue={defaultValue} className={styles.inputSearch}/>}
          {lang && <LangDropdown/>}
        </div>
      </div>
      {nav && <div className={styles.nav}>
          <button type="button" className={clsx(styles.link, isActive('description') && styles._active)} onClick={()=>{
            router.replace(addDescriptionPath)
          }}>
            <span className={styles.text}>{'Опис'}</span> 
            <Icon name={'press_about'} className={styles.icon}/>
          </button>

          <button type="button" className={clsx(styles.link, isActive('team') && styles._active)} onClick={()=>{
            router.replace(addTeamPath)
          }}>
            <span className={styles.text}>{'Команда'}</span> 
            <Icon name={'team_admin'} className={styles.icon}/>
          </button>
        </div>
      }
    </header>
  )
}