"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Logo from "../Logo/Logo";
import MainButton from "../MainButton/MainButton";
import LangDropdown from "../LangDropdown/LangDropdown";
import Menu from "./ui/Menu/Menu";
import clsx from "clsx";
import useHeaderFixed from "./lib/useHeaderFixed";
import styles from "./Header.module.scss";
import Burger from "./ui/Burger/Burger";

const Header = () => {
  const t = useTranslations("Header");
  const { isFixed } = useHeaderFixed();

  return (
    <header className={clsx(styles.header, isFixed && styles.fixed)}>
      <div className={styles.container}>
        <Logo variant="header" className={styles.logo} />
        <Menu />
        <div className={styles.actions}>
          <MainButton>{t("btn_support_project")}</MainButton>
          <LangDropdown />
          <Burger />
        </div>
      </div>
    </header>
  );
};

export default Header;
