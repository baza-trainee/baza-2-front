import { useTranslations } from "next-intl";
import Logo from "../Logo/Logo";
import LangDropdown from "../LangDropdown/LangDropdown";
import Menu from "./Menu/Menu";
import styles from "./Header.module.scss";
import Burger from "./Burger/Burger";
import ControlBtnModalPayment from "../controlButtons/ControlBtnModalPayment";

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
          <Burger />
        </div>
      </div>
    </header>
  );
};

export default Header;
