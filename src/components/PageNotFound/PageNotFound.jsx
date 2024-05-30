import styles from "./PageNotFound.module.scss";
import ButtonLink from "../shared/ButtonLink/ButtonLink";
import { useTranslations } from "next-intl";

export const PageNotFound = () => {
  const t = useTranslations("Page_404");

  return (
    <main className={styles.mainErr}>
      <div className={styles.wrapper}>
        <h1 className={styles.numbers}>404</h1>
        <p>{t('title')}</p>
        <ButtonLink url="/">{t('btn_home')}</ButtonLink>
      </div>
    </main>
  );
};
