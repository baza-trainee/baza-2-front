"use client"
import styles from './Logo.module.scss';
import Image from 'next/image';
import { Link } from '@/src/navigation';

export default function Logo({variant='header'}) {
  const logoClass = `${styles[`logo_${variant}`]}`;

  const scrollToTop = (event) => {
    if (variant === 'footer') {
      event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
      });
    }
  }

  return <Link href={'/'} className={logoClass} onClick={scrollToTop}>
    <Image src="/images/main_logo.svg" alt="Logo" fill={true}/>
  </Link>
    
}