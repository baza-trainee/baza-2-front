'use client';
import clsx from 'clsx'
import InputSearch from '../../shared/inputs/InputSearch/InputSearch'
import LangDropdown from '../../shared/LangDropdown/LangDropdown'
import styles from './HeaderAdmin.module.scss'
import { Icon } from '../../shared/Icon/Icon'
import { useState } from 'react'

export default function HeaderAdmin({ title, hendleSearch, lang, defaultValue, nav, hendleNav=()=>{} }) {

  const[ subpageName, setSubpageName ] = useState('description');

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

          <button type="button" className={clsx(styles.link,subpageName==='description'&& styles._active)} onClick={()=>{
            setSubpageName('description')
            hendleNav('description')
          }}>
            <span className={styles.text}>{'Опис'}</span> 
            <Icon name={'press_about'} className={styles.icon}/>
          </button>

          <button type="button" className={clsx(styles.link,subpageName==='team'&& styles._active)} onClick={()=>{
            setSubpageName('team')
            hendleNav('team')
          }}>
            <span className={styles.text}>{'Команда'}</span> 
            <Icon name={'team_admin'} className={styles.icon}/>
          </button>
        </div>
      }
    </header>
  )
}