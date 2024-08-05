"use client";
import { useState } from 'react';
import styles from './NavBar.module.scss'
import clsx from "clsx";
import Logo from '../../shared/Logo/Logo';
import MainButton from '../../shared/MainButton/MainButton';
import { Icon } from '../../shared/Icon/Icon';
import { Link, usePathname, useRouter } from '@/src/navigation';
import { links } from './linksType';
import { createKey } from '@/src/lib/utils/createKey';
import { token } from '@/src/api/auth';

export default function NavBar() {
  const pathname = usePathname()
  const router = useRouter();
  const [hide, setHide]= useState(false)
 
  const removeToken=()=>{
    token.reset()
    router.replace('/');
  }

  const isActive=(name)=>{
   return pathname.split('/').includes(name)
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
              <Link className={clsx(styles.link,isActive(el.icon) && styles._active)} href={el.href}><Icon name={el.icon} className={styles.icon}/><span className={styles.text}>{el.content}</span></Link>
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