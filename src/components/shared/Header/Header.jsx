import NavLinks from "../../NavLinks/NavLinks";
import LangDropdown from "../LangDropdown/LangDropdown";
import Logo from "../Logo/Logo";
import styles from './NavBar.module.scss';
import MainButton from '../MainButton/MainButton';

import { useTranslations } from "next-intl";


export default function () {
  const t = useTranslations("Header");
  return (
      <div className={styles.navBar}>
        <Logo />
        <NavLinks />
        <div className={styles.container}>
          <MainButton>{t("btn_support_project")}</MainButton>
          <LangDropdown />
        </div>
      </div>
)}