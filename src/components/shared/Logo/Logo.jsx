"use client";
import styles from './Logo.module.scss';
import Image from 'next/image';
import { Link } from '@/src/navigation';

const logoConfig = {
  HEADER:'header',
  FOOTER: 'footer'
};
// variant - 'header' або 'footer' за замовчуванням 'header'. ariaLabel - для посилання
export default function Logo({ variant=logoConfig.HEADER, ariaLabel }) {
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
    })
  };

  return (
    <Link href={'/'} className={logoClass} onClick={scrollToTop} aria-label={ ariaLabel }>
      <Image src="/images/main_logo.svg" 
      alt="Logo Baza Trainee Ukraine" 
      fill={true} 
      priority/>
    </Link>
  )
};