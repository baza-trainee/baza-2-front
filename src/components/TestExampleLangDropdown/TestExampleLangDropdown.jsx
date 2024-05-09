import styles from "./TestExampleLangDropdown.module.scss";
import LangDropdown from "../shared/LangDropdown/LangDropdown";
import Logo from "../shared/Logo/Logo";

export default function TestExampleLangDropdown() {
  return (
    <div className={styles.box}>
      <Logo />
       Тимчасовий Хедер для налаштувань
      <LangDropdown />
    </div>
  );
}
