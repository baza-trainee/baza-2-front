"use client";
import styles from './NavBar.module.scss'
import clsx from "clsx";
import { useEffect, useState } from 'react';
import { Link, usePathname, useRouter } from '@/src/navigation';
import { createKey } from '@/src/lib/utils/createKey';
import { token } from '@/src/api/auth';
import Logo from '../../shared/Logo/Logo';
import MainButton from '../../shared/MainButton/MainButton';
import { Icon } from '../../shared/Icon/Icon';
import { links } from './linksType';

export default function NavBar() {
  const pathname = usePathname()
  const router = useRouter();
  const [ hide, setHide ]= useState(false)
  const [ hideMenu, setHideMenu ]= useState(true)

  const removeToken=()=>{
    token.reset()
    router.replace('/');
  }

  const isActive=(name)=>{
   return pathname.split('/').includes(name)
  }
  // Зачиняє меню як що не проєкти
  useEffect(()=>{
    if(isActive('projects') || isActive('members')|| isActive('specialization')){return}
     setHideMenu(true)
  },[pathname])

  const subMenu=(el)=>{
    return(
      <ul className={styles.menu}>
        <li className={styles.menu_btn}>
          <Link className={clsx(styles.link, isActive(el.name) && styles._active)} href={el.href}>
            <Icon name={el.icon} className={styles.icon}/>
            <span className={styles.text}>{el.content}</span>
          </Link>
          <button onClick={()=>{setHideMenu(!hideMenu)}} 
            className={styles.option_btn}>
            <Icon className={clsx(styles.btn_icon, hideMenu && styles._active)} name="carousel-arrow"/>
          </button>
        </li>
        <li className={clsx(styles.menu_option, hideMenu && styles._hide_menu)}>
          {el?.menu && el.menu.map((e)=>{
            return (
              <Link key={e.name}  className={clsx(styles.link, isActive(e.name) && styles._active)} href={e.href}>
                <Icon name={e.icon} className={styles.icon}/>
                <span className={styles.text}>{e.content}</span>
              </Link>
            )
          })}
         </li> 
      </ul>
    )
  }

  return (
    <div className={clsx(styles.wrapp, hide && styles._hide)}>
      <header className={styles.header}>
        <Logo className={styles.logo}/>
      </header>
      <MainButton onClick={()=>{setHide(!hide)}} className={styles.btn}>
        <Icon className={clsx(styles.icon, hide && styles._active)} name="carousel-arrow"/>
      </MainButton>
      <nav className={styles.skroll}>

        <ul className={styles.list}>
          {links.map((el)=>{
            return (<li key={createKey()}>  
              {el.name === 'projects' ? subMenu(el) : <Link className={clsx(styles.link, isActive(el.name) && styles._active)} href={el.href}><Icon name={el.icon} className={styles.icon}/><span className={styles.text}>{el.content}</span></Link>  
              }
            </li>)
          })}
        </ul>
        <MainButton variant='admin' className={styles.btn_exit} onClick={removeToken}>
          <Icon className={styles.icon} name="go_out"/> <span className={styles.text}>Вийти</span>
        </MainButton>
      </nav>
    </div>
  )
}