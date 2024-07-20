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
    router.replace('/admin/login');
  }
  return (
    <div className={clsx(styles.wrapp, hide && styles._hide)}>
      <header className={styles.header}>
        <Logo className={styles.logo}/>
      </header>
      <MainButton onClick={()=>{setHide(!hide)}} className={styles.btn}>
        <Icon className={clsx(styles.icon, hide && styles._active)} name="carousel-arrow"/>
      </MainButton>
      <div className={styles.skroll}>

        <ul className={styles.list}>
          <li>
            {/* <MainButton onClick={()=>{setHide(!hide)}} className={styles.btn}>
              <Icon className={clsx(styles.icon, hide && styles._active)} name="carousel-arrow"/>
            </MainButton> */}
          </li>
          {links.map((el)=>{
            return (<li key={createKey()}>  
              <Link className={clsx(styles.link,pathname===`${el.href}`&& styles._active)} href={el.href}><Icon name={el.icon} className={styles.icon}/><span className={clsx(styles.text, hide && styles._hide)}>{el.content}</span></Link>
            </li>)
          })}
        </ul>
        <MainButton variant='admin' className={styles.btn_exit} onClick={removeToken}>
          <Icon className={styles.icon} name="go_out"/> <span className={clsx(styles.text, hide && styles._hide)}>Вийти</span>
        </MainButton>
      </div>
    </div>
  )
}