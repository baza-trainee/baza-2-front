'use client';
import clsx from 'clsx'
import InputSearch from '../../shared/inputs/InputSearch/InputSearch'
import LangDropdown from '../../shared/LangDropdown/LangDropdown'
import styles from './HeaderAdmin.module.scss'
import { Icon } from '../../shared/Icon/Icon'
import switchTabProject from '@/src/state/switchTabProject';
import { usePathname } from '@/src/navigation';

export default function HeaderAdmin({ title, hendleSearch, lang, defaultValue, nav }) {
  const pathname = usePathname()
  const tabName = switchTabProject(state => state.tabName);
  const switchName = switchTabProject(state => state.switch);

  const isActiveProject=(name)=>{
    return pathname.split('/').includes(name)
   }

  const isActive=(name)=>{
   return tabName === name
  }

  return(
    <header className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{title}</h1>
        <div className={clsx(styles.options)}>
          {hendleSearch && <InputSearch onSubmit={hendleSearch} defaultValue={defaultValue} className={styles.inputSearch}/>}
          {lang && <LangDropdown type={isActiveProject('projects') ? '':'admin'}/>}
        </div>
      </div>
      {nav && <div className={styles.nav}>
          <button type="button" className={clsx(styles.link, isActive('description') && styles._active)} onClick={()=>{
            switchName('description')
          }}>
            <span className={styles.text}>{'Опис'}</span> 
            <Icon name={'press_about'} className={styles.icon}/>
          </button>

          <button type="button" className={clsx(styles.link, isActive('team') && styles._active)} onClick={()=>{
            switchName('team')
          }}>
            <span className={styles.text}>{'Команда'}</span> 
            <Icon name={'team_admin'} className={styles.icon}/>
          </button>
        </div>
      }
    </header>
  )
}