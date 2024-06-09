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

  const handleClose = useCallback(() => {
    if (isOpen) onClose();
  }, [isOpen]);

  // при переходе на какуюто страницу закрываем бургер и тоглим стейт в 'false'
  useEffect(() => {
    handleClose();
  }, [pathname]);

  useBodyLock(isOpen);

  return (
    <nav data-lenis-prevent className={clsx(styles.burgerMenu, isOpen && styles.opened)}>
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
    </nav>
  );
};

export default BurgerMenu;
