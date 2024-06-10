"use client";

import clsx from "clsx";
import { useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useBodyLock } from "@/src/lib/hooks/useBodyLock";
import { usePathname } from "@/src/navigation";
import { links } from "./links";
import { createKey } from "@/src/lib/utils/createKey";
import MainLink from "../../MainLink/MainLink";
import ControlBtnModalPayment from "../../controlButtons/ControlBtnModalPayment";
import stateBurgerMenu from "@/src/state/stateBurgerMenu";
import styles from "./BurgerMenu.module.scss";

const BurgerMenu = () => {
  const pathname = usePathname();
  const t = useTranslations("Header");
  const isOpen = stateBurgerMenu((state) => state.isOpen);
  const onClose = stateBurgerMenu((state) => state.close);

  const BURGER_MENU_BREAKPOINT = 992;

  const handleClose = useCallback(() => {
    if (isOpen) onClose();
  }, [isOpen]);

  const handleResize = useCallback(() => {
    if (window.innerWidth > BURGER_MENU_BREAKPOINT) {
      handleClose();
    }
  }, [handleClose]);

  // при переходе на какуюто страницу закрываем бургер и тоглим стейт в 'false'
  useEffect(() => {
    handleClose();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useBodyLock(isOpen);

  return (
    <nav data-lenis-prevent className={styles.burgerMenu}>
      <div className={clsx(styles.content, isOpen && styles.opened)}>
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
        <ControlBtnModalPayment
          className={styles.headerBtn}
          onClick={handleClose}
        >
          {t("btn_support_project")}
        </ControlBtnModalPayment>
      </div>
      <div
        onClick={handleClose}
        className={clsx(styles.background, isOpen && styles.show)}
      ></div>
    </nav>
  );
};

export default BurgerMenu;
