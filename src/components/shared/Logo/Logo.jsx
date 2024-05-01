"use client"
import styles from './Logo.module.scss';
import Image from 'next/image';
import { Link } from '@/src/navigation';
// variant header або footer
const logoConfig = {
  HEADER:'header',
  FOOTER: "footer",
}

export default function Logo({variant=logoConfig.HEADER}) {
  const logoClass = `${styles[
    variant === logoConfig.HEADER || 
    variant === logoConfig.FOOTER ? 
    variant : 
    logoConfig.HEADER]}`;

  const scrollToTop = (event) => {
    if (variant === logoConfig.FOOTER) {
      event.preventDefault();
    }
    window.scrollTo({
      top: 0,
      behavior: variant === logoConfig.HEADER ? 'instant' : "smooth"
  });
  }

  return (
    <Link href={'/'} className={logoClass} onClick={scrollToTop}>
      <Image src="/images/main_logo.svg" alt="Logo" fill={true}/>
    </Link>
  )
}