"use client";
import { useState } from 'react';
import styles from './NavBar.module.scss'
import clsx from "clsx";
import Logo from '../../shared/Logo/Logo';
import MainButton from '../../shared/MainButton/MainButton';
import { Icon } from '../../shared/Icon/Icon';
import { Link, usePathname } from '@/src/navigation';

export default function NavBar() {
  const pathname = usePathname()


  console.log(pathname==='/admin')
  const [hide, setHide]= useState(false)

  return (
    <div className={clsx(styles.wrapp, hide && styles._hide)}>
      <header className={styles.header}>
        <Logo className={styles.logo}/>
      </header>
      <ul className={styles.list}>
        <li>
          <MainButton onClick={()=>{setHide(!hide)}} className={styles.btn}>
            <Icon className={clsx(styles.icon, hide && styles._active)} name="carousel-arrow"/>
          </MainButton>
        </li>
        <li>
          <Link className={styles.link} href={'/admin'}><Icon name="slider" className={styles.icon}/><span className={clsx(styles.text, hide && styles._hide)}>Слайдер</span></Link>
        </li>
        <li>
          <Link className={styles.link} href={'/admin/projects'}><Icon name="projects" className={styles.icon}/><span className={clsx(styles.text, hide && styles._hide)}>Проєкти</span></Link>
        </li>
      </ul>
      NavBar
    </div>
  )
}