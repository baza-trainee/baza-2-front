import styles from "./TestExampleLangDropdown.module.scss";
import LangDropdown from "../LangDropdown/LangDropdown";
import Logo from "../shared/Logo/Logo";

export default function TestExampleLangDropdown() {
  return (
    <div className={styles.box}>
      <Logo />
      <LangDropdown />
    </div>
  );
}
