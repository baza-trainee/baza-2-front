"use client";

import clsx from "clsx";
//import Link from "next/link";
//import { useCallback, useEffect } from "react";
import { links } from "./links";
//import { usePathname } from "next/navigation";
//import { transformUrl } from "../../../lib/transformUrl";
import { useTranslations } from "next-intl";
import MainButton from "@/src/components/shared/MainButton/MainButton";
import styles from "./BurgerMenu.module.scss";
import { useBodyLock } from "@/src/lib/hooks/useBodyLock";
import { createKey } from "@/src/lib/utils/createKey";
import { Link, usePathname } from "@/src/navigation";
//import { createKey } from "../../../../../../lib/utils/createKey";

const BurgerMenu = ({ menuOpened, setMenuOpened }) => {
  const pathname = usePathname();
  //const pathnameWithoutLang = transformUrl(pathname);
 // const pathnameWithoutLang =  usePathname();
  const t = useTranslations("Header");

  // const handleClose = useCallback(() => {
  //   if (menuOpened) setMenuOpened(false);
  // }, [pathname]);

  const scrollToBottom = (event,url) => {
    if (url === "/contacts") {
      event.preventDefault();
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
    setMenuOpened(false)
  }

  // при переходе на какуюто страницу закрываем бургер и тоглим стейт в 'false'
  // useEffect(() => {
  //   handleClose();
  // }, [pathname]);

  useBodyLock(menuOpened);

  return (
    <nav className={clsx(styles.burgerMenu, menuOpened && styles.opened)}>
      <ul className={styles.burgerList}>
        {links.map((link) => {
          const isCurrentPage = pathname === link.href;
          //const liKey = createKey();
          return (
            <li
              // onClick={(e)=>{
              //   scrollToBottom(e)
              //   handleClose} }
              className={styles.burgerMenuItem}
              key={createKey()}
            >
              <Link
                onClick={(e)=>{
                  scrollToBottom(e,link.href)
                  } }
                href={link.href}
                className={clsx(
                  styles.burgerMenuLink,
                  isCurrentPage && styles.active
                )}
              >
                {t(link.content)}
              </Link>
            </li>
          );
        })}
      </ul>
      <MainButton className={styles.burgerBtn}>
        {t("btn_support_project")}
      </MainButton>
    </nav>
  );
};

export default BurgerMenu;
