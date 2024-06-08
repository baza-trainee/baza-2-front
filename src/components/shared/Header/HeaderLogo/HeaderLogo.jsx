"use client";

import stateBurgerMenu from "@/src/state/stateBurgerMenu";
import { useCallback } from "react";
import Logo from "../../Logo/Logo";
import styles from "./HeaderLogo.module.scss";

const HeaderLogo = () => {
  const isOpen = stateBurgerMenu((state) => state.isOpen);
  const onClose = stateBurgerMenu((state) => state.close);

  const handleClose = useCallback(() => {
    if (isOpen) onClose();
  }, [isOpen]);

  return (
    <Logo variant="header" handleClick={handleClose} className={styles.logo} />
  );
};

export default HeaderLogo;
