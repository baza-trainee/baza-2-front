import { useTranslations } from "next-intl";
import LangDropdown from "../LangDropdown/LangDropdown";
import Menu from "./Menu/Menu";
import ControlBtnModalPayment from "../controlButtons/ControlBtnModalPayment";
import styles from "./Header.module.scss";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import BurgerButton from "./BurgerButton/BurgerButton";
import Logo from "../Logo/Logo";

const Header = () => {
  const t = useTranslations("Header");
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo variant="header" className={styles.logo} />
        <Menu />
        <div className={styles.actions}>
          <ControlBtnModalPayment className={styles.headerBtn}>
            {t("btn_support_project")}
          </ControlBtnModalPayment>
          <LangDropdown />
          <BurgerButton />
        </div>
      </div>
      <BurgerMenu />
    </header>
  );
};

export default Header;
