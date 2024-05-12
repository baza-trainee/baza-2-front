import Timeline from "./Timeline/Timeline";
import { useTranslations } from "next-intl";
import styles from "./HistorySection.module.scss";


const HistorySection = () => {
  const t = useTranslations("Main.history_project_section");
  return (
    <section className={styles.history}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.text}>
          {t('text')}
          <br /> {t('text1')}
        </p>
        <Timeline />
      </div>
    </section>
  );
};

export default HistorySection;
