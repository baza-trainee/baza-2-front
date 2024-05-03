import FAQItem from "./FAQItem/FAQItem";
import { useTranslations } from "next-intl";
import styles from "./FAQ.module.scss";
import { items } from "./items";
import MainButton from "../shared/MainButton/MainButton";

const FAQ = () => {
  const t = useTranslations("Main.FAQ_section");

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("title")}</h1>
        <ul className={styles.faqItemsList}>
          {items?.map((item, i) => (
            <FAQItem
              key={i}
              title={t(item.title)}
              description={t(item.description)}
            />
          ))}
        </ul>
        <MainButton>{t("btn_support_project")}</MainButton>
      </div>
    </section>
  );
};

export default FAQ;
