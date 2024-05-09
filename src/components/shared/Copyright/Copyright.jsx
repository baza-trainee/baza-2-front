import { useTranslations } from "next-intl";
import styles from "./Copyright.module.scss";

const Copyright = () => {
  const t = useTranslations("Footer");

  const currentYear = new Date().getFullYear();

  return (
    <p className={styles.copyrights}>
      {t("development")} Baza Trainee Ukraine &copy; {currentYear} {t("rights")}
    </p>
  );
};

export default Copyright;
