import FAQItem from "./FAQItem/FAQItem";
import { useTranslations } from "next-intl";
import { items } from "./items";
import styles from "./FAQ.module.scss";
import ControlBtnModalPayment from "../shared/controlButtons/ControlBtnModalPayment";

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
              descLink={i == 2 ? t(item.link) : null}
            />
          ))}
        </ul>
        <ControlBtnModalPayment>
          {t("btn_support_project")}
        </ControlBtnModalPayment>
      </div>
    </section>
  );
};

export default FAQ;
