'use client';
import style from './LangDropdown.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { locales } from '@/src/i18n';
import { usePathname, useRouter } from '@/src/navigation';
import HeaderCaretDown from '../icons/HeaderArowDown';

export default function LangDropdown (){
  const router = useRouter();
  const path = usePathname();
  const locale = useLocale();
  const [currentLocale, setCurrentLocale] = useState(locale);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const submenuRef = useRef(null);

  const handleCheckLocale = (item) => {
    setIsOpen(!isOpen);
    setCurrentLocale(item);
    router.replace(path, { locale: item });
  };

  const handleOutsideClick = (event) => {
    if (
      !submenuRef.current?.contains(
        event.target
      ) &&
      !(
        event.target === menuRef.current ||
        menuRef.current?.contains(
          event.target
        )
      )
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () =>
      window.removeEventListener(
        'click',
        handleOutsideClick
      );
  }, [isOpen]);
  return (
    <div
    className={style.box}
    >
      <div
        ref={menuRef}
        onClick={() => setIsOpen(!isOpen)}
        className={style.btn_lang}
      >
        <span>
        {currentLocale.toUpperCase()}
        </span>
        <span className={isOpen ? style.btn_icon:''}>
          <HeaderCaretDown/>
        </span>
      </div>
      {isOpen && (
        <div
          ref={submenuRef}
          className={style.options}
        >
          {locales.map((item) => (
            item !==currentLocale ?
            <span
              key={item}
              onClick={() => handleCheckLocale(item)}
            >
              {item.toUpperCase()}
            </span>:
            null
          ))}
        </div>
      )}
    </div>
  );
};
