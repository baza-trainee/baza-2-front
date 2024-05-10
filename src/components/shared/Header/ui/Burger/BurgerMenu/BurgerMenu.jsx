"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { links } from "./links";
import { usePathname } from "next/navigation";
import { transformUrl } from "../../../lib/transformUrl";
import { useTranslations } from "next-intl";
import MainButton from "@/src/components/shared/MainButton/MainButton";
import styles from "./BurgerMenu.module.scss";
import { useBodyLock } from "@/src/lib/hooks/useBodyLock";

const BurgerMenu = ({ menuOpened, setMenuOpened }) => {
  const pathname = usePathname();
  const pathnameWithoutLang = transformUrl(pathname);
  const t = useTranslations("Header");

  const handleClose = useCallback(() => {
    if (menuOpened) setMenuOpened(false);
  }, [pathname]);

  // при переходе на какуюто страницу закрываем бургер и тоглим стейт в 'false'
  useEffect(() => {
    handleClose();
  }, [pathname]);

  useBodyLock(menuOpened);

  return (
    <nav className={clsx(styles.burgerMenu, menuOpened && styles.opened)}>
      <ul className={styles.burgerList}>
        {links.map((link, i) => {
          const isCurrentPage = pathnameWithoutLang === link.href;

          return (
            <li onClick={handleClose} className={styles.burgerMenuItem}>
              <Link
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
