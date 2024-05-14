"use client";

import clsx from "clsx";
import { useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useBodyLock } from "@/src/lib/hooks/useBodyLock";
import { usePathname } from "@/src/navigation";
import { links } from "./links";
import { createKey } from "@/src/lib/utils/createKey";
import MainLink from "../../../MainLink/MainLink";
import styles from "./BurgerMenu.module.scss";
import ControlBtnModalPayment from "../../../controlButtons/ControlBtnModalPayment";

const BurgerMenu = ({ menuOpened, setMenuOpened }) => {
  const pathname = usePathname();
  const t = useTranslations("Header");

  const handleClose = useCallback(() => {
    if (menuOpened) setMenuOpened(false);
  }, [menuOpened]);

  // при переходе на какуюто страницу закрываем бургер и тоглим стейт в 'false'
  useEffect(() => {
    handleClose();
  }, [pathname]);

  useBodyLock(menuOpened);

  return (
    <nav className={clsx(styles.burgerMenu, menuOpened && styles.opened)}>
      <ul className={styles.burgerList}>
        {links?.map((link) => (
          <li key={createKey()}>
            <MainLink
              url={link.href}
              type={link.type}
              handleClose={handleClose}
            >
              {t(link.content)}
            </MainLink>
          </li>
        ))}
      </ul>
      <ControlBtnModalPayment className={styles.headerBtn}>
        {t("btn_support_project")}
      </ControlBtnModalPayment>
    </nav>
  );
};

export default BurgerMenu;
